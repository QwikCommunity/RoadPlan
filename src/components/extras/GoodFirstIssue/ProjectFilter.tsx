import type { PropFunction } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";

export type Props = {
  name: string;
  count: number;
  selected: boolean;
  toggle$: PropFunction<(checked: boolean) => void>;
};

export const ProjectFilter = component$<Props>(
  ({ name, count, selected, toggle$ }) => {
    const onChange$ = $(() => {
      toggle$(!selected);
    });

    return (
      <div key={name} onClick$={onChange$}>
        <input type="checkbox" checked={selected} onChange$={onChange$} />
        <div>
          <div>{name}</div>
          <small>{count} issues</small>
        </div>
      </div>
    );
  },
);
