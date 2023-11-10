import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>RoadPlan Starter</title>
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="title" content="" />
      <meta
        name="description"
        content="Amazing and performant starter for documentation websites powered by Qwik"
      />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
      <script
        dangerouslySetInnerHTML={`
          (function() {
            function setTheme(theme) {
              document.documentElement.className = theme;
              localStorage.setItem('theme', theme);
            }
            var theme = localStorage.getItem('theme');
            theme = theme === 'light' ? 'light' : 'dark';
            if (theme) {
              setTheme(theme);
            } else {
              setTheme('light');
            }
          })();
        `}
      />
    </>
  );
});
