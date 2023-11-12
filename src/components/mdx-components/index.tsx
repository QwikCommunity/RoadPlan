import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { Example } from "../example";

export const components: Record<string, any> = {
  pre: component$<
    QwikIntrinsicElements["div"] & {
      __rawString__?: string;
    }
  >((props) => {
    props.class;
    return (
      <div>
        {/* <CodeCopy
          class={[
            "copy-btn-bg-dark absolute right-4 top-4 bg-slate-200 text-white hover:bg-slate-600 hover:text-white",
          ]}
          code={__rawString__}
        /> */}
        <pre class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 p-6 text-white dark:bg-zinc-900">
          <Slot />
        </pre>
      </div>
    );
  }),
  code: component$<QwikIntrinsicElements["code"]>(({ ...props }) => {
    return (
      <code {...props}>
        <Slot />
      </code>
    );
  }),
  Example: Example,
};
