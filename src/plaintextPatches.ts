import { PlaintextPatch } from "replugged/dist/types";

export default [
	{
		find: '2022-12_media_mosaic_experiment',
		replacements: [{
			match: 'enabled:!0',
			replace: () => 'enabled:!1',
		}],
	},
] as PlaintextPatch[];