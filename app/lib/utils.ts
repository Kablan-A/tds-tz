import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSkillsetToString = (
  skillset: string[],
  delimiter: string = ", ",
): string => {
  if (!skillset || !Array.isArray(skillset)) {
    return "";
  }

  return skillset
    .filter(Boolean)
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0)
    .join(delimiter);
};

export const formatSkillsetToArray = (
  skillset: string,
  options: {
    delimiter?: string;
    removeDuplicates?: boolean;
    normalizeCase?: boolean;
  } = {},
): string[] => {
  const {
    delimiter = ",",
    removeDuplicates = true,
    normalizeCase = true,
  } = options;

  if (!skillset || typeof skillset !== "string") {
    return [];
  }

  let skills = skillset
    .split(delimiter)
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (removeDuplicates) {
    const seen = new Set<string>();
    skills = skills.filter((skill) => {
      const lower = skill.toLocaleLowerCase();

      if (seen.has(lower)) {
        return false;
      }

      seen.add(lower);
      return true;
    });
  }

  if (normalizeCase) {
    skills = skills.map(
      (skill) => skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase(),
    );
  }

  return skills;
};
