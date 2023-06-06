import { describe, expect, it } from "@reactgjs/gest";
import path from "../src/path";
// @ts-expect-error
import GLib from "gi://GLib?version=2.0";

const __filename = GLib.get_current_dir() + "/__tests__/basename.test.ts";

const winPaths = [
  // [path, root]
  ["C:\\path\\dir\\index.html", "C:\\"],
  ["C:\\another_path\\DIR\\1\\2\\33\\\\index", "C:\\"],
  ["another_path\\DIR with spaces\\1\\2\\33\\index", ""],
  ["\\", "\\"],
  ["\\foo\\C:", "\\"],
  ["file", ""],
  ["file:stream", ""],
  [".\\file", ""],
  ["C:", "C:"],
  ["C:.", "C:"],
  ["C:..", "C:"],
  ["C:abc", "C:"],
  ["C:\\", "C:\\"],
  ["C:\\abc", "C:\\"],
  ["", ""],

  // unc
  ["\\\\server\\share\\file_path", "\\\\server\\share\\"],
  [
    "\\\\server two\\shared folder\\file path.zip",
    "\\\\server two\\shared folder\\",
  ],
  ["\\\\teela\\admin$\\system32", "\\\\teela\\admin$\\"],
  ["\\\\?\\UNC\\server\\share", "\\\\?\\UNC\\"],
];

const winSpecialCaseParseTests = [
  ["t", { base: "t", name: "t", root: "", dir: "", ext: "" }],
  ["/foo/bar", { root: "/", dir: "/foo", base: "bar", ext: "", name: "bar" }],
];

const winSpecialCaseFormatTests = [
  [{ dir: "some\\dir" }, "some\\dir\\"],
  [{ base: "index.html" }, "index.html"],
  [{ root: "C:\\" }, "C:\\"],
  [{ name: "index", ext: ".html" }, "index.html"],
  [{ dir: "some\\dir", name: "index", ext: ".html" }, "some\\dir\\index.html"],
  [{ root: "C:\\", name: "index", ext: ".html" }, "C:\\index.html"],
  [{}, ""],
];

const unixPaths = [
  // [path, root]
  ["/home/user/dir/file.txt", "/"],
  ["/home/user/a dir/another File.zip", "/"],
  ["/home/user/a dir//another&File.", "/"],
  ["/home/user/a$$$dir//another File.zip", "/"],
  ["user/dir/another File.zip", ""],
  ["file", ""],
  [".\\file", ""],
  ["./file", ""],
  ["C:\\foo", ""],
  ["/", "/"],
  ["", ""],
  [".", ""],
  ["..", ""],
  ["/foo", "/"],
  ["/foo.", "/"],
  ["/foo.bar", "/"],
  ["/.", "/"],
  ["/.foo", "/"],
  ["/.foo.bar", "/"],
  ["/foo/bar.baz", "/"],
];

const unixSpecialCaseFormatTests = [
  [{ dir: "some/dir" }, "some/dir/"],
  [{ base: "index.html" }, "index.html"],
  [{ root: "/" }, "/"],
  [{ name: "index", ext: ".html" }, "index.html"],
  [{ dir: "some/dir", name: "index", ext: ".html" }, "some/dir/index.html"],
  [{ root: "/", name: "index", ext: ".html" }, "/index.html"],
  [{}, ""],
];

const errors = [
  { method: "parse", input: [null] },
  { method: "parse", input: [{}] },
  { method: "parse", input: [true] },
  { method: "parse", input: [1] },
  { method: "parse", input: [] },
  { method: "format", input: [null] },
  { method: "format", input: [""] },
  { method: "format", input: [true] },
  { method: "format", input: [1] },
];

function checkErrors(path) {
  errors.forEach(({ method, input }) => {
    expect(() => {
      path[method].apply(path, input);
    }).toThrowMatch({
      name: "TypeError",
    });
  });
}

