import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Issue } from "./Issue";
import { ProjectFilter } from "./ProjectFilter";

type Props = { url: string };

export type IssueType = {
  url: string;
  title: string;
  comments: number;
  author: {
    name: string;
    avatar_url: string;
    acc_url: string;
  };
  project: {
    org: string;
    name: string;
    url: string;
  };
  locked: false;
  state: string;
  created_at: string;
  updated_at: string;
  labels: string[];
};

export const GoodFirstIssue = component$<Props>(({ url }) => {
  const loadingSig = useSignal<boolean>(true);
  const errorSig = useSignal<string>();
  const issuesSig = useSignal<IssueType[]>([]);
  const filteredIssuesSig = useSignal<IssueType[]>([]);
  const projectsSig = useSignal<
    Record<string, { count: number; selected: boolean; name: string }>
  >({});

  useTask$(async () => {
    loadingSig.value = true;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      issuesSig.value = data.results;
      projectsSig.value = data.results.reduce((acc: any, curr: any) => {
        acc[curr.project.name] = {
          count:
            typeof acc[curr.project.name] === "undefined"
              ? 1
              : acc[curr.project.name].count + 1,
          selected: true,
          name: curr.project.name,
        };
        return acc;
      }, {});
      filteredIssuesSig.value = issuesSig.value.filter(
        (issue: any) => projectsSig.value[issue.project.name].selected,
      );
    } catch (err: any) {
      if (err.message) {
        errorSig.value = err.message;
      }
    }
    loadingSig.value = false;
  });

  const toggleProject = $((name: string, selected: boolean) => {
    // projectsSig.value = {
    //   ...projectsSig.value,
    //   [name]: { ...projectsSig.value[name], selected },
    // };
    projectsSig.value[name].selected = selected;

    filteredIssuesSig.value = issuesSig.value.filter((issue) => {
      return projectsSig.value[issue.project.name].selected;
    });
  });

  return loadingSig.value ? (
    <div role="alert p-4">Loading...</div>
  ) : errorSig.value ? (
    <div role="alert p-4">Error: {errorSig.value}</div>
  ) : (
    <div class="flex px-4 pt-8">
      <div class="mr-4 w-[400px]">
        <div class="py-2 text-3xl font-bold">Projects</div>
        {Object.values(projectsSig.value)
          .sort((a, b) => b.count - a.count)
          .map((project, key) => (
            <ProjectFilter
              key={key}
              name={project.name}
              count={project.count}
              toggle$={(selected) => {
                toggleProject(project.name, selected);
              }}
            />
          ))}
      </div>
      <div class="w-full">
        {issuesSig.value.length === 0 ? (
          <div>
            <strong>No issue available 😱</strong>
          </div>
        ) : (
          filteredIssuesSig.value.map((issue, key) => (
            <Issue key={key} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
});
