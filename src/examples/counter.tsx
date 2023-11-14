// This code is the actual code that is running in the counter below 👇

import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const counter = useSignal(0);
  return (
    <div class="flex flex-col items-center">
      <h1 class="mb-4 text-4xl font-bold ">{counter.value}</h1>
      <button
        onClick$={() => counter.value++}
        class="rounded border-2 px-6 py-2 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        Increment
      </button>
    </div>
  );
});
