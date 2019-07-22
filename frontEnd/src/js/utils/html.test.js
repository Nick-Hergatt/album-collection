import html from "./html.js";

describe("html", () => {
  describe("create", () => {
    test("should be an 'object'", () => {
      expect(typeof html("div")).toBe("object");
    });
  });
  describe("addAttribute", () => {
    test("should add attribute to element", () => {
      const underTest = html().create("a");
      underTest.addAttribute("href", "test.com");

      expect(underTest.render().getAttribute("href", "test.com")).toBeTruthy();
    });
  });
  describe("addClass", () => {
    test("should add a class to an element", () => {
      const underTest = html().create("section");
      underTest.addClass("test");

      expect(underTest.render().classList.contains("test")).toBeTruthy();
    });

    test("Throws an error when class already exists", () => {
      const underTest = html().create("section");
      underTest.render().classList.add("test");

      expect(() => {
        underTest.addClass("test");
      }).toThrow("This class already exists");
    });

    describe("addChild", () => {
      test("adds real HTML element", () => {
        const underTest = html().create("section");
        const elementToAdd = html().create("span");
        underTest.addChild(elementToAdd);

        expect(underTest.render().querySelector("span")).toStrictEqual(
          elementToAdd.render()
        );
      });

      test("Throws error if not real HTML element", () => {
        const underTest = html().create("section");
        const elementToAdd = html().create("fakeHtml");
        console.log(elementToAdd);

        expect(() => underTest.addChild(elementToAdd)).toThrow(
          "Invalid HTML tag"
        );
      });
      describe("text", () => {
        test("Argument sets value", () => {
          const underTest = html().create("section");
          underTest.text("test text content");

          expect(underTest.text()).toBe("test text content");
        });
      });
      test("Return current value", () => {
        const underTest = html().create("section");
        underTest.render().textContent = "test text content";

        expect(underTest.text()).toBe("test text content");
      });
    });
 describe("click",() =>{
   test("Should add eventListner",()=>{
     const underTest=html().create("a")
     underTest.addAttribute("href","")
     .text("click here!")
    .click(event)
    expect(underTest.eventListner.toBe("click"))   
    });
 });

  });g
});
