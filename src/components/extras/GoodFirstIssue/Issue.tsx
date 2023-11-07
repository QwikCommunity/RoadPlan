import { component$ } from "@builder.io/qwik";
import type { IssueType } from "./GoodFirstIssue";

export type Props = {
  issue: IssueType;
};

export const Issue = component$<Props>(({ issue }) => {
  return (
    <div key={issue.url}>
      <div>
        <div>
          <div>
            <div>
              <div>
                <a target="_blank" href={issue.url}>
                  {issue.title}
                </a>
              </div>
              <small>
                Project&nbsp;
                <a target="_blank" href={issue.project.url}>
                  {issue.project.name}
                </a>
              </small>
            </div>
          </div>
        </div>
        <div>
          {issue.labels.map((label) => {
            return <span key={label}>{label}</span>;
          })}
        </div>
      </div>
    </div>
  );
});
