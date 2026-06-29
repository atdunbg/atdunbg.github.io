---
title: Fuwari 宽屏下正文 自动连带TOC一块居中方案
published: 2026-06-29
description: '让正文与右侧 TOC 作为一个整体在视口中真正居中，并修复顶栏与 TOC 的对齐'
image: ''
tags: [fuwari, css, 布局]
category: '教程'
draft: false
lang: ''
---


## 修复 Fuwari 宽屏下「正文 + TOC」整体偏右、视觉不居中的问题。

## 问题原因

原版 Fuwari 在宽屏（≥1536px，即 Tailwind 的 `2xl` 断点）下的布局结构是：

- 正文容器 `<div class="max-w-[var(--page-width)] mx-auto">` 通过 `mx-auto` 在视口中**居中**（占 75rem）
- TOC 容器同样 `mx-auto` 居中，TOC 本体通过 `absolute -right-[var(--toc-width)]` 悬浮在**容器右边缘再向右 `toc-width`** 的位置，也就是落在视口右侧的空白区域

结果是：**正文一直钉在视口正中央不动，TOC 额外塞在右边**，两者作为一个整体重心**偏右**，并不是真正的视觉居中。

本方案的做法是：当页面有 TOC 且视口足够宽时，把正文容器和 TOC 容器**同时向左平移 `toc-width / 2`**，让「正文 + TOC」作为一个整体在视口中真正居中；没有 TOC 的页面保持原样，并在切换页面 / 窗口尺寸变化时带 500ms 缓动过渡。同时修复顶栏（Navbar）与 TOC 右边缘的 1rem 错位。

## 涉及的核心变量

`--page-width` 定义在 `src/constants/constants.ts`
```ts title="src/constants/constants.ts"
// Page width: rem
export const PAGE_WIDTH = 75;
```

`--toc-width` 定义在 `src/styles/variables.styl`，会根据 `--page-width` 自动计算
```styl title="src/styles/variables.styl"
--toc-width: calc((100vw - var(--page-width)) / 2 - 1rem)
```

调整 `PAGE_WIDTH` 即可改变正文宽度，`--toc-width` 会自动跟随，无需手动维护。

## 修改步骤

整个方案由「定义断点常量 + 服务端标记 + 客户端切换 class + CSS 媒体查询」四部分协作完成，对应四处文件改动。

### 1. 定义 TOC 显示断点常量

原版代码里 `1536` 这个数字在 JS 和 CSS 中各写死一次，不便维护。先在 `src/constants/constants.ts` 末尾新增一个常量，让 JS 部分可配置。

```diff title="src/constants/constants.ts" lang="ts"
 // Page width: rem
 export const PAGE_WIDTH = 75;
+
+// TOC 显示的最低视口宽度（px），需与 Tailwind 的 2xl 断点保持一致
+// 同时 CSS 中 @media (min-width: 1536px) 也要同步修改
+export const TOC_BREAKPOINT = 1536;
```

> 注意：CSS 的 `@media (min-width: ...)` 不支持 `var()`，所以 `@media` 里的 `1536px` 仍然是字面量，改这个常量时需要同步改下面第 4 步里的 `@media`。注释里已写明。

### 2. 给正文 / TOC 容器加 ID，并标记是否有 TOC

打开 `src/layouts/MainGridLayout.astro`，做三处改动：

- 给正文外层容器加 `id="content-center-wrap"`
- 给 `<main>` 加 `data-has-toc` 属性（有标题树时输出空字符串，否则不输出）
- 给 TOC 外层容器加 `id="toc-center-wrap"`

```diff title="src/layouts/MainGridLayout.astro" lang="astro"
 <!-- Main content -->
 <div class="absolute w-full z-30 pointer-events-none" style={`top: ${mainPanelTop}`}>
     <!-- The pointer-events-none here prevent blocking the click event of the TOC -->
-    <div class="relative max-w-[var(--page-width)] mx-auto pointer-events-auto">
+    <div id="content-center-wrap" class="relative max-w-[var(--page-width)] mx-auto pointer-events-auto">
         <div id="main-grid" class="transition duration-700 w-full left-0 right-0 grid grid-cols-[17.5rem_auto] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto]
     mx-auto gap-4 px-0 md:px-4"
         >
@@
             <SideBar class="mb-4 row-start-2 row-end-3 col-span-2 lg:row-start-1 lg:row-end-2 lg:col-span-1 lg:max-w-[17.5rem] onload-animation" headings={headings}></SideBar>

-            <main id="swup-container" class="transition-swup-fade col-span-2 lg:col-span-1 overflow-hidden">
+            <main id="swup-container" class="transition-swup-fade col-span-2 lg:col-span-1 overflow-hidden" data-has-toc={siteConfig.toc.enable && headings.length > 0 ? "" : undefined}>
@@

 <!-- The things that should be under the banner, only the TOC for now -->
 <div class="absolute w-full z-0 hidden 2xl:block">
-    <div class="relative max-w-[var(--page-width)] mx-auto">
+    <div id="toc-center-wrap" class="relative max-w-[var(--page-width)] mx-auto">
```

