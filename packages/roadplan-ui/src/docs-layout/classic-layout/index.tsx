import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Aside as DefaultAside } from "../../docs-components/Aside/Aside";
import { Footer as DefaultFooter } from "../../docs-components/Footer/Footer";
import { Header as DefaultHeader } from "../../docs-components/Header/Header";
import { Toc as DefaultToc } from "../../docs-components/Toc/Toc";
import { MDXProvider } from "../../state/MDXProvider";
import { components } from "../../user-components/MdxComponents/MdxComponents";
import { config } from "../docs-config";

type Store = {
  theme: "light" | "dark";
};

export const StoreContext = createContextId<Store>("Store");

type layoutProps = {
  config?: config;
};

export default component$<layoutProps>(({ config }) => {
  const store = useStore<Store>({ theme: "light" });
  useContextProvider(StoreContext, store);

  const { Aside, Header, Footer, Toc } = config?.components ?? {};
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const theme = localStorage.getItem("theme") as Store["theme"];
    store.theme = theme;
  });
  return (
    <MDXProvider components={components}>
      <div class="h-screen bg-white dark:bg-slate-900">
        {Header != null ? <Header /> : <DefaultHeader />}
        <main class="lg:grid-cols-content flex min-h-[100%] bg-white lg:grid dark:bg-slate-900">
          <aside
            class={`hidden border-r-[2px] border-slate-200 lg:block dark:border-slate-800`}
          >
            {Aside != null ? <Aside /> : <DefaultAside />}
          </aside>
          <article class="docs w-full pb-10 pt-28">
            <Slot />
          </article>
          <div
            class={`hidden border-l-[2px] border-slate-200 lg:block dark:border-slate-800`}
          >
            {Toc != null ? <Toc /> : <DefaultToc />}
          </div>
        </main>
        {Footer != null ? <Footer /> : <DefaultFooter />}
      </div>
    </MDXProvider>
  );
});
