import { component$ } from "@builder.io/qwik";
import { ThemeSelector } from "~/ThemeSelector/ThemeSelector";
import { config } from "../../../road-plan.config";
import { GitHubIcon } from "../Icons/GitHubIcon";
import { MenuIcon } from "../Icons/MenuIcon";
import { QwikIcon } from "../Icons/QwikIcon";

export const Header = component$(() => {
  return (
    <header
      class={{
        "sticky top-0 z-10 h-[60px] border-b-[1px] border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900":
          true,
        "h-[66px] pt-2": config.loadingBar.enabled,
      }}
    >
      <div class="grid h-full grid-cols-12 px-6">
        <div class="col-span-4 flex items-center ">
          <button class="block lg:hidden">
            <MenuIcon />
          </button>
          <a href="/" class="hidden lg:block" aria-label="RoadPlan">
            <QwikIcon />
          </a>
        </div>
        <div class="col-span-4 flex items-center justify-center">
          <div class="block lg:hidden">
            <QwikIcon />
          </div>
        </div>
        <div class="col-span-4 flex items-center justify-end pr-4">
          <ThemeSelector />
          <a
            href="https://github.com/QwikDev/RoadPlan"
            rel="noopener noreferrer"
            target="_blank"
            title="QwikDev/RoadPlan"
            aria-label="QwikDev/RoadPlan"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
});
