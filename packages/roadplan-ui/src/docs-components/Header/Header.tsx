/* eslint-disable qwik/jsx-img */
import { component$, useSignal } from "@builder.io/qwik";

import { CloseIcon } from "../../Icons/CloseIcon";
import { GitHubIcon } from "../../Icons/GitHubIcon";
import { MenuIcon } from "../../Icons/MenuIcon";
import { Aside } from "../Aside/Aside";
import { ThemeSelector } from "../ThemeSelector/ThemeSelector";
import { VersionSelector } from "../VersionSelector/VersionSelector";

type Props = {
  links?: { name: string; href: string }[];
  showMenu?: boolean;
  siteTitle?: string;
  isVersionSelector?: boolean;
};
export const Header = component$<Props>(
  ({ links = [], showMenu = true, siteTitle, isVersionSelector = false }) => {
    const showAsideSig = useSignal(false);
    return (
      <header
        class={`fixed top-0 z-10 h-20 w-full border-b-[2px] border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`}
      >
        <div class="grid h-full grid-cols-12 px-6">
          <div class="col-span-3 flex items-center sm:col-span-4">
            {showMenu && (
              <button
                class="block lg:hidden"
                onClick$={() => (showAsideSig.value = true)}
              >
                <MenuIcon />
              </button>
            )}
            <a href="/" class="hidden items-center pt-2 lg:flex">
              <div class="light-element">
                <img
                  src="/logo-black.webp"
                  width={42}
                  height={42}
                  alt="logo-black"
                  loading="eager"
                />
              </div>
              <div class="dark-element">
                <img
                  src="/logo-white.webp"
                  width={42}
                  height={42}
                  alt="logo-white"
                  loading="eager"
                />
              </div>
              <span class="ml-2 text-lg font-bold dark:text-white">
                {siteTitle}
              </span>
            </a>
          </div>
          <div class="col-span-3 flex items-center justify-center pt-2 sm:col-span-4">
            <a href="/" class="block lg:hidden">
              <div class="light-element">
                <img
                  src="/logo-black.webp"
                  width={42}
                  height={42}
                  alt="logo-black"
                  loading="eager"
                />
              </div>
              <div class="dark-element">
                <img
                  src="/logo-white.webp"
                  width={42}
                  height={42}
                  alt="logo-white"
                  loading="eager"
                />
              </div>
            </a>
            <div class="hidden text-black lg:flex dark:text-white">
              {links.map(({ name, href }, key) => (
                <a key={key} class="m-4" href={href}>
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div class="col-span-6 flex items-center justify-end sm:col-span-4">
            {isVersionSelector && <VersionSelector />}
            <ThemeSelector />
            <a
              target="_blank"
              href="https://github.com/QwikDev/RoadPlan"
              title="QwikDev/RoadPlan"
              aria-label="QwikDev/RoadPlan"
              class="xsm:block hidden"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
        {showAsideSig.value && (
          <div class="fixed inset-0 z-10 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 bg-gray-500 bg-opacity-75 opacity-100 transition-opacity"></div>
              <div class="fixed inset-y-0 left-0 flex h-full w-screen max-w-xs translate-x-0 flex-col overflow-y-scroll bg-white dark:bg-slate-900">
                <div
                  class={`flex h-20 items-center border-b-[2px] border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`}
                >
                  <div
                    class="pl-5"
                    onClick$={() => (showAsideSig.value = false)}
                  >
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
  },
);
