import type { MockInstance } from "vitest";

export function asMock(mock: unknown) {
  return mock as MockInstance;
}

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}));
