import { component$ } from "@builder.io/qwik";

export const ThemeSystemIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      class="h-8 w-8 rounded-xl p-1 hover:bg-slate-600"
      viewBox="0 0 24 24"
    >
      <path
        class="fill-black dark:fill-white"
        d="M19 3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6v2H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2h-4v-2h6a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
      ></path>
    </svg>
  );
});
