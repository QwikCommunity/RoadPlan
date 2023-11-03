import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { ChevronIcon } from "../Icons/ChevronIcon";

const paths = import.meta.glob("/src/routes/docs/**/*");

let versions = Object.keys(paths)
  .filter((path) => path.indexOf("/src/routes/docs/") === 0)
  .map((path) => {
    path = path.replace("/src/routes/docs/", "");
    const folders = path.split("/");
    return folders[0];
  })
  .filter((path) => path.indexOf(".mdx") === -1)
  .sort((a, b) => (b === "latest" ? 1 : a > b ? -1 : 1));

versions = [...new Set(versions)];

export const VersionSelector = component$(() => {
  const location = useLocation();
  const versionSig = useComputed$(
    () => location.url.pathname.replace("/docs/", "").split("/")[0],
  );
  const navigate = useNavigate();
  const showSig = useSignal(false);
  return (
    <div class="relative inline-block text-left text-black dark:text-white">
      <button
        type="button"
        class="flex- inline-flex justify-end rounded-md bg-white px-3 py-2 text-sm dark:bg-slate-900"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick$={() => {
          showSig.value = !showSig.value;
        }}
      >
        {versionSig.value || versions[0]}
        <ChevronIcon />
      </button>
      {showSig.value && (
        <div
          class="absolute right-0 z-10 mt-2 max-h-[400px] w-44 overflow-scroll rounded-md border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div class="max-h-[400px] py-1">
            {versions.map((version, key) => (
              <button
                key={key}
                class={{
                  "block w-full px-4 py-2 text-sm": true,
                  "bg-gray-300 dark:bg-slate-600":
                    location.params.version === version,
                }}
                role="menuitem"
                tabIndex={-1}
                onClick$={() => {
                  showSig.value = !showSig.value;
                  if (version.indexOf("latest") > 0) {
                    navigate(`/docs/latest/`);
                  } else {
                    navigate(`/docs/${version}/`);
                  }
                }}
              >
                {version}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
