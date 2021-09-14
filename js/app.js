const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  // const url = `https://raw.githubusercontent.com/biswajitdasme/fakestore/main/db.json?fbclid=IwAR0RY_CVLqpUeLLUGBwctC_DT5ZNHOuDfNoqTfRgfbTrIfGydxaegyOEvF4`;
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0Kd-gwiKHWGvnqtKxRvmYpdBDuePxvWPCOk-mS5_SbTUKiielG_IxZBS0`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
    <div>
  <img class="product-image" src=${image}></img>
    </div>
    <h4>${product.title}</h4>
    <p>Category: ${product.category}</p>
    <p>Rating: ${product?.rating?.rate}</p>
    <p>Average Count: ${product?.rating?.count}</p>
    <h3>Price: $ ${product.price}</h3>
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    <button id="details-btn" class="btn btn-danger">Details</button></div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (convertedOldPrice + convertPrice).toFixed(2);
  document.getElementById(id).innerText = total;
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = (
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax")
  ).toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};
