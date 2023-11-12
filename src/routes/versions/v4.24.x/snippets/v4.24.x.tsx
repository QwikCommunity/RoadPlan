import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const version = useSignal("v4.24.x");
  return (
    <div>
      <h1>{version.value}</h1>
    </div>
  );
});
