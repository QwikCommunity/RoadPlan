import { component$ } from "@builder.io/qwik";

export const HeroBanner = component$<{ title: string }>(({ title }) => {
  return (
    <header class="hero-banner">
      <h1 class="hero-title">{title}</h1>
    </header>
  );
});
