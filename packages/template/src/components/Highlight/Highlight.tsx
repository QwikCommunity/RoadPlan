import type { ClassList, PropsOf } from "@builder.io/qwik";
import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { getHighlighterCore } from "shiki";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import tsx from "shiki/langs/tsx.mjs";
import poimandres from "shiki/themes/poimandres.mjs";
import { CopyButton } from "../CopyButton/CopyButton";

export type HighlightProps = PropsOf<"div"> & {
  code: string;
  copyCodeClass?: ClassList;
  language?: "tsx" | "html" | "css";
  splitCommentStart?: string;
  splitCommentEnd?: string;
};

export const Highlight = component$(
  ({
    code,
    copyCodeClass,
    language = "tsx",
    splitCommentStart = "{/* start */}",
    splitCommentEnd = "{/* end */}",
    ...props
  }: HighlightProps) => {
    const codeSig = useSignal("");

    const addShiki$ = $(async () => {
      let modifiedCode: string = code;

      let partsOfCode = modifiedCode.split(splitCommentStart);
      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[1];
      }

      partsOfCode = modifiedCode.split(splitCommentEnd);
      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[0];
      }

      const highlighter = await getHighlighterCore({
        themes: [poimandres],
        langs: [html, css, tsx],
        loadWasm: import("shiki/wasm"),
      });

      const str = highlighter.codeToHtml(modifiedCode, {
        lang: language,
        themes: {
          light: "poimandres",
          dark: "poimandres",
        },
      });
      codeSig.value = str.toString();
    });

    useTask$(async ({ track }) => {
      track(() => code);
      await addShiki$();
    });

    return (
      <div class="code-example rounded-base relative max-h-[31.25rem]">
        <CopyButton
          class={[
            "absolute right-3 top-3 text-white hover:bg-slate-800 hover:text-white",
            copyCodeClass,
          ]}
          code={code}
        />
        <div
          {...props}
          class={[
            "tab-size dark:from-background dark:to-accent/30 max-h-[31.25rem] max-w-full overflow-auto rounded-sm bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm",
            props.class,
          ]}
        >
          <div dangerouslySetInnerHTML={codeSig.value} />
        </div>
      </div>
    );
  },
);
