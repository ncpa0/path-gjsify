import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.isAbsolute", () => {
  it("posix", () => {
    const abs = path.posix.isAbsolute;

    expect(abs("/home/foo")).toBe(true);
    expect(abs("/home/foo/..")).toBe(true);
    expect(abs("bar/")).toBe(false);
    expect(abs("./baz")).toBe(false);
  });

  it("win32", () => {
    const abs = path.win32.isAbsolute;

    expect(abs("/")).toBe(true);
    expect(abs("//")).toBe(true);
    expect(abs("//server")).toBe(true);
    expect(abs("//server/file")).toBe(true);
    expect(abs("\\\\server\\file")).toBe(true);
    expect(abs("\\\\server")).toBe(true);
    expect(abs("\\\\")).toBe(true);
    expect(abs("c")).toBe(false);
    expect(abs("c:")).toBe(false);
    expect(abs("c:\\")).toBe(true);
    expect(abs("c:/")).toBe(true);
    expect(abs("c://")).toBe(true);
    expect(abs("C:/Users/")).toBe(true);
    expect(abs("C:\\Users\\")).toBe(true);
    expect(abs("C:cwd/another")).toBe(false);
    expect(abs("C:cwd\\another")).toBe(false);
    expect(abs("directory/directory")).toBe(false);
    expect(abs("directory\\directory")).toBe(false);
  });
});
