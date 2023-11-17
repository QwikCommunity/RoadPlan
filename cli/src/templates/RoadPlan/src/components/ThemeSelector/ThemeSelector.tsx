import { component$, useContext } from "@builder.io/qwik";
import { ThemeDarkIcon } from "~/components/Icons/ThemeDarkIcon";
import { ThemeLightIcon } from "~/components/Icons/ThemeLightIcon";
import { StoreContext } from "~/routes/layout";

export const ThemeSelector = component$(() => {
  const store = useContext(StoreContext);
  return (
    <div
      class="xsm:block hidden px-4"
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
