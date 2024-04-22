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
		</>
	);
};
