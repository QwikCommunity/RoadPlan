import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { ThemeDarkIcon } from "~/components/Icons/ThemeDarkIcon";
import { ThemeLightIcon } from "~/components/Icons/ThemeLightIcon";
import { ThemeSystemIcon } from "~/components/Icons/ThemeSystemIcon";
import { StoreContext } from "~/routes/layout";

export const ThemeSelector = component$(() => {
  const store = useContext(StoreContext);
  const showSig = useSignal(false);
  useVisibleTask$(() => {
    setTimeout(() => {
      showSig.value = true;
    }, 100);
  });
  return showSig.value ? (
    <div
      class="px-4"
      onClick$={() => {
        store.theme =
          store.theme === "light"
            ? "dark"
            : store.theme === "dark"
            ? "system"
            : "light";
        const newTheme = store.theme === "light" ? "light" : "dark";
        document.documentElement.className = newTheme;
        localStorage.setItem("theme", store.theme);
      }}
    >
      {store.theme === "light" ? (
        <ThemeLightIcon />
      ) : store.theme === "dark" ? (
        <ThemeDarkIcon />
      ) : (
        <ThemeSystemIcon />
      )}
    </div>
  ) : null;
});
