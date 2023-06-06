import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.resolve", () => {
  it("posix", () => {
    const res = path.posix.resolve;

    expect(res("/var/lib", "../", "file/")).toBe("/var/file");
    expect(res("/var/lib", "/../", "file/")).toBe("/file");
    expect(res("a/b/c/", "../../..")).toBe(GLib.get_current_dir());
    expect(res(".")).toBe(GLib.get_current_dir());
    expect(res("/some/dir", ".", "/absolute/")).toBe("/absolute");
    expect(res("/foo/tmp.3/", "../tmp.3/cycles/root.js")).toBe(
      "/foo/tmp.3/cycles/root.js"
    );
  });

  it("win32", () => {
    const res = path.win32.resolve;

    expect(res("c:/blah\\blah", "d:/games", "c:../a")).toBe("c:\\blah\\a");
    expect(res("c:/ignore", "d:\\a/b\\c/d", "\\e.exe")).toBe("d:\\e.exe");
    expect(res("c:/ignore", "c:/some/file")).toBe("c:\\some\\file");
    expect(res("d:/ignore", "d:some/dir//")).toBe("d:\\ignore\\some\\dir");
    expect(res(".")).toBe(GLib.get_current_dir().replaceAll("/", "\\"));
    expect(res("//server/share", "..", "relative\\")).toBe(
      "\\\\server\\share\\relative"
    );
    expect(res("c:/", "//")).toBe("c:\\");
    expect(res("c:/", "//dir")).toBe("c:\\dir");
    expect(res("c:/", "//server/share")).toBe("\\\\server\\share\\");
    expect(res("c:/", "//server//share")).toBe("\\\\server\\share\\");
    expect(res("c:/", "///some//dir")).toBe("c:\\some\\dir");
    expect(res("C:\\foo\\tmp.3\\", "..\\tmp.3\\cycles\\root.js")).toBe(
      "C:\\foo\\tmp.3\\cycles\\root.js"
    );
  });
});
