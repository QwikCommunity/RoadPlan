import { component$ } from "@builder.io/qwik";
import { GitHubIcon } from "~/components/Icons/GitHubIcon";
import benchmarksData from "../../../generated/benchmarks.json";

export const BenchmarkSection = component$(() => {
  return (
    <>
      {benchmarksData.frameworks
        .sort((a, b) =>
          parseFloat(a.requests) > parseFloat(b.requests) ? -1 : 1,
        )
        .map((framework) => (
          <BenchmarkInfo
            key={framework.name}
            name={framework.name}
            req={parseFloat(framework.requests)}
            progressValue={
              (parseFloat(framework.requests) / benchmarksData.reference) * 100
            }
            test={framework.test}
            repository={framework.repository}
          />
        ))}
    </>
  );
});

type Props = {
  name: string;
  test: string;
  repository: string;
  req: number;
  progressValue: number;
};

const BenchmarkInfo = component$<Props>(
  ({ name, test: testFile, repository, req, progressValue }) => {
    return (
      <div class="mx-2 my-6 p-4 shadow-md">
        <div class="flex justify-between px-2 py-4 align-middle">
          <a
            class="text-2xl font-medium text-black hover:underline dark:text-white"
            target="_blank"
            href={testFile}
          >
            {name}
          </a>
          <span
            class={`pt-2 text-xl ${
              Math.round(req) > 15000
                ? "text-black dark:text-white"
                : "text-red-500"
            }`}
          >
            {Math.round(req) + " req/sec"}
          </span>
          <a target="_blank" href={repository}>
            <GitHubIcon classes="w-10 h-10" />
          </a>
        </div>

        <div class="h-4 w-full rounded-full bg-gray-200 dark:bg-slate-700">
          <div
            class={`h-4 rounded-full ${
              name === "Fastify"
                ? "bg-green-500 dark:bg-blue-500"
                : "bg-blue-500 dark:bg-orange-500"
            }`}
            style={`width: ${progressValue}%`}
          />
        </div>
      </div>
    );
  },
);
