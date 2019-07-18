export default function() {
  return new html();
}
class html {
  constructor(element) {
    this.element = document.createElement(element);
    return this;
  }
}
