$(function() {
  /* per standards - keep variable and function declarations at top */

  var cart = []; /* global cart */

  /*------------------ FUNCTIONS -------------------*/

  /**
   * subcribeToEmail - Get email address from user.   Simulates subscription by
   * showing message directly in UI.
   *
   * @event  {type} standard click event
   * @return {type} undefined
   */
  function subcribeToEmail(event) {
    var email = $('#email').val();
    var message = '';

    // blank email is already checked via required field attribute, this is a fallback check.
    if (email) {
      message = 'Thanks for signing up for our mailing list, ' + email;
      showAlert(message, 'alert-success');
    } else {
      message = 'Please enter a valid email address.';
      showAlert(message, 'alert-danger');
    }

    /* bypass normal processing because form is not really being submitted to server */
    event.preventDefault();
  }


  /**
   * buildCartDialog - builds UI of the cart object
   *
   * @return {type}  undefined
   */
  function buildCartDialog() {
    /* delete all existing rows - keep header */
    $('#cartTable tr').not('.headerRow').remove();

    /* locate table */
    var cartTable = document.getElementById('cartTable');

    /* generate grid rows for each cart item */
    for (var i in cart) {

      var row = cartTable.insertRow(1);

      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      cell0.innerHTML = cart[i].id;
      cell1.innerHTML = cart[i].name;
      cell2.innerHTML = cart[i].price;

      // create button and append to cell
      var removeButton = document.createElement('button');
      removeButton.innerHTML = '&times;';
      removeButton.addEventListener('click', function(e) {
        var rowIndex = e.currentTarget.parentElement.parentElement.rowIndex; // button -> TD -> TR -> rowIndex

        // remove from data structure
        var id = cartTable.rows[rowIndex].cells[0].innerText;
        removeItemFromCart(id);

        // remove from UI
        cartTable.deleteRow(rowIndex);

        refreshBadge();
      });
      cell3.appendChild(removeButton);
    }

    /* show the dialog - this is wired directly on the cart icon */
  }


  /**
   * removeItemFromCart - Removes an item from cart by id
   *
   * @param  {type} id id of product to remove
   * @return {type}    undefined
   */
  function removeItemFromCart(id) {
    for (var i in cart) {
      if (cart[i].id == id) {
        cart.splice(i, 1);
      }
    }

    saveCartTolocalStorage();
  }

  /**
   * showAddToCartButton - shows the addToCart button.  Adds button to current
   * context so the button doesnt need to be coded in html for every product.
   *
   * @param  {type} e hover event
   * @return {type}   undefined
   */
  function showAddToCartButton(e) {
    // find closes product and highlight
    $(this.firstElementChild).addClass('highlight');

    // the event is on the outer panel, but we want button in the inner panel.  So use firstElementChild
    $(this.firstElementChild).append($("<button class='addToCart'><i class='fa fa-cart-plus'></i></button>"));
    $(this.firstElementChild).find('.addToCart').click(function(event) {

      /* add to cart */
      var prodId = $(this.parentElement).find('.prodId').text();
      var prodName = $(this.parentElement).find('h3').text();
      var prodPrice = $(this.parentElement).find('.price').text();
      cart.push({
        id: prodId,
        name: prodName,
        price: prodPrice
      });
      saveCartTolocalStorage();


      refreshBadge();

      event.stopPropagation(); // so panel (behind button) does not receive click.
    })
  }


  /**
   * saveCartTolocalStorage - put cart contents into localStorage
   *
   * @return {type}  description
   */
  function saveCartTolocalStorage() {
    var jsonStr = JSON.stringify(cart);
    localStorage.setItem('cart', jsonStr);
  }


  /**
   * refreshBadge - updates the count in the cart badge
   *
   * @return {type}  undefined
   */
  function refreshBadge() {
    /* show count in badge */
    var badge = $('header').find('.badge');
    if (cart) {
      badge.text(cart.length);
    }
  }

  /**
   * hideAddToCartButton - hides the addToCart button
   *
   * @return {type}  description
   */
  function hideAddToCartButton() {
    $(this).find('.addToCart').remove();
    $(this.firstElementChild).removeClass('highlight');
  }


  /**
   * showalert - helper to show bootstrap alert
   *
   * @param  {type} message   text message to show
   * @param  {type} alerttype type of alert
   * @return {type}           undefined
   */
  function showAlert(message, alerttype) {
    $('#alert_placeholder').append(
      "<div id='alertdiv' class='alert " + alerttype + " alert-dismissible' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + message + '</div>'
    );

    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
      $('#alertdiv').remove();
    }, 5000);

  }

  /**
   * loadProducts - read product data from json and use to build product panel.
   *
   * @return {type}  undefined
   */
  function loadProducts() {
    // find the item-container (where products live).
    var productContainer = document.getElementById('item-container');

    // loop through each product
    /* here's our template
    <div class='product'>
      <h3>Reversible Plaid</h3>
      <img src='images/reversible-plaid.jpg' alt='reversible plaid scarf'>
      <p class='block-with-text'>Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.</p>
      <p class='price'>26.99</p>
    </div>
    */
    for (var i in products) {
      // make div wrapper
      var prodPanel = document.createElement('div');
      prodPanel.setAttribute('class', 'panel panel-default product');

      // make panel body
      var prodPanelBody = document.createElement('div');
      prodPanelBody.setAttribute('class', 'panel-body ');

      // add title
      var prodTitle = document.createElement('h3');
      var prodTitleText = document.createTextNode(products[i].name);
      prodTitle.appendChild(prodTitleText);
      prodPanelBody.appendChild(prodTitle);

      // add image
      var prodImage = document.createElement('img');
      prodImage.setAttribute('src', './images/' + products[i].imageTitle);
      prodImage.setAttribute('alt', products[i].imageAlt); // todo: update data so we can load .imageAltText
      prodPanelBody.appendChild(prodImage);

      // add description
      var prodDescription = document.createElement('p');
      prodDescription.setAttribute('class', 'prodDescription block-with-text');
      var prodDescriptionText = document.createTextNode(products[i].description);
      prodDescription.appendChild(prodDescriptionText);
      prodPanelBody.appendChild(prodDescription);

      // add price
      var prodPrice = document.createElement('p');
      prodPrice.setAttribute('class', 'price');
      var prodPriceText = document.createTextNode(products[i].price);
      prodPrice.appendChild(prodPriceText);
      prodPanelBody.appendChild(prodPrice);

      // add hidden id
      var prodId = document.createElement('p');
      prodId.setAttribute('class', 'prodId');
      prodId.setAttribute('hidden', 'hidden');
      var prodIdText = document.createTextNode(products[i].id);
      prodId.appendChild(prodIdText);
      prodPanelBody.appendChild(prodId);

      // make panel footer
      //var prodPanelFooter = document.createElement('div');
      //prodPanelFooter.setAttribute('class', 'panel-footer');

      // finally add the panel to the container
      prodPanel.appendChild(prodPanelBody);
      //prodPanel.appendChild(prodPanelFooter);
      productContainer.appendChild(prodPanel);
    } // end for loop


  } // end loadProducts function




  /**
   * showDetails - pulls details from the clicked item and shows it in
   * a modal dialog.
   *
   * @return {type}  description
   */
  function showDetails(){
    // get fields
    var prodId = $(this).find('.prodId').text();
    var prodName = $(this).find('h3').text();
    var prodPrice = $(this).find('.price').text();
    var prodDescription = $(this).find('.prodDescription').text();
    var prodURL = $(this).find('img').attr('src');
    console.log(prodURL);

    // plug data to dialog
    var modalId = $('#modal-id');
    modalId.text(prodId);

    var title = $('#modal-title');
    title.text(prodName);

    var modalDescription = $('#modal-description');
    modalDescription.text(prodDescription);

    var modalImg = $('#modal-image');
    modalImg.attr('src', prodURL);

    var modalPrice = $('#modal-price');
    modalPrice.text(prodPrice);

    // show dialog
    $('#prodDetail').modal('show');
  }


  /**
   * detailToCart - get fields from detail dialog and add to cart.
   *
   * @return {type}  undefined
   */
  function detailToCart(){
    var prodId = $(this.parentElement.parentElement).find('#modal-id').text();
    var prodName = $(this.parentElement.parentElement).find('#modal-title').text();
    var prodPrice = $(this.parentElement.parentElement).find('#modal-price').text();
    cart.push({
      id: prodId,
      name: prodName,
      price: prodPrice
    });

    refreshBadge();
    saveCartTolocalStorage();


    // close dialog
    $('#prodDetail').modal('toggle');
  }


  /**
   * reloadCartFromLocalStorage - reload cart from storage and refresh badge
   *
   * @return {type}  description
   */
  function loadCartFromLocalStorage(){
    var cartValue = localStorage.getItem( 'cart' );
    cart = JSON.parse( cartValue );
    if (cart == null) {
      cart = [];
    }

  }



  /*------------------ DATA -------------------*/

  // Data is imbedded.  To use ajax load, you need a server.
  var products = [{
      'id': 1,
      'name': 'Reversible Plaid',
      'price': 26.99,
      'description': 'Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.',
      'imageTitle': 'reversible-plaid-200w.jpg',
      'imageAlt': 'reversible plaid scarf',
      'type': 's'
    },
    {
      'id': 2,
      'name': 'Wool Cable Knit',
      'price': 49.99,
      'description': "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
      'imageTitle': 'wool-cable-200w.jpg',
      'imageAlt': 'wool cable knit scarf',
      'type': 's'
    },
    {
      'id': 3,
      'name': 'Northern Lights',
      'price': 29.99,
      'description': 'Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.',
      'imageTitle': 'northern-lights-200w.jpg',
      'imageAlt': 'norther lights scarf',
      'type': 's'
    },
    {
      'id': 4,
      'name': 'Ombre Infinity',
      'price': 11.99,
      'description': 'A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.',
      'imageTitle': 'ombre-infinity-200w.jpg',
      'imageAlt': 'ombre infinity scarf',
      'type': 's'
    },
    {
      'id': 5,
      'name': 'Fringed Plaid',
      'price': 18.99,
      'description': 'Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.',
      'imageTitle': 'fringed-plaid-200w.jpeg',
      'imageAlt': 'fringed plaid scarf',
      'type': 's'
    },
    {
      'id': 6,
      'name': 'Multi Color',
      'price': 22.99,
      'description': 'The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic',
      'imageTitle': 'multi-color-200w.jpeg',
      'imageAlt': 'multi color scarf',
      'type': 's'
    },
    {
      'id': 7,
      'name': 'Etro Paisley-Print Silk',
      'price': 249.99,
      'description': 'Luxurious silk scarf with subtle paisley pattern. 100% silk',
      'imageTitle': 'etro-200w.png',
      'imageAlt': 'northern lights scarf',
      'type': 's'
    },
    {
      'id': 8,
      'name': 'Ashby Twill',
      'price': 70.99,
      'description': "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
      'imageTitle': 'twill-200w.jpg',
      'imageAlt': 'ashby twill scarf',
      'type': 's'
    }
  ]



  /*------------------ LOAD DATA -------------------*/
  // on load... must occur before event wireup.  Can't wireup events to controls
  // until they exist.
  loadProducts();
  loadCartFromLocalStorage();
  refreshBadge();

  /*------------------ EVENTS -------------------*/
  $('#mail-form').submit(subcribeToEmail);  // subscribe to mailing list
  $('.fa-shopping-cart').click(buildCartDialog); // show whats in cart
  $('.product').hover(showAddToCartButton, hideAddToCartButton); // show add-to-cart button
  $('.product').on('click', showDetails); // show product details
  $('#detailAddToCart').on('click', detailToCart); // add-to-cart button in detail dialog
});
