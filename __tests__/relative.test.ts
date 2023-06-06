import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.relative", () => {
  it("posix", () => {
    const rel = path.posix.relative;

    expect(rel("/var/lib", "/var")).toBe("..");
    expect(rel("/var/lib", "/bin")).toBe("../../bin");
    expect(rel("/var/lib", "/var/lib")).toBe("");
    expect(rel("/var/lib", "/var/apache")).toBe("../apache");
    expect(rel("/var/", "/var/lib")).toBe("lib");
    expect(rel("/", "/var/lib")).toBe("var/lib");
    expect(rel("/foo/test", "/foo/test/bar/package.json")).toBe(
      "bar/package.json"
    );
    expect(rel("/Users/a/web/b/test/mails", "/Users/a/web/b")).toBe("../..");
    expect(rel("/foo/bar/baz-quux", "/foo/bar/baz")).toBe("../baz");
    expect(rel("/foo/bar/baz", "/foo/bar/baz-quux")).toBe("../baz-quux");
    expect(rel("/baz-quux", "/baz")).toBe("../baz");
    expect(rel("/baz", "/baz-quux")).toBe("../baz-quux");
    expect(rel("/page1/page2/foo", "/")).toBe("../../..");
  });

  it("win32", () => {
    const rel = path.win32.relative;

    expect(rel("c:/blah\\blah", "d:/games")).toBe("d:\\games");
    expect(rel("c:/aaaa/bbbb", "c:/aaaa")).toBe("..");
    expect(rel("c:/aaaa/bbbb", "c:/cccc")).toBe("..\\..\\cccc");
    expect(rel("c:/aaaa/bbbb", "c:/aaaa/bbbb")).toBe("");
    expect(rel("c:/aaaa/bbbb", "c:/aaaa/cccc")).toBe("..\\cccc");
    expect(rel("c:/aaaa/", "c:/aaaa/cccc")).toBe("cccc");
    expect(rel("c:/", "c:\\aaaa\\bbbb")).toBe("aaaa\\bbbb");
    expect(rel("c:/aaaa/bbbb", "d:\\")).toBe("d:\\");
    expect(rel("c:/AaAa/bbbb", "c:/aaaa/bbbb")).toBe("");
    expect(rel("c:/aaaaa/", "c:/aaaa/cccc")).toBe("..\\aaaa\\cccc");
    expect(rel("C:\\foo\\bar\\baz\\quux", "C:\\")).toBe("..\\..\\..\\..");
    expect(rel("C:\\foo\\test", "C:\\foo\\test\\bar\\package.json")).toBe(
      "bar\\package.json"
    );
    expect(rel("C:\\foo\\bar\\baz-quux", "C:\\foo\\bar\\baz")).toBe("..\\baz");
    expect(rel("C:\\foo\\bar\\baz", "C:\\foo\\bar\\baz-quux")).toBe(
      "..\\baz-quux"
    );
    expect(rel("\\\\foo\\bar", "\\\\foo\\bar\\baz")).toBe("baz");
    expect(rel("\\\\foo\\bar\\baz", "\\\\foo\\bar")).toBe("..");
    expect(rel("\\\\foo\\bar\\baz-quux", "\\\\foo\\bar\\baz")).toBe("..\\baz");
    expect(rel("\\\\foo\\bar\\baz", "\\\\foo\\bar\\baz-quux")).toBe(
      "..\\baz-quux"
    );
    expect(rel("C:\\baz-quux", "C:\\baz")).toBe("..\\baz");
    expect(rel("C:\\baz", "C:\\baz-quux")).toBe("..\\baz-quux");
    expect(rel("\\\\foo\\baz-quux", "\\\\foo\\baz")).toBe("..\\baz");
    expect(rel("\\\\foo\\baz", "\\\\foo\\baz-quux")).toBe("..\\baz-quux");
    expect(rel("C:\\baz", "\\\\foo\\bar\\baz")).toBe("\\\\foo\\bar\\baz");
    expect(rel("\\\\foo\\bar\\baz", "C:\\baz")).toBe("C:\\baz");
  });
});
