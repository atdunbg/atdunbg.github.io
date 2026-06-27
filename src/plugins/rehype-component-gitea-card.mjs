/// <reference types="mdast" />
import { h } from "hastscript";
import { giteaConfig } from "../config.ts";

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
	const cardUuid = `GC${Math.random().toString(36).slice(-6)}`;

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
		h("div", { class: "gitea-logo" }),
	]);

	const nDescription = h(
		`div#${cardUuid}-description`,
		{ class: "gc-description" },
		"Waiting for Gitea API...",
	);

	const nStars = h(`div#${cardUuid}-stars`, { class: "gc-stars" }, "00K");
	const nForks = h(`div#${cardUuid}-forks`, { class: "gc-forks" }, "0K");
	const nLicense = h(`div#${cardUuid}-license`, { class: "gc-license" }, "");

	const nScript = h(
		`script#${cardUuid}-script`,
		{ type: "text/javascript", defer: true },
		`
      (function() {
        var card = document.getElementById('${cardUuid}-card');
        var domain = card.getAttribute('data-gitea-domain');
        var repo = card.getAttribute('data-repo');
        
        fetch('https://' + domain + '/api/v1/repos/' + repo, { referrerPolicy: "no-referrer" })
          .then(response => response.json())
          .then(data => {
            document.getElementById('${cardUuid}-description').innerText = data.description || "No description";
            document.getElementById('${cardUuid}-language').innerText = data.language || "Not specified";
            document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks_count || 0).replaceAll("\\u202f", "");
            document.getElementById('${cardUuid}-stars').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stars_count || 0).replaceAll("\\u202f", "");
            var avatarEl = document.getElementById('${cardUuid}-avatar');
            avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
            avatarEl.style.backgroundColor = 'transparent';
            document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
            console.log("[GITEA-CARD] Loaded card for " + repo + " | ${cardUuid}.");
          })
          .catch(err => {
            var c = document.getElementById('${cardUuid}-card');
            c?.classList.add("fetch-error");
            console.warn("[GITEA-CARD] (Error) Loading card for " + repo + " | ${cardUuid}.", err);
          });
      })();
    `,
	);

	return h(
		`a#${cardUuid}-card`,
		{
			class: "card-gitea fetch-waiting no-styling",
			href: "https://" + giteaConfig.domain + "/" + repo,
			target: "_blank",
			"data-gitea-domain": giteaConfig.domain,
			"data-repo": repo,
		},
		[
			nTitle,
			nDescription,
			h("div", { class: "gc-infobar" }, [nStars, nForks, nLicense, nLanguage]),
			nScript,
		],
	);
}
