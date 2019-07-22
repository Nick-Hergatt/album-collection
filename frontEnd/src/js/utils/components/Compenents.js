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
          .text("Artists")
          .click(event => {
            event.preventDefault();
            this.renderPageArtists();
          })
      );
  }
}
