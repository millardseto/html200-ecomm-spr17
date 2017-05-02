$(function() {
  /* per standards - keep variable and function declarations at top */

  var cart = []; /* global cart */

  /**
   * subcribeToEmail - Get email address from user.   Simulates subscription buy
   * showing message in log and directly in UI.
   *
   * @event  {type} standard click event
   * @return {type} none
   */
  function subcribeToEmail( event ) {
    var email = $("#email").val();
    var message = "Thanks for signing up for our mailing list, " + email;
    console.log(message);
    $("#aside-message").text(message);

    /* bypass normal processing because form is not really being submitted to server */
    event.preventDefault();
  }



  $( "#mail-form" ).submit(subcribeToEmail);



  /* Adds item to cart */
  $(".fa-shopping-cart").click(function(){
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
  });

  $(".product").hover(
    function(e){
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
    },
    function(){
      $(this).find(".buy").remove();
    });


  var products = [{
      "name": "Reversible Plaid",
      "price": 26.99,
      "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
      "imageTitle": "reversible-plaid.jpg"
    },
    {
      "name": "Wool Cable Knit",
      "price": 49.99,
      "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
      "imageTitle": "wool-cable.jpeg"
    },
    {
      "name": "Northern Lights",
      "price": 29.99,
      "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
      "imageTitle": "northern-lights.jpg"
    },
    {
      "name": "Ombre Infinity",
      "price": 11.99,
      "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
      "imageTitle": "ombre-infinity.jpg"
    },
    {
      "name": "Fringed Plaid",
      "price": 18.99,
      "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
      "imageTitle": "fringed-plaid.jpeg"
    },
    {
      "name": "Multi Color",
      "price": 22.99,
      "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
      "imageTitle": "multi-color.jpeg"
    },
    {
      "name": "Etro Paisley-Print Silk",
      "price": 249.99,
      "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
      "imageTitle": "etro.png"
    },
    {
      "name": "Ashby Twill",
      "price": 70.99,
      "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
      "imageTitle": "twill.jpg"
    }
  ]

});
