import { component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

export const Aside = component$(() => {
  const { menu } = useContent();

  return (
    <div class="flex flex-col px-6 pt-6 text-xl text-black dark:text-white">
      {(menu?.items || []).map(({ text, items }, idx) => (
        <ul key={idx} class="mb-6">
          <li class="text-lg font-bold text-black dark:text-white">
            <div class="pb-2">{text}</div>
            {(items || []).map(({ text, href }, idx) => (
              <ul key={idx}>
                <li class="border-l-[2px] py-1 text-black dark:text-white">
                  <a href={href}>
                    <span class="pl-2 text-sm">
                      <span>{text}</span>
                    </span>
                  </a>
                </li>
              </ul>
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
});
