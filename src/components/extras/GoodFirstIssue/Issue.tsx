import { component$ } from "@builder.io/qwik";
import type { IssueType } from "./GoodFirstIssue";

export type Props = {
  issue: IssueType;
};

export const Issue = component$<Props>(({ issue }) => {
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
