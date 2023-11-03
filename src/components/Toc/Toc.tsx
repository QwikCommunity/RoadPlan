import { component$, useSignal } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

export const Toc = component$(() => {
  const { headings } = useContent();
  const lastScrollIdSig = useSignal("");
  return (
    <div class="fixed flex w-full flex-col px-6 pt-28 text-xl text-black dark:text-white">
      <span class="pb-4 pl-4">On this page</span>
      {(headings || []).map(({ text, id }, idx) => (
        <ul
          key={idx}
          class="border-l-[4px] py-1 pl-4 hover:border-gray-300 hover:dark:border-gray-500"
          onMouseOver$={() => {
            if (lastScrollIdSig.value !== id) {
              const el = document.querySelector(`#${id}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                lastScrollIdSig.value = id;
              }
            }
          }}
        >
          <li class="text-xs hover:text-gray-500">
            <a href={`#${id}`}>{text}</a>
          </li>
        </ul>
      ))}
    </div>
  );
});
