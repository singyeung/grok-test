import "tailwindcss";
import { getTailwindConfig } from "metronic";
import IconifyIcon from "iconify-icon";
import mdi from "@iconify/json/mdi.json" with { type: "json" };
import lineMd from "@iconify/json/line-md.json" with { type: "json" };

import ThemeStore, { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from "/src/store/theme";
import { loadStyle } from "/src/utils/loader";

async function initTheme() {
    const [config] = await Promise.all([getTailwindConfig(), loadStyle("/src/themes/index.css")]);
    window.tailwind = config;

    const defaultThemeMode = THEME_LIGHT;
    let themeMode;
    if (document.documentElement) {
        const currentTheme = ThemeStore.get();
        if (currentTheme) {
            themeMode = currentTheme;
        } else if (document.documentElement.hasAttribute("data-theme-mode")) {
            themeMode = document.documentElement.getAttribute("data-theme-mode");
        } else {
            themeMode = defaultThemeMode;
        }
        if (themeMode === THEME_SYSTEM) {
            themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? THEME_DARK
                : THEME_LIGHT;
        }
        document.documentElement.classList.add(themeMode);
    }
}

async function initIcons() {
    IconifyIcon.addCollection(mdi);
    IconifyIcon.addCollection(lineMd);
}

export default async (system) => {
    await Promise.all([initTheme(), initIcons()]);
    await loadStyle(`/src/themes/${system}.css`);
};
