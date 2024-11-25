import type { PlaintextPatch } from "replugged/types";

// By yofukashino_

export default [
	{
		find: "mp3|m4a|ogg|opus|wav|flac",
		replacements: [
			/*   {
        match: /\(0,\w+?\.\w+?\)\(\w+?\)\?"IMAGE":\(0,\w+?\.\w+?\)\(\w+?\)\?"VIDEO":"INVALID"/, // 499376
        replace: '"INVALID"',
      }, */
			{
				match: /"IMAGE"===\w+\|\|"VIDEO"===\w+?\|\|"VISUAL_PLACEHOLDER"===\w+?;/, // 499376
				replace: "false;",
			},
		],
	},
	{
		find: ".gifFavoriteButton,",
		replacements: [
			{
				match: /mediaLayoutType:(\w+\.\w+\.MOSAIC)/, // 884182
				replace:
					'mediaLayoutType:replugged.plugins.getExports("dev.oirnoir.RemoveDiscordMosaic")?.cfg?.get?.("static", false) ? "STATIC" : "RESPONSIVE"',
			},
			/* {
        match: /[\w_+]===\w+\.\w+\.MOSAIC/, // 23750
        replace: "true",
      }, */
		],
	},
	{
		find: "MediaMosaicItem",
		replacements: [
			{
				match: /[\w_+]===\w+\.\w+\.MOSAIC/, // 546432
				replace: "true",
			},
			{
				match: /\["VIDEO","CLIP","AUDIO"\]\.includes/, // 546432
				replace: '["VIDEO","CLIP","AUDIO","IMAGE"].includes',
			},
		],
	},
	{
		find: "Media Mosaic",
		replacements: [
			{
				match: /\w+\.length>1/, // 12067, 938353
				replace: '(replugged.plugins.getExports("dev.oirnoir.RemoveDiscordMosaic")?.cfg?.get?.("nav", false) ? $& : false)',
			},
		],
	},
] as PlaintextPatch[];
