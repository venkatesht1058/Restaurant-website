let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Greek Salad",
        tag: "greeksalad",
        price: 25,
        inCart: 0,
        inwishList: 0
    },
    {
        name: "Lasagne",
        tag: "lasagne",
        price: 40,
        inCart: 0,
        inwishList: 0

    },
    {
        name: "Butternut Pumpkin",
        tag: "butternutpumpkin",
        price: 10,
        inCart: 0,
        inwishList: 0

    },
    {
        name: "Tokusen Wagyu",
        tag: "tokusenwagyu",
        price: 39,
        inCart: 0,
        inwishList: 0

    },
    {
        name: "Olivas Rellenas",
        tag: "olivasrellenas",
        price: 25,
        inCart: 0,
        inwishList: 0

    },
    {
        name: "Opu Fish",
        tag: "opufish",
        price: 49,
        inCart: 0,
        inwishList: 0

    }
];



for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}



let addCart = document.querySelector('.cart-modal-body')
addCart.innerHTML += `<div class="products-container container-fluid ">
                         <div class="products ">

                         </div>
                     </div>`


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item) => {
            productContainer.innerHTML +=
        `<div class="container-fluid containerCartItems w-100">
                   <div class="product w-25 mt-4">
                       <ion-icon name="close-circle" class="text-danger"></ion-icon>
                       <img src="Images/${item.tag}.png" />
                       <span class="sm-hide">${item.name}</span>
                   </div>
                   <div class="price sm-hide  mt-5 ">$${item.price}.00</div>
                   <div class="quantity  mt-5">
                           <ion-icon name="remove-circle" class="decrease text-info"></ion-icon>
                           <span>${item.inCart}</span>
                           <ion-icon name="add-circle" class="increase text-info"></ion-icon>
                   </div>
                   <div class="total  mt-5 ">$${item.inCart * item.price}.00</div> 
                 
        </div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer container-fluid">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}



onLoadCartNumbers();
displayCart();




// wishlist items

let wishListBtn = document.querySelectorAll('.wishlistItem')

for (let i = 0; i < wishListBtn.length; i++) {
    wishListBtn[i].addEventListener('click', () => {

        wishListNumbers(products[i])
    })
}

function onLoadWishList() {
    let wishListProducts = localStorage.getItem('wishListNumbers')

    if (wishListProducts) {

        document.querySelector('.wishlist1 span').textContent = wishListProducts

    }
}


function wishListNumbers(product, action) {

    let wishListProducts = localStorage.getItem('wishListNumbers')
    wishListProducts = parseInt(wishListProducts)

    let wishListItems = localStorage.getItem("productsInWishList")
    wishListItems = JSON.parse(wishListItems)



    if (action) {
        localStorage.setItem('wishListNumbers', wishListProducts - 1);
        document.querySelector('.wishlist1 span').textContent = wishListProducts - 1;
        console.log("action running");
    }

    else if (wishListProducts) {

        if (wishListItems[product.tag] == null) {
            localStorage.setItem('wishListNumbers', wishListProducts + 1)

            document.querySelector('.wishlist1 span').textContent = wishListProducts + 1
        }

    }
    else {
        localStorage.setItem('wishListNumbers', 1)

        document.querySelector('.wishlist1 span').textContent = 1
    }
    setWishList(product)
}


function setWishList(product) {

    let wishListItems = localStorage.getItem("productsInWishList")

    wishListItems = JSON.parse(wishListItems)

    if (wishListItems != null) {

        if (wishListItems[product.tag] != null) {

            alert("Already in WishList")

        }

        else if (wishListItems[product.tag] == undefined) {

            wishListItems = {
                ...wishListItems,
                [product.tag]: product
            }

            wishListItems[product.tag].inwishList += 1

        }


    }
    else {

        product.inwishList = 1

        wishListItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInWishList', JSON.stringify(wishListItems))

}




let wishlist = document.querySelector('.wishlist-modal-body')

wishlist.innerHTML += `
                     <div class="d-flex justify-content-between">
                         <h3 >PRODUCTS</h3>
                         <h3>PRICE</h3>
                     </div>
                     <hr class="line">
                     <div class="wishlistContainer">
                        
                     </div> `


function displayWishList() {
    let wishListItems = localStorage.getItem('productsInWishList');
    wishListItems = JSON.parse(wishListItems);


    let wishProductContainer = document.querySelector('.wishlistContainer');

    if (wishListItems && wishProductContainer) {
        wishProductContainer.innerHTML = '';
        Object.values(wishListItems).map((item) => {
            wishProductContainer.innerHTML +=
                `<div class="wishproduct d-flex justify-content-between">
                   <div class="mt-3 productName">
                         <ion-icon name="close-circle" class="text-danger"></ion-icon>
                         <img src="Images/${item.tag}.png" />
                         <span class="sm-hide">${item.name}</span>
                    </div>
                    <div class="mt-5 productName">
                             <span class="price sm-hide">$${item.price}.00</span>
                    </div>
                </div>
               `;
        });
        deleteButton()

    }

}


function deleteButton() {
    let deleteButtons = document.querySelectorAll('.wishproduct ion-icon');
    let wishListNumbers = localStorage.getItem('wishListNumbers');
    let wishListItems = localStorage.getItem('productsInWishList');
    wishListItems = JSON.parse(wishListItems);
    let productName;
    console.log(wishListItems);


    for (let i = 0; i < deleteButtons.length; i++) {


        deleteButtons[i].addEventListener('click', () => {

            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('wishListNumbers', wishListNumbers - wishListItems[productName].inwishList);

            delete wishListItems[productName];

            localStorage.setItem('productsInWishList', JSON.stringify(wishListItems));



            displayWishList();
            onLoadWishList();

        })

    }
}



onLoadWishList()
displayWishList()




