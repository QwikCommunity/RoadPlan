import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";

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

export type ProjectFilterProps = {
  name: string;
  count: number;
  toggle$: PropFunction<(checked: boolean) => void>;
};

const ProjectFilter = component$<ProjectFilterProps>(
  ({ name, count, toggle$ }) => {
    const selectedSig = useSignal(true);
    const onChange$ = $(() => {
      selectedSig.value = !selectedSig.value;
      toggle$(selectedSig.value);
    });

    return (
      <div class="flex items-center py-2">
        <input
          type="checkbox"
          checked={selectedSig.value}
          onChange$={onChange$}
          class="h-6 w-6 text-black accent-green-500"
        />
        <div class="ml-4 flex flex-col">
          <span class="text-base font-bold">{name}</span>
          <span class="text-xs">{count} issues</span>
        </div>
      </div>
    );
  },
);

type IssueProps = {
  issue: IssueType;
};

const Issue = component$<IssueProps>(({ issue }) => {
  return (
    <div
      key={issue.url}
      class="m-2 box-border flex flex-col overflow-hidden rounded-md p-4 pt-8 shadow-md"
    >
      <a target="_blank" href={issue.url}>
        {issue.title}
      </a>
      <small>
        Project&nbsp;
        <a target="_blank" href={issue.project.url}>
          {issue.project.name}
        </a>
      </small>
      <div class="mt-2 flex flex-wrap justify-start gap-2">
        {issue.labels.map((label) => {
          return (
            <div
              key={label}
              class={{
                "mt-2 rounded-md bg-gray-300 p-1 text-xs": true,
                "bg-red-300": label.toLowerCase() === "bug",
                "bg-green-300": label.toLowerCase() === "help wanted",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
});
