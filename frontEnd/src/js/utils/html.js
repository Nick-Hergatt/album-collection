export default function() {
  return new html();
}
class html {
  constructor(element) {
    this.element = document.createElement(element);
    return this;
  }



  isClassQuery(query){
    return query.startsWith(".");
  }

  isIdQuery(query){
    return query.startsWith("#")
  }

  render(){
    return this.element;
  }

  
}
