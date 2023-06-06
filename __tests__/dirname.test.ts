import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.dirname", () => {
  it("posix", () => {
    const dir = path.posix.dirname;

    expect(dir(__filename).slice(-10)).toBe("/__tests__");
    expect(dir("/a/b/")).toBe("/a");
    expect(dir("/a/b")).toBe("/a");
    expect(dir("/a")).toBe("/");
    expect(dir("")).toBe(".");
    expect(dir("/")).toBe("/");
    expect(dir("////")).toBe("/");
    expect(dir("//a")).toBe("//");
    expect(dir("foo")).toBe(".");
  });

  it("win32", () => {
    const dir = path.win32.dirname;

    expect(dir("c:\\")).toBe("c:\\");
    expect(dir("c:\\foo")).toBe("c:\\");
    expect(dir("c:\\foo\\")).toBe("c:\\");
    expect(dir("c:\\foo\\bar")).toBe("c:\\foo");
    expect(dir("c:\\foo\\bar\\")).toBe("c:\\foo");
    expect(dir("c:\\foo\\bar\\baz")).toBe("c:\\foo\\bar");
    expect(dir("c:\\foo bar\\baz")).toBe("c:\\foo bar");
    expect(dir("\\")).toBe("\\");
    expect(dir("\\foo")).toBe("\\");
    expect(dir("\\foo\\")).toBe("\\");
    expect(dir("\\foo\\bar")).toBe("\\foo");
    expect(dir("\\foo\\bar\\")).toBe("\\foo");
    expect(dir("\\foo\\bar\\baz")).toBe("\\foo\\bar");
    expect(dir("\\foo bar\\baz")).toBe("\\foo bar");
    expect(dir("c:")).toBe("c:");
    expect(dir("c:foo")).toBe("c:");
    expect(dir("c:foo\\")).toBe("c:");
    expect(dir("c:foo\\bar")).toBe("c:foo");
    expect(dir("c:foo\\bar\\")).toBe("c:foo");
    expect(dir("c:foo\\bar\\baz")).toBe("c:foo\\bar");
    expect(dir("c:foo bar\\baz")).toBe("c:foo bar");
    expect(dir("file:stream")).toBe(".");
    expect(dir("dir\\file:stream")).toBe("dir");
    expect(dir("\\\\unc\\share")).toBe("\\\\unc\\share");
    expect(dir("\\\\unc\\share\\foo")).toBe("\\\\unc\\share\\");
    expect(dir("\\\\unc\\share\\foo\\")).toBe("\\\\unc\\share\\");
    expect(dir("\\\\unc\\share\\foo\\bar")).toBe("\\\\unc\\share\\foo");
    expect(dir("\\\\unc\\share\\foo\\bar\\")).toBe("\\\\unc\\share\\foo");
    expect(dir("\\\\unc\\share\\foo\\bar\\baz")).toBe(
      "\\\\unc\\share\\foo\\bar"
    );
    expect(dir("/a/b/")).toBe("/a");
    expect(dir("/a/b")).toBe("/a");
    expect(dir("/a")).toBe("/");
    expect(dir("")).toBe(".");
    expect(dir("/")).toBe("/");
    expect(dir("////")).toBe("/");
    expect(dir("foo")).toBe(".");
  });
});
