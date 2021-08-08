class APIService {
  static URL = "http://localhost:3000";

  static async fetchResponses() {
    const url = APIService._constructUrl("responses");
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data[0][0].params;
  }
  static async fetchCampaigns() {
    const url = APIService._constructUrl("campaigns");
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static _constructUrl(path) {
    return `${this.URL}/${path}`;
  }
}

class App {
  static async run() {
    const defaultIndex = 0;
    const response = await APIService.fetchResponses();
    Home.renderSideBarTitles(response);
    Home.renderProductCards(response, defaultIndex);
  }
}

class Home {
  static sidebar = document.getElementById("sidebar");
  static productCards = document.getElementById("productCards");

  static renderSideBarTitles(response) {
    const sideBarItem = document.createElement("ul");
    response.userCategories.map((item, index) => {
      console.log(item);
      const content = `
          <div class="nav-item">
              <li>                       
                <p class="nav-link" category-link-id="${index}" href="#" role="button"> ${item}</p>
              </li>
          </div>
              `;
      sideBarItem.innerHTML += content;
    });
    this.sidebar.appendChild(sideBarItem);
    Events.bindCategoryListener(response);
  }

  static renderProductCards(response, index) {
    const productCard = document.createElement("div");
    productCard.className = "row";
    const porductCardData = Object.entries(response.recommendedProducts)[
      index
    ][1];
    const card = (item) => `
          <li class=card>
            <img src="${item.image}" class="card-img-top">
            <h5 class="card-title">${item.name}</h5>
            <p>${item.priceText}</p>
          </li>
      `;

    const content = `
          <div class="col-12">
              <div class="product-list">
                  <ol class="productCard scroller">
                      ${porductCardData.reduce(
                        (items, item) => items + card(item),
                        ""
                      )}
                  </ol>
              </div>
          </div>
      `;

    productCard.innerHTML = content;
    this.productCards.appendChild(productCard);
  }
}

class Events {
  static bindCategoryListener(response) {
    console.log("hello");
    const categoryLinks = document.querySelectorAll("[category-link-id]");
    categoryLinks.forEach((link, index) => {
      link.addEventListener("click", function (e) {
        Home.renderProductCards(response, index);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", App.run);
