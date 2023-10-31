import { component$, useContext } from "@builder.io/qwik";
import { ThemeDarkIcon } from "~/components/Icons/ThemeDarkIcon";
import { ThemeLightIcon } from "~/components/Icons/ThemeLightIcon";
import { StoreContext } from "~/routes/layout";

export const ThemeSelector = component$(() => {
  const store = useContext(StoreContext);
  return (
    <div
      class="px-4"
      onClick$={() => {
        store.theme = store.theme === "light" ? "dark" : "light";
        const newTheme = store.theme === "light" ? "light" : "dark";
        document.documentElement.className = newTheme;
        localStorage.setItem("theme", store.theme);
      }}
    >
      <div class="light-icon">
        <ThemeLightIcon />
      </div>
      <div class="dark-icon">
        <ThemeDarkIcon />
      </div>
    </div>
  );
});