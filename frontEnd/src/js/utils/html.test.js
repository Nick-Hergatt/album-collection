import html from "./html.js";

describe("html", () => {
  
  describe("constructor", () => {
    test("should be an 'object'", () => {
      expect(typeof html("div")).toBe("object");
    });
  });

  describe("addClass", () => {
    test("should add a class to an element", () => {
      const underTest = html().constructor("section");
      underTest.addClass("test");

      expect(underTest.render().classList.contains("test")).toBeTruthy();
    });

    test("Throws an error when class already exists", () => {
      const underTest = html().constructor("section");
      underTest.render().classList.add("test");

      expect(() => {
        underTest.addClass("test");
      }).toThrow("This class already exists");
    })
  })

});
