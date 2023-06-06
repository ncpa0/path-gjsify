import { expect } from "@reactgjs/gest";

export const assert = {
  strictEqual: (a: any, b: any) => {
    const stack = new Error().stack;

    try {
      expect(a).toBe(b);
    } catch (e) {
      console.log(e.stack);

      e.stack = stack;
      throw e;
    }
  },
};
