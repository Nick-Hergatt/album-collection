import html from "./html.js";

describe("html", () => {
  describe("constructor", () => {
    test("should be an 'object'", () => {
      expect(typeof html("div")).toBe("object");
    });
  });
  describe("addClass", () => {
    const underTest = html("div");
    underTest.render().ClassList.add("test");
    expect();
  });
});
