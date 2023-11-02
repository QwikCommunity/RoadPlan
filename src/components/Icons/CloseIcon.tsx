import { component$ } from "@builder.io/qwik";

export const CloseIcon = component$(() => {
  return (
    <svg
      class="mt-2 h-10 w-10 rounded-xl stroke-black p-1 dark:stroke-white"
      fill="none"
      stroke-width="2.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
});