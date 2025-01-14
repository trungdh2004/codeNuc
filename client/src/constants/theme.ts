import { Theme } from "@/types";
import { Monaco } from "@monaco-editor/react";

export const THEMES: Theme[] = [
	{ id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
	{ id: "vs-light", label: "VS Light", color: "#ffffff" },
	{ id: "github-dark", label: "GitHub Dark", color: "#0d1117" },
	{ id: "monokai", label: "Monokai", color: "#272822" },
];

export const THEME_DEFINITONS = {
	"github-dark": {
		base: "vs-dark",
		inherit: true,
		rules: [
			{ token: "comment", foreground: "6e7681" },
			{ token: "string", foreground: "a5d6ff" },
			{ token: "keyword", foreground: "ff7b72" },
			{ token: "number", foreground: "79c0ff" },
			{ token: "type", foreground: "ffa657" },
			{ token: "class", foreground: "ffa657" },
			{ token: "function", foreground: "d2a8ff" },
			{ token: "variable", foreground: "ffa657" },
			{ token: "operator", foreground: "ff7b72" },
		],
		colors: {
			"editor.background": "#0d1117",
			"editor.foreground": "#c9d1d9",
			"editor.lineHighlightBackground": "#161b22",
			"editorLineNumber.foreground": "#6e7681",
			"editorIndentGuide.background": "#21262d",
			"editor.selectionBackground": "#264f78",
			"editor.inactiveSelectionBackground": "#264f7855",
		},
	},
	monokai: {
		base: "vs-dark",
		inherit: true,
		rules: [
			{ token: "comment", foreground: "75715E" },
			{ token: "string", foreground: "E6DB74" },
			{ token: "keyword", foreground: "F92672" },
			{ token: "number", foreground: "AE81FF" },
			{ token: "type", foreground: "66D9EF" },
			{ token: "class", foreground: "A6E22E" },
			{ token: "function", foreground: "A6E22E" },
			{ token: "variable", foreground: "F8F8F2" },
			{ token: "operator", foreground: "F92672" },
		],
		colors: {
			"editor.background": "#272822",
			"editor.foreground": "#F8F8F2",
			"editorLineNumber.foreground": "#75715E",
			"editor.selectionBackground": "#49483E",
			"editor.lineHighlightBackground": "#3E3D32",
			"editorCursor.foreground": "#F8F8F2",
			"editor.selectionHighlightBackground": "#49483E",
		},
	},
};

export type BuiltinTheme = "vs" | "vs-dark" | "hc-black" | "hc-light";

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
	Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
		monaco.editor.defineTheme(themeName, {
			base: themeData.base as BuiltinTheme,
			inherit: themeData.inherit,
			rules: themeData.rules.map((rule) => ({
				...rule,
				foreground: rule.foreground,
			})),
			colors: themeData.colors,
		});
	});
};
