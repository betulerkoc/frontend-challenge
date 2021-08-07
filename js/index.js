class APIService {
  static URL = "http://localhost:3000";

  static async fetchResponses() {
    const url = APIService._constructUrl("responses");
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
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
    const response = await APIService.fetchResponses();
    Home.renderSideBarTitles(response.userCategories);
    Home.renderProductCards(response.recommendedProducts);
  }
}

class Home {
  static sidebar = document.getElementById("sidebar");
  static productCards = document.getElementById("productCards");

  static renderSideBarTitles(userCategories) {
    const sideBarItem = document.createElement("container");
    userCategories.map((item) => {
      const content = `
          <div class="nav-item">
              <p>${item}</p>
          </div>
              `;
      sideBarItem.innerHTML += content;
    });
    this.sidebar.appendChild(sideBarItem);
  }

  static renderProductCards(recommendedProducts) {
    const productCard = document.createElement("div");
    productCard.className = "row";

    const porductCardData = Object.entries(recommendedProducts)[0][1];

    const card = (item) => `
          <li class=card>
            <img src="${item.image}" class="card-img-top">
            <h5 class="card-title">${item.name}</h5>
            <p>${item.priceText}</p>
          </li>
      `;

    let content = `
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

document.addEventListener("DOMContentLoaded", App.run);
