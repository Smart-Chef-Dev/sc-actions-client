export const isDarkModeTheme =
  (localStorage.hasOwnProperty("theme") &&
    localStorage.getItem("theme") === "dark") ||
  window.matchMedia("(prefers-color-scheme: dark)").matches;
