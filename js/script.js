$(function() {
  /* per standards - keep variable and function declarations at top */

  var cart = []; /* global cart */

  /*------------------ FUNCTIONS -------------------*/

  /**
   * subcribeToEmail - Get email address from user.   Simulates subscription buy
   * showing message in log and directly in UI.
   *
   * @event  {type} standard click event
   * @return {type} undefined
   */
  function subcribeToEmail( event ) {
    var email = $("#email").val();
    var message = "Thanks for signing up for our mailing list, " + email;
    console.log(message);
    $("#aside-message").text(message);

    /* bypass normal processing because form is not really being submitted to server */
    event.preventDefault();
  }


  /**
   * addToCart - Adds a product to shopping cart
   *
   * @return {type}  undefined
   */
  function addToCart(){
    /* delete all existing rows - keep header */
    $("#cartTable tr").not(".headerRow").remove();

    /* locate table */
    var cartTable = document.getElementById("cartTable");

    /* generate grid rows for each cart item */
    for(var i in cart) {

      var row = cartTable.insertRow(1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = cart[i].name;
      cell2.innerHTML = cart[i].price;
    }

    /* show the dialog - this is wired directly on the cart icon */
  }


  /**
   * showAddToCartButton - shows the addToCart button.  Adds button to current
   * context so the button doesnt need to be coded in html for every product.
   *
   * @param  {type} e hover event
   * @return {type}   undefined
   */
  function showAddToCartButton(e){
    $(this).append($('<button class="buy"><i class="fa fa-cart-plus"></i></button>'));
    $(this).find(".buy").click(function(){

      /* add to cart */
      var prodName = $(this.parentElement).find("h3").text();
      var prodPrice = $(this.parentElement).find(".price").text();
      cart.push({name:prodName, price:prodPrice});

      /* show count in badge */
      var badge = $("header").find('.badge');
      badge.text(cart.length);
    })
  }

  /**
   * hideAddToCartButton - hides the addToCart button
   *
   * @return {type}  description
   */
  function hideAddToCartButton(){
    $(this).find(".buy").remove();
  }



  /**
   * loadProducts - read product data from json and use to build product panel.
   *
   * @return {type}  undefined
   */
  function loadProducts() {
    // find the item-container (where products live).
    var productContainter = document.getElementById('item-container');

    // loop through each product
    /* here's our template
    <div class="product">
      <h3>Reversible Plaid</h3>
      <img src="images/reversible-plaid.jpg" alt="reversible plaid scarf">
      <p class="block-with-text">Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.</p>
      <p class="price">26.99</p>
    </div>
    */
    for (var i in products) {
      // make div wrapper
      var prodPanel = document.createElement("div");
      prodPanel.setAttribute("class", "product");

      // add title
      var prodTitle = document.createElement("h3");
      var prodTitleText = document.createTextNode(products[i].name);
      prodTitle.appendChild(prodTitleText);
      prodPanel.appendChild(prodTitle);

      // add image
      var prodImage = document.createElement("img");
      prodImage.setAttribute("src", "./images/" + products[i].imageTitle);
      prodImage.setAttribute("alt", products[i].imageAlt); // todo: update data so we can load .imageAltText
      prodPanel.appendChild(prodImage);

      // add description
      var prodDescription = document.createElement("p");
      prodDescription.setAttribute("class", "block-with-text");
      var prodDescriptionText = document.createTextNode(products[i].description);
      prodDescription.appendChild(prodDescriptionText);
      prodPanel.appendChild(prodDescription);

      // add price
      var prodPrice = document.createElement("p");
      prodPrice.setAttribute("class", "price");
      var prodPriceText = document.createTextNode(products[i].price);
      prodPrice.appendChild(prodPriceText);
      prodPanel.appendChild(prodPrice);

      // finally add the panel to the container
      productContainter.appendChild(prodPanel);
    } // end for loop


  } // end loadProducts function



  /*------------------ DATA -------------------*/

  // Data is imbedded.  To use ajax load, you need a server.
  var products = [{
      "name": "Reversible Plaid",
      "price": 26.99,
      "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
      "imageTitle": "reversible-plaid.jpg",
      "imageAlt":"reversible plaid scarf",
      "type":"s"
    },
    {
      "name": "Wool Cable Knit",
      "price": 49.99,
      "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
      "imageTitle": "wool-cable.jpeg",
      "imageAlt":"wool cable knit scarf",
      "type":"s"
    },
    {
      "name": "Northern Lights",
      "price": 29.99,
      "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
      "imageTitle": "northern-lights.jpg",
      "imageAlt":"norther lights scarf",
      "type":"s"
    },
    {
      "name": "Ombre Infinity",
      "price": 11.99,
      "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
      "imageTitle": "ombre-infinity.jpg",
      "imageAlt":"ombre infinity scarf",
      "type":"s"
    },
    {
      "name": "Fringed Plaid",
      "price": 18.99,
      "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
      "imageTitle": "fringed-plaid.jpeg",
      "imageAlt":"fringed plaid scarf",
      "type":"s"
    },
    {
      "name": "Multi Color",
      "price": 22.99,
      "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
      "imageTitle": "multi-color.jpeg",
      "imageAlt":"multi color scarf",
      "type":"s"
    },
    {
      "name": "Etro Paisley-Print Silk",
      "price": 249.99,
      "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
      "imageTitle": "etro.png",
      "imageAlt":"northern lights scarf",
      "type":"s"
    },
    {
      "name": "Ashby Twill",
      "price": 70.99,
      "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
      "imageTitle": "twill.jpg",
      "imageAlt":"ashby twill scarf",
      "type":"s"
    }
  ]


  /*------------------ LOAD DATA -------------------*/
  // on load... must occur before event wireup.  Can't wireup events to controls
  // until they exist.
  loadProducts();

  /*------------------ EVENTS -------------------*/
  $( "#mail-form" ).submit(subcribeToEmail);
  $(".fa-shopping-cart").click(addToCart);
  $(".product").hover(showAddToCartButton, hideAddToCartButton);

});
