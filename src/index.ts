import { common, Injector, settings, webpack } from "replugged";
import { AnyFunction } from "replugged/dist/types";
import "./style.css";

const inject = new Injector();
const { React } = common;

export async function start(): Promise<void> {
  const observer = new MutationObserver((mutationsList, observer) => {
		[...mutationsList].forEach(mutation => {
			for (const element of Array.from(mutation.addedNodes).filter(n => n.nodeName == "STYLE").length > 0) {

			}
		});
	});

	new MutationObserver((m) => [...m].forEach((mutation) => {
		if (mutation.target.nodeName == "STYLE" || Array.from(mutation.addedNodes).filter(n => n.nodeName == "STYLE").length > 0 || Array.from(mutation.removedNodes).filter(n => n.nodeName == "STYLE").length > 0) {

		}
	})).observe(document.head, {
		attributes: true,
		childList: true,
		subtree: true
	});
}

export function stop(): void {
  
}