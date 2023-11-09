import { component$ } from "@builder.io/qwik";
import organizationsData from "../../../generated/organisations.json";

type Props = {
  maxItems: number;
};

export const Organisations = component$<Props>(({ maxItems }) => {
  return (
    <div class="mt-2 flex flex-wrap justify-between bg-gray-100 p-4">
      {shuffle(organizationsData, maxItems).map(
        (organization: (typeof organizationsData)[0], index: number) => (
          <OrganizationItem key={index} organization={organization} />
        ),
      )}
    </div>
  );
});

const OrganizationItem = component$<{
  organization: (typeof organizationsData)[0];
}>(({ organization }) => {
  return (
    <a class="m-4" href={organization.link} target="_blank" rel="noreferrer">
      <img
        class="max-h-[60px] max-w-[160px] grayscale"
        src={`/images/organisations/${organization.image}`}
        alt={`${organization.name} is using Fastify`}
        width={160}
        height={80}
      />
    </a>
  );
});

const shuffle = (data: typeof organizationsData, maxItems: number) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  if (maxItems) {
    return shuffled.slice(0, maxItems);
  }

  return shuffled;
};
