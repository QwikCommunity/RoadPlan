import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { ForkIcon } from "~/components/Icons/ForkIcon";
import { StarIcon } from "~/components/Icons/StarIcon";
import { config } from "../../../../roadplan.config";

export const HomepageHeader = component$(() => {
  const gitHubStats = useSignal<{ stargazers_count: number }>();
  useVisibleTask$(async () => {
    const response = await fetch(config.GitHub);
    gitHubStats.value = await response.json();
  });

  return (
    <div class="pb-14 pt-4">
      <div class="light-element">
        <img
          alt={config.title}
          src={`/images/logos/fastify-black.webp`}
          width={320}
          height={100}
        />
      </div>
      <div class="dark-element">
        <img
          alt={config.title}
          src={`/images/logos/fastify-white.webp`}
          width={320}
          height={100}
        />
      </div>

      <div class="py-4 text-3xl font-bold text-black dark:text-white">
        {config.tagline}
      </div>

      <div class="flex">
        <div class="mr-4 flex items-center">
          <a
            target="_blank"
            href="https://github.com/fastify/fastify/"
            class="flex w-[100px] items-center justify-center rounded-l-md border-b border-l border-t bg-white px-4 py-2 text-base font-medium text-black !no-underline hover:bg-gray-100"
            rel="noopener noreferrer"
          >
            <StarIcon />
            Star
          </a>
          <a
            target="_blank"
            href="https://github.com/fastify/fastify/stargazers"
            class="flex w-[100px] items-center justify-center rounded-r-md border bg-white px-4 py-2 text-base font-medium text-black !no-underline hover:bg-gray-100"
            rel="noopener noreferrer"
          >
            {gitHubStats.value?.stargazers_count || "--"}
          </a>
        </div>
        <div class="flex items-center">
          <a
            target="_blank"
            href="https://github.com/fastify/fastify/fork"
            class="flex w-[100px] items-center justify-center rounded-md border bg-white px-4 py-2 text-base font-medium text-black !no-underline hover:bg-gray-100"
            rel="noopener noreferrer"
          >
            <ForkIcon />
            Fork
          </a>
        </div>
      </div>
    </div>
  );
});
