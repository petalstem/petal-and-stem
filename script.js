/* ==========================================================================
   PETAL AND STEM — script.js

   Handmade flowers crafted with love in Lupon, Davao Oriental.

   Sections:
   - Config
   - Product Data
   - State / LocalStorage
   - Elements
   - Product Rendering
   - Filtering
   - Search
   - Product Modal
   - Favorites
   - Cart
   - Toast
   - Navigation
   - Custom Order Modal
   - Contact Form
   - Newsletter
   - Form Validation
   - Scroll Animations
   - Init
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG
  ------------------------------------------------------------------ */

  const SHOP_NAME = 'Petal and Stem';

  /*
     IMPORTANT:
     Replace this with your actual Facebook Messenger link.

     Example:
     https://m.me/yourpageusername

     Do not leave the placeholder when your website goes live.
  */
  const MESSENGER_URL = 'https://m.me/itsmetheIT';

  /* Update all brand-name elements automatically */
  document.querySelectorAll('[data-brand-name]').forEach(function (el) {
    el.textContent = SHOP_NAME;
  });


  /* ------------------------------------------------------------------
     PRODUCT DATA

     Categories:
     - satin-ribbon
     - fuzzy-wire
     - special-sets
     - custom

     Prices are in Philippine pesos.
  ------------------------------------------------------------------ */

  const products = [

    {
      id: 1,
      name: 'Round forget-me-nots',
      category: 'bouquets',
      price: 500,
      description:
        'A beautiful round bouquet of handmade satin ribbon roses, carefully arranged for a full and elegant look.',
      image: 'assets/img/products/blue.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },

    {
      id: 2,
      name: 'Pink lilies with gerbera chrysanthemum and tulips',
      category: 'arrangements',
      price: 450,
      description:
        'A colorful handmade arrangement featuring pink lilies, gerbera, chrysanthemums, and tulips, carefully crafted from satin ribbon.',
      image: 'assets/img/products/great-pink.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },

    {
      id: 3,
      name: '100 pcs bills Round bouquet',
      category: 'gifts',
      price: 550,
      description:
        'A unique round money bouquet featuring 100 pieces of bills, thoughtfully arranged to create a memorable gift for a special occasion.',
      image: 'assets/img/products/huge-flower.jpg',
      type: 'Money Bouquet',
      available: true,
      featured: true
    },

    {
      id: 4,
      name: '10 pcs money bouquet',
      category: 'gifts',
      price: 550,
      description:
        'A creative money bouquet featuring 10 pieces of bills, beautifully arranged as a fun and thoughtful gift.',
      image: 'assets/img/products/money-blue.jpg',
      type: 'Money Bouquet',
      available: true,
      featured: false
    },

    {
      id: 6,
      name: 'Blue lilies with carnation and tulips',
      category: 'arrangements',
      price: 550,
      description:
        'A lovely handmade arrangement featuring blue lilies, carnations, and tulips, carefully arranged for a soft and elegant look.',
      image: 'assets/img/products/flower-blue.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: false
    },

    {
      id: 7,
      name: '',
      category: 'bouquets',
      price: 550,
      description:
        'A handcrafted floral bouquet made with lasting materials, thoughtfully arranged for special moments and meaningful occasions.',
      image: 'assets/img/products/green.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },

    {
      id: 8,
      name: 'Sunflowers',
      category: 'bouquets',
      price: 350,
      description:
        'A bright handmade sunflower bouquet crafted from satin ribbon, perfect for adding a cheerful touch to any special occasion.',
      image: 'assets/img/products/yellow.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },

    {
      id: 9,
      name: 'Round Fuzzy wire Tulips with Fairy Lights',
      category: 'arrangements',
      price: 550,
      description:
        'A charming round arrangement of handmade fuzzy wire tulips decorated with fairy lights for a warm and magical look.',
      image: 'assets/img/products/tula.jpg',
      type: 'Fuzzy Wire',
      available: true,
      featured: true
    },

    {
      id: 10,
      name: '',
      category: 'gifts',
      price: 0,
      description:
        'A special handmade floral gift created for meaningful occasions, designed to make someone feel loved and appreciated.',
      image: 'assets/img/products/qt.jpg',
      type: 'Special Set',
      available: true,
      featured: true
    },

    {
      id: 17,
      name: 'Money Bouquet',
      category: 'gifts',
      price: 500,
      description:
        'A thoughtful money bouquet combining handmade flowers and bills to create a unique and memorable gift for special occasions.',
      image: 'assets/img/products/money-pink.jpg',
      type: 'Money Bouquet',
      available: true,
      featured: false
    },

    {
      id: 18,
      name: 'Round satin roses',
      category: 'bouquets',
      price: 600,
      description:
        'A classic round bouquet of handmade satin roses, carefully arranged to create an elegant and long-lasting floral gift.',
      image: 'assets/img/products/Purple_Satin_Rose.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: false
    },

    {
      id: 19,
      name: 'Sunflowers with fairy lights',
      category: 'arrangements',
      price: 355,
      description:
        'A cheerful handmade sunflower arrangement decorated with fairy lights, creating a warm and beautiful gift for special occasions.',
      image: 'assets/img/products/light-yellow.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },
    {
      id: 20,
      name: 'Rose in a cone',
      category: 'gifts',
      price: 100,
      description:
        'A simple handmade satin ribbon rose presented in a cone-style wrap, perfect as a small and thoughtful gift.',
      image: 'assets/img/products/rose.jpg',
      type: 'Satin Ribbon',
      available: true,
      featured: true
    },

    {
      id: 21,
      name: 'Custom Bouquet',
      category: 'custom',
      price: 500,
      description:
        'Have something special in mind? Tell us your colors, occasion, preferred flower style, and budget, and we will create a bouquet made especially for you.',
      image: 'assets/img/products/custom-bouquet.jpg',
      type: 'Custom',
      available: true,
      featured: true
    }

  ];

  /* ------------------------------------------------------------------
     STATE
  ------------------------------------------------------------------ */

  let currentFilter = 'all';
  let currentSearch = '';

  let cart = loadFromStorage('petalandstem_cart', []);
  let favorites = loadFromStorage('petalandstem_favorites', []);


  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }


  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /*
        localStorage unavailable.
        Cart/favorites will still work during the current session.
      */
    }
  }


  /* ------------------------------------------------------------------
     ELEMENTS
  ------------------------------------------------------------------ */

  const productsGrid = document.getElementById('productsGrid');
  const productsEmpty = document.getElementById('productsEmpty');
  const filterGroup = document.getElementById('filterGroup');
  const searchInput = document.getElementById('productSearch');


  /* ------------------------------------------------------------------
     PRICE FORMAT
  ------------------------------------------------------------------ */

  function formatPrice(amount) {
    return '₱' + Number(amount).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }


  /* ------------------------------------------------------------------
     PRODUCT FILTERING
  ------------------------------------------------------------------ */

  function getVisibleProducts() {

    return products.filter(function (product) {

      const matchesFilter =
        currentFilter === 'all' ||
        product.category === currentFilter;

      const query = currentSearch.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

  }




  /* ------------------------------------------------------------------
     PAGINATION
  ------------------------------------------------------------------ */

  const PRODUCTS_PER_PAGE = 4;

  let visibleCount = PRODUCTS_PER_PAGE;

  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const showMoreBtn = document.getElementById('showMoreBtn');


  /* ------------------------------------------------------------------
     PRODUCT RENDERING
  ------------------------------------------------------------------ */

  function renderProducts() {

    if (!productsGrid) return;

    const allMatches = getVisibleProducts();

    const visibleProducts = allMatches.slice(0, visibleCount);

    productsGrid.innerHTML = '';

    if (productsEmpty) {
      productsEmpty.hidden = allMatches.length !== 0;
    }

    visibleProducts.forEach(function (product) {

      const isFavorite = favorites.includes(product.id);

      const card = document.createElement('article');

      card.className = 'product-card';

      card.innerHTML =

        '<div class="product-card__media" data-open-product="' +
        product.id +
        '">' +

        '<img src="' +
        product.image +
        '" alt="' +
        escapeHtml(product.name) +
        '" loading="lazy" onerror="this.style.display=\'none\'">' +

        '<button ' +
        'type="button" ' +
        'class="fav-btn' +
        (isFavorite ? ' is-active' : '') +
        '" ' +
        'data-fav="' +
        product.id +
        '" ' +
        'aria-label="' +
        (isFavorite
          ? 'Remove from favorites'
          : 'Add to favorites') +
        '" ' +
        'aria-pressed="' +
        isFavorite +
        '">' +

        '<i class="fa-' +
        (isFavorite ? 'solid' : 'regular') +
        ' fa-heart" aria-hidden="true"></i>' +

        '</button>' +

        '<span class="product-card__type">' +
        escapeHtml(product.type) +
        '</span>' +

        '</div>' +

        '<div class="product-card__body">' +

        '<h3 data-open-product="' +
        product.id +
        '">' +
        escapeHtml(product.name) +
        '</h3>' +

        '<p class="product-card__desc">' +
        escapeHtml(product.description) +
        '</p>' +

        '<div class="product-card__footer">' +

        '<span class="product-card__price">' +
        formatPrice(product.price) +
        '</span>' +

        '<button ' +
        'type="button" ' +
        'class="add-cart-btn" ' +
        'data-add-to-cart="' +
        product.id +
        '"' +
        (product.available ? '' : ' disabled') +
        '>' +

        (product.available ? 'Add to Cart' : 'Currently Unavailable') +

        '</button>' +

        '</div>' +

        '</div>';

      productsGrid.appendChild(card);

    });

    /* Show/hide + label the "See More" button */

    if (loadMoreWrap && showMoreBtn) {

      const remaining = allMatches.length - visibleProducts.length;

      loadMoreWrap.hidden = remaining <= 0;

      showMoreBtn.textContent =
        remaining > 0
          ? 'See More (' + remaining + ' more)'
          : 'See More';

    }

  }


  /* ------------------------------------------------------------------
     FILTERING
  ------------------------------------------------------------------ */

  function setFilter(filter) {

    currentFilter = filter;

    visibleCount = PRODUCTS_PER_PAGE; // reset pagination on filter change

    document.querySelectorAll('.filter-btn').forEach(function (button) {

      button.classList.toggle(
        'is-active',
        button.dataset.filter === filter
      );

    });

    renderProducts();

  }


  /* ------------------------------------------------------------------
     HTML ESCAPING
  ------------------------------------------------------------------ */

  function escapeHtml(value) {

    const div = document.createElement('div');

    div.textContent = value == null ? '' : String(value);

    return div.innerHTML;

  }


  /* ------------------------------------------------------------------
     FILTERING
  ------------------------------------------------------------------ */

  if (filterGroup) {

    filterGroup.addEventListener('click', function (event) {

      const button = event.target.closest('.filter-btn');

      if (!button) return;

      setFilter(button.dataset.filter);

    });

  }


  // function setFilter(filter) {

  //   currentFilter = filter;

  //   document.querySelectorAll('.filter-btn').forEach(function (button) {

  //     button.classList.toggle(
  //       'is-active',
  //       button.dataset.filter === filter
  //     );

  //   });

  //   renderProducts();

  // }


  /*
     Footer/category links can use:

     data-filter-link="satin-ribbon"

     or:

     data-filter-target="fuzzy-wire"
  */

  document
    .querySelectorAll('[data-filter-link], [data-filter-target]')
    .forEach(function (element) {

      element.addEventListener('click', function () {

        const target =
          element.dataset.filterLink ||
          element.dataset.filterTarget;

        if (!target) return;

        setFilter(target);

      });

    });


  /* ------------------------------------------------------------------
   SEARCH
------------------------------------------------------------------ */

  let searchDebounce;

  if (searchInput) {

    searchInput.addEventListener('input', function (event) {

      clearTimeout(searchDebounce);

      searchDebounce = setTimeout(function () {

        currentSearch = event.target.value;

        visibleCount = PRODUCTS_PER_PAGE; // reset pagination on search change

        renderProducts();

      }, 150);

    });

  }


  /* ------------------------------------------------------------------
     SEE MORE BUTTON
  ------------------------------------------------------------------ */

  if (showMoreBtn) {

    showMoreBtn.addEventListener('click', function () {

      visibleCount += PRODUCTS_PER_PAGE;

      renderProducts();

    });


  }



  /* ------------------------------------------------------------------
     PRODUCT MODAL
  ------------------------------------------------------------------ */

  const productModal =
    document.getElementById('productModal');

  const productModalOverlay =
    document.getElementById('productModalOverlay');

  const productModalBody =
    document.getElementById('productModalBody');

  const productModalClose =
    document.getElementById('productModalClose');

  let modalQty = 1;
  let lastFocusedEl = null;


  if (productsGrid) {

    productsGrid.addEventListener('click', function (event) {

      const favoriteButton =
        event.target.closest('[data-fav]');

      if (favoriteButton) {

        event.preventDefault();

        toggleFavorite(
          Number(favoriteButton.dataset.fav)
        );

        return;
      }


      const addButton =
        event.target.closest('[data-add-to-cart]');

      if (addButton) {

        event.preventDefault();

        addToCart(
          Number(addButton.dataset.addToCart),
          1
        );

        return;
      }


      const openTarget =
        event.target.closest('[data-open-product]');

      if (openTarget) {

        openProductModal(
          Number(openTarget.dataset.openProduct)
        );

      }

    });

  }


  function openProductModal(id) {

    if (
      !productModal ||
      !productModalBody
    ) {
      return;
    }

    const product = products.find(function (item) {
      return item.id === id;
    });

    if (!product) return;

    modalQty = 1;

    lastFocusedEl = document.activeElement;


    productModalBody.innerHTML =

      '<div class="product-modal__grid">' +

      '<img ' +
      'src="' +
      product.image +
      '" ' +
      'alt="' +
      escapeHtml(product.name) +
      '" ' +
      'onerror="this.style.display=\'none\'">' +

      '<div>' +

      '<h2 id="productModalTitle">' +
      escapeHtml(product.name) +
      '</h2>' +

      '<p class="product-modal__price">' +
      formatPrice(product.price) +
      '</p>' +

      '<p class="product-modal__desc">' +
      escapeHtml(product.description) +
      '</p>' +

      '<p class="product-modal__meta">' +
      'Category: ' +
      escapeHtml(product.category) +
      ' &middot; Type: ' +
      escapeHtml(product.type) +
      '</p>' +

      '<div class="qty-selector">' +

      '<button ' +
      'type="button" ' +
      'id="qtyMinus" ' +
      'aria-label="Decrease quantity">' +
      '&minus;' +
      '</button>' +

      '<span id="qtyValue">1</span>' +

      '<button ' +
      'type="button" ' +
      'id="qtyPlus" ' +
      'aria-label="Increase quantity">' +
      '+' +
      '</button>' +

      '</div>' +

      '<button ' +
      'type="button" ' +
      'class="btn btn--primary btn--full" ' +
      'id="modalAddToCart"' +
      (product.available ? '' : ' disabled') +
      '>' +

      (product.available ? 'Add to Cart' : 'Currently Unavailable') +

      '</button>' +

      '</div>' +

      '</div>';


    const qtyMinus =
      document.getElementById('qtyMinus');

    const qtyPlus =
      document.getElementById('qtyPlus');

    const qtyValue =
      document.getElementById('qtyValue');

    const modalAddToCart =
      document.getElementById('modalAddToCart');


    if (qtyMinus) {

      qtyMinus.addEventListener('click', function () {

        if (modalQty > 1) {

          modalQty--;

          qtyValue.textContent = modalQty;

        }

      });

    }


    if (qtyPlus) {

      qtyPlus.addEventListener('click', function () {

        modalQty++;

        qtyValue.textContent = modalQty;

      });

    }


    if (modalAddToCart) {

      modalAddToCart.addEventListener(
        'click',
        function () {

          addToCart(
            product.id,
            modalQty
          );

          closeProductModal();

        }
      );

    }


    productModal.classList.add('is-visible');

    productModal.setAttribute(
      'aria-hidden',
      'false'
    );

    if (productModalOverlay) {

      productModalOverlay.classList.add(
        'is-visible'
      );

    }

    document.body.classList.add('no-scroll');

    if (productModalClose) {
      productModalClose.focus();
    }

  }


  function closeProductModal() {

    if (!productModal) return;

    productModal.classList.remove('is-visible');

    productModal.setAttribute(
      'aria-hidden',
      'true'
    );

    if (productModalOverlay) {

      productModalOverlay.classList.remove(
        'is-visible'
      );

    }

    document.body.classList.remove('no-scroll');

    if (
      lastFocusedEl &&
      typeof lastFocusedEl.focus === 'function'
    ) {

      lastFocusedEl.focus();

    }

  }


  if (productModalClose) {
    productModalClose.addEventListener(
      'click',
      closeProductModal
    );
  }


  if (productModalOverlay) {
    productModalOverlay.addEventListener(
      'click',
      closeProductModal
    );
  }


  /* ------------------------------------------------------------------
     FAVORITES
  ------------------------------------------------------------------ */

  function toggleFavorite(id) {

    const index = favorites.indexOf(id);

    if (index === -1) {

      favorites.push(id);

      showToast('Added to your favorites.');

    } else {

      favorites.splice(index, 1);

      showToast('Removed from your favorites.');

    }

    saveToStorage(
      'petalandstem_favorites',
      favorites
    );

    renderProducts();

  }


  /* ------------------------------------------------------------------
     CART
  ------------------------------------------------------------------ */

  const cartToggle =
    document.getElementById('cartToggle');

  const cartDrawer =
    document.getElementById('cartDrawer');

  const cartOverlay =
    document.getElementById('cartOverlay');

  const cartClose =
    document.getElementById('cartClose');

  const cartBody =
    document.getElementById('cartBody');

  const cartCount =
    document.getElementById('cartCount');

  const cartSubtotal =
    document.getElementById('cartSubtotal');

  const checkoutBtn =
    document.getElementById('checkoutBtn');


  function addToCart(id, quantity) {

    const product = products.find(function (item) {
      return item.id === id;
    });

    if (
      !product ||
      !product.available
    ) {
      return;
    }


    const existing =
      cart.find(function (item) {
        return item.id === id;
      });


    if (existing) {

      existing.qty += quantity;

    } else {

      cart.push({
        id: id,
        qty: quantity
      });

    }


    saveToStorage(
      'petalandstem_cart',
      cart
    );

    renderCart();

    showToast(
      product.name + ' added to your bouquet.'
    );

    animateCartIcon();

  }


  function changeQty(id, delta) {

    const item =
      cart.find(function (cartItem) {
        return cartItem.id === id;
      });

    if (!item) return;


    item.qty += delta;


    if (item.qty <= 0) {

      cart = cart.filter(function (cartItem) {
        return cartItem.id !== id;
      });

    }


    saveToStorage(
      'petalandstem_cart',
      cart
    );

    renderCart();

  }


  function removeFromCart(id) {

    cart = cart.filter(function (item) {
      return item.id !== id;
    });


    saveToStorage(
      'petalandstem_cart',
      cart
    );

    renderCart();

    showToast('Item removed from your bouquet bag.');

  }


  function renderCart() {

    if (
      !cartBody ||
      !cartCount ||
      !cartSubtotal
    ) {
      return;
    }


    const totalItems =
      cart.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);


    cartCount.textContent = totalItems;

    cartCount.style.display =
      totalItems > 0 ? 'flex' : 'none';


    if (cart.length === 0) {

      cartBody.innerHTML =

        '<div class="cart-empty">' +

        '<i ' +
        'class="fa-solid fa-basket-shopping" ' +
        'aria-hidden="true"></i>' +

        '<p>Your bouquet bag is empty.</p>' +

        '</div>';


      cartSubtotal.textContent =
        formatPrice(0);


      if (checkoutBtn) {
        checkoutBtn.disabled = true;
      }

      return;

    }


    if (checkoutBtn) {
      checkoutBtn.disabled = false;
    }


    let subtotal = 0;


    cartBody.innerHTML = cart
      .map(function (item) {

        const product =
          products.find(function (prod) {
            return prod.id === item.id;
          });


        if (!product) return '';


        subtotal +=
          product.price * item.qty;


        return (

          '<div class="cart-item">' +

          '<img ' +
          'src="' +
          product.image +
          '" ' +
          'alt="' +
          escapeHtml(product.name) +
          '" ' +
          'loading="lazy" ' +
          'onerror="this.style.display=\'none\'">' +

          '<div>' +

          '<p class="cart-item__name">' +
          escapeHtml(product.name) +
          '</p>' +

          '<p class="cart-item__price">' +
          formatPrice(product.price) +
          '</p>' +

          '<div class="cart-item__qty">' +

          '<button ' +
          'type="button" ' +
          'data-qty-minus="' +
          product.id +
          '" ' +
          'aria-label="Decrease quantity">' +

          '&minus;' +

          '</button>' +

          '<span>' +
          item.qty +
          '</span>' +

          '<button ' +
          'type="button" ' +
          'data-qty-plus="' +
          product.id +
          '" ' +
          'aria-label="Increase quantity">' +

          '+' +

          '</button>' +

          '</div>' +

          '</div>' +

          '<button ' +
          'type="button" ' +
          'class="cart-item__remove" ' +
          'data-remove="' +
          product.id +
          '" ' +
          'aria-label="Remove ' +
          escapeHtml(product.name) +
          '">' +

          '<i ' +
          'class="fa-solid fa-trash" ' +
          'aria-hidden="true"></i>' +

          '</button>' +

          '</div>'

        );

      })
      .join('');


    cartSubtotal.textContent =
      formatPrice(subtotal);

  }


  if (cartBody) {

    cartBody.addEventListener(
      'click',
      function (event) {

        const minus =
          event.target.closest('[data-qty-minus]');

        const plus =
          event.target.closest('[data-qty-plus]');

        const remove =
          event.target.closest('[data-remove]');


        if (minus) {

          changeQty(
            Number(minus.dataset.qtyMinus),
            -1
          );

        }


        if (plus) {

          changeQty(
            Number(plus.dataset.qtyPlus),
            1
          );

        }


        if (remove) {

          removeFromCart(
            Number(remove.dataset.remove)
          );

        }

      }
    );

  }


  function openCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.add('is-open');

    if (cartOverlay) {
      cartOverlay.classList.add('is-visible');
    }

    cartDrawer.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.classList.add('no-scroll');

  }


  function closeCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.remove('is-open');

    if (cartOverlay) {
      cartOverlay.classList.remove('is-visible');
    }

    cartDrawer.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.classList.remove('no-scroll');

  }


  if (cartToggle) {
    cartToggle.addEventListener(
      'click',
      openCart
    );
  }


  if (cartClose) {
    cartClose.addEventListener(
      'click',
      closeCart
    );
  }


  if (cartOverlay) {
    cartOverlay.addEventListener(
      'click',
      closeCart
    );
  }


  function animateCartIcon() {

    if (!cartToggle) return;

    cartToggle.classList.remove(
      'cart-shake'
    );

    /*
      Force reflow so the animation can restart.
    */
    void cartToggle.offsetWidth;

    cartToggle.classList.add(
      'cart-shake'
    );

  }


  /* ------------------------------------------------------------------
     MESSAGE CART TO ORDER

     Instead of a traditional checkout, Petal and Stem uses Messenger.
  ------------------------------------------------------------------ */

  if (checkoutBtn) {

    checkoutBtn.addEventListener(
      'click',
      function () {

        if (cart.length === 0) {
          showToast('Your bouquet bag is empty.');
          return;
        }

        const orderLines = [];

        cart.forEach(function (item) {

          const product =
            products.find(function (p) {
              return p.id === item.id;
            });

          if (!product) return;

          orderLines.push(
            '- ' +
            product.name +
            ' × ' +
            item.qty +
            ' (' +
            formatPrice(product.price * item.qty) +
            ')'
          );

        });

        const subtotal =
          cart.reduce(function (sum, item) {

            const product =
              products.find(function (p) {
                return p.id === item.id;
              });

            return product
              ? sum + product.price * item.qty
              : sum;

          }, 0);

        const now = new Date();

        const datePart =
          now.getFullYear().toString() +
          String(now.getMonth() + 1).padStart(2, '0') +
          String(now.getDate()).padStart(2, '0');

        const randomPart =
          Math.floor(1000 + Math.random() * 9000);

        const requestNumber =
          'PS-' + datePart + '-' + randomPart;

        const orderRequest =

          '🌸 PETAL AND STEM\n' +
          'ORDER REQUEST\n\n' +

          'Request #' + requestNumber + '\n\n' +

          'ITEMS\n' +
          orderLines.join('\n') +

          '\n\nEstimated subtotal: ' +
          formatPrice(subtotal) +

          '\n\n--------------------------------\n\n' +

          'Please confirm availability, final price, and pickup/delivery details.\n\n' +

          'Thank you for choosing Petal and Stem! 🌷';

        closeCart();

        showCustomOrderResult(
          orderRequest,
          requestNumber
        );

      }
    );

  }

  /* ------------------------------------------------------------------
     MESSENGER HELPER
  ------------------------------------------------------------------ */

  function openMessenger(message) {

    if (
      !MESSENGER_URL ||
      MESSENGER_URL === 'YOUR_MESSENGER_LINK_HERE'
    ) {

      showToast(
        'Add your Messenger link to script.js first.'
      );

      return;

    }


    /*
      The message is copied to the clipboard as a backup,
      while Messenger opens in a new tab.
    */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      navigator.clipboard
        .writeText(message)
        .catch(function () {
          /* Clipboard is optional */
        });

    }


    window.open(
      MESSENGER_URL,
      '_blank',
      'noopener,noreferrer'
    );

  }


  /* ------------------------------------------------------------------
     TOAST
  ------------------------------------------------------------------ */

  const toast =
    document.getElementById('toast');

  let toastTimeout;


  function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add('is-visible');

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(
      function () {

        toast.classList.remove(
          'is-visible'
        );

      },
      2800
    );

  }


  /* ------------------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------------------ */

  const siteHeader =
    document.getElementById('siteHeader');

  const hamburgerBtn =
    document.getElementById('hamburgerBtn');

  const navLinks =
    document.getElementById('navLinks');

  const navOverlay =
    document.getElementById('navOverlay');


  function onScroll() {

    if (!siteHeader) return;

    siteHeader.classList.toggle(
      'is-scrolled',
      window.scrollY > 30
    );

  }


  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );

  onScroll();


  function openMenu() {

    if (!navLinks) return;

    navLinks.classList.add('is-open');

    if (navOverlay) {
      navOverlay.classList.add('is-visible');
    }

    if (hamburgerBtn) {

      hamburgerBtn.setAttribute(
        'aria-expanded',
        'true'
      );

      hamburgerBtn.setAttribute(
        'aria-label',
        'Close menu'
      );

    }

    document.body.classList.add(
      'no-scroll'
    );

  }


  function closeMenu() {

    if (!navLinks) return;

    navLinks.classList.remove('is-open');

    if (navOverlay) {
      navOverlay.classList.remove('is-visible');
    }

    if (hamburgerBtn) {

      hamburgerBtn.setAttribute(
        'aria-expanded',
        'false'
      );

      hamburgerBtn.setAttribute(
        'aria-label',
        'Open menu'
      );

    }

    document.body.classList.remove(
      'no-scroll'
    );

  }


  if (hamburgerBtn) {

    hamburgerBtn.addEventListener(
      'click',
      function () {

        if (
          navLinks &&
          navLinks.classList.contains('is-open')
        ) {

          closeMenu();

        } else {

          openMenu();

        }

      }
    );

  }


  if (navOverlay) {
    navOverlay.addEventListener(
      'click',
      closeMenu
    );
  }


  if (navLinks) {

    navLinks
      .querySelectorAll('.nav-link')
      .forEach(function (link) {

        link.addEventListener(
          'click',
          closeMenu
        );

      });

  }


  /* ------------------------------------------------------------------
     ESCAPE KEY
  ------------------------------------------------------------------ */

  document.addEventListener(
    'keydown',
    function (event) {

      if (event.key !== 'Escape') return;


      if (
        productModal &&
        productModal.classList.contains('is-visible')
      ) {

        closeProductModal();

      }


      if (
        customModal &&
        customModal.classList.contains('is-visible')
      ) {

        closeCustomModal();

      }


      if (
        cartDrawer &&
        cartDrawer.classList.contains('is-open')
      ) {

        closeCart();

      }


      if (
        navLinks &&
        navLinks.classList.contains('is-open')
      ) {

        closeMenu();

      }

    }
  );


  /* ------------------------------------------------------------------
     CUSTOM ORDER MODAL
  ------------------------------------------------------------------ */

  const openCustomOrderBtn =
    document.getElementById('openCustomOrder');

  const customModal =
    document.getElementById('customModal');

  const customModalOverlay =
    document.getElementById('customModalOverlay');

  const customModalClose =
    document.getElementById('customModalClose');

  const customOrderForm =
    document.getElementById('customOrderForm');

  const customFormMessage =
    document.getElementById('customFormMessage');

  let lastFocusedCustom = null;


  function openCustomModal() {

    if (!customModal) return;

    lastFocusedCustom =
      document.activeElement;

    customModal.classList.add(
      'is-visible'
    );

    customModal.setAttribute(
      'aria-hidden',
      'false'
    );

    if (customModalOverlay) {

      customModalOverlay.classList.add(
        'is-visible'
      );

    }

    document.body.classList.add(
      'no-scroll'
    );


    const nameInput =
      document.getElementById('customName');

    if (nameInput) {
      nameInput.focus();
    }

  }


  function closeCustomModal() {

    if (!customModal) return;

    customModal.classList.remove(
      'is-visible'
    );

    customModal.setAttribute(
      'aria-hidden',
      'true'
    );

    if (customModalOverlay) {

      customModalOverlay.classList.remove(
        'is-visible'
      );

    }

    document.body.classList.remove(
      'no-scroll'
    );


    if (
      lastFocusedCustom &&
      typeof lastFocusedCustom.focus === 'function'
    ) {

      lastFocusedCustom.focus();

    }

  }


  if (openCustomOrderBtn) {

    openCustomOrderBtn.addEventListener(
      'click',
      openCustomModal
    );

  }


  if (customModalClose) {

    customModalClose.addEventListener(
      'click',
      closeCustomModal
    );

  }


  if (customModalOverlay) {

    customModalOverlay.addEventListener(
      'click',
      closeCustomModal
    );

  }


  /* ------------------------------------------------------------------
     CUSTOM ORDER SUBMIT

     No backend required.

     The customer's details are turned into a copyable
     order request that the customer can paste into
     Messenger or another messaging app.
  ------------------------------------------------------------------ */

  if (customOrderForm) {

    customOrderForm.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();

        /* ----------------------------------------------------------
           GET FORM VALUES
        ---------------------------------------------------------- */

        const name =
          getFieldValue('customName');

        const occasion =
          getFieldValue('customOccasion');

        const colors =
          getFieldValue('customColors');

        const flowerType =
          getFieldValue('customFlowerType');

        const budget =
          getFieldValue('customBudget');

        const message =
          getFieldValue('customMessage');


        /* ----------------------------------------------------------
           VALIDATION
        ---------------------------------------------------------- */

        let valid = true;

        valid =
          validateField(
            'customName',
            'customNameError',
            function (value) {
              return value.trim().length > 0;
            },
            'Please enter your name.'
          ) && valid;


        valid =
          validateField(
            'customOccasion',
            'customOccasionError',
            function (value) {
              return value.trim().length > 0;
            },
            'Please select an occasion.'
          ) && valid;


        if (!valid) {

          if (customFormMessage) {

            customFormMessage.textContent =
              'Please fix the highlighted fields.';

            customFormMessage.className =
              'form-message is-error';

          }

          return;
        }


        /* ----------------------------------------------------------
           GENERATE REQUEST NUMBER
        ---------------------------------------------------------- */

        const now = new Date();

        const datePart =
          now.getFullYear().toString() +
          String(now.getMonth() + 1).padStart(2, '0') +
          String(now.getDate()).padStart(2, '0');

        const randomPart =
          Math.floor(1000 + Math.random() * 9000);

        const requestNumber =
          'PS-' + datePart + '-' + randomPart;


        /* ----------------------------------------------------------
           CREATE ORDER REQUEST
        ---------------------------------------------------------- */

        const orderRequest =

          '🌸 PETAL AND STEM\n' +
          'CUSTOM BOUQUET REQUEST\n\n' +

          'Request #' + requestNumber + '\n\n' +

          'CUSTOMER\n' +
          name + '\n\n' +

          'OCCASION\n' +
          occasion + '\n\n' +

          'PREFERRED COLORS\n' +
          (colors || 'No preference specified') + '\n\n' +

          'FLOWER STYLE\n' +
          flowerType + '\n\n' +

          'BUDGET\n' +
          budget + '\n\n' +

          'ADDITIONAL DETAILS\n' +
          (message || 'No additional details provided.') + '\n\n' +

          '--------------------------------\n\n' +

          'Please review this request and contact ' +
          'Petal and Stem to confirm the details, ' +
          'availability, and final price.\n\n' +

          'Thank you for choosing Petal and Stem! 🌷';


        /* ----------------------------------------------------------
           SHOW RESULT
        ---------------------------------------------------------- */

        closeCustomModal();
        customOrderForm.reset();

        showCustomOrderResult(
          orderRequest,
          requestNumber
        );

      }
    );

  }
  /* ------------------------------------------------------------------
     SHOW CUSTOM ORDER RESULT
  ------------------------------------------------------------------ */

  function showCustomOrderResult(
    orderRequest,
    requestNumber
  ) {

    /* Remove an existing result modal */

    const existing =
      document.getElementById(
        'customOrderResultModal'
      );

    if (existing) {
      existing.remove();
    }


    /* Create modal */

    const modal =
      document.createElement('div');

    modal.id =
      'customOrderResultModal';

    modal.className =
      'custom-result-modal';


    modal.innerHTML =

      '<div class="custom-result-modal__overlay"></div>' +

      '<div class="custom-result-modal__content">' +

      '<button ' +
      'type="button" ' +
      'class="custom-result-modal__close" ' +
      'aria-label="Close">' +
      '&times;' +
      '</button>' +

      '<div class="custom-result-modal__icon">' +
      '🌸' +
      '</div>' +

      '<h2>' +
      'Your Order Request is Ready' +
      '</h2>' +

      '<p class="custom-result-modal__note">' +
      'Copy the request below and paste it into ' +
      'Messenger or your preferred messaging app.' +
      '</p>' +

      '<div class="custom-result-modal__number">' +
      'Request #' +
      escapeHtml(requestNumber) +
      '</div>' +

      '<textarea ' +
      'id="customOrderRequestText" ' +
      'class="custom-result-modal__textarea" ' +
      'readonly>' +
      escapeHtml(orderRequest) +
      '</textarea>' +

      '<button ' +
      'type="button" ' +
      'id="copyCustomOrderButton" ' +
      'class="btn btn--primary btn--full">' +

      '<i class="fa-regular fa-copy" ' +
      'aria-hidden="true"></i>' +

      ' Copy Order Request' +

      '</button>' +

      '<button ' +
      'type="button" ' +
      'id="closeCustomOrderButton" ' +
      'class="btn btn--secondary btn--full">' +

      'Done' +

      '</button>' +

      '<p ' +
      'id="copyCustomOrderMessage" ' +
      'class="custom-result-modal__copy-message" ' +
      'aria-live="polite">' +
      '</p>' +

      '</div>';


    document.body.appendChild(modal);

    document.body.classList.add('no-scroll');


    /* --------------------------------------------------------------
       CLOSE
    -------------------------------------------------------------- */

    const closeButton =
      modal.querySelector(
        '.custom-result-modal__close'
      );

    const overlay =
      modal.querySelector(
        '.custom-result-modal__overlay'
      );

    const doneButton =
      document.getElementById(
        'closeCustomOrderButton'
      );


    function closeResultModal() {
      modal.remove();
      document.body.classList.remove('no-scroll');
    }


    closeButton.addEventListener(
      'click',
      closeResultModal
    );

    overlay.addEventListener(
      'click',
      closeResultModal
    );

    doneButton.addEventListener(
      'click',
      closeResultModal
    );


    /* --------------------------------------------------------------
       COPY REQUEST
    -------------------------------------------------------------- */

    const copyButton =
      document.getElementById(
        'copyCustomOrderButton'
      );

    const copyMessage =
      document.getElementById(
        'copyCustomOrderMessage'
      );


    copyButton.addEventListener(
      'click',
      async function () {

        try {

          await navigator.clipboard.writeText(
            orderRequest
          );


          copyButton.innerHTML =
            '<i class="fa-solid fa-check" ' +
            'aria-hidden="true"></i> ' +
            'Copied!';


          copyMessage.textContent =
            'Order request copied! You can now paste it into Messenger.';


          setTimeout(function () {

            if (!document.body.contains(copyButton)) {
              return;
            }


            copyButton.innerHTML =
              '<i class="fa-regular fa-copy" ' +
              'aria-hidden="true"></i> ' +
              ' Copy Order Request';

          }, 2500);


        } catch (error) {

          /* Clipboard fallback */

          const textarea =
            document.getElementById(
              'customOrderRequestText'
            );


          textarea.focus();
          textarea.select();


          try {

            document.execCommand('copy');

            copyButton.innerHTML =
              '<i class="fa-solid fa-check" ' +
              'aria-hidden="true"></i> ' +
              ' Copied!';

            copyMessage.textContent =
              'Order request copied!';

          } catch (fallbackError) {

            copyMessage.textContent =
              'Please select the request and copy it manually.';

          }

        }

      }
    );

  }

  /* ------------------------------------------------------------------
     CONTACT FORM
  ------------------------------------------------------------------ */

  const contactForm =
    document.getElementById('contactForm');

  const contactFormMessage =
    document.getElementById('contactFormMessage');


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();


        let valid = true;


        valid =
          validateField(
            'contactName',
            'contactNameError',
            function (value) {
              return value.trim().length > 0;
            },
            'Please enter your name.'
          ) && valid;


        valid =
          validateField(
            'contactEmail',
            'contactEmailError',
            isValidEmail,
            'Please enter a valid email.'
          ) && valid;


        valid =
          validateField(
            'contactMessage',
            'contactMessageError',
            function (value) {
              return value.trim().length > 0;
            },
            'Please write a short message.'
          ) && valid;


        if (!valid) {

          if (contactFormMessage) {

            contactFormMessage.textContent =
              'Please fix the highlighted fields.';

            contactFormMessage.className =
              'form-message is-error';

          }

          return;

        }


        /*
          This is still a frontend-only contact form.
          There is no backend configured.
        */

        if (contactFormMessage) {

          contactFormMessage.textContent =
            "Thanks for reaching out! We'll get back to you soon.";

          contactFormMessage.className =
            'form-message is-success';

        }


        contactForm.reset();

      }
    );

  }


  /* ------------------------------------------------------------------
     NEWSLETTER
  ------------------------------------------------------------------ */

  const newsletterForm =
    document.getElementById('newsletterForm');

  const newsletterMessage =
    document.getElementById('newsletterMessage');


  if (newsletterForm) {

    newsletterForm.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();


        const emailInput =
          document.getElementById('newsletterEmail');


        if (
          !emailInput ||
          !isValidEmail(emailInput.value)
        ) {

          if (emailInput) {
            emailInput.classList.add(
              'is-invalid'
            );
          }

          if (newsletterMessage) {

            newsletterMessage.textContent =
              'Please enter a valid email address.';

            newsletterMessage.className =
              'form-message is-error';

          }

          return;

        }


        emailInput.classList.remove(
          'is-invalid'
        );


        if (newsletterMessage) {

          newsletterMessage.textContent =
            "You're subscribed! Welcome to the studio.";

          newsletterMessage.className =
            'form-message is-success';

        }


        newsletterForm.reset();

      }
    );

  }


  /* ------------------------------------------------------------------
     FORM VALIDATION
  ------------------------------------------------------------------ */

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  }


  function validateField(
    inputId,
    errorId,
    testFunction,
    errorMessage
  ) {

    const input =
      document.getElementById(inputId);

    const error =
      document.getElementById(errorId);


    /*
      If the field doesn't exist in the HTML,
      don't crash the entire script.
    */

    if (!input) {
      return true;
    }


    const valid =
      testFunction(input.value);


    input.classList.toggle(
      'is-invalid',
      !valid
    );


    if (error) {

      error.textContent =
        valid ? '' : errorMessage;

    }


    return valid;

  }


  function getFieldValue(id) {

    const element =
      document.getElementById(id);

    if (!element) return '';

    return element.value.trim();

  }


  /* ------------------------------------------------------------------
     REMOVE VALIDATION ERROR WHILE USER TYPES
  ------------------------------------------------------------------ */

  document
    .querySelectorAll(
      '.form-control, input, textarea, select'
    )
    .forEach(function (input) {

      input.addEventListener(
        'input',
        function () {

          input.classList.remove(
            'is-invalid'
          );

        }
      );


      input.addEventListener(
        'change',
        function () {

          input.classList.remove(
            'is-invalid'
          );

        }
      );

    });


  /* ------------------------------------------------------------------
     SCROLL ANIMATIONS
  ------------------------------------------------------------------ */

  const revealElements =
    document.querySelectorAll('.reveal');


  if (
    'IntersectionObserver' in window &&
    revealElements.length
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  'is-visible'
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.15
        }
      );


    revealElements.forEach(
      function (element) {

        observer.observe(element);

      }
    );


  } else {

    revealElements.forEach(
      function (element) {

        element.classList.add(
          'is-visible'
        );

      }
    );

  }


  /* ------------------------------------------------------------------
     YEAR
  ------------------------------------------------------------------ */

  const yearElement =
    document.getElementById('year');

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */

  renderProducts();

  renderCart();

})();
