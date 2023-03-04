import Replugged from "replugged";
import "./style.css";

let observer : MutationObserver, observer2 : MutationObserver, observer3 : MutationObserver;

function fixElement(element : Element) {
	for (const img of element.querySelectorAll('div[class*="mediaAttachmentsContainer-"] div[class*="imageContainer-"] img')) {
		if (img.getAttribute("rdm-old-params") != null) continue;
		const src = img.getAttribute("src");
		if (src == null) continue;
		let splitSrc = src.split("?");
		const newSrc = splitSrc.shift();
		if (newSrc == null) continue;
		img.setAttribute("src", newSrc);
		img.setAttribute("rdm-old-params", splitSrc.join("?"));
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
}

export async function start(): Promise<void> {
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
  observer.disconnect();
  observer2.disconnect();
  observer3.disconnect();
	unfixAll();
}