export default function() {
  return new html();
}
class html {
  create(element) {
    this.element = document.createElement(element);
    return this;
  }
addChild(elementToAdd){
  
  if (elementToAdd.render() instanceof HTMLUnknownElement){
    throw new Error("Invalid HTML tag")
  }
  this.element.append(elementToAdd.render())
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
}
