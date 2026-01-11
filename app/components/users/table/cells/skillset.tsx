import type { Row } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { User } from "~/lib/types";
import { transformSkillset } from "~/lib/utils";

type UsersTableCellsSkillsetProps = {
  row: Row<User>;
};

export const UsersTableCellsSkillset = ({
  row,
}: UsersTableCellsSkillsetProps) => {
  const skillset = row.original.skillset;
  if (!skillset.length) {
    return <span className="text-muted-foreground">No skills</span>;
  }

  const truncatedStringSkills = transformSkillset(skillset.slice(0, 3));
  const hasMoreSkills = skillset.length > 3;

  if (!hasMoreSkills) {
    return truncatedStringSkills;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="px-0 text-foreground">
          {truncatedStringSkills}, ...
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <ul className="list-disc ml-3">
          {row.original.skillset.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};
