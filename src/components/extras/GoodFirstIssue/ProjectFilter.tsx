import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";

export type Props = {
  name: string;
  count: number;
  toggle$: PropFunction<(checked: boolean) => void>;
};

export const ProjectFilter = component$<Props>(({ name, count, toggle$ }) => {
  const selectedSig = useSignal(true);
  const onChange$ = $(() => {
    selectedSig.value = !selectedSig.value;
    toggle$(selectedSig.value);
  });

  return (
    <div class="flex items-center py-2">
      <input
        type="checkbox"
        checked={selectedSig.value}
        onChange$={onChange$}
        class="h-6 w-6 accent-green-500"
      />
      <div class="ml-4 flex flex-col">
        <span class="text-base font-bold">{name}</span>
        <span class="text-xs">{count} issues</span>
      </div>
    </div>
  );
});
