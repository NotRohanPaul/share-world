import { isTrusted } from "@src/utils/common";
import type { SyntheticEvent } from "react";
import { expect, it } from "vitest";


it("isTrusted", () => {
    const event = { isTrusted: true } as unknown as SyntheticEvent;
    expect(isTrusted(event)).toBe(true);
});