import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Issue } from "./Issue";
import { ProjectFilter } from "./ProjectFilter";
import style from "./styles.module.css";

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

  // const toggleProject = (name, selected) => {
  //   if (projects[name]) {
  //     projects[name].selected =
  //       typeof selected === "undefined" ? !projects[name].selected : selected;
  //   }

  //   const filteredIssues = issues.filter((issue) => {
  //     return projects[issue.project.name].selected;
  //   });

  //   setProjects(projects);
  //   setFilteredIssues(filteredIssues);
  // };

  // function byCount(a, b) {
  //   return b.count - a.count;
  // }

  return loadingSig.value ? (
    <div role="alert">Loading...</div>
  ) : errorSig.value ? (
    <div role="alert">Error: {errorSig.value}</div>
  ) : (
    <div>
      <div>
        <div>
          <nav>
            <p class={style.panelHeading}>Projects</p>
            {Object.values(projectsSig.value)
              .sort((a, b) => b.count - a.count)
              .map((project, key) => (
                <ProjectFilter
                  key={key}
                  name={project.name}
                  count={project.count}
                  selected={project.selected}
                  toggle$={() => console.log("toggle$")}
                />
              ))}
          </nav>
        </div>
        <div>
          <div>
            <>
              {issuesSig.value.length === 0 ? (
                <div>
                  <strong>No issue available 😱</strong>
                </div>
              ) : (
                filteredIssuesSig.value.map((issue, key) => (
                  <Issue key={key} issue={issue} />
                ))
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
});
