import type { PlaintextPatch } from "replugged/dist/types";

// By yofukashino_

export default [
	{
		find: ".MEDIA_MOSAIC_MAX_HEIGHT",
		replacements: [
			{
				match: /mediaLayoutType:\w+\.\w+\.MOSAIC/, // 310043
				replace:
					'mediaLayoutType:replugged.plugins.getExports("dev.oirnoir.RemoveDiscordMosaic")?.cfg?.get?.("static", false) ? "STATIC" : "RESPONSIVE"',
			},
			{
				match: /\(0,\w+?\.isImageContentType\)\(\w+?\)\?"IMAGE":\(0,\w+?\.isVideoContentType\)\(\w+?\)\?"VIDEO":"INVALID"/, // 60750
				replace: '"INVALID"',
			},
			{
				match: /"IMAGE"===\w+\|\|"VIDEO"===\w+?;/, // 60750
				replace: "false;",
			},
			{
				match: /[\w_+]===\w+\.\w+\.MOSAIC/, // 69750
				replace: "true",
			},
		],
	},
	{
		find: "Media Mosaic",
		replacements: [
			{
				match: /\w+\.length>1/, // 12067, 938353
				replace: "false",
			},
		],
	},
] as PlaintextPatch[];
