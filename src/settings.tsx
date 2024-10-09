import { util, settings } from "replugged";
import { SwitchItem } from "replugged/components";

export const cfg = await settings.init("dev.oirnoir.RemoveDiscordMosaic");

export const Settings = () => {
	return (
		<>
			<SwitchItem
				note="Let the attachments have a static size rather than responsive."
				{...util.useSetting(cfg, "static", false)}
			>
				Static Size
			</SwitchItem>
			<SwitchItem 	note="Use the left and right arrow keys to easily browse through multiple images within the same message."
				{...util.useSetting(cfg, "nav", false)}>Image Navigation</SwitchItem>
		</>
	);
};
