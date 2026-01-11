import type { Row } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import type { User } from "~/lib/types";

type UsersTableCellsSkillsetProps = {
  row: Row<User>;
};

export const UsersTableCellsSkillset = ({
  row,
}: UsersTableCellsSkillsetProps) => {
  const skillSet = row.original.skillSet;
  if (!skillSet.length) {
    return <span className="text-muted-foreground">No skills</span>;
  }

  const truncatedSkills = skillSet.slice(0, 3).join(", ");
  const hasMoreSkills = skillSet.length > 3;

  if (!hasMoreSkills) {
    return truncatedSkills;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="px-0 text-foreground">
          {truncatedSkills}, ...
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <ul className="list-disc ml-3">
          {row.original.skillSet.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};
