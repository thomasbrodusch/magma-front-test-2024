import type { Ambassador } from "@/types/Ambassador";

export function ambassadorInitial(ambassador: Ambassador) {
  return `${ambassador.firstname[0]}${ambassador.lastname[0]}`;
}