`data-has-toc` 是给客户端 JS 读取的标记，用来判断当前页面是否需要触发平移。必须同时满足两个条件才标记：

- `siteConfig.toc.enable` 为 `true`（用户在 `src/config.ts` 中开启了 TOC 功能）
- `headings.length > 0`（当前文章有可渲染的标题树）

只要其中一个不满足，就不会标记 `data-has-toc`，JS 也就不会给 body 加 `toc-offset` 类，正文保持原版居中行为。

### 3. 客户端根据情况给 body 加 `toc-offset` 类

打开 `src/layouts/Layout.astro`，先在 frontmatter 的 import 里加上 `TOC_BREAKPOINT`
```diff title="src/layouts/Layout.astro" lang="astro"
 import {
 	AUTO_MODE,
 	BANNER_HEIGHT,
 	BANNER_HEIGHT_EXTEND,
 	BANNER_HEIGHT_HOME,
 	DARK_MODE,
 	DEFAULT_THEME,
 	LIGHT_MODE,
 	PAGE_WIDTH,
+	TOC_BREAKPOINT,
 } from "../constants/constants";
```

然后在文件末尾追加一段脚本。注意必须用 `is:inline define:vars` 把常量注入到客户端脚本，否则 `<script>` 里拿不到 TS 模块的值。

```astro title="src/layouts/Layout.astro"
<script is:inline define:vars={{ TOC_BREAKPOINT }}>
function adjustTocLayout() {
	const hasToc = !!document.querySelector('[data-has-toc]');
	const isWide = window.innerWidth >= TOC_BREAKPOINT;
	if (hasToc && isWide) {
		document.body.classList.add('toc-offset');
	} else {
		document.body.classList.remove('toc-offset');
	}
}
adjustTocLayout();
window.addEventListener('resize', adjustTocLayout);
if (window.swup) {
	window.swup.hooks.on('content:replace', () => requestAnimationFrame(adjustTocLayout));
	window.swup.hooks.on('page:view', () => requestAnimationFrame(adjustTocLayout));
} else {
	document.addEventListener('swup:enable', () => {
		adjustTocLayout();
		window.swup.hooks.on('content:replace', () => requestAnimationFrame(adjustTocLayout));
		window.swup.hooks.on('page:view', () => requestAnimationFrame(adjustTocLayout));
	});
}
</script>
```

逻辑：当前页面有 `data-has-toc` 且视口 ≥ `TOC_BREAKPOINT` 时，给 `<body>` 加 `toc-offset` 类，否则移除。

之所以要监听 Swup 的 `content:replace` / `page:view` 钩子，是因为 Fuwari 用 Swup 做无刷新跳转，`<body>` 不在替换范围内，必须由 JS 在每次页面切换后重新判定。

### 4. 用 CSS 实现平移、过渡与顶栏对齐

回到 `src/layouts/MainGridLayout.astro`，在文件末尾追加 `<style is:global>` 块，仅在 `min-width: 1536px` 时生效。

