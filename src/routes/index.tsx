import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import LogoBlack from "../../public/logo-black.png?jsx";
import LogoWhite from "../../public/logo-white.png?jsx";

export default component$(() => {
  return (
    <div class="mt-8 flex flex-col gap-8 text-gray-950 dark:text-white">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-qwikui-purple-400 dark:text-qwikui-purple-500 flex items-center justify-center font-[900] tracking-wide">
          <div class="light-element h-[200px] w-[200px]">
            <LogoBlack alt="logo-black" loading="eager" />
          </div>
          <div class="dark-element h-[200px] w-[200px]">
            <LogoWhite alt="logo-white" loading="eager" />
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
