import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Aside } from "../../docs-components/Aside/Aside";
import { Footer } from "../../docs-components/Footer/Footer";
import { Header } from "../../docs-components/Header/Header";
import { Toc } from "../../docs-components/Toc/Toc";
import { MDXProvider } from "../../state/MDXProvider";
import { components } from "../../user-components/MdxComponents/MdxComponents";

type Store = {
  theme: "light" | "dark";
};

export const StoreContext = createContextId<Store>("Store");

export default component$(() => {
  const store = useStore<Store>({ theme: "light" });
  useContextProvider(StoreContext, store);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const theme = localStorage.getItem("theme") as Store["theme"];
    store.theme = theme;
  });
  return (
    <MDXProvider components={components}>
      <div class="h-screen bg-white dark:bg-slate-900">
        <Header />
        <main class="lg:grid-cols-content flex min-h-[100%] bg-white lg:grid dark:bg-slate-900">
          <aside
            class={`hidden border-r-[2px] border-slate-200 lg:block dark:border-slate-800`}
          >
            <Aside />
          </aside>
          <article class="docs w-full pb-10 pt-28">
            <Slot />
          </article>
          <div
            class={`hidden border-l-[2px] border-slate-200 lg:block dark:border-slate-800`}
          >
            <Toc />
          </div>
        </main>
        <Footer />
      </div>
    </MDXProvider>
  );
});
