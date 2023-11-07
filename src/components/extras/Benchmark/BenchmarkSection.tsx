import { component$ } from "@builder.io/qwik";
import benchmarksData from "../../../generated/benchmarks.json";
import { BenchmarkInfo } from "./BenchmarkInfo";

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
