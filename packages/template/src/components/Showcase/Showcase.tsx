import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useComputed$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik/build";
import { CopyButton } from "../CopyButton/CopyButton";

const components: any = import.meta.glob(`/src/components/Showcases/*`, {
  import: "default",
  eager: isDev ? false : true,
});

const componentsRaw: any = import.meta.glob(`/src/components/Showcases/*`, {
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

  const snippetPath = `/src/components/Showcases/${name}.${lang}`;

  const Component = useComputed$<any>(async () =>
    isDev ? await components[snippetPath]() : components[snippetPath],
  );
  const componentRaw = useComputed$<any>(async () =>
    isDev ? await componentsRaw[snippetPath]() : componentsRaw[snippetPath],
  );

  return (
    <>
      <div class="relative mb-4 mt-6 max-h-[650px] w-full overflow-x-auto rounded-lg border bg-zinc-950 p-6 text-white dark:bg-zinc-900">
        <CopyButton
          class="absolute right-4 top-4 rounded p-1 text-white hover:bg-zinc-900"
          value={componentRaw.value || ""}
        />
        <div dangerouslySetInnerHTML={componentRaw.value} />
      </div>
      <div class="flex h-48 flex-col items-center justify-center border">
        {Component.value && <Component.value />}
      </div>
    </>
  );
});
