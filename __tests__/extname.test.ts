import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

path;

export default describe("path.extname", () => {
  it("posix", () => {
    const ext = path.posix.extname;

    expect(ext(__filename)).toBe(".ts");
    expect(ext("")).toBe("");
    expect(ext("/path/to/file")).toBe("");
    expect(ext("/path/to/file.ext")).toBe(".ext");
    expect(ext("/path.to/file.ext")).toBe(".ext");
    expect(ext("/path.to/file")).toBe("");
    expect(ext("/path.to/.file")).toBe("");
    expect(ext("/path.to/.file.ext")).toBe(".ext");
    expect(ext("/path/to/f.ext")).toBe(".ext");
    expect(ext("/path/to/..ext")).toBe(".ext");
    expect(ext("/path/to/..")).toBe("");
    expect(ext("file")).toBe("");
    expect(ext("file.ext")).toBe(".ext");
    expect(ext(".file")).toBe("");
    expect(ext(".file.ext")).toBe(".ext");
    expect(ext("/file")).toBe("");
    expect(ext("/file.ext")).toBe(".ext");
    expect(ext("/.file")).toBe("");
    expect(ext("/.file.ext")).toBe(".ext");
    expect(ext(".path/file.ext")).toBe(".ext");
    expect(ext("file.ext.ext")).toBe(".ext");
    expect(ext("file.")).toBe(".");
    expect(ext(".")).toBe("");
    expect(ext("./")).toBe("");
    expect(ext(".file.ext")).toBe(".ext");
    expect(ext(".file")).toBe("");
    expect(ext(".file.")).toBe(".");
    expect(ext(".file..")).toBe(".");
    expect(ext("..")).toBe("");
    expect(ext("../")).toBe("");
    expect(ext("..file.ext")).toBe(".ext");
    expect(ext("..file")).toBe(".file");
    expect(ext("..file.")).toBe(".");
    expect(ext("..file..")).toBe(".");
    expect(ext("...")).toBe(".");
    expect(ext("...ext")).toBe(".ext");
    expect(ext("....")).toBe(".");
    expect(ext("file.ext/")).toBe(".ext");
    expect(ext("file.ext//")).toBe(".ext");
    expect(ext("file/")).toBe("");
    expect(ext("file//")).toBe("");
    expect(ext("file./")).toBe(".");
    expect(ext("file.//")).toBe(".");

    expect(ext(".\\")).toBe("");
    expect(ext("..\\")).toBe(".\\");
    expect(ext("file.ext\\")).toBe(".ext\\");
    expect(ext("file.ext\\\\")).toBe(".ext\\\\");
    expect(ext("file\\")).toBe("");
    expect(ext("file\\\\")).toBe("");
    expect(ext("file.\\")).toBe(".\\");
    expect(ext("file.\\\\")).toBe(".\\\\");
  });

  it("win32", () => {
    const ext = path.win32.extname;

    expect(ext(".\\")).toBe("");
    expect(ext("..\\")).toBe("");
    expect(ext("file.ext\\")).toBe(".ext");
    expect(ext("file.ext\\\\")).toBe(".ext");
    expect(ext("file\\")).toBe("");
    expect(ext("file\\\\")).toBe("");
    expect(ext("file.\\")).toBe(".");
    expect(ext("file.\\\\")).toBe(".");
  });
});
