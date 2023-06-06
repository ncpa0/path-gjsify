import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.join", () => {
  it("posix", () => {
    const join = path.posix.join;

    expect(join(".", "x/b", "..", "/b/c.js")).toBe("x/b/c.js");
    expect(join()).toBe(".");
    expect(join("/.", "x/b", "..", "/b/c.js")).toBe("/x/b/c.js");
    expect(join("/foo", "../../../bar")).toBe("/bar");
    expect(join("foo", "../../../bar")).toBe("../../bar");
    expect(join("foo/", "../../../bar")).toBe("../../bar");
    expect(join("foo/x", "../../../bar")).toBe("../bar");
    expect(join("foo/x", "./bar")).toBe("foo/x/bar");
    expect(join("foo/x/", "./bar")).toBe("foo/x/bar");
    expect(join("foo/x/", ".", "bar")).toBe("foo/x/bar");
    expect(join("./")).toBe("./");
    expect(join(".", "./")).toBe("./");
    expect(join(".", ".", ".")).toBe(".");
    expect(join(".", "./", ".")).toBe(".");
    expect(join(".", "/./", ".")).toBe(".");
    expect(join(".", "/////./", ".")).toBe(".");
    expect(join(".")).toBe(".");
    expect(join("", ".")).toBe(".");
    expect(join("", "foo")).toBe("foo");
    expect(join("foo", "/bar")).toBe("foo/bar");
    expect(join("", "/foo")).toBe("/foo");
    expect(join("", "", "/foo")).toBe("/foo");
    expect(join("", "", "foo")).toBe("foo");
    expect(join("foo", "")).toBe("foo");
    expect(join("foo/", "")).toBe("foo/");
    expect(join("foo", "", "/bar")).toBe("foo/bar");
    expect(join("./", "..", "/foo")).toBe("../foo");
    expect(join("./", "..", "..", "/foo")).toBe("../../foo");
    expect(join(".", "..", "..", "/foo")).toBe("../../foo");
    expect(join("", "..", "..", "/foo")).toBe("../../foo");
    expect(join("/")).toBe("/");
    expect(join("/", ".")).toBe("/");
    expect(join("/", "..")).toBe("/");
    expect(join("/", "..", "..")).toBe("/");
    expect(join("")).toBe(".");
    expect(join("", "")).toBe(".");
    expect(join(" /foo")).toBe(" /foo");
    expect(join(" ", "foo")).toBe(" /foo");
    expect(join(" ", "")).toBe(" ");
    expect(join("/", "foo")).toBe("/foo");
    expect(join("/", "/foo")).toBe("/foo");
    expect(join("/", "", "/foo")).toBe("/foo");
    expect(join("", "/", "foo")).toBe("/foo");
    expect(join("", "/", "/foo")).toBe("/foo");
  });

  it("win32", () => {
    const join = path.win32.join;

    expect(join("//foo/bar")).toBe("\\\\foo\\bar\\");
    expect(join("\\/foo/bar")).toBe("\\\\foo\\bar\\");
    expect(join("\\\\foo/bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo/", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo", "/bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo", "", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo/", "", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("//foo/", "", "/bar")).toBe("\\\\foo\\bar\\");
    expect(join("", "//foo", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("", "//foo/", "bar")).toBe("\\\\foo\\bar\\");
    expect(join("", "//foo/", "/bar")).toBe("\\\\foo\\bar\\");
    expect(join("\\", "foo/bar")).toBe("\\foo\\bar");
    expect(join("\\", "/foo/bar")).toBe("\\foo\\bar");
    expect(join("", "/", "/foo/bar")).toBe("\\foo\\bar");
    expect(join("//", "foo/bar")).toBe("\\foo\\bar");
    expect(join("//", "/foo/bar")).toBe("\\foo\\bar");
    expect(join("\\\\", "/", "/foo/bar")).toBe("\\foo\\bar");
    expect(join("//")).toBe("\\");
    expect(join("//foo")).toBe("\\foo");
    expect(join("//foo/")).toBe("\\foo\\");
    expect(join("//foo", "/")).toBe("\\foo\\");
    expect(join("//foo", "", "/")).toBe("\\foo\\");
    expect(join("///foo/bar")).toBe("\\foo\\bar");
    expect(join("////foo", "bar")).toBe("\\foo\\bar");
    expect(join("\\\\\\/foo/bar")).toBe("\\foo\\bar");
    expect(join("c:")).toBe("c:.");
    expect(join("c:.")).toBe("c:.");
    expect(join("c:", "")).toBe("c:.");
    expect(join("", "c:")).toBe("c:.");
    expect(join("c:.", "/")).toBe("c:.\\");
    expect(join("c:.", "file")).toBe("c:file");
    expect(join("c:", "/")).toBe("c:\\");
    expect(join("c:", "file")).toBe("c:\\file");
  });
});
