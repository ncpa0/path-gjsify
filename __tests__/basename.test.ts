import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

export default describe("path.basename", () => {
  it("posix", () => {
    const base = path.posix.basename;

    expect(base(__filename)).toBe("basename.test.ts");
    expect(base(__filename, ".ts")).toBe("basename.test");
    expect(base(".js", ".js")).toBe("");
    expect(base("js", ".js")).toBe("js");
    expect(base("file.js", ".ts")).toBe("file.js");
    expect(base("file", ".js")).toBe("file");
    expect(base("file.js.old", ".js.old")).toBe("file");
    expect(base("")).toBe("");
    expect(base("/dir/basename.ext")).toBe("basename.ext");
    expect(base("/basename.ext")).toBe("basename.ext");
    expect(base("basename.ext")).toBe("basename.ext");
    expect(base("basename.ext/")).toBe("basename.ext");
    expect(base("basename.ext//")).toBe("basename.ext");
    expect(base("aaa/bbb", "/bbb")).toBe("bbb");
    expect(base("aaa/bbb", "a/bbb")).toBe("bbb");
    expect(base("aaa/bbb", "bbb")).toBe("bbb");
    expect(base("aaa/bbb//", "bbb")).toBe("bbb");
    expect(base("aaa/bbb", "bb")).toBe("b");
    expect(base("aaa/bbb", "b")).toBe("bb");
    expect(base("/aaa/bbb", "/bbb")).toBe("bbb");
    expect(base("/aaa/bbb", "a/bbb")).toBe("bbb");
    expect(base("/aaa/bbb", "bbb")).toBe("bbb");
    expect(base("/aaa/bbb//", "bbb")).toBe("bbb");
    expect(base("/aaa/bbb", "bb")).toBe("b");
    expect(base("/aaa/bbb", "b")).toBe("bb");
    expect(base("/aaa/bbb")).toBe("bbb");
    expect(base("/aaa/")).toBe("aaa");
    expect(base("/aaa/b")).toBe("b");
    expect(base("/a/b")).toBe("b");
    expect(base("//a")).toBe("a");
    expect(base("a", "a")).toBe("");

    expect(base("\\dir\\basename.ext")).toBe("\\dir\\basename.ext");
    expect(base("\\basename.ext")).toBe("\\basename.ext");
    expect(base("basename.ext")).toBe("basename.ext");
    expect(base("basename.ext\\")).toBe("basename.ext\\");
    expect(base("basename.ext\\\\")).toBe("basename.ext\\\\");
    expect(base("foo")).toBe("foo");
  });

  it("win32", () => {
    const base = path.win32.basename;

    expect(base("\\dir\\basename.ext")).toBe("basename.ext");
    expect(base("\\basename.ext")).toBe("basename.ext");
    expect(base("basename.ext")).toBe("basename.ext");
    expect(base("basename.ext\\")).toBe("basename.ext");
    expect(base("basename.ext\\\\")).toBe("basename.ext");
    expect(base("foo")).toBe("foo");
    expect(base("aaa\\bbb", "\\bbb")).toBe("bbb");
    expect(base("aaa\\bbb", "a\\bbb")).toBe("bbb");
    expect(base("aaa\\bbb", "bbb")).toBe("bbb");
    expect(base("aaa\\bbb\\\\\\\\", "bbb")).toBe("bbb");
    expect(base("aaa\\bbb", "bb")).toBe("b");
    expect(base("aaa\\bbb", "b")).toBe("bb");
    expect(base("C:")).toBe("");
    expect(base("C:.")).toBe(".");
    expect(base("C:\\")).toBe("");
    expect(base("C:\\dir\\base.ext")).toBe("base.ext");
    expect(base("C:\\basename.ext")).toBe("basename.ext");
    expect(base("C:basename.ext")).toBe("basename.ext");
    expect(base("C:basename.ext\\")).toBe("basename.ext");
    expect(base("C:basename.ext\\\\")).toBe("basename.ext");
    expect(base("C:foo")).toBe("foo");
    expect(base("file:stream")).toBe("file:stream");
    expect(base("a", "a")).toBe("");
  });

  it("controll chars", () => {
    const controlCharFilename = `Icon${String.fromCharCode(13)}`;
    expect(path.posix.basename(`/a/b/${controlCharFilename}`)).toBe(
      controlCharFilename
    );
  });
});
