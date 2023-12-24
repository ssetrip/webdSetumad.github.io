//toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// toggel class active untuk search form
const searchform = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchform.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik  diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const closeCart = document.querySelector("#cart-close");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

//untuk klik search
document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchform.contains(e.target)) {
    searchform.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const itemDetailBagminu = document.querySelector("#item-detail-bagminu");
const itemDetailButtonsbg = document.querySelectorAll(".item-detail-buttonbg");
const itemDetailtuud = document.querySelector("#item-detail-tuud");
const itemDetailButtonstu = document.querySelectorAll(
  ".item-detail-buttontuud"
);

//untuk klik tombol  eye
itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});
itemDetailButtonsbg.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailBagminu.style.display = "flex";
    e.preventDefault();
  };
});
itemDetailButtonstu.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailtuud.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};
document.querySelector(".modalbg .close-icon").onclick = (e) => {
  itemDetailBagminu.style.display = "none";
  e.preventDefault();
};
document.querySelector(".modaltu .close-icon").onclick = (e) => {
  itemDetailtuud.style.display = "none";
  e.preventDefault();
};

// klik hilang modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
window.onclick = (e) => {
  if (e.target === itemDetailBagminu) {
    itemDetailBagminu.style.display = "none";
  }
};
window.onclick = (e) => {
  if (e.target === itemDetailtuud) {
    itemDetailtuud.style.display = "none";
  }
};

//===========Star document ready==============
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

//===========start============
function start() {
  addEvents();
}

//========updute===============
function update() {
  addEvents();
  updateTotal();
}

//=====addevent=====
function addEvents() {
  //remove item from carts
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  //chang item quqntity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  //add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  //====Buy Order==
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

//============handle event fungtion====================
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };
  //====handle item already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }
  //=======add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const shoppingCartBox = shoppingCart.querySelector(".cart-content");
  shoppingCartBox.appendChild(newNode);
  update();
}
//======handle remove cart item
function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

//======handle change quantity
function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to kepp it intenger

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to place yet! \n place Make an Order First.");
    return;
  }
  const shoppingCartBox = shoppingCart.querySelector(".cart-content");
  shoppingCartBox.innerHTML.innerHTML = "";
  alert("Your Order is place Sucsessfully :)");
  itemsAdded = [];

  update();
}
//=========updut& total================
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-item");
  const totalElement = shoppingCart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".product-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });
  //kep 2 digit after the decimal poin
  total = total.toFixed(3);
  //or your can use also
  // total= math.round(total *100) / 10
  totalElement.innerHTML = "$" + total;
}
//========================HTML component========
function CartBoxComponent(title, price, imgSrc) {
  return `
   <div class="cart-item">
   <img src=${imgSrc} alt="" class="cart-img" >
   <div class="item-detail">
     <div class="cart-product-title">${title}</div>
     <div class="product-price"> ${price}</div>
      <input type="number" value="1" class="cart-quantity">
   </div>
   <i class='bx bxs-trash-alt cart-remove'></i>
   </div>`;
}
