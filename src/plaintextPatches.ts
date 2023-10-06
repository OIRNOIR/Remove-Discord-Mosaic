import { PlaintextPatch } from "replugged/dist/types";

// By loneweeb.tsx

export default [
	{
		find: "Media Mosaic",
		replacements: [
			{
				match: /mediaLayoutType:\w+\.\w+\.MOSAIC/,
				replace: 'mediaLayoutType:"RESPONSIVE"',
			},
			{
				match: /[\w_+]===\w+\.\w+\.MOSAIC/,
				replace: "true",
			},
			{
				match: /null!==\(\w+=\w+\.get\(\w+\)\)&&void 0!==\w+\?\w+:"INVALID"/,
				replace: '"INVALID"',
			},
			{
				match: /\w+\.length>1/,
				replace: "false",
			},
		],
	},
] as PlaintextPatch[];