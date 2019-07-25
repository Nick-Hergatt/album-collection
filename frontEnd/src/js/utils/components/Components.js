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
    navList.addChild(navListItemOne);
    nav.addChild(navList);

    return nav;
  }
  renderMainFooter() {
    const mainFooter = html()
      .create("footer")
      .addClass("main-footer");
    const mainFooterCopy = html()
      .create("small")
      .addClass("main-footer__copy")
      .addHtml("&copy; 2019 WildGroove");
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }
  renderContentBlock(requestedData) {
    const contentBlock = html()
      .create("section")
      .addClass("content-block");
    const contentBlockTitle = html()
      .create("h3")
      .addClass("content-block__title")
      .text(requestedData);
    const contentBlockList = html()
      .create("ul")
      .addClass("content-block__list");
    Api().getRequest(
      `http://localhost:8080/api/${requestedData}`,
      responseCollection => {
        responseCollection.forEach(item => {
          let elementName;
          if (item.albumTitle) {
            elementName = item.albumTitle;
          } else if (item.name) {
            elementName = item.name;
          } else {
            elementName = item.songTitle;
          }
          const contentBlockListItem = html()
            .create("li")
            .addClass("content-block__list-item")
            .addChild(
              html()
                .create("a")
                .addAttribute("href", `/${requestedData}/${item.id}`)
                .text(elementName)
                .click(event => {
                  event.preventDefault();

                  const endpoint = event.target.getAttribute("href");
                  Api().getRequest(
                    `http://localhost:8080/api${endpoint}`,
                    data => {
                      this.renderPageSingle(data, endpoint);
                    }
                  );
                })
            );
          contentBlockList.addChild(contentBlockListItem);
        });
      }
    );
    contentBlock.addChild(contentBlockTitle);
    contentBlock.addChild(contentBlockList);
    return contentBlock;
  }
  renderMainContent(requestedData) {
    const mainContent = html()
      .create("main")
      .addClass("main-content");
    const containerDiv = html()
      .create("div")
      .addClass("container");
    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
  }
  renderPageArtist(data) {
    const currentMainContentContainerContentBlock = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container")
      .select(".content-block");
      console.log(data);
      const artistEntry = html().create('div').addClass('artistEntry');
      const artistName = html()
        .create("h3")
        .addClass("content-block__title")
        .text(data.name);
      const artistPicture = html()
        .create('img')
        .addClass('artistsEntry__image')
        .addAttribute('src', data.artistImageUrl)
      const artistAge = html()
        .create('h4')
        .text(data.artistAge);
      const recordLabel = html()
        .create('h4')
        .text(data.recordLabel);
      const hometown = html()
        .create('h4')
        .text(data.hometown);
      const artistAlbums = html()
        .create('ul')
        data.albums.forEach(album => {
          const albumElement = html()
          .create('li')
          .addChild(
            html()
            .create('a')
            .addAttribute('href', `/albums/${album.id}`)
            .text(album.albumTitle)
            .click((event) => {
              event.preventDefault()

              const endpoint = event.target.getAttribute('href')
              Api().getRequest(`http://localhost:8080/api${endpoint}`, (data) =>{
                this.renderPageSingle(data, endpoint)
              })
            })
          );
          artistAlbums.addChild(albumElement);
        });
      artistEntry.addChild(artistName)
      artistEntry.addChild(artistPicture)
      artistEntry.addChild(artistAge)
      artistEntry.addChild(recordLabel)
      artistEntry.addChild(hometown)
      artistEntry.addChild(artistAlbums)
      console.log(artistEntry);
      currentMainContentContainerContentBlock.replace(artistEntry);
    };
  
  renderPageArtists() {
    const currentMainContentContainer = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("artists"));
  }
  renderPageAlbum(data) {
    const currentMainContentContainerContentBlock = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container")
      .select(".content-block");
    const albumTitle = html()
      .create("h3")
      .addClass("content-block__title")
      .text(data.title);
    const albumArtist = html()
      .create("ul")
      .addClass("artist");
    const songAdd = html()
      .create("section")
      .addClass("add-song");
    const songAddTitle = html()
      .create("input")
      .addAttribute("type", "text")
      .addClass("add-song__input");
    const songAddButton = html()
      .create("button")
      .addClass("add-song__button")
      .text("submit new campus")
      .click(event => {
        const newTitle = songAddTitle.value;

        Api.postRequest("http://localhost:8080/add-song", {
          songTitle: newTitle
        });
      });
    data.artist.forEach(artist => {
      const artistElement = html()
        .create("li")
        .addChild(
          html()
            .create("a")
            .addAttribute("href", `/artists/${artist.id}`)
            .text(artist.name)
            .click(event => {
              event.preventDefault();
              const endpoint = event.target.getAttribute("href");
              Api().getRequest(`http://localhost:8080/api${endpoint}`, data => {
                this.renderPageSingle(data, endpoint);
              });
            })
        );
      albumArtist.addChild(artistElement);
    });
    const albumSong = html()
      .create("h4")
      .addChild(
        html()
          .create("a")
          .addAttribute("href", `/songs/${data.song.id}`)
          .text(data.song.songTitle)
          .click(event => {
            event.preventDefault();

            const endpoint = event.target.getAttribute("href");
            Api.getRequest(`http://localhost:8080/api${endpoint}`, data => {
              this.renderPageSingle(data, endpoint);
            });
          })
      );
    songAdd.addChild(songAddTitle).addChild(songAddButton);
    currentMainContentContainerContentBlock.replace(albumTitle);
    currentMainContentContainerContentBlock.addChild(albumArtist);
    currentMainContentContainerContentBlock.addChild(albumSong);
    currentMainContentContainerContentBlock.addChild(songAdd);
  }
  renderPageAlbums() {
    const currentMainContentContainer = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("albums"));
  }
  renderPageSong() {
    const currentMainContentContainerContentBlock = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container")
      .select(".content-block");
    const songTitle = html()
      .create("h3")
      .addClass("content-block_title")
      .text(data.songTitle);
  }
  renderPageSongs() {
    const currentMainContentContainer = this.renderWrapperDiv()
      .select(".main-content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("songs"));
  }

  renderPageSingle(data, endpoint) {
    const typeOfObject = endpoint.split('/')[1]
    if (typeOfObject === 'artists') {
      this.renderPageArtist(data);
    }
    if (typeOfObject === 'albums') {
      this.renderPageAlbum(data);
    }
    if (typeOfObject === 'songs') {
      this.renderPageSong(data);
    }
  }
  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.renderWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainContent = this.renderMainContent("artists");
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }

}
