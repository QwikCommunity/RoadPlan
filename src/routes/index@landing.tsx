import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="mt-8 flex flex-col gap-8 text-gray-950 dark:text-white">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-qwikui-purple-400 dark:text-qwikui-purple-500 flex items-center justify-center font-[900] tracking-wide">
          <div class="light-element">
            <img src="./logo-black.png" width={200} height={200} />
          </div>
          <div class="dark-element">
            <img src="./logo-white.png" width={200} height={200} />
          </div>
        </span>
        <span class="text-qwikui-blue-500 dark:text-qwikui-blue-500  font-[900] tracking-wide">
          RoadPlan
        </span>
      </h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Landing...",
};
