import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { CopyButton } from "../copy-button";
import { Example } from "../example";
import { Benchmark } from "../extras/Benchmark/Benchmark";
import { GoodFirstIssue } from "../extras/GoodFirstIssue/GoodFirstIssue";
import { HeroBanner } from "../extras/HeroBanner/HeroBanner";
import { Organisations } from "../extras/Organisations/Organisations";

export const components: Record<string, any> = {
  pre: component$<
    QwikIntrinsicElements["div"] & {
      __rawString__?: string;
    }
  >(({ __rawString__ }) => {
    return (
      <div class="relative">
        <pre class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 p-6 text-white dark:bg-zinc-900">
          <CopyButton
            class="absolute right-4 top-4 rounded p-1 text-white hover:bg-zinc-900"
            value={__rawString__ || ""}
          />
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
  Example,
  HeroBanner,
  Benchmark,
  GoodFirstIssue,
  Organisations,
};
