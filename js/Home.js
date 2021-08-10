import Events from "./Events.js";

export default class Home {
  static sidebar = document.getElementById("sidebar");
  static productCards = document.getElementById("productCards");
  static popUp = document.getElementById("popUp");

  static renderSideBarTitles(response) {
    const sideBarItem = document.createElement("ul");
    response.userCategories.map((item, index) => {
      console.log(item);
      const content = `
            <div class="nav-item">
                <li>                       
                  <a class="nav-link" category-link-id="${index}" href="#" role="button"> ${item}</a>
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
            <li class="card">
              <img src="${item.image}" class="card-img-top">
              <p class="card-title">${item.name}</p>
              <div>
                <h4>${item.priceText}</h4>
              </div>
              ${item.params.shippingFee === "FREE" && `<p><i class="fa fa-truck"></i> Ücretsiz Kargo</p>`}
              <button type="button" class="btn btn-primary" btn-id=${index}>Sepete Ekle</button>
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

    if (productCards.firstChild) {
      productCards.removeChild(productCards.firstChild);
    }
    productCard.innerHTML = content;
    this.productCards.appendChild(productCard);
    Events.bindShowPopUp();
  }

  static renderPopUp() {
    const popUpContainer = document.createElement("div");
    popUpContainer.className = "popup";

    const content = `
        <div class="row">
          <div class="col-1">
          <i class="fa fa-check-circle"></i>
          </div>
          <div class="col-10">
            <h6>Ürün sepete eklendi.</h6> 
            <a>Sepete Git</a>
          </div>
          <div class="col-1">
            <i class="fa fa-times"></i>
          </div>
        </div>
      `;
    if (popUp.firstChild) {
      popUp.removeChild(popUp.firstChild);
    }
    popUpContainer.innerHTML = content;
    this.popUp.appendChild(popUpContainer);
  }
}
