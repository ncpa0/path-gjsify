import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.normalize", () => {
  it("posix", () => {
    const norm = path.posix.normalize;

    expect(norm("./fixtures///b/../b/c.js")).toBe("fixtures/b/c.js");
    expect(norm("/foo/../../../bar")).toBe("/bar");
    expect(norm("a//b//../b")).toBe("a/b");
    expect(norm("a//b//./c")).toBe("a/b/c");
    expect(norm("a//b//.")).toBe("a/b");
    expect(norm("/a/b/c/../../../x/y/z")).toBe("/x/y/z");
    expect(norm("///..//./foo/.//bar")).toBe("/foo/bar");
    expect(norm("bar/foo../../")).toBe("bar/");
    expect(norm("bar/foo../..")).toBe("bar");
    expect(norm("bar/foo../../baz")).toBe("bar/baz");
    expect(norm("bar/foo../")).toBe("bar/foo../");
    expect(norm("bar/foo..")).toBe("bar/foo..");
    expect(norm("../foo../../../bar")).toBe("../../bar");
    expect(norm("../.../.././.../../../bar")).toBe("../../bar");
    expect(norm("../../../foo/../../../bar")).toBe("../../../../../bar");
    expect(norm("../../../foo/../../../bar/../../")).toBe("../../../../../../");
    expect(norm("../foobar/barfoo/foo/../../../bar/../../")).toBe("../../");
    expect(norm("../.../../foobar/../../../bar/../../baz")).toBe(
      "../../../../baz"
    );
    expect(norm("foo/bar\\baz")).toBe("foo/bar\\baz");
  });

  it("win32", () => {
    const norm = path.win32.normalize;

    expect(norm("./fixtures///b/../b/c.js")).toBe("fixtures\\b\\c.js");
    expect(norm("/foo/../../../bar")).toBe("\\bar");
    expect(norm("a//b//../b")).toBe("a\\b");
    expect(norm("a//b//./c")).toBe("a\\b\\c");
    expect(norm("a//b//.")).toBe("a\\b");
    expect(norm("//server/share/dir/file.ext")).toBe(
      "\\\\server\\share\\dir\\file.ext"
    );
    expect(norm("/a/b/c/../../../x/y/z")).toBe("\\x\\y\\z");
    expect(norm("C:")).toBe("C:.");
    expect(norm("C:..\\abc")).toBe("C:..\\abc");
    expect(norm("C:..\\..\\abc\\..\\def")).toBe("C:..\\..\\def");
    expect(norm("C:\\.")).toBe("C:\\");
    expect(norm("file:stream")).toBe("file:stream");
    expect(norm("bar\\foo..\\..\\")).toBe("bar\\");
    expect(norm("bar\\foo..\\..")).toBe("bar");
    expect(norm("bar\\foo..\\..\\baz")).toBe("bar\\baz");
    expect(norm("bar\\foo..\\")).toBe("bar\\foo..\\");
    expect(norm("bar\\foo..")).toBe("bar\\foo..");
    expect(norm("..\\foo..\\..\\..\\bar")).toBe("..\\..\\bar");
    expect(norm("..\\...\\..\\.\\...\\..\\..\\bar")).toBe("..\\..\\bar");
    expect(norm("../../../foo/../../../bar")).toBe("..\\..\\..\\..\\..\\bar");
    expect(norm("../../../foo/../../../bar/../../")).toBe(
      "..\\..\\..\\..\\..\\..\\"
    );
    expect(norm("../foobar/barfoo/foo/../../../bar/../../")).toBe("..\\..\\");
    expect(norm("../.../../foobar/../../../bar/../../baz")).toBe(
      "..\\..\\..\\..\\baz"
    );
    expect(norm("foo/bar\\baz")).toBe("foo\\bar\\baz");
  });
});