function checkParseFormat(path, paths) {
  paths.forEach(([element, root]) => {
    const output = path.parse(element);
    expect(typeof output.root).toBe("string");
    expect(typeof output.dir).toBe("string");
    expect(typeof output.base).toBe("string");
    expect(typeof output.ext).toBe("string");
    expect(typeof output.name).toBe("string");
    expect(path.format(output)).toBe(element);
    expect(output.root).toBe(root);
    expect(output.dir.startsWith(output.root)).toBe(true);
    expect(output.dir).toBe(output.dir ? path.dirname(element) : "");
    expect(output.base).toBe(path.basename(element));
    expect(output.ext).toBe(path.extname(element));
  });
}

function checkSpecialCaseParseFormat(path, testCases) {
  testCases.forEach(([element, expected]) => {
    expect(path.parse(element)).toEqual(expected);
  });
}

function checkFormat(path, testCases) {
  testCases.forEach(([element, expected]) => {
    expect(path.format(element)).toBe(expected);
  });

  [null, undefined, 1, true, false, "string"].forEach((pathObject) => {
    expect(() => {
      path.format(pathObject);
    }).toThrowMatch({
      name: "TypeError",
    });
  });
}

export default describe("path.pares and path.format", () => {
  it("parse + format", () => {
    checkParseFormat(path.win32, winPaths);
    checkParseFormat(path.posix, unixPaths);
  });

  it("format", () => {
    checkFormat(path.win32, winSpecialCaseFormatTests);
    checkFormat(path.posix, unixSpecialCaseFormatTests);

    // See https://github.com/nodejs/node/issues/44343
    expect(path.format({ name: "x", ext: "png" })).toBe("x.png");
    expect(path.format({ name: "x", ext: ".png" })).toBe("x.png");
  });

  it("trailing path separators", () => {
    const trailingTests = [
      [
        path.win32.parse,
        [
          [".\\", { root: "", dir: "", base: ".", ext: "", name: "." }],
          ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
          ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
          [
            "c:\\foo\\\\\\",
            { root: "c:\\", dir: "c:\\", base: "foo", ext: "", name: "foo" },
          ],
          [
            "D:\\foo\\\\\\bar.baz",
            {
              root: "D:\\",
              dir: "D:\\foo\\\\",
              base: "bar.baz",
              ext: ".baz",
              name: "bar",
            },
          ],
        ] as const,
      ] as const,
      [
        path.posix.parse,
        [
          ["./", { root: "", dir: "", base: ".", ext: "", name: "." }],
          ["//", { root: "/", dir: "/", base: "", ext: "", name: "" }],
          ["///", { root: "/", dir: "/", base: "", ext: "", name: "" }],
          [
            "/foo///",
            { root: "/", dir: "/", base: "foo", ext: "", name: "foo" },
          ],
          [
            "/foo///bar.baz",
            {
              root: "/",
              dir: "/foo//",
              base: "bar.baz",
              ext: ".baz",
              name: "bar",
            },
          ],
        ] as const,
      ] as const,
    ] as const;

    const failures: string[] = [];
    trailingTests.forEach((test) => {
      const parse = test[0];
      const os = parse === path.win32.parse ? "win32" : "posix";
      test[1]!.forEach((test) => {
        const actual = parse(test[0]);
        const expected = test[1];
        const message = `path.${os}.parse(${JSON.stringify(
          test[0]
        )})\n  expect=${JSON.stringify(expected)}\n  actual=${JSON.stringify(
          actual
        )}`;
        const actualKeys = Object.keys(actual);
        const expectedKeys = Object.keys(expected);
        let failed = actualKeys.length !== expectedKeys.length;
        if (!failed) {
          for (let i = 0; i < actualKeys.length; ++i) {
            const key = actualKeys[i];
            if (!expectedKeys.includes(key) || actual[key] !== expected[key]) {
              failed = true;
              break;
            }
          }
        }
        if (failed) failures.push(`\n${message}`);
      });
    });
    expect(failures.length).toBe(0);
  });

  it("special case", () => {
    checkSpecialCaseParseFormat(path.win32, winSpecialCaseParseTests);
  });

  it("errors", () => {
    checkErrors(path.win32);
    checkErrors(path.posix);
  });
});
