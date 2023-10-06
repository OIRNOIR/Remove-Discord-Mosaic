import replugged from "replugged";
import "./style.css";

let observer : MutationObserver, observer2 : MutationObserver, observer3 : MutationObserver;

let disabled = false;

function onVideoClick(e: MouseEvent) {
	if (!disabled) {
		e.stopPropagation();
		/*const video = e.target as HTMLVideoElement;
		console.log("Play State Toggle - Video");
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}*/
	}
}

function onCoverClick(e: MouseEvent) {
	if (!disabled) {
		e.stopPropagation();
		const target = (e.target as Element);
		console.log((e.target as Element).closest('[class*="wrapperMediaMosaic-"]'));
		const video = (e.target as Element).closest('[class*="wrapperMediaMosaic-"]')?.querySelector("video");
		if (video == null) return console.log("Video returned null!");
		console.log("Play State Toggle - Cover");
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
		(target as HTMLDivElement).removeEventListener("click", onCoverClick);
		const cover = (target as HTMLDivElement).closest('[class*="cover-"]') as HTMLDivElement;
		cover.style.display = "none";
	}
}

function fixElement(element : Element) {
	for (const img of element.querySelectorAll('div[class*="mediaAttachmentsContainer-"] div[class*="imageContainer-"] img')) {
		if (img.getAttribute("rdm-old-params") != null) continue;
		const src = img.getAttribute("src");
		if (src == null) continue;
		const srcURL = new URL(src);
		srcURL.searchParams.delete("width");
		srcURL.searchParams.delete("height");
		const newSrc = srcURL.toString();
		if (newSrc == null) continue;
		img.setAttribute("rdm-old-params", srcURL.searchParams.toString());
		img.setAttribute("src", newSrc);
	}
	for (const video of element.querySelectorAll('div[class*="mediaAttachmentsContainer-"] video') as NodeListOf<HTMLVideoElement>) {
		if (video.getAttribute("rdm-old-params") != null) continue;
		const poster = video.getAttribute("poster");
		if (poster == null) continue;
		const posterURL = new URL(poster);
		posterURL.searchParams.delete("width");
		posterURL.searchParams.delete("height");
		const newPoster = posterURL.toString();
		if (newPoster == null) continue;
		video.setAttribute("rdm-old-params", posterURL.searchParams.toString());
		video.setAttribute("poster", newPoster);
		video.setAttribute("rdm-old-height", video.getAttribute("height") ?? "");
		video.setAttribute("rdm-old-width", video.getAttribute("width") ?? "");
		video.removeAttribute("height");
		video.removeAttribute("width");
		/*video.addEventListener("click", onVideoClick);
		const cover = video.parentElement?.querySelector('video + [class*="cover-"]');
		if (cover) {
			(cover as HTMLDivElement).addEventListener("click", onCoverClick);
		}*/
	}
}

function unfixAll() {
	for (const img of document.querySelectorAll('img[rdm-old-params]')) {
		const src = img.getAttribute("src");
		if (src == null) continue;
		let splitSrc = src.split("?");
		const newSrc = splitSrc.shift() + `?${img.getAttribute("rdm-old-params")}`;
		if (newSrc == null) continue;
		img.setAttribute("src", newSrc);
		img.removeAttribute("rdm-old-params");
		console.log("Unfixed element", img);
	}
	for (const video of document.querySelectorAll('video[rdm-old-params]') as NodeListOf<HTMLVideoElement>) {
		const poster = video.getAttribute("poster");
		if (poster == null) continue;
		let splitPoster = poster.split("?");
		const newPoster = splitPoster.shift() + `?${video.getAttribute("rdm-old-params")}`;
		if (newPoster == null) continue;
		video.setAttribute("poster", newPoster);
		// video.removeEventListener("click", onVideoClick);
		video.removeAttribute("rdm-old-params");
		console.log("Unfixed element", video);
	}
}

export async function start(): Promise<void> {
	disabled = false;
	let start = Date.now();

	// JS observer method
  observer = new MutationObserver((mutationsList, observer) => {
		[...mutationsList].forEach(mutation => {
			for (const child of document.querySelectorAll('ol[data-list-id="chat-messages"]')[0].children) {
				fixElement(child);
			}
		});
	});

	function reconnect() {
		try {
			observer.observe(document.querySelectorAll('ol[data-list-id="chat-messages"]')[0], {
				attributes: true,
				childList: true,
				subtree: true
			});
			console.log("OBSERVING1");
			for (const child of document.querySelectorAll('ol[data-list-id="chat-messages"]')[0].children) {
				fixElement(child);
			}
		} catch (error) {
			console.error(error);
			setTimeout(() => {
				reconnect();
			}, 1000);
		}
	}

	function reconnect2() {
		try {
			observer2 = new MutationObserver((mutations) => {
				for (const m of mutations) {
					for (const n of m.removedNodes) {
						if (n instanceof Element && Array.from(n.classList).find(c => c.startsWith("chatContent-")) && n.nodeName == "MAIN") {
							reconnect();
						}
					}
				}
			})
			observer2.observe(document.querySelectorAll('div[class*="chat-"] > div[class*="content-"]')[0], {
				attributes: true,
				childList: true,
				subtree: true
			});
			console.log("OBSERVING2");
			reconnect();
		} catch (error) {
			console.error(error);
			setTimeout(() => {
				reconnect2();
			}, 1000);
		}
	}

	function reconnect3() {
		try {
			observer3 = new MutationObserver((mutations) => {
				for (const m of mutations) {
					for (const n of m.removedNodes) {
						if (n instanceof Element && Array.from(n.classList).find(c => c.startsWith("chat-")) && n.nodeName == "DIV") {
							reconnect2();
						}
					}
				}
			})
			observer3.observe(document.querySelectorAll('div[class*="base-"] > div[class*="content-"]')[0], {
				attributes: true,
				childList: true,
				subtree: true
			});
			console.log("OBSERVING3");
			reconnect2();
		} catch (error) {
			console.error(error);
			setTimeout(() => {
				reconnect3();
			}, 1000);
		}
	}

	reconnect3();
}

export function stop(): void {
	disabled = true;

	// JS observer method
  observer.disconnect();
  observer2.disconnect();
  observer3.disconnect();
	unfixAll();
}