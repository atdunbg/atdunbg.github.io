/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a Gitea Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.repo - The Gitea repository in the format "owner/repo".
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Gitea Card component.
 */
export function GiteaCardComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h("div", { class: "hidden" }, [
			'Invalid directive. ("gitea" directive must be leaf type "::gitea{repo="owner/repo"}")',
		]);

	if (!properties.repo || !properties.repo.includes("/"))
		return h(
			"div",
			{ class: "hidden" },
			'Invalid repository. ("repo" attribute must be in the format "owner/repo")',
		);

	const repo = properties.repo;
	const cardUuid = `GC${Math.random().toString(36).slice(-6)}`; // 唯一标识

	// 创建头像占位元素（Gitea API 也提供头像 URL）
	const nAvatar = h(`div#${cardUuid}-avatar`, { class: "gc-avatar" });
	const nLanguage = h(
		`span#${cardUuid}-language`,
		{ class: "gc-language" },
		"Waiting...",
	);

	const nTitle = h("div", { class: "gc-titlebar" }, [
		h("div", { class: "gc-titlebar-left" }, [
			h("div", { class: "gc-owner" }, [
				nAvatar,
				h("div", { class: "gc-user" }, repo.split("/")[0]),
			]),
			h("div", { class: "gc-divider" }, "/"),
			h("div", { class: "gc-repo" }, repo.split("/")[1]),
		]),
		h("div", { class: "gitea-logo" }), // 可以换成 Gitea 图标
	]);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "gc-description" },
		"Waiting for Gitea API...",
	);

	const nStars = h(`div#${cardUuid}-stars`, { class: "gc-stars" }, "00K");
	const nForks = h(`div#${cardUuid}-forks`, { class: "gc-forks" }, "0K");
	// Gitea 可能没有 license 字段，可以去掉或显示其他信息
	const nLicense = h(`div#${cardUuid}-license`, { class: "gc-license" }, "");

	const nScript = h(
		`script#${cardUuid}-script`,
		{ type: "text/javascript", defer: true },
		`
      fetch('https://gitea.atdunbg.xyz/api/v1/repos/${repo}', { referrerPolicy: "no-referrer" })
        .then(response => response.json())
        .then(data => {
          document.getElementById('${cardUuid}-description').innerText = data.description || "No description";
          document.getElementById('${cardUuid}-language').innerText = data.language || "Not specified";
          document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks_count || 0).replaceAll("\\u202f", "");
          document.getElementById('${cardUuid}-stars').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stars_count || 0).replaceAll("\\u202f", "");
          const avatarEl = document.getElementById('${cardUuid}-avatar');
          avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
          avatarEl.style.backgroundColor = 'transparent';
          // 如果 Gitea API 返回 license 信息，可以显示
          // document.getElementById('${cardUuid}-license').innerText = data.license?.spdx_id || "no-license";
          document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
          console.log("[GITEA-CARD] Loaded card for ${repo} | ${cardUuid}.");
        })
        .catch(err => {
          const c = document.getElementById('${cardUuid}-card');
          c?.classList.add("fetch-error");
          console.warn("[GITEA-CARD] (Error) Loading card for ${repo} | ${cardUuid}.", err);
        });
    `,
	);

	return h(
		`a#${cardUuid}-card`,
		{
			class: "card-gitea fetch-waiting no-styling",
			href: `https://gitea.atdunbg.xyz/${repo}`,
			target: "_blank",
			repo,
		},
		[
			nTitle,
			nDescription,
			h("div", { class: "gc-infobar" }, [nStars, nForks, nLicense, nLanguage]),
			nScript,
		],
	);
}
