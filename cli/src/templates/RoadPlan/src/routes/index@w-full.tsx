import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HomepageHeader } from "~/components/extras/HomePageHeader/HomePageHeader";
import { Organisations } from "~/components/extras/Organisations/Organisations";

export default component$(() => {
  return (
    <>
      <HomepageHeader />

      <section class="pb-10">
        <div>
          <h1>Why</h1>
          <p>
            An efficient server implies a lower cost of the infrastructure, a
            better responsiveness under load and happy users. How can you
            efficiently handle the resources of your server, knowing that you
            are serving the highest number of requests possible, without
            sacrificing security validations and handy development?
          </p>
          <p>
            Enter Fastify. Fastify is a web framework highly focused on
            providing the best developer experience with the least overhead and
            a powerful plugin architecture. It is inspired by Hapi and Express
            and as far as we know, it is one of the fastest web frameworks in
            town.
          </p>
        </div>
      </section>

      <section class="pb-10">
        <div>
          <h1>Who is using Fastify?</h1>
          <p class="pb-4">
            Fastify is proudly powering a large ecosystem of organisations and
            products out there.
          </p>
          <p class="pb-4">
            Discover{" "}
            <Link href="/organisations">more organisations using Fastify</Link>.
            Do you want your organisation to{" "}
            <Link href="/organisations#how-to-be-featured-here">
              be featured here
            </Link>
            ?
          </p>
          <Organisations maxItems={12} />
        </div>
      </section>

      <section class="pb-10">
        <div>
          <h1>Core features</h1>
          <p>
            These are the main features and principles on which Fastify has been
            built:
          </p>
          <ul>
            <li>
              <strong>Highly performant:</strong> as far as we know, Fastify is
              one of the fastest web frameworks in town, depending on the code
              complexity we can serve up to 30 thousand requests per second.
            </li>
            <li>
              <strong>Extensible:</strong> Fastify is fully extensible via its
              hooks, plugins and decorators.
            </li>
            <li>
              <strong>Schema based:</strong> even if it is not mandatory we
              recommend to use{" "}
              <a target="_blank" href="http://json-schema.org/">
                JSON Schema
              </a>{" "}
              to validate your routes and serialize your outputs, internally
              Fastify compiles the schema in a highly performant function.
            </li>
            <li>
              <strong>Logging:</strong> logs are extremely important but are
              costly; we chose the best logger to almost remove this cost,{" "}
              <a target="_blank" href="https://github.com/pinojs/pino">
                Pino
              </a>
              !
            </li>
            <li>
              <strong>Developer friendly:</strong> the framework is built to be
              very expressive and to help developers in their daily use, without
              sacrificing performance and security.
            </li>
            <li>
              <strong>TypeScript ready:</strong> we work hard to maintain a{" "}
              <a target="_blank" href="https://www.typescriptlang.org/">
                TypeScript
              </a>{" "}
              type declaration file so we can support the growing TypeScript
              community.
            </li>
          </ul>
        </div>
      </section>

      {/* <section class="pb-10">
          <QuickStart />
      </section> */}

      <section class="pb-10">
        <div>
          <div>
            <div class="pb-4">
              <h1>A fast web framework</h1>
              <div>
                Leveraging our experience with Node.js performance, Fastify has
                been built from the ground up to be{" "}
                <strong>as fast as possible</strong>. Have a look at our{" "}
                <Link href="/Benchmarks">benchmarks section</Link> to compare
                Fastify performance to other common web frameworks.
              </div>
              <Link
                class="my-4 flex w-[300px] justify-center rounded-md bg-black p-4 text-lg text-white !no-underline dark:bg-white dark:text-black"
                href="/Benchmarks"
              >
                Check out our benchmarks
              </Link>
            </div>
            {/* <div class="pb-4">
              <h1>Ecosystem</h1>
              <div>
                Fastify has an ever-growing ecosystem of plugins. Probably there
                is already a plugin for your favourite database or template
                language. Have a look at the{" "}
                <Link href="/Ecosystem">Ecosystem page</Link> to navigate
                through the currently available plugins. Can&#39;t you find the
                plugin you are looking for? No problem,{" "}
                <Link href="/docs/latest/Reference/Plugins">
                  it&#39;s very easy to write one
                </Link>
                !
              </div>
              <Link
                class="mt-4 flex w-[300px] justify-center rounded-md bg-black p-4 text-lg text-white !no-underline dark:bg-white dark:text-black"
                href="/Ecosystem"
              >
                Explore{" "}
                {plugins.corePlugins.length + plugins.communityPlugins.length}{" "}
                plugins
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      <section class="pb-10">
        <div>
          <h1>Meet The Team</h1>
          <p>
            <i>In alphabetical order</i>
          </p>
          {/* <Team /> */}
        </div>
      </section>

      <section class="pb-10">
        <div>
          <div>
            <div>
              <h1>Acknowledgments</h1>
              <p>
                This project is kindly <strong>sponsored by</strong>:
              </p>
              <ul>
                <li>
                  <a target="_blank" href="https://nearform.com/">
                    NearForm
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://platformatic.dev/">
                    Platformatic
                  </a>
                </li>
              </ul>
              <p>Past Sponsors:</p>
              <ul>
                <li>
                  <a target="_blank" href="http://www.letzdoitapp.com/">
                    LetzDoIt
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://opensource.microsoft.com/">
                    Microsoft
                  </a>
                </li>
              </ul>
              <p>Also thanks to:</p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://github.com/fastify/fastify/graphs/contributors"
                  >
                    The <strong>amazing</strong> Fastify community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h1>Hosted by</h1>
              <p class="pb-10">
                We are an <strong>At Large project</strong> at the{" "}
                <a target="_blank" href="https://openjsf.org/">
                  OpenJS Foundation
                </a>
              </p>
              <div class="light-element">
                <a target="_blank" href="https://openjsf.org/">
                  <img
                    // eslint-disable-next-line qwik/jsx-img
                    src="/images/logos/openjsf-black.webp"
                    width={541}
                    height={170}
                    alt="OpenJS Logo"
                  />
                </a>
              </div>
              <div class="dark-element">
                <a target="_blank" href="https://openjsf.org/">
                  <img
                    // eslint-disable-next-line qwik/jsx-img
                    src="/images/logos/openjsf-white.webp"
                    width={541}
                    height={170}
                    alt="OpenJS Logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
