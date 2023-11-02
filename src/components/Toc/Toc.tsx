import { component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

export const Toc = component$(() => {
  const { headings } = useContent();
  return (
    <div class="flex flex-col px-6 pt-6 text-xl text-black dark:text-white">
      <span class="pb-4 pl-4">On this page</span>
      {(headings || []).map(({ text, id }, idx) => (
        <ul
          key={idx}
          class="border-l-[4px] py-1 pl-4 hover:border-gray-300 hover:dark:border-gray-500"
        >
          <li class="text-sm hover:text-gray-500">
            <a href={`#${id}`}>{text}</a>
          </li>
        </ul>
      ))}
    </div>
  );
});