```astro title="src/layouts/MainGridLayout.astro"
<style is:global>
@media (min-width: 1536px) {
    /* 用显式 margin 取代 mx-auto，auto 无法参与 transition */
    #content-center-wrap,
    #toc-center-wrap {
        margin-left: calc((100% - var(--page-width)) / 2) !important;
        margin-right: calc((100% - var(--page-width)) / 2) !important;
        transition: margin 500ms cubic-bezier(0.5, 0, 0.3, 1);
    }
    /* 有 TOC 时整体向左平移 toc-width / 2，让「正文+TOC」视觉居中 */
    body.toc-offset #content-center-wrap,
    body.toc-offset #toc-center-wrap {
        margin-left: calc((100% - var(--page-width)) / 2 - var(--toc-width) / 2) !important;
        margin-right: calc((100% - var(--page-width)) / 2 - var(--toc-width) / 2) !important;
    }
    /* 顶栏过渡：max-width / padding / margin 都要参与，否则切换时会跳变 */
    #top-row {
        transition: max-width 500ms cubic-bezier(0.5, 0, 0.3, 1),
                    padding 500ms cubic-bezier(0.5, 0, 0.3, 1),
                    margin 500ms cubic-bezier(0.5, 0, 0.3, 1);
    }
    #top-row .card-base {
        transition: background-color 300ms,
                    max-width 500ms cubic-bezier(0.5, 0, 0.3, 1);
    }
    /*
     * 顶栏对齐关键：
     *   - margin-left 与正文容器一致，让顶栏左边对齐正文左边
     *   - margin-right 比正文容器少 1rem，max-width 比正文+TOC 多 1rem
     *   - 这样顶栏右边 = TOC 右边 + 1rem，抵消 #top-row 的 md:px-4 右 padding 后，
     *     Navbar 实际右边刚好对齐 TOC 右边
     */
    body.toc-offset #top-row {
        margin-left: calc((100% - var(--page-width)) / 2 - var(--toc-width) / 2) !important;
        margin-right: calc((100% - var(--page-width)) / 2 - var(--toc-width) / 2 - 1rem) !important;
        max-width: calc(var(--page-width) + var(--toc-width) + 1rem) !important;
    }
    /* Navbar 减去左右各 1rem padding 后的实际宽度 */
    body.toc-offset #top-row .card-base {
        max-width: calc(var(--page-width) + var(--toc-width) - 1rem) !important;
    }
    /* 关闭内部网格/侧栏的过渡，避免平移时产生抖动 */
    #main-grid {
        transition-property: none !important;
    }
    #sidebar-sticky {
        transition-property: none !important;
    }
}
</style>
```

要点说明：

- 用 `margin: calc((100% - var(--page-width)) / 2)` 取代 `mx-auto`，是因为 `auto` 无法参与 `transition`，显式 calc 才能让平移有过渡动画
- `body.toc-offset` 下左右 margin 各减 `toc-width / 2`，等于把整个容器向左平移 `toc-width / 2`，使「正文 + TOC」整体居中
- **顶栏对齐**：`#top-row` 自带 `md:px-4`（左右各 1rem padding），Navbar 受 padding 限制，如果直接让 `#top-row` 的 max-width = `page-width + toc-width`，Navbar 右边会比 TOC 右边少 1rem。所以让 `#top-row` 右边多伸出 1rem（`margin-right` 少 1rem、`max-width` 多 1rem），Navbar 减去右 padding 后刚好对齐 TOC 右边
- `#main-grid` / `#sidebar-sticky` 强制关闭 `transition-property`，防止正文内部在平移期间发生位移抖动

## 如何使用

方案默认开启，无需任何配置。只需保证 `src/config.ts` 中 TOC 处于启用状态
```ts title="src/config.ts"
toc: {
	enable: true, // Display the table of contents on the right side of the post
	depth: 3, // Maximum heading depth to show in the table, from 1 to 3
},
```

配置好后 `pnpm dev` 测试一下，访问任意带标题的文章页，宽屏下「正文 + TOC」会作为一个整体在视口居中，顶栏 Navbar 的左右边缘也会与正文内容、TOC 右边对齐；窗口缩到 1536px 以下或进入无 TOC 的页面时，自动恢复正文正中布局，整个过程带 500ms 缓动。

## 触发条件

| 条件 | 是否触发 `toc-offset` | 表现 |
| --- | --- | --- |
| 有 TOC 且视口 ≥ 1536px | 是 | 正文 + TOC 整体居中，Navbar 对齐 TOC 右边 |
| 有 TOC 但视口 < 1536px | 否 | TOC 隐藏，正文居中 |
| 无 TOC（如首页 / 关于页） | 否 | 正文居中（原版行为） |

如果想调整正文宽度，修改 `src/constants/constants.ts` 的 `PAGE_WIDTH` 即可，`--toc-width` 会自动跟随。

如果想调整 TOC 显示的断点，修改 `src/constants/constants.ts` 的 `TOC_BREAKPOINT`，**同时**把第 4 步 CSS 里的 `@media (min-width: 1536px)` 同步改成新值。
