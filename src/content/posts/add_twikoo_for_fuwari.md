---
title: 为 Fuwari 添加Twikoo评论组件
published: 2026-03-07
description: ''
image: ''
tags: [fuwari, twikoo]
category: '教程'
draft: false 
lang: ''
---


## Twikoo 一个简洁、安全、免费的静态网站评论系统。

## 部署Twikoo

我部署[Twikoo](https://twikoo.js.org/)用的方案是 mongodb altas 云数据库后端 (具有免费的数据存储空间，大约512MB左右，对于评论系统已经很足够了) + [vercel](https://vercel.com/) 云函数部署.

也就是这个Twikoo的[文档](https://twikoo.js.org/backend.html#vercel-%E9%83%A8%E7%BD%B2).

### MongoDB Atlas 数据库创建

Twikoo提供的 [注册MongoDB Atlas教程](https://twikoo.js.org/mongodb-atlas.html)

最后记得要保管好 我们的`连接字符串`.

### Vercel 部署

Twikoo提供的 [Vercel 部署教程](https://twikoo.js.org/backend.html#vercel-%E9%83%A8%E7%BD%B2)


vercel 部署，由于域名的原因，中国境内无法直接访问 vercel分配的域名，需要自己手动添加一个自己的自定义域名才能访问。

## 前端部署

首先打开项目的 `src/components`位置，新建一个Twikoo.astro组件 
并填入一下内容
```astro title="src/components/Twikoo.astro"
---
// src/components/Twikoo.astro
import { twikooConfig } from "../config";

const { enable, envId, lang = "zh_CN" } = twikooConfig;
const shouldRender = enable && envId;
---

{shouldRender && (
  <div id="twikoo-comment">
    <p>加载评论中...</p>
  </div>

  <script is:inline define:vars={{ envId, lang }}>
    (function() {
      const MAX_RETRIES = 3;          
      const RETRY_DELAY = 2000;       

      let scriptRetryCount = 0;        
      let initRetryCount = 0;          

      // 尝试初始化 Twikoo
      function initTwikoo() {
        if (typeof twikoo === 'undefined') {
          // Twikoo 对象不存在，说明脚本还没加载成功，重试加载脚本
          if (scriptRetryCount < MAX_RETRIES) {
            scriptRetryCount++;
            console.log(`Twikoo 库未加载，尝试重新加载脚本 (${scriptRetryCount}/${MAX_RETRIES})...`);
            setTimeout(loadScript, RETRY_DELAY);
          } else {
            console.error('Twikoo 库加载失败，已达到最大重试次数。');
            showError('评论加载失败，请刷新页面重试。');
          }
          return;
        }

        twikoo.init({ envId, el: '#twikoo-comment', lang })
          .then(() => {
            console.log('Twikoo 初始化成功');
          })
          .catch(err => {
            console.error('Twikoo 初始化失败：', err);
            if (initRetryCount < MAX_RETRIES) {
              initRetryCount++;
              console.log(`尝试重新初始化 (${initRetryCount}/${MAX_RETRIES})……`);
              setTimeout(initTwikoo, RETRY_DELAY);
            } else {
              showError('评论加载失败，请刷新页面重试。');
            }
          });
      }

      function loadScript() {
        const script = document.createElement('script');

        // 推荐在中国使用
        //  https://registry.npmmirror.com/twikoo/1.7.1/files/dist/twikoo.min.js
        //  https://s4.zstatic.net/npm/twikoo@1.7.1/dist/twikoo.min.js
        // 推荐在全球使用
        //  https://cdn.jsdelivr.net/npm/twikoo@1.7.1/dist/twikoo.min.js
        // 备用选项
        //  https://s4.zstatic.net/ajax/libs/twikoo/1.6.41/twikoo.min.js
        //  https://lib.baomitu.com/twikoo/1.6.39/twikoo.min.js

        script.src = 'https://s4.zstatic.net/npm/twikoo@1.7.1/dist/twikoo.min.js';
        script.onload = () => {
          console.log('Twikoo 脚本加载成功');
          scriptRetryCount = 0;          
          initTwikoo();                  
        };
        script.onerror = () => {
          console.error('Twikoo 脚本加载失败');
          if (scriptRetryCount < MAX_RETRIES) {
            scriptRetryCount++;
            console.log(`尝试重新加载脚本 (${scriptRetryCount}/${MAX_RETRIES})……`);
            setTimeout(loadScript, RETRY_DELAY);
          } else {
            showError('评论加载失败，请刷新页面重试。');
          }
        };
        document.head.appendChild(script);
      }

      // 显示错误信息到评论区
      function showError(msg) {
        const container = document.querySelector('#twikoo-comment');
        if (container) container.innerHTML = `<p style="color: red;">${msg}</p>`;
      }

      loadScript();
    })();
  </script>
)}
```

在`src/pages/posts/[...slug].astro`文件中的大概 113行左右结束就是文章整个模块的渲染区域

我们在他之后添加一下内容
```diff title="src/pages/posts/[...slug].astro" lang="astro" startLineNumber=103
        ...
        <Markdown class="mb-6 markdown-content onload-animation">
            <Content />
        </Markdown>

        {licenseConfig.enable && <License title={entry.data.title} slug={entry.slug} pubDate={entry.data.published} class="mb-6 rounded-xl license-container onload-animation"></License>}

    </div>
</div>

+ <div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative mb-4">
+     <div id="post-container" class="card-base p-6 mb-4 text-black/75 dark:text-white/75  transition" class:list={["card-base z-10 px-6 md:px-9 pt-6 pb-4 relative w-full ", {} ]}>
+         <Twikoo />
+     </div>
+ </div>

<div class="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full">
    <a href={entry.data.nextSlug ? getPostUrlBySlug(entry.data.nextSlug) : "#"}
    ...
```

Twikoo 在初始化时候需要调用init函数，如下
```html
<!-- from https://twikoo.js.org/frontend.html#%E9%80%9A%E8%BF%87-cdn-%E5%BC%95%E5%85%A5 -->

<script>
    twikoo.init({
    envId: '您的环境id', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
    el: '#tcomment', // 容器元素
    // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
    // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
    // lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
    })
</script>
```

为了方便传参数，我们需要在 `src/types/config.ts`中添加一个twikooConfig配置
```ts title="src/types/config.ts"
export type TwikooConfig = {
	enable?: boolean;
	envId?: string;
	lang?: string;
};
```

最后在`src/config.ts`中添加一下修改并配置自己的`envId`
```diff title="src/config.ts" lang="ts" "填入之前在Twikoo云函数部署时拿到的Id"
import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
+	TwikooConfig,
} from "./types/config";

...

// 在文件最后添加一下内容
+ export const twikooConfig: TwikooConfig = {
+ 	enable: true,
+ 	envId: "填入之前在Twikoo云函数部署时拿到的Id",
+ };

```

配置好后`pnpm dev`测试一下，能看到文章底下的评论区了。

最后记得点击Twikoo评论区的小设置齿轮配置一下Twikoo的一些通知系统。
