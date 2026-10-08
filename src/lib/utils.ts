type ClassValue = string | number | bigint | boolean | null | undefined;

/** Joins truthy class names. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter((c) => typeof c === "string" && c).join(" ");
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
