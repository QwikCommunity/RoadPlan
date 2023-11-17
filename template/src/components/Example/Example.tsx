import type { Component, QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik/build";
import { getHighlighter } from "shiki";
import { CopyButton } from "../CopyButton/CopyButton";

const components: any = import.meta.glob("/src/examples/*", {
  import: "default",
  eager: isDev ? false : true,
});

const componentsRaw: any = import.meta.glob("/src/examples/*", {
  as: "raw",
  eager: isDev ? false : true,
});

type ExampleProps = QwikIntrinsicElements["div"] & {
  name: string;
};

export const Example = component$<ExampleProps>(({ name }) => {
  //   const location = useLocation();
  let lang = "tsx";

  if (name.endsWith("tsx")) lang = "";
  if (name.endsWith("ts")) lang = "";
  if (name.endsWith("css")) lang = "";

  const snippetPath = `/src/examples/${name}.${lang}`;

  const highlighterSignal = useSignal<string>();
  const Component = useSignal<Component<any>>();
  const componentRaw = useSignal<string>();

  useTask$(async () => {
    const highlighter = await getHighlighter({ theme: "css-variables" });

    if (isDev) {
      componentRaw.value = await componentsRaw[snippetPath]();
      Component.value = await components[snippetPath]();
    } else {
      componentRaw.value = componentsRaw[snippetPath];
      Component.value = components[snippetPath];
    }

    highlighterSignal.value = highlighter.codeToHtml(componentRaw.value || "", {
      lang,
    });
  });
  return (
    <>
      <div class="relative mb-4 mt-6 max-h-[650px] w-full overflow-x-auto rounded-lg border bg-zinc-950 p-6 text-white dark:bg-zinc-900">
        <CopyButton
          class="absolute right-4 top-4 rounded p-1 text-white hover:bg-zinc-900"
          value={componentRaw.value || ""}
        />
        <div dangerouslySetInnerHTML={highlighterSignal.value} />
      </div>
      <div class="flex h-48 flex-col items-center justify-center border">
        {Component.value && <Component.value />}
      </div>
    </>
  );
});
