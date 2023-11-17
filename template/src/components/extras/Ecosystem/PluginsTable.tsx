import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type Props = {
  plugins: { name: string; description: string; url: string }[];
};

export const PluginsTable = component$<Props>((props) => {
  const nameFilterSig = useSignal<string>();
  const descriptionFilterSig = useSignal<string>();

  const filtered = props.plugins.filter((plugin) => {
    const nameCondition =
      nameFilterSig.value == undefined ||
      plugin.name.includes(nameFilterSig.value);
    const descriptionCondition =
      descriptionFilterSig.value == undefined ||
      plugin.description.includes(descriptionFilterSig.value);

    return nameCondition && descriptionCondition;
  });

  const emptyRow = [];
  if (filtered.length == 0) {
    emptyRow.push({
      name: "No match",
      description: "No match",
    });
  }

  return (
    <div class="grid-container">
      <div class="grid-item-header">
        <b>Name</b>
        <br />
        <input type="text" bind:value={nameFilterSig} />
      </div>
      <div class="grid-item-header">
        <b>Description</b>
        <br />
        <input type="text" bind:value={descriptionFilterSig} size={40} />
      </div>
      {filtered.map((plugin, index) => [
        <div
          key={`plugin-name-${index}`}
          class={`grid-item grid-item-${index % 2}`}
        >
          <Link href={plugin.url}>{plugin.name}</Link>
        </div>,
        <div
          key={`plugin-description-${index}`}
          class={`grid-item grid-item-${index % 2}`}
        >
          {/* <ReactMarkdown skipHtml={true}>{plugin.description}</ReactMarkdown> */}
        </div>,
      ])}
      {emptyRow.map((row) => [
        <div key="no-result-name" class="grid-item grid-item-0">
          {row.name}
        </div>,
        <div key="no-result-description" class="grid-item grid-item-0">
          {row.description}
        </div>,
      ])}
    </div>
  );
});
