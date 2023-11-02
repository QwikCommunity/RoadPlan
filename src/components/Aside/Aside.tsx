import { component$ } from "@builder.io/qwik";

export const Aside = component$(() => {
  return (
    <div class="mt-8 flex">
      <div class="m-auto flex h-48 items-center justify-center text-xl text-slate-900 dark:text-white">
        Aside
      </div>
    </div>
  );
});
