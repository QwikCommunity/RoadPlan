import { component$, useContext } from "@builder.io/qwik";
import { StoreContext } from "../../docs-layout/classic-layout";
import { ThemeDarkIcon } from "../../Icons/ThemeDarkIcon";
import { ThemeLightIcon } from "../../Icons/ThemeLightIcon";

export const ThemeSelector = component$(() => {
  const store = useContext(StoreContext);
  return (
    <div
      class="xsm:block hidden cursor-pointer px-4"
      onClick$={() => {
        store.theme = store.theme === "light" ? "dark" : "light";
        const newTheme = store.theme === "light" ? "light" : "dark";
        document.documentElement.className = newTheme;
        localStorage.setItem("theme", store.theme);
      }}
    >
      <div class="light-element">
        <ThemeLightIcon />
      </div>
      <div class="dark-element">
        <ThemeDarkIcon />
      </div>
    </div>
  );
});
