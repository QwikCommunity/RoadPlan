import { component$, useSignal } from "@builder.io/qwik";
import { ThemeSelector } from "~/components/ThemeSelector/ThemeSelector";
import LogoBlack from "../../../public/logo-black.png?jsx";
import LogoWhite from "../../../public/logo-white.png?jsx";
import { config } from "../../../road-plan.config";
import { Aside } from "../Aside/Aside";
import { CloseIcon } from "../Icons/CloseIcon";
import { GitHubIcon } from "../Icons/GitHubIcon";
import { MenuIcon } from "../Icons/MenuIcon";

export const Header = component$(() => {
  const showAsideSig = useSignal(false);
  const spacialClasses = config.loadingBar.enabled
    ? "h-[66px] pt-2"
    : "h-[60px]";
  return (
    <header
      class={`sticky top-0 z-10 ${spacialClasses} border-b-[2px] border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`}
    >
      <div class="grid h-full grid-cols-12 px-6">
        <div class="col-span-4 flex items-center ">
          <button
            class="block lg:hidden"
            onClick$={() => (showAsideSig.value = true)}
          >
            <MenuIcon />
          </button>
          <a href="/" class="hidden items-center lg:flex" aria-label="RoadPlan">
            <div class="light-element h-[42px] w-[42px]">
              <LogoBlack />
            </div>
            <div class="dark-element h-[42px] w-[42px]">
              <LogoWhite />
            </div>
            <span class="pl-4 text-xl font-bold text-slate-900 dark:text-white">
              RoadPlan
            </span>
          </a>
        </div>
        <div class="col-span-4 flex items-center justify-center">
          <div class="block lg:hidden">
            <div class="light-element h-[42px] w-[42px]">
              <LogoBlack />
            </div>
            <div class="dark-element h-[42px] w-[42px]">
              <LogoWhite />
            </div>
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
      {showAsideSig.value && (
        <div class="fixed inset-0 z-20 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 bg-gray-500 bg-opacity-75 opacity-100 transition-opacity"></div>
            <div class="fixed inset-y-0 left-0 flex h-full w-screen max-w-md translate-x-0 flex-col overflow-y-scroll bg-white dark:bg-slate-900">
              <div
                class={`${spacialClasses} border-b-[2px] border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`}
              >
                <div class="pl-5" onClick$={() => (showAsideSig.value = false)}>
                  <CloseIcon />
                </div>
              </div>
              <Aside />
            </div>
          </div>
        </div>
      )}
    </header>
  );
});
