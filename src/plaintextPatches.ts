import type { PlaintextPatch } from "replugged/dist/types";

// By loneweeb.tsx

export default [
	{
		find: ".MEDIA_MOSAIC_MAX_HEIGHT",
		replacements: [
			{
				match: /mediaLayoutType:\w+\.\w+\.MOSAIC/, //377502
				replace:
					'mediaLayoutType:replugged.plugins.getExports("dev.oirnoir.RemoveDiscordMosaic")?.cfg?.get?.("static", false) ? "STATIC" : "RESPONSIVE"',
			},
			{
				match: /null!==\(\w+=\w+\.get\(\w+\)\)&&void 0!==\w+\?\w+:"INVALID"/, //377502
				replace: '"INVALID"',
			},
		],
	},
	{
		find: ".downloadHoverButtonIcon",
		replacements: [
			{
				match: /[\w_+]===\w+\.\w+\.MOSAIC/, // X - 933629 594098  O - 994402
				replace: "true",
			},
		],
	},
	{
		find: "Media Mosaic",
		replacements: [
			{
				match: /\w+\.length>1/, //723931
				replace: "false",
			},
		],
	},
] as PlaintextPatch[];
