import html from "../html/html";
import Api from "../api/Api";

export default () => new Components();

class Components {
  getAppContext() {
    return html().select("#app");
  }

  renderWrapperDiv() {
    return html()
      .create("div")
      .addClass("wrapper");
  }
  renderMainHeader() {
    const mainHeader = html()
      .create("header")
      .addClass("main-header");
    const mainHeaderTitle = html()
      .create("h1")
      .addClass("main-header__title")
      .text("WildGroove");
    const nav = this.renderMainNav();
    mainHeader.addChild(mainHeaderTitle);
    mainHeader.addChild(nav);
    return mainHeader;
  }
  renderMainNav() {
    const nav = html().create("nav");
    const navList = html()
      .create("ol")
      .addClass("nav__list");
    const navListItemOne = html()
      .create("li")
      .addClass("nav__list-item")
      .addChild(
        html()
          .create("a")
          .addAttribute("href", "")
          .text("Back To All Artists")
          .click(event => {
            event.preventDefault();
            this.renderPageArtists();
          })
      );   
  }
  renderMainFooter(){
    const mainFooter = html().create('footer').addClass('main-footer');
    const mainFooterCopy = html().create('small').addClass("main-footer__copy").addHtml('&copy; 2019 WildGroove');
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }
  rendnerContentBlock(requestedData){
    const contentBlock = html().create('section').addClass('content-block');
    const contentBlockTitle = html().create('h3').addClass('content-block__title').text(requestedData);
    const contentBlockList = html().create('ul').addClass('content-block__list');
    Api().getRequest(`http://localhost:8080/api/${requestedData}`, (responseCollection) => {
      responseCollection.forEach((item) => {
       
     let elementName
        if (item.albumTitle){
          elementName = item.albumTitle
        } else if (item.name){
          elementName = item.name 
        }
        else{
          elementName = item.songTitle
        }
        const contentBlockListItem = html()
          .create('li')
          .addClass('content-block__list-item')
          .addChild(html()
            .create('a')
            .addAttribute('href', '/${requestedData}/${item.id}')
            .text(elementName));

        contentBlockList.addChild(contentBlockListItem);
    });
  });
  contentBlock.addChild(contentBlockTitle);
  contentBlock.addChild(contentBlockList);
  return contentBlock;
}
}
