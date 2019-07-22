export default function() {
  return new html();
}
class html {
  addAttribute(attributeToSet, attributeValue) {
    this.element.setAttribute(attributeToSet, attributeValue);

    return this;
  }
  click(callback) {
    this.element.addEventListener("click", callback);
    return this;
  }
  create(element) {
    this.element = document.createElement(element);
    return this;
  }
  addChild(elementToAdd) {
    if (elementToAdd.render() instanceof HTMLUnknownElement) {
      throw new Error("Invalid HTML tag");
    }
    this.element.append(elementToAdd.render());
    return this;
  }

  addClass(classToAdd) {
    if (this.element.classList.contains(classToAdd)) {
      throw new Error("This class already exists");
    }
    this.element.classList.add(classToAdd);
    return this;
  }

  isClassQuery(query) {
    return query.startsWith(".");
  }

  isIdQuery(query) {
    return query.startsWith("#");
  }
  render() {
    return this.element;
  }
  select(query) {
    const selection = this.querySelectorAll(query);

    if (selection.length === 1) {
      this.element = selection[0];
    } else {
      this.element = selection;
    }

    return this;
  }
  text(textToAdd) {
    if (textToAdd === undefined) {
      return this.element.textContent;
    }
    this.element.textContent = textToAdd;
    return this;
  }
}
