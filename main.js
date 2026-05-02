const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartItemsList = document.querySelector('.cart-items');
const totalPriceEl = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.querySelector('.checkout-close-btn');
const whatsappBtn = document.querySelector('.whatsapp-btn');
const gmailBtn = document.querySelector('.gmail-btn');

const themeToggle = document.getElementById('theme-toggle');

const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Search elements
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchCloseBtn = document.getElementById('search-close-btn');

// Product Gallery Modal elements
const galleryModal = document.getElementById('gallery-modal');
const galleryCloseBtn = document.querySelector('.gallery-close-btn');
const galleryMainImage = document.getElementById('gallery-main-image');
const galleryThumbnails = document.getElementById('gallery-thumbnails');
const galleryProductName = document.getElementById('gallery-product-name');
const galleryProductPrice = document.getElementById('gallery-product-price');
const galleryAddCartBtn = document.getElementById('gallery-add-cart');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');

let cart = [];
let currentOrderMessage = '';
let currentFilter = 'all';
let currentSearchTerm = '';
let currentGalleryProduct = null;
let currentImageIndex = 0;
let scrollPositionBeforeModal = 0;

// Cart persistence functions
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme and cart on page load
initTheme();
loadCart();

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
  // Get all navigation links that point to sections
  const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate the offset for fixed header
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const offsetTop = targetElement.offsetTop - headerHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active nav link
        updateActiveNavLink(this);

        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
          toggleMobileMenu();
        }
      }
    });
  });
}

// Update active navigation link
function updateActiveNavLink(clickedLinkOrSectionId) {
  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.setAttribute('aria-pressed', 'false');
  });

  // Handle when called with a DOM element (direct link click)
  if (clickedLinkOrSectionId && typeof clickedLinkOrSectionId === 'object' && clickedLinkOrSectionId.classList) {
    if (clickedLinkOrSectionId.classList.contains('nav-link')) {
      clickedLinkOrSectionId.classList.add('active');
      clickedLinkOrSectionId.setAttribute('aria-pressed', 'true');
    }
  }
  // Handle when called with a section ID (from intersection observer)
  else if (typeof clickedLinkOrSectionId === 'string') {
    const targetLink = document.querySelector(`.nav-link[href="#${clickedLinkOrSectionId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
      targetLink.setAttribute('aria-pressed', 'true');
    }
  }
}

// Mobile menu toggle function
function toggleMobileMenu() {
  const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  const newState = !expanded;

  hamburgerBtn.setAttribute('aria-expanded', newState);
  navMenu.classList.toggle('show', newState);

  // Add or remove overlay
  const navOverlay = document.getElementById('nav-overlay');
  if (navOverlay) {
    navOverlay.classList.toggle('show', newState);
  }

  // Toggle body class to prevent scrolling when menu is open
  document.body.classList.toggle('nav-open', newState);
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Updated productsData with multiple images for first 6 products
//././Images/P_.jpg
const productsData = [
  {
    id: 1,
    category: ['bracelets'],
    name: 'Earth Warior',
    price: '10000',
    img: '././Images/P_.jpg',
    images: ['././Images/P_.jpg',]
  },
  {
    id: 2,
    category: ['waist-beads'],
    name: 'Big Aunties Strands',
    price: '25000',
    img: '././Images/P_1.jpg',
    images: [
      '././Images/P_1.jpg',
      '././Images/P_7.jpg'
    ]
  },
  {
    id: 3,
    category: ['necklace'],
    name: 'Pearl and Path',
    price: '45000',
    img: '././Images/P_2.jpg',
    images: ['././Images/P_2.jpg',]
  },
  {
    id: 4,
    category: ['waist-beads'],
    name: 'Strand Of Excelence',
    price: '20000',
    img: '././Images/P_3.jpg',
    images: ['././Images/P_3.jpg']
  },
  {
    id: 5,
    category: ['bracelets'],
    name: 'Obsidian Frost',
    price: '7000',
    img: '././Images/P_4.jpg',
    images: ['././Images/P_4.jpg',
    ]
  },
  {
    id: 6,
    category: ['watches'],
    name: 'Premium Timepiece',
    price: '100000',
    img: '././Images/P_5.jpg',
    images: [
      '././Images/P_5.jpg',
    ]
  },
  {
    id: 7,
    category: ['waist-beads'],
    name: 'The Pink Panther',
    price: '10000',
    img: '././Images/P_6.jpg',
    images: ['././Images/P_6.jpg']

  },
  {
    id: 8,
    category: ['bracelets'],
    name: 'Strenght and Serenity',
    price: '12000',
    img: '././Images/P_199.jpg',
    images: ['././Images/P_199.jpg']
  },
  {
    id: 9,
    category: ['necklace'],
    name: 'The Blue Evil Eye',
    price: '30000',
    img: '././Images/P_8.jpg',
    images: ['././Images/P_8.jpg']
  },
  {
    id: 10,
    category: ['watches'],
    name: 'Black G-shock',
    price: '45000',
    img: '././Images/P_9.jpg',
    images: ['././Images/P_9.jpg',
            '././Images/P_25.jpg',
            '././Images/P_39.jpg',]
  },
  {
    id: 11,
    category: ['bags'],
    name: '',
    price: '30000',
    img: '././Images/P_10.jpg',
    images: ['././Images/P_10.jpg',
            '././Images/P_44.jpg',]

  },
  {
    id: 12,
    category: ['bracelets'],
    name: '12',
    price: '#',
    img: '././Images/P_11.jpg',
    images: ['././Images/P_11.jpg']

  },
  {
    id: 13,
    category: ['watches'],
    name: 'Gold Carter',
    price: '45000',
    img: '././Images/P_12.jpg',
    images: ['././Images/P_12.jpg',
            '././Images/P_67.jpg',]

  },
  {
    id: 14,
    category: ['necklace'],
    name: '',
    price: '25000',
    img: '././Images/P_13.jpg',
    images: ['././Images/P_13.jpg']

  },
  {
    id: 15,
    category: ['watches'],
    name: 'AP',
    price: '120000',
    img: '././Images/P_14.jpg',
    images: ['././Images/P_14.jpg']

  },
  {
    id: 16,
    category: ['waist-beads'],
    name: '',
    price: '4000',
    img: '././Images/P_15.jpg',
    images: ['././Images/P_15.jpg']

  },
  {
    id: 17,
    category: ['bracelets'],
    name: 'Jade',
    price: '10000',
    img: '././Images/P_16.jpg',
    images: ['././Images/P_16.jpg']

  },
  {
    id: 18,
    category: ['waist-beads'],
    name: '',
    price: '7000',
    img: '././Images/P_17.jpg',
    images: ['././Images/P_17.jpg']

  },
  {
    id: 19,
    category: ['necklace'],
    name: '',
    price: '30000',
    img: '././Images/P_18.jpg',
    images: ['././Images/P_18.jpg']

  },
  {
    id: 20,
    category: ['trouser-chains'],
    name: '',
    price: '20000',
    img: '././Images/P_19.jpg',
    images: ['././Images/P_19.jpg',]
  },
  {
    id: 21,
    category: ['watches'],
    name: '',
    price: '35000',
    img: '././Images/P_20.jpg',
    images: ['././Images/P_20.jpg']

  },
  {
    id: 22,
    category: ['bracelets'],
    name: 'The Black King',
    price: '20000',
    img: '././Images/P_21.jpg',
    images: ['././Images/P_21.jpg']

  },
  {
    id: 23,
    category: ['waist-beads'],
    name: '',
    price: '10000',
    img: '././Images/P_22.jpg',
    images: ['././Images/P_22.jpg']

  },
  {
    id: 24,
    category: ['necklace'],
    name: 'The Evil Blue Eye',
    price: '45000',
    img: '././Images/P_23.jpg',
    images: ['././Images/P_23.jpg']

  },
  {
    id: 25,
    category: ['waist-beads'],
    name: '',
    price: '10000',
    img: '././Images/P_24.jpg',
    images: ['././Images/P_24.jpg']

  },
  {
    id: 26,
    category: ['watches'],
    name: '',
    price: '45000',
    img: '././Images/P_195.jpg',
    images: ['././Images/P_195.jpg',
            '././Images/P_196.jpg',
            '././Images/P_197.jpg',
            '././Images/P_198.jpg',]
  },
  {
    id: 27,
    category: ['watches'],
    name: '',
    price: '50000',
    img: '././Images/P_26.jpg',
    images: ['././Images/P_26.jpg',
            '././Images/P_58.jpg',
            '././Images/P_59.jpg',
            '././Images/P_64.jpg',
            '././Images/P_78.jpg',]
  },
  {
    id: 28,
    category: ['waist-beads'],
    name: '',
    price: '10000',
    img: '././Images/P_27.jpg',
    images: ['././Images/P_27.jpg',
            '././Images/P_190.jpg',
            '././Images/P_191.jpg',]
  },
  {
    id: 29,
    category: ['necklace'],
    name: 'Pride of Africa',
    price: '20000',
    img: '././Images/P_28.jpg',
    images: ['././Images/P_28.jpg']
  },
  {
    id: 30,
    category: ['bags'],
    name: '',
    price: '30000',
    img: '././Images/P_29.jpg',
    images: ['././Images/P_29.jpg']
  },
  {
    id: 31,
    category: ['necklace'],
    name: 'Fire On Me',
    price: '40000',
    img: '././Images/P_69.jpg',
    images: ['././Images/P_69.jpg',
            '././Images/P_30.jpg',
            '././Images/P_310.jpg',]

  },
  {
    id: 32,
    category: ['bracelets'],
    name: '',
    price: '10000',
    img: '././Images/P_31.jpg',
    images: ['././Images/P_31.jpg']

  },
  {
    id: 33,
    category: ['bracelets', 'necklace'],
    name: 'The Big Boss',
    price: '40000',
    img: '././Images/P_32.jpg',
    images: ['././Images/P_32.jpg',]
  },
  {
    id: 34,
    category: ['watches'],
    name: 'DW',
    price: '40000',
    img: '././Images/P_33.jpg',
    images: ['././Images/P_33.jpg',]
  },
  {
    id: 35,
    category: ['necklace'],
    name: 'The Cross',
    price: '30000',
    img: '././Images/P_34.jpg',
    images: ['././Images/P_34.jpg',]
  },
  {
    id: 36,
    category: ['watches'],
    name: 'G Shocck',
    price: '60000',
    img: '././Images/P_35.jpg',
    images: ['././Images/P_35.jpg',
            '././Images/P_161.jpg',
            '././Images/P_162.jpg',
            '././Images/P_163.jpg',
            '././Images/P_164.jpg',
            '././Images/P_165.jpg',
            '././Images/P_166.jpg',
            '././Images/P_167.jpg',
            '././Images/P_168.jpg',
            '././Images/P_169.jpg',
            '././Images/P_170.jpg',
            '././Images/P_171.jpg',
            '././Images/P_172.jpg',
            '././Images/P_173.jpg',
            '././Images/P_174.jpg',
            '././Images/P_175.jpg',
            '././Images/P_176.jpg',
            '././Images/P_177.jpg',
            '././Images/P_178.jpg',
            '././Images/P_179.jpg',
            '././Images/P_178.jpg',
            '././Images/P_179.jpg',
            '././Images/P_180.jpg',
            '././Images/P_181.jpg',
            '././Images/P_298.jpg',
            '././Images/P_299.jpg',
            '././Images/P_300.jpg',
            '././Images/P_301.jpg',
            '././Images/P_302.jpg',]
  },
  {
    id: 37,
    category: ['waist-beads'],
    name: 'The Beautiful Island',
    price: '15000',
    img: '././Images/P_36.jpg',
    images: ['././Images/P_36.jpg',]
  },
  {
    id: 38,
    category: ['waist-beads'],
    name: '',
    price: '20000',
    img: '././Images/P_37.jpg',
    images: ['././Images/P_37.jpg',]
  },
  {
    id: 39,
    category: ['bracelets'],
    name: 'Earth Light',
    price: '7500',
    img: '././Images/P_38.jpg',
    images: ['././Images/P_38.jpg',
             '././Images/P_56.jpg',
             '././Images/P_70.jpg',]
  },
  {
    id: 40,
    category: ['watches'],
    name: '',
    price: '45000',
    img: '././Images/P_39.jpg',
    images: ['././Images/P_39.jpg',
            '././Images/P_25.jpg',
            '././Images/P_9.jpg',]
  },
  {
    id: 41,
    category: ['necklace'],
    name: '',
    price: '30000',
    img: '././Images/P_40.jpg',
    images: ['././Images/P_40.jpg',]
  },
  {
    id: 42,
    category: ['waist-beads'],
    name: "Nature's Gift",
    price: '10000',
    img: '././Images/P_66.jpg',
    images: ['././Images/P_66.jpg',
            '././Images/P_41.jpg',]
  },
  {
    id: 43,
    category: ['waist-beads'],
    name: 'Black Obsidian',
    price: '18000',
    img: '././Images/P_42.jpg',
    images: ['././Images/P_42.jpg',]
  },
  {
    id: 44,
    category: ['waist-beads'],
    name: 'B...?',
    price: '30000',
    img: '././Images/P_43.jpg',
    images: ['././Images/P_43.jpg',]
  },
  {
    id: 45,
    category: ['bags'],
    name: '',
    price: '30000',
    img: '././Images/P_192.jpg',
    images: ['././Images/P_192.jpg',
            '././Images/P_193.jpg',
            '././Images/P_194.jpg',]
  },
  {
    id: 46,
    category: ['watches'],
    name: '',
    price: '25000',
    img: '././Images/P_45.jpg',
    images: ['././Images/P_45.jpg',]
  },
  {
    id: 47,
    category: ['necklace'],
    name: '',
    price: '10000',
    img: '././Images/P_46.jpg',
    images: ['././Images/P_46.jpg',]
  },
  {
    id: 48,
    category: ['watches'],
    name: 'AP',
    price: '120000',
    img: '././Images/P_47.jpg',
    images: ['././Images/P_.47jpg',]
  },
  {
    id: 49,
    category: ['waist-beads'],
    name: '',
    price: '20000',
    img: '././Images/P_48.jpg',
    images: ['././Images/P_48.jpg',]
  },
  {
    id: 50,
    category: ['necklace'],
    name: '',
    price: '25000',
    img: '././Images/P_49.jpg',
    images: ['././Images/P_49.jpg',]
  },
  {
    id: 51,
    category: ['watches'],
    name: '',
    price: '30000',
    img: '././Images/P_50.jpg',
    images: ['././Images/P_50.jpg',]
  },
  {
    id: 52,
    category: ['bracelets'],
    name: '52',
    price: '#',
    img: '././Images/P_51.jpg',
    images: ['././Images/P_51.jpg',]
  },
  {
    id: 53,
    category: ['bracelets'],
    name: '53',
    price: '#',
    img: '././Images/P_52.jpg',
    images: ['././Images/P_52.jpg',]
  },
  {
    id: 54,
    category: ['waist-beads'],
    name: '54',
    price: '#',
    img: '././Images/P_53.jpg',
    images: ['././Images/P_53.jpg',]
  },
  {
    id: 55,
    category: ['watches'],
    name: '55',
    price: '#',
    img: '././Images/P_54.jpg',
    images: ['././Images/P_54.jpg',]
  },
  {
    id: 56,
    category: ['bracelets'],
    name: '56',
    price: '#',
    img: '././Images/P_55.jpg',
    images: ['././Images/P_55.jpg',]
  },
  {
    id: 57,
    category: ['bracelets'],
    name: 'Earth Light',
    price: '7500',
    img: '././Images/P_56.jpg',
    images: ['././Images/P_56.jpg',
             '././Images/P_70.jpg',]
  },
  {
    id: 58,
    category: ['waist-beads'],
    name: '58',
    price: '#',
    img: '././Images/P_57.jpg',
    images: ['././Images/P_57.jpg',]
  },
  {
    id: 59,
    category: ['bracelets'],
    name: '59',
    price: '#',
    img: '././Images/P_202.jpg',
    images: ['././Images/P_202.jpg'],
  },
  {
    id: 60,
    category: ['necklace'],
    name: '60',
    price: '#',
    img: '././Images/P_203.jpg',
    images: ['././Images/P_203.jpg',]
  },
  {
    id: 61,
    category: ['bracelets'],
    name: '61',
    price: '#',
    img: '././Images/P_60.jpg',
    images: ['././Images/P_60.jpg',]
  },
  {
    id: 62,
    category: ['waist-beads'],
    name: '62',
    price: '#',
    img: '././Images/P_61.jpg',
    images: ['././Images/P_61.jpg',]
  },
  {
    id: 63,
    category: ['bracelets'],
    name: '63',
    price: '#',
    img: '././Images/P_62.jpg',
    images: ['././Images/P_62.jpg',]
  },
  {
    id: 64,
    category: ['bracelets'],
    name: '64',
    price: '#',
    img: '././Images/P_63.jpg',
    images: ['././Images/P_63.jpg',]
  },
  {
    id: 65,
    category: ['watches'],
    name: '65',
    price: '#',
    img: '././Images/P_206.jpg',
    images: ['././Images/P_206.jpg',]
  },
  {
    id: 66,
    category: ['bracelets'],
    name: '66',
    price: '#',
    img: '././Images/P_65.jpg',
    images: ['././Images/P_65.jpg',]
  },
  {
    id: 67,
    category: ['necklace'],
    name: 'Grounded Majesty',
    price: '30000',
    img: '././Images/P_308.jpg',
    images: ['././Images/P_308.jpg',]
  },
  {
    id: 68,
    category: ['watches'],
    name: '68',
    price: '#',
    img: '././Images/P_67.jpg',
    images: ['././Images/P_67.jpg',
            '././Images/P_12.jpg',]
  },
  {
    id: 69,
    category: ['watches'],
    name: '69',
    price: '#',
    img: '././Images/P_68.jpg',
    images: ['././Images/P_68.jpg',]
  },
  {
    id: 70,
    category: ['necklace'],
    name: '70',
    price: '#',
    img: '././Images/P_204.jpg',
    images: ['././Images/P_204.jpg',]
  },
  {
    id: 71,
    category: ['bracelets'],
    name: 'Earth Light',
    price: '7500',
    img: '././Images/P_70.jpg',
    images: ['././Images/P_70.jpg',
             '././Images/P_56.jpg',]
  },
  {
    id: 72,
    category: ['trouser-chains'],
    name: '72',
    price: '#',
    img: '././Images/P_71.jpg',
    images: ['././Images/P_71.jpg',]
  },
  {
    id: 73,
    category: ['waist-beads'],
    name: '73',
    price: '#',
    img: '././Images/P_72.jpg',
    images: ['././Images/P_72.jpg',]
  },
  {
    id: 74,
    category: ['watches'],
    name: '74',
    price: '#',
    img: '././Images/P_73.jpg',
    images: ['././Images/P_73.jpg',]
  },
  {
    id: 75,
    category: ['necklace'],
    name: '75',
    price: '#',
    img: '././Images/P_74.jpg',
    images: ['././Images/P_74.jpg',]
  },
  {
    id: 76,
    category: ['watches'],
    name: '76',
    price: '#',
    img: '././Images/P_75.jpg',
    images: ['././Images/P_75.jpg',]
  },
  {
    id: 77,
    category: ['waist-beads'],
    name: '77',
    price: '#',
    img: '././Images/P_76.jpg',
    images: ['././Images/P_76.jpg',]
  },
  {
    id: 78,
    category: ['watches'],
    name: '78',
    price: '#',
    img: '././Images/P_77.jpg',
    images: ['././Images/P_77.jpg',
            '././Images/P_86.jpg',]
  },
  {
    id: 79,
    category: ['watches'],
    name: '79',
    price: '#',
    img: '././Images/P_205.jpg',
    images: ['././Images/P_205.jpg',]
  },
  {
    id: 80,
    category: ['waist-beads'],
    name: '80',
    price: '#',
    img: '././Images/P_79.jpg',
    images: ['././Images/P_79.jpg',]
  },
  {
    id: 81,
    category: ['bracelets'],
    name: '81',
    price: '#',
    img: '././Images/P_80.jpg',
    images: ['././Images/P_80.jpg',
            '././Images/P_88.jpg',
    ]
  },
  {
    id: 82,
    category: ['watches'],
    name: '82',
    price: '#',
    img: '././Images/P_81.jpg',
    images: ['././Images/P_81.jpg',]
  },
  {
    id: 83,
    category: ['waist-beads'],
    name: '83',
    price: '#',
    img: '././Images/P_82.jpg',
    images: ['././Images/P_82.jpg',]
  },
  {
    id: 84,
    category: ['watches'],
    name: '84',
    price: '#',
    img: '././Images/P_83.jpg',
    images: ['././Images/P_83.jpg',]
  },
  {
    id: 85,
    category: ['waist-beads'],
    name: '85',
    price: '#',
    img: '././Images/P_84.jpg',
    images: ['././Images/P_84.jpg',]
  },
  {
    id: 86,
    category: ['waist-beads'],
    name: '86',
    price: '#',
    img: '././Images/P_85.jpg',
    images: ['././Images/P_85.jpg',]
  },
  {
    id: 87,
    category: ['watches'],
    name: '87',
    price: '#',
    img: '././Images/P_86.jpg',
    images: ['././Images/P_86.jpg',
            '././Images/P_77.jpg',]
  },
  {
    id: 88,
    category: ['watches'],
    name: '88',
    price: '#',
    img: '././Images/P_87.jpg',
    images: ['././Images/P_87.jpg',
            '././Images/P_90.jpg',]
  },
  {
    id: 89,
    category: ['waist-beads'],
    name: '89',
    price: '#',
    img: '././Images/P_207.jpg',
    images: ['././Images/P_207.jpg',]
  },
  {
    id: 90,
    category: ['waist-beads'],
    name: '90',
    price: '#',
    img: '././Images/P_89.jpg',
    images: ['././Images/P_89.jpg',]
  },
  {
    id: 91,
    category: ['waist-beads'],
    name: '91',
    price: '#',
    img: '././Images/P_208.jpg',
    images: ['././Images/P_208.jpg',]
  },
  {
    id: 92,
    category: ['waist-beads'],
    name: '92',
    price: '#',
    img: '././Images/P_91.jpg',
    images: ['././Images/P_91.jpg',]
  },
  {
    id: 93,
    category: ['watches'],
    name: '93',
    price: '#',
    img: '././Images/P_92.jpg',
    images: ['././Images/P_92.jpg',]
  },
  {
    id: 94,
    category: ['watches'],
    name: '94',
    price: '#',
    img: '././Images/P_93.jpg',
    images: ['././Images/P_93.jpg',
            '././Images/P_26.jpg',
            '././Images/P_58.jpg',
            '././Images/P_59.jpg',
            '././Images/P_64.jpg',
            '././Images/P_78.jpg',]
  },
  {
    id: 95,
    category: ['bracelets'],
    name: '95',
    price: '#',
    img: '././Images/P_94.jpg',
    images: ['././Images/P_94.jpg',]
  },
  {
    id: 96,
    category: ['waist-beads'],
    name: '96',
    price: '#',
    img: '././Images/P_95.jpg',
    images: ['././Images/P_95.jpg',]
  },
  {
    id: 97,
    category: ['waist-beads'],
    name: '97',
    price: '#',
    img: '././Images/P_96.jpg',
    images: ['././Images/P_96.jpg',]
  },
  {
    id: 98,
    category: ['watches'],
    name: '98',
    price: '#',
    img: '././Images/P_97.jpg',
    images: ['././Images/P_97.jpg',]
  },
  {
    id: 99,
    category: ['watches'],
    name: '99',
    price: '#',
    img: '././Images/P_98.jpg',
    images: ['././Images/P_98.jpg',]
  },
  {
    id: 100,
    category: ['necklace'],
    name: '100',
    price: '#',
    img: '././Images/P_99.jpg',
    images: ['././Images/P_99.jpg',]
  },
  {
    id: 101,
    category: ['watches'],
    name: '101',
    price: '#',
    img: '././Images/P_100.jpg',
    images: ['././Images/P_100.jpg',
            '././Images/P_111.jpg',
            '././Images/P_112.jpg',
            '././Images/P_113.jpg',
            '././Images/P_114.jpg',
            '././Images/P_115.jpg',
            '././Images/P_116.jpg',
            '././Images/P_117.jpg',
            '././Images/P_118.jpg',
            '././Images/P_119.jpg',
            '././Images/P_120.jpg',
            '././Images/P_121.jpg',
            '././Images/P_122.jpg',]
  },
  {
    id: 102,
    category: ['waist-beads'],
    name: '102',
    price: '#',
    img: '././Images/P_101.jpg',
    images: ['././Images/P_101.jpg',]
  },
  {
    id: 103,
    category: ['bracelets'],
    name: '103',
    price: '#',
    img: '././Images/P_102.jpg',
    images: ['././Images/P_102.jpg',]
  },
  {
    id: 104,
    category: ['watches'],
    name: '104',
    price: '#',
    img: '././Images/P_103.jpg',
    images: ['././Images/P_103.jpg',
            '././Images/P_136.jpg',
            '././Images/P_137.jpg',
            '././Images/P_138.jpg',
            '././Images/P_139.jpg',
            '././Images/P_140.jpg',
            '././Images/P_141.jpg',
            '././Images/P_210.jpg',
            '././Images/P_211.jpg',]
  },
  {
    id: 105,
    category: ['bracelets'],
    name: '105',
    price: '#',
    img: '././Images/P_104.jpg',
    images: ['././Images/P_.jpg',]
  },
  {
    id: 106,
    category: ['waist-beads'],
    name: '106',
    price: '#',
    img: '././Images/P_105.jpg',
    images: ['././Images/P_105.jpg',
            '././Images/P_106.jpg',
            '././Images/P_107.jpg',
            '././Images/P_108.jpg',]
  },
  {
    id: 107,
    category: ['waist-beads'],
    name: '107',
    price: '#',
    img: '././Images/P_109.jpg',
    images: ['././Images/P_109.jpg',
            '././Images/P_110.jpg',],
  },
  {
    id: 108,
    category: ['watches'],
    name: '108',
    price: '#',
    img: '././Images/P_111.jpg',
    images: ['././Images/P_111.jpg',
            '././Images/P_112.jpg',
            '././Images/P_113.jpg',
            '././Images/P_114.jpg',
            '././Images/P_115.jpg',
            '././Images/P_116.jpg',
            '././Images/P_117.jpg',
            '././Images/P_118.jpg',
            '././Images/P_119.jpg',
            '././Images/P_120.jpg',
            '././Images/P_121.jpg',
            '././Images/P_122.jpg',],
  },
  {
    id: 109,
    category: ['bracelets'],
    name: '109',
    price: '#',
    img: '././Images/P_123.jpg',
    images: ['././Images/P_123.jpg'],
  },
  {
    id: 110,
    category: ['necklace'],
    name: '110',
    price: '#',
    img: '././Images/P_124.jpg',
    images: ['././Images/P_124.jpg'],
  },
  {
    id: 111,
    category: ['bracelets'],
    name: '111',
    price: '#',
    img: '././Images/P_125.jpg',
    images: ['././Images/P_125.jpg'],
  },
  {
    id: 112,
    category: ['bags'],
    name: '112',
    price: '#',
    img: '././Images/P_126.jpg',
    images: ['././Images/P_126.jpg',
            '././Images/P_201.jpg',]
  },
  {
    id: 113,
    category: ['waist-beads'],
    name: '113',
    price: '#',
    img: '././Images/P_127.jpg',
    images: ['././Images/P_127.jpg',
            '././Images/P_128.jpg',
            '././Images/P_129.jpg',],
  },
  {
    id: 114,
    category: ['waist-beads'],
    name: '114',
    price: '#',
    img: '././Images/P_130.jpg',
    images: ['././Images/P_130.jpg',
            '././Images/P_131.jpg',],
  },
  {
    id: 115,
    category: ['bracelets'],
    name: '115',
    price: '#',
    img: '././Images/P_132.jpg',
    images: ['././Images/P_132.jpg'],
  },
  {
    id: 116,
    category: ['necklace'],
    name: '116',
    price: '#',
    img: '././Images/P_133.jpg',
    images: ['././Images/P_133.jpg'],
  },
  {
    id: 117,
    category: ['bracelets'],
    name: 'Dad Bracelets',
    price: '6000',
    img: '././Images/P_134.jpg',
    images: ['././Images/P_134.jpg'],
  },
  {
    id: 118,
    category: ['necklace'],
    name: '118',
    price: '#',
    img: '././Images/P_135.jpg',
    images: ['././Images/P_135.jpg'],
  },
  {
    id: 119,
    category: ['watches'],
    name: '119',
    price: '#',
    img: '././Images/P_136.jpg',
    images: ['././Images/P_136.jpg',
            '././Images/P_137.jpg',
            '././Images/P_138.jpg',
            '././Images/P_139.jpg',
            '././Images/P_140.jpg',
            '././Images/P_141.jpg',
            '././Images/P_210.jpg',
            '././Images/P_211.jpg',]
  },
  {
    id: 120,
    category: ['waist-beads'],
    name: '120',
    price: '#',
    img: '././Images/P_142.jpg',
    images: ['././Images/P_142.jpg',
            '././Images/P_143.jpg',],
  },
  {
    id: 121,
    category: ['bracelets'],
    name: '121',
    price: '#',
    img: '././Images/P_144.jpg',
    images: ['././Images/P_144.jpg'],
  },
  {
    id: 122,
    category: ['necklace'],
    name: '122',
    price: '#',
    img: '././Images/P_145.jpg',
    images: ['././Images/P_145.jpg'],
  },
  {
    id: 123,
    category: ['necklace'],
    name: '123',
    price: '#',
    img: '././Images/P_146.jpg',
    images: ['././Images/P_146.jpg'],
  },
  {
    id: 124,
    category: ['watches'],
    name: '124',
    price: '#',
    img: '././Images/P_147.jpg',
    images: ['././Images/P_147.jpg',
            '././Images/P_148.jpg',
            '././Images/P_149.jpg',
            '././Images/P_150.jpg',
            '././Images/P_151.jpg',
            '././Images/P_421.jpg',],
  },
  {
    id: 125,
    category: ['watches'],
    name: '125',
    price: '#',
    img: '././Images/P_152.jpg',
    images: ['././Images/P_152.jpg',
            '././Images/P_153.jpg',
            '././Images/P_154.jpg',
            '././Images/P_155.jpg',
            '././Images/P_156.jpg',
            '././Images/P_157.jpg',],
  },
  {
    id: 126,
    category: ['waist-beads'],
    name: '126',
    price: '#',
    img: '././Images/P_158.jpg',
    images: ['././Images/P_158.jpg',
            '././Images/P_159.jpg',],
  },
  {
    id: 127,
    category: ['watches'],
    name: '127',
    price: '#',
    img: '././Images/P_160.jpg',
    images: ['././Images/P_160.jpg',
             '././Images/P_35.jpg',
            '././Images/P_161.jpg',
            '././Images/P_162.jpg',
            '././Images/P_163.jpg',
            '././Images/P_164.jpg',
            '././Images/P_165.jpg',
            '././Images/P_166.jpg',
            '././Images/P_167.jpg',
            '././Images/P_168.jpg',
            '././Images/P_169.jpg',
            '././Images/P_170.jpg',
            '././Images/P_171.jpg',
            '././Images/P_172.jpg',
            '././Images/P_173.jpg',
            '././Images/P_174.jpg',
            '././Images/P_175.jpg',
            '././Images/P_176.jpg',
            '././Images/P_177.jpg',
            '././Images/P_178.jpg',
            '././Images/P_179.jpg',
            '././Images/P_178.jpg',
            '././Images/P_179.jpg',
            '././Images/P_180.jpg',
            '././Images/P_181.jpg',
            '././Images/P_298.jpg',
            '././Images/P_299.jpg',
            '././Images/P_300.jpg',
            '././Images/P_301.jpg',
            '././Images/P_302.jpg',]
  },
  {
    id: 128,
    category: ['bracelets'],
    name: '128',
    price: '#',
    img: '././Images/P_182.jpg',
    images: ['././Images/P_182.jpg'],
  },
  {
    id: 129,
    category: ['watches'],
    name: '129',
    price: '#',
    img: '././Images/P_183.jpg',
    images: ['././Images/P_183.jpg',
            '././Images/P_184.jpg',
            '././Images/P_185.jpg',
            '././Images/P_186.jpg',
            '././Images/P_187.jpg',
            '././Images/P_188.jpg',
            '././Images/P_189.jpg',
            '././Images/P_200.jpg',],
  },
  {
    id: 130,
    category: ['bags'],
    name: '130',
    price: '#',
    img: '././Images/P_201.jpg',
    images: ['././Images/P_201.jpg',
            '././Images/P_126.jpg',]
  },
  {
    id: 131,
    category: ['bracelets'],
    name: '131',
    price: '#',
    img: '././Images/P_209.jpg',
    images: ['././Images/P_209.jpg'],
  },
  {
    id: 132,
    category: ['necklace'],
    name: '132',
    price: '#',
    img: '././Images/P_212.jpg',
    images: ['././Images/P_212.jpg'],
  },
  {
    id: 133,
    category: ['waist-beads'],
    name: '133',
    price: '#',
    img: '././Images/P_213.jpg',
    images: ['././Images/P_213.jpg'],
  },
  {
    id: 134,
    category: ['bracelets'],
    name: '134',
    price: '#',
    img: '././Images/P_214.jpg',
    images: ['././Images/P_214.jpg'],
  },
  {
    id: 135,
    category: ['waist-beads'],
    name: '135',
    price: '#',
    img: '././Images/P_215.jpg',
    images: ['././Images/P_215.jpg'],
  },
  {
    id: 136,
    category: ['watches'],
    name: '136',
    price: '#',
    img: '././Images/P_363.jpg',
    images: ['././Images/P_363.jpg',
             '././Images/P_364.jpg',
             '././Images/P_365.jpg',
             '././Images/P_366.jpg',
             '././Images/P_367.jpg',
             '././Images/P_368.jpg',
             '././Images/P_369.jpg',
             '././Images/P_370.jpg',
             '././Images/P_371.jpg',
             '././Images/P_372.jpg',
             '././Images/P_373.jpg',],
  },
  {
    id: 137,
    category: ['necklace'],
    name: 'Earth lover',
    price: '20000',
    img: '././Images/P_217.jpg',
    images: ['././Images/P_217.jpg'],
  },
  {
    id: 138,
    category: ['waist-beads'],
    name: '138',
    price: '#',
    img: '././Images/P_218.jpg',
    images: ['././Images/P_218.jpg'],
  },
  {
    id: 139,
    category: ['waist-beads'],
    name: '139',
    price: '#',
    img: '././Images/P_219.jpg',
    images: ['././Images/P_219.jpg'],
  },
  {
    id: 140,
    category: ['necklace'],
    name: '140',
    price: '#',
    img: '././Images/P_220.jpg',
    images: ['././Images/P_220.jpg'],
  },
  {
    id: 141,
    category: ['#'],
    name: '141',
    price: '#',
    img: '././Images/P_221.jpg',
    images: ['././Images/P_221.jpg',
            '././Images/P_222.jpg',
            '././Images/P_223.jpg',
            '././Images/P_224.jpg',
            '././Images/P_225.jpg',
            '././Images/P_226.jpg',
            '././Images/P_227.jpg',
            '././Images/P_228.jpg',
            '././Images/P_229.jpg',
            '././Images/P_230.jpg',
            '././Images/P_231.jpg',
            '././Images/P_232.jpg',
            '././Images/P_233.jpg',
            '././Images/P_234.jpg',
            '././Images/P_235.jpg',]
  },
  {
    id: 142,
    category: ['bracelets'],
    name: '142',
    price: '#',
    img: '././Images/P_236.jpg',
    images: ['././Images/P_236.jpg'],
  },
  {
    id: 143,
    category: ['waist-beads'],
    name: '143',
    price: '#',
    img: '././Images/P_237.jpg',
    images: ['././Images/P_237.jpg'],
  },
  {
    id: 144,
    category: ['waist-beads'],
    name: '144',
    price: '#',
    img: '././Images/P_238.jpg',
    images: ['././Images/P_238.jpg'],
  },
  {
    id: 145,
    category: ['bracelets'],
    name: '145',
    price: '#',
    img: '././Images/P_239.jpg',
    images: ['././Images/P_239.jpg'],
  },
  {
    id: 146,
    category: ['waist-beads'],
    name: '146',
    price: '#',
    img: '././Images/P_240.jpg',
    images: ['././Images/P_240.jpg'],
  },
  {
    id: 147,
    category: ['watches'],
    name: '147',
    price: '#',
    img: '././Images/P_241.jpg',
    images: ['././Images/P_241.jpg'],
  },
  {
    id: 148,
    category: ['waist-beads'],
    name: '148',
    price: '#',
    img: '././Images/P_242.jpg',
    images: ['././Images/P_242.jpg'],
  },
  {
    id: 149,
    category: ['waist-beads'],
    name: '149',
    price: '#',
    img: '././Images/P_243.jpg',
    images: ['././Images/P_243.jpg'],
  },
  {
    id: 150,
    category: ['necklace'],
    name: '150',
    price: '#',
    img: '././Images/P_244.jpg',
    images: ['././Images/P_244.jpg'],
  },
  {
    id: 151,
    category: ['waist-beads'],
    name: '151',
    price: '#',
    img: '././Images/P_245.jpg',
    images: ['././Images/P_245.jpg'],
  },
  {
    id: 152,
    category: ['watches'],
    name: '152',
    price: '#',
    img: '././Images/P_246.jpg',
    images: ['././Images/P_246.jpg',
            '././Images/P_247.jpg',
            '././Images/P_195.jpg',
            '././Images/P_196.jpg',
            '././Images/P_197.jpg',
            '././Images/P_198.jpg',]
  },
  {
    id: 153,
    category: ['bags'],
    name: '153',
    price: '#',
    img: '././Images/P_423.jpg',
    images: ['././Images/P_423.jpg'],
  },
  {
    id: 154,
    category: ['bracelets'],
    name: '154',
    price: '#',
    img: '././Images/P_250.jpg',
    images: ['././Images/P_250.jpg'],
  },
  {
    id: 155,
    category: ['waist-beads'],
    name: '155',
    price: '#',
    img: '././Images/P_251.jpg',
    images: ['././Images/P_251.jpg'],
  },
  {
    id: 156,
    category: ['watches'],
    name: '156',
    price: '#',
    img: '././Images/P_402.jpg',
    images: ['././Images/P_402.jpg'],
  },
  {
    id: 157,
    category: ['waist-beads'],
    name: '157',
    price: '#',
    img: '././Images/P_253.jpg',
    images: ['././Images/P_253.jpg'],
  },
  {
    id: 158,
    category: ['watches'],
    name: '158',
    price: '#',
    img: '././Images/P_254.jpg',
    images: ['././Images/P_254.jpg',
            '././Images/P_147.jpg',
            '././Images/P_148.jpg',
            '././Images/P_149.jpg',
            '././Images/P_150.jpg',
            '././Images/P_151.jpg',
            '././Images/P_421.jpg',],
  },
  {
    id: 159,
    category: ['necklace'],
    name: '159',
    price: '#',
    img: '././Images/P_255.jpg',
    images: ['././Images/P_255.jpg'],
  },
  {
    id: 160,
    category: ['waist-beads'],
    name: '160',
    price: '#',
    img: '././Images/P_256.jpg',
    images: ['././Images/P_256.jpg'],
  },
  {
    id: 161,
    category: ['watches'],
    name: '161',
    price: '#',
    img: '././Images/P_257.jpg',
    images: ['././Images/P_257.jpg'],
  },
  {
    id: 162,
    category: ['waist-beads'],
    name: '162',
    price: '#',
    img: '././Images/P_258.jpg',
    images: ['././Images/P_258.jpg'],
  },
  {
    id: 163,
    category: ['watches'],
    name: '163',
    price: '#',
    img: '././Images/P_259.jpg',
    images: ['././Images/P_259.jpg',
            '././Images/P_260.jpg',
            '././Images/P_261.jpg'],
  },
  {
    id: 164,
    category: ['necklace'],
    name: '164',
    price: '#',
    img: '././Images/P_262.jpg',
    images: ['././Images/P_262.jpg'],
  },
  {
    id: 165,
    category: ['waist-beads'],
    name: '165',
    price: '#',
    img: '././Images/P_263.jpg',
    images: ['././Images/P_263.jpg'],
  },
  {
    id: 166,
    category: ['bracelets'],
    name: '166',
    price: '#',
    img: '././Images/P_264.jpg',
    images: ['././Images/P_264.jpg'],
  },
  {
    id: 167,
    category: ['watches'],
    name: '167',
    price: '#',
    img: '././Images/P_265.jpg',
    images: ['././Images/P_265.jpg',
            '././Images/P_266.jpg',
            '././Images/P_267.jpg',
            '././Images/P_268.jpg',
            '././Images/P_269.jpg',
            '././Images/P_270.jpg',
            '././Images/P_271.jpg',
            '././Images/P_272.jpg',
            '././Images/P_273.jpg',
            '././Images/P_274.jpg',
            '././Images/P_275.jpg',
            '././Images/P_276.jpg',
            '././Images/P_277.jpg',
            '././Images/P_278.jpg',
            '././Images/P_279.jpg',]
  },
  {
    id: 168,
    category: ['necklace', 'bracelets',],
    name: 'Queenly Piece',
    price: '65000',
    img: '././Images/P_280.jpg',
    images: ['./Images/P_280.jpg',
            './Images/P_281.jpg',
            './Images/P_282.jpg',],
  },
  {
    id: 169,
    category: ['bracelets'],
    name: 'Wilderness Grace',
    price: '8000',
    img: './Images/P_283.jpg',
    images: ['./Images/P_283.jpg'],
  },
  {
    id: 170,
    category: ['bags'],
    name: '170',
    price: '25000',
    img: './Images/P_284.jpg',
    images: ['./Images/P_284.jpg',
            './Images/P_285.jpg',
            './Images/P_286.jpg',
            './Images/P_287.jpg',]
  },
  {
    id: 171,
    category: ['watches'],
    name: '171',
    price: '#',
    img: './Images/P_288.jpg',
    images: ['./Images/P_288.jpg',
            './Images/P_289.jpg',
            './Images/P_290.jpg',
            './Images/P_291.jpg',
            './Images/P_292.jpg',
            './Images/P_293.jpg',
            './Images/P_294.jpg',
            './Images/P_295.jpg',
            './Images/P_296.jpg',
            './Images/P_297.jpg',]
  },
  {
    id: 172,
    category: ['watches'],
    name: 'Rolex',
    price: '170000',
    img: '././Images/P_303.jpg',
    images: ['././Images/P_303.jpg',
            '././Images/P_304.jpg',
            '././Images/P_305.jpg',
            '././Images/P_306.jpg',
            '././Images/P_307.jpg',]
  },
  {
    id: 173,
    category: ['bags'],
    name: '173',
    price: '23000',
    img: '././Images/P_309.jpg',
    images: ['././Images/P_309.jpg'],
  },
  {
    id: 174,
    category: ['watches'],
    name: '174',
    price: '#',
    img: '././Images/P_311.jpg',
    images: ['././Images/P_311.jpg',
             '././Images/P_312.jpg',
             '././Images/P_313.jpg',
             '././Images/P_314.jpg',
             '././Images/P_315.jpg',
             '././Images/P_316.jpg',
             '././Images/P_317.jpg',
             '././Images/P_318.jpg',
             '././Images/P_319.jpg',
             '././Images/P_320.jpg',
             '././Images/P_321.jpg'],
  },
  {
    id: 175,
    category: ['necklace'],
    name: 'Royal Earth',
    price: '18000',
    img: '././Images/P_322.jpg',
    images: ['././Images/P_322.jpg'],
  },
  {
    id: 176,
    category: ['watches'],
    name: '176',
    price: '#',
    img: '././Images/P_323.jpg',
    images: ['././Images/P_323.jpg',
             '././Images/P_324.jpg',
             '././Images/P_325.jpg',
             '././Images/P_326.jpg',
             '././Images/P_327.jpg',
             '././Images/P_328.jpg',
             '././Images/P_329.jpg',],
  },
  {
    id: 177,
    category:['watches'],
    name: '177',
    price: '#',
    img: '././Images/P_340.jpg',
    images: ['././Images/P_330.jpg',
             '././Images/P_331.jpg',
             '././Images/P_332.jpg',
             '././Images/P_333.jpg',
             '././Images/P_334.jpg',
             '././Images/P_335.jpg',
             '././Images/P_336.jpg',
             '././Images/P_337.jpg',
             '././Images/P_338.jpg',
             '././Images/P_339.jpg',
             '././Images/P_340.jpg',
             '././Images/P_341.jpg',],
  },
  {
    id: 178,
    category: ['trouser-chains'],
    name: '178',
    price: '#',
    img: '././Images/P_342.jpg',
    images: ['././Images/P_342.jpg',
             '././Images/P_343.jpg',
    ],
  },
  {
    id: 179,
    category: ['watches'],
    name: '179',
    price: '#',
    img: '././Images/P_345.jpg',
    images: ['././Images/P_345.jpg',
             '././Images/P_346.jpg',
             '././Images/P_347.jpg',
             '././Images/P_348.jpg',
             '././Images/P_349.jpg',
             '././Images/P_350.jpg',
             '././Images/P_351.jpg',
             '././Images/P_352.jpg',
             '././Images/P_353.jpg',
             '././Images/P_354.jpg',
             '././Images/P_355.jpg',
             '././Images/P_356.jpg',
             '././Images/P_357.jpg',
             '././Images/P_358.jpg',
    ],
  },
  {
    id: 180,
    category: ['bags'],
    name: '180',
    price: '15000',
    img: '././Images/P_359.jpg',
    images: ['././Images/P_359.jpg',
             '././Images/P_360.jpg',
    ],
  },
  {
    id: 181,
    category: ['watches'],
    name: '181',
    price: '#',
    img: '././Images/P_361.jpg',
    images: ['././Images/P_361.jpg',
             '././Images/P_362.jpg',
    ],
  },
  {
    id: 182,
    category: ['waist-beads'],
    name: '182',
    price: '#',
    img: '././Images/P_216.jpg',
    images: ['././Images/P_216'],
  },
  {
    id: 183,
    category: ['bags'],
    name: '183',
    price: '#',
    img: '././Images/P_374.jpg',
    images: ['././Images/P_374.jpg'],
  },
  {
    id: 184,
    category: ['bags'],
    name: '184',
    price: '#',
    img: '././Images/P_375.jpg',
    images: ['././Images/P_375.jpg'],
  },
  {
    id: 185,
    category: ['watches'],
    name: '185',
    price: '#',
    img: '././Images/P_376.jpg',
    images: ['././Images/P_376.jpg',
             '././Images/P_377.jpg',
             '././Images/P_378.jpg',
             '././Images/P_379.jpg',
             '././Images/P_380.jpg',
             '././Images/P_381.jpg',
             '././Images/P_382.jpg',],
  },
  {
    id: 186,
    category: ['bags'],
    name: '186',
    price: '#',
    img: '././Images/P_383.jpg',
    images: ['././Images/P_383.jpg'],
  },
  {
    id: 187,
    category: ['watches'],
    name: '187',
    price: '#',
    img: '././Images/P_384.jpg',
    images: ['././Images/P_384.jpg',
             '././Images/P_385.jpg',
             '././Images/P_386.jpg',],
  },
  {
    id: 188,
    category: ['bags'],
    name: '188',
    price: '35000',
    img: '././Images/P_390.jpg',
    images: ['././Images/P_387.jpg',
            '././Images/P_388.jpg',
            '././Images/P_389.jpg',
            '././Images/P_390.jpg',]
  },
  {
    id: 189,
    category: ['watches'],
    name: '189',
    price: '#',
    img: '././Images/P_391.jpg',
    images: ['././Images/P_391.jpg',
            '././Images/P_392.jpg',
            '././Images/P_393.jpg',
            '././Images/P_394.jpg',
            '././Images/P_395.jpg',],
  },
  {
    id: 190,
    category: ['bags'],
    name: '190',
    price: '#',
    img: '././Images/P_396.jpg',
    images: ['././Images/P_396.jpg'],
  },
  {
    id: 191,
    category: ['watches'],
    name: '191',
    price: '#',
    img: '././Images/P_397.jpg',
    images: ['././Images/P_397.jpg',
             '././Images/P_398.jpg',
             '././Images/P_399.jpg',
             '././Images/P_400.jpg',
             '././Images/P_401.jpg',]
  },
  {
    id: 192,
    category: ['necklace'],
    name: '192',
    price: '#',
    img: '././Images/P_252.jpg',
    images: ['././Images/P_402.jpg'],
  },
  {
    id: 193,
    category: ['bags'],
    name: '193',
    price: '#',
    img: '././Images/P_403.jpg',
    images: ['././Images/P_403.jpg'],
  },
  {
    id: 194,
    category: ['watches'],
    name: '194',
    price: '#',
    img: '././Images/P_404.jpg',
    images: ['././Images/P_404.jpg',
            '././Images/P_405.jpg',
            '././Images/P_406.jpg',
            '././Images/P_407.jpg',
            '././Images/P_408.jpg',
            '././Images/P_409.jpg',
            '././Images/P_410.jpg',
            '././Images/P_411.jpg',
            '././Images/P_412.jpg',
            '././Images/P_413.jpg',
            '././Images/P_414.jpg',]
  },
  {
    id: 195,
    category: ['bags'],
    name: '195',
    price: '30000',
    img: '././Images/P_415.jpg',
    images: ['././Images/P_415.jpg'],
  },
  {
    id: 196,
    category: ['watches'],
    name: '196',
    price: '#',
    img: '././Images/P_416.jpg',
    images: ['././Images/P_416.jpg',
            '././Images/P_417.jpg',
            '././Images/P_418.jpg',
            '././Images/P_425.jpg',]
  },
  {
    id: 197,
    category: ['bags'],
    name: '197',
    price: '35000',
    img: '././Images/P_419.jpg',
    images: ['././Images/P_419.jpg',
            '././Images/P_420.jpg',],
  },
  {
    id: 198,
    category: ['bracelets'],
    name: 'Grounded Majesty',
    price: '8000',
    img: '././Images/P_424.jpg',
    images: ['././Images/P_424.jpg'],
  },
  {
    id: 199,
    category: ['bags'],
    name: '199',
    price: '#',
    img: '././Images/P_422.jpg',
    images: ['././Images/P_422.jpg'],
  },
  {
    id: 200,
    category: ['waist-beads'],
    name: '200',
    price: '#',
    img: '././Images/P_249.jpg',
    images: ['././Images/P_249.jpg'],
  },

];

// Format price helper
function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Product Gallery Functions
function openGalleryModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product || product.name === '#') return;

  // Save current scroll position
  scrollPositionBeforeModal = window.pageYOffset || document.documentElement.scrollTop;

  currentGalleryProduct = product;
  currentImageIndex = 0;

  // Update product details
  galleryProductName.textContent = product.name;
  galleryProductPrice.textContent = formatPrice(product.price);
  galleryAddCartBtn.dataset.id = product.id;

  // Use images array if available, otherwise fallback to single img
  const images = product.images || [product.img];
  updateGalleryImage(images[0]);
  renderThumbnails(images);

  // Show/hide navigation buttons based on image count
  galleryPrevBtn.style.display = images.length > 1 ? 'flex' : 'none';
  galleryNextBtn.style.display = images.length > 1 ? 'flex' : 'none';

  // Set proper ARIA attributes
  galleryModal.setAttribute('aria-hidden', 'false');
  galleryModal.setAttribute('role', 'dialog');
  galleryModal.setAttribute('aria-modal', 'true');
  galleryModal.setAttribute('aria-labelledby', 'gallery-title');

  galleryModal.classList.add('show');
  document.body.classList.add('modal-open');

  // Focus the close button for accessibility
  setTimeout(() => {
    galleryCloseBtn?.focus();
  }, 100);
}

function closeGalleryModal() {
  galleryModal.classList.remove('show');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  currentGalleryProduct = null;

  // Restore scroll position
  setTimeout(() => {
    window.scrollTo({
      top: scrollPositionBeforeModal,
      behavior: 'smooth'
    });
  }, 100);

  // Return focus to the element that opened the modal
  const lastFocusedElement = document.activeElement;
  if (lastFocusedElement && lastFocusedElement !== document.body) {
    lastFocusedElement.blur();
  }
}

// Focus trapping function for accessibility
function trapFocus(e) {
  const focusableElements = galleryModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}

function updateGalleryImage(imageSrc) {
  // Show loading state
  galleryMainImage.style.opacity = '0.5';

  // Create new image for preloading
  const newImage = new Image();
  newImage.onload = () => {
    galleryMainImage.src = imageSrc;
    galleryMainImage.alt = currentGalleryProduct?.name || 'Product Image';
    galleryMainImage.style.opacity = '1';
  };

  newImage.onerror = () => {
    // Fallback to original image if optimization fails
    galleryMainImage.src = imageSrc;
    galleryMainImage.alt = currentGalleryProduct?.name || 'Product Image';
    galleryMainImage.style.opacity = '1';
  };

  // Set loading attribute for better performance
  galleryMainImage.loading = 'eager';
  galleryMainImage.decoding = 'async';

  // Start loading the new image
  newImage.src = imageSrc;
}

function renderThumbnails(images) {
  galleryThumbnails.innerHTML = '';

  images.forEach((imageSrc, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imageSrc;
    thumbnail.alt = `${currentGalleryProduct.name} - View ${index + 1}`;
    thumbnail.className = `gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`;
    thumbnail.setAttribute('tabindex', '0');
    thumbnail.setAttribute('role', 'button');
    thumbnail.setAttribute('aria-label', `View image ${index + 1} of ${images.length}`);

    // Click and keyboard event handlers
    thumbnail.addEventListener('click', () => selectImage(index));
    thumbnail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectImage(index);
      }
    });

    galleryThumbnails.appendChild(thumbnail);
  });
}

function selectImage(index) {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = index;
  updateGalleryImage(images[index]);

  // Update active thumbnail
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function nextImage() {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  selectImage(currentImageIndex);
}

function prevImage() {
  const images = currentGalleryProduct.images || [currentGalleryProduct.img];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  selectImage(currentImageIndex);
}

// Gallery Modal Event Listeners
if (galleryModal) {
  galleryCloseBtn?.addEventListener('click', closeGalleryModal);
  galleryPrevBtn?.addEventListener('click', prevImage);
  galleryNextBtn?.addEventListener('click', nextImage);

  // Add proper accessibility attributes
  galleryCloseBtn?.setAttribute('aria-label', 'Close product gallery');
  galleryCloseBtn?.setAttribute('tabindex', '0');
  galleryPrevBtn?.setAttribute('aria-label', 'Previous product image');
  galleryPrevBtn?.setAttribute('tabindex', '0');
  galleryNextBtn?.setAttribute('aria-label', 'Next product image');
  galleryNextBtn?.setAttribute('tabindex', '0');

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Gallery add to cart button
  galleryAddCartBtn?.addEventListener('click', (e) => {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
    closeGalleryModal();
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('show')) return;

    switch (e.key) {
      case 'Escape':
        closeGalleryModal();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
      case 'Enter':
        if (e.target === galleryCloseBtn) {
          closeGalleryModal();
        } else if (e.target === galleryPrevBtn) {
          prevImage();
        } else if (e.target === galleryNextBtn) {
          nextImage();
        }
        break;
      case 'Tab':
        // Trap focus within modal
        trapFocus(e);
        break;
    }
  });
}

// Renders products based on filter and search term, updated to support multi-category arrays
function renderProducts(filter = 'all', searchTerm = '') {
  productsGrid.innerHTML = '';

  // Add price list image for waist beads filter
  if (filter === 'waist-beads') {
    const priceListCard = document.createElement('div');
    priceListCard.className = 'price-list-card';
    priceListCard.innerHTML = `
      <img src="././Images/price.jpeg" alt="Waist Beads Price List" loading="lazy" style="width: 100%; max-width: 600px; height: auto; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 8px 25px rgba(254, 142, 0, 0.4); border: 2px solid var(--color-sky);" />
    `;

    // Style the price list container to span full width and center the image
    priceListCard.style.cssText = `
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
      background: var(--bg-tertiary);
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px var(--shadow-color);
      border: 1px solid var(--border-color);
    `;

    productsGrid.appendChild(priceListCard);
  }

  let filtered;
  if (filter === 'all') {
    filtered = productsData;
  } else {
    filtered = productsData.filter(p =>
      Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter
    );
  }

  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
        : product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if(filtered.length === 0) {
    const noResultsMessage = searchTerm ?
      `No products found for "${searchTerm}".` :
      'No products found.';
    productsGrid.innerHTML = `<p style="color:#f2994a; text-align:center; width:100%;">${noResultsMessage}</p>`;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;

    // Use dynamic product data with # as placeholders
    const displayName = product.name;
    const displayPrice = product.price === '#' ? '#' : formatPrice(product.price);

    card.innerHTML = `
      <img src="${product.img}" alt="${displayName}" loading="lazy" />
      <div class="product-info">
        <h3>${displayName}</h3>
        <p class="product-price">${displayPrice}</p>
        <div class="product-actions">
          <button class="btn-add-cart" data-id="${product.id}" aria-label="Add ${displayName} to cart">Add to Cart</button>
        </div>
      </div>
    `;

    // Make whole card clickable for gallery (but not the button)
    card.addEventListener('click', (e) => {
      // Don't open gallery if clicking the add to cart button
      if (!e.target.closest('.btn-add-cart')) {
        openGalleryModal(product.id);
      }
    });

    productsGrid.appendChild(card);
  });
}

// Toggle mobile nav menu
const navOverlay = document.getElementById('nav-overlay');

hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  const newState = !expanded;

  hamburgerBtn.setAttribute('aria-expanded', newState);
  navMenu.classList.toggle('show', newState);
  navOverlay.classList.toggle('show', newState);
  document.body.classList.toggle('nav-open', newState);
});

// Close nav when clicking overlay
navOverlay.addEventListener('click', () => {
  closeNav();
});

// Close nav when clicking a nav link on mobile
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Update active state for navigation links
    if (link.getAttribute('href').startsWith('#')) {
      navMenu.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
    closeNav();
  });
});

// Close nav function
function closeNav() {
  navMenu.classList.remove('show');
  navOverlay.classList.remove('show');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

// Close nav with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    closeNav();
  }
});

// Close nav when clicking outside on larger screens
document.addEventListener('click', (e) => {
  if (window.innerWidth > 962) return;
  if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('show')) {
    closeNav();
  }
});

// Search functionality
searchBtn.addEventListener('click', () => {
  searchContainer.classList.add('show');
  searchInput.focus();
});

searchCloseBtn.addEventListener('click', () => {
  searchContainer.classList.remove('show');
  searchInput.value = '';
  currentSearchTerm = '';
  renderProducts(currentFilter);
});

searchInput.addEventListener('input', (e) => {
  currentSearchTerm = e.target.value.trim();
  renderProducts(currentFilter, currentSearchTerm);
});

// Close search with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchContainer.classList.contains('show')) {
    searchContainer.classList.remove('show');
    searchInput.value = '';
    currentSearchTerm = '';
    renderProducts(currentFilter);
  }
});

// Filter functionality - updated for proper ARIA state management
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Update active filter button
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    // Apply filter
    const filter = btn.dataset.filter;
    currentFilter = filter;
    renderProducts(filter, currentSearchTerm);
  });
});

// Toast notification function
function showToast(message, duration = 2000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification show';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Auto hide after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// Cart functionality
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) {
    showToast('Product not found');
    return;
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Use product data as-is, including placeholders
    const price = product.price === '#' ? 0 : parseFloat(product.price);
    cart.push({
      id: productId,
      name: product.name,
      price: price,
      img: product.img,
      quantity: 1
    });
  }

  renderCart();
  saveCart();
  updateCartCount();

  // Show toast notification
  showToast(`${product.name} added to cart!`, 1500);

  // Auto open cart modal after a brief delay
  setTimeout(() => {
    openCartModal();
  }, 800);
}

// Function to open cart modal
function openCartModal() {
  // Save current scroll position before opening modal
  scrollPositionBeforeModal = window.pageYOffset || document.documentElement.scrollTop;

  cartModal.classList.add('show');
  cartModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus the close button for accessibility
  setTimeout(() => {
    document.querySelector('.cart-close-btn')?.focus();
  }, 100);
}

function renderCart() {
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li style="text-align: center; color: var(--text-muted); padding: 2rem;">Your cart is empty</li>';
    totalPriceEl.textContent = 'Total: ₦0.00';
    checkoutBtn.disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="btn-quantity-decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
        <span aria-live="polite">${item.quantity}</span>
        <button class="btn-quantity-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item from cart">×</button>
    `;

    cartItemsList.appendChild(cartItem);
  });

  totalPriceEl.textContent = `Total: ${formatPrice(total)}`;
  checkoutBtn.disabled = false;
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex(item => item.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
  saveCart();
  updateCartCount();
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    renderCart();
    saveCart();
    updateCartCount();
  }
}

// Event delegation for cart buttons and product buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-add-cart')) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  } else if (e.target.classList.contains('btn-quantity-increase')) {
    const productId = parseInt(e.target.dataset.id);
    updateCartQuantity(productId, 1);
  } else if (e.target.classList.contains('btn-quantity-decrease')) {
    const productId = parseInt(e.target.dataset.id);
    updateCartQuantity(productId, -1);
  } else if (e.target.classList.contains('btn-remove-item')) {
    const productId = parseInt(e.target.dataset.id);
    removeFromCart(productId);
  }
});

// Cart modal functionality
cartBtn.addEventListener('click', () => {
  openCartModal();
});

// Close cart modal function
function closeCartModal() {
  cartModal.classList.remove('show');
  cartModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  // Restore scroll position smoothly
  setTimeout(() => {
    window.scrollTo({
      top: scrollPositionBeforeModal,
      behavior: 'smooth'
    });
  }, 100);
}

cartCloseBtn.addEventListener('click', closeCartModal);

// Close cart modal when clicking outside
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    closeCartModal();
  }
});

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  // Prepare order message
  let orderMessage = "Hello! I'd like to place an order:\n\n";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    orderMessage += `• ${item.name} x${item.quantity} - ${formatPrice(itemTotal)}\n`;
  });

  orderMessage += `\nTotal: ${formatPrice(total)}`;
  orderMessage += `\n\nPlease confirm availability and provide payment details.`;

  currentOrderMessage = orderMessage;

  // Close cart modal and open checkout modal (maintain scroll position)
  cartModal.classList.remove('show');
  cartModal.setAttribute('aria-hidden', 'true');
  checkoutModal.classList.add('show');
  checkoutModal.setAttribute('aria-hidden', 'false');

  // Focus the close button for accessibility
  setTimeout(() => {
    document.querySelector('.checkout-close-btn')?.focus();
  }, 100);
});

// Checkout method selection
// Close checkout modal function
function closeCheckoutModal() {
  checkoutModal.classList.remove('show');
  checkoutModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  // Restore scroll position smoothly
  setTimeout(() => {
    window.scrollTo({
      top: scrollPositionBeforeModal,
      behavior: 'smooth'
    });
  }, 100);
}

whatsappBtn.addEventListener('click', () => {
  const whatsappUrl = `https://wa.me/2349078161442?text=${encodeURIComponent(currentOrderMessage)}`;
  window.open(whatsappUrl, '_blank');
  closeCheckoutModal();
});

gmailBtn.addEventListener('click', () => {
  const subject = 'New Order from Website';
  const gmailUrl = `mailto:annysallure@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentOrderMessage)}`;
  window.location.href = gmailUrl;
  closeCheckoutModal();
});

// Close checkout modal
checkoutCloseBtn.addEventListener('click', closeCheckoutModal);

checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    closeCheckoutModal();
  }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (cartModal.classList.contains('show')) {
      closeCartModal();
    } else if (checkoutModal.classList.contains('show')) {
      closeCheckoutModal();
    } else if (galleryModal?.classList.contains('show')) {
      closeGalleryModal();
    }
  }
});

// Contact form functionality with WhatsApp integration
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim();
  const message = formData.get('message').trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">Please fill in all required fields.</span>';
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">Please enter a valid email address.</span>';
    return;
  }

  formStatus.innerHTML = '<span style="color: var(--color-sky);">Sending message...</span>';

  try {
    // Get current date and time
    const now = new Date();
    const timestamp = now.toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Create comprehensive WhatsApp message
    const whatsappMessage = `🌟 *NEW CONTACT FORM SUBMISSION* 🌟

👤 *Name:* ${name}
📧 *Email:* ${email}
${phone ? `📱 *Phone:* ${phone}` : ''}

💬 *Message:*
${message}

📅 *Submitted:* ${timestamp}
🌐 *Source:* Anny's Allure Website Contact Form

---
This message was automatically sent from the website contact form.`;

    // WhatsApp numbers to send to
    const whatsappNumbers = ['+2348102443212', '+2349078161442'];

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URLs
    const whatsappUrl1 = `https://wa.me/2348102443212?text=${encodedMessage}`;
    const whatsappUrl2 = `https://wa.me/2349078161442?text=${encodedMessage}`;

    // Show success message immediately
    formStatus.innerHTML = '<span style="color: #4CAF50;">Message prepared! WhatsApp will open to send your message to our team.</span>';

    // Reset form
    contactForm.reset();

    // Open first WhatsApp number
    setTimeout(() => {
      window.open(whatsappUrl1, '_blank');
    }, 500);

    // Open second WhatsApp number after a delay
    setTimeout(() => {
      window.open(whatsappUrl2, '_blank');
    }, 1500);

    // Update status message to inform about multiple windows
    setTimeout(() => {
      formStatus.innerHTML = '<span style="color: #4CAF50;">Two WhatsApp windows have opened - one for each contact number. Please send the message in both windows to ensure we receive it.</span>';
    }, 2000);

    // Clear success message after 10 seconds
    setTimeout(() => {
      formStatus.innerHTML = '';
    }, 10000);

  } catch (error) {
    formStatus.innerHTML = '<span style="color: var(--color-orange);">There was an error processing your message. Please try contacting us directly via WhatsApp at +2348102443212 or +2349078161442.</span>';
  }
});

// ==================== UNIFIED REVIEWS CAROUSEL FUNCTIONALITY ====================

// Unified reviews carousel state
let currentReviewIndex = 0;
let autoAdvanceInterval;
const reviewItems = document.querySelectorAll('.review-item');
const prevNavBtn = document.querySelector('.prev-btn');
const nextNavBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

// Show specific review by index
function showReview(index) {
  // Ensure index is within bounds
  if (index < 0) index = reviewItems.length - 1;
  if (index >= reviewItems.length) index = 0;

  // Hide all reviews
  reviewItems.forEach(item => item.classList.remove('active'));

  // Show the current review
  if (reviewItems[index]) {
    reviewItems[index].classList.add('active');
  }

  // Update indicators
  indicators.forEach(indicator => indicator.classList.remove('active'));
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }

  // Update current index
  currentReviewIndex = index;

  // Update navigation button states
  updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
  if (prevNavBtn && nextNavBtn) {
    // Enable/disable buttons if needed (for now, keep them always enabled for infinite loop)
    prevNavBtn.disabled = false;
    nextNavBtn.disabled = false;
  }
}

// Navigate to next review
function nextReview() {
  const nextIndex = (currentReviewIndex + 1) % reviewItems.length;
  showReview(nextIndex);
}

// Navigate to previous review
function prevReview() {
  const prevIndex = (currentReviewIndex - 1 + reviewItems.length) % reviewItems.length;
  showReview(prevIndex);
}

// Auto-advance functionality
function startAutoAdvance() {
  stopAutoAdvance(); // Clear any existing interval
  autoAdvanceInterval = setInterval(() => {
    nextReview();
  }, 6000); // Advance every 6 seconds
}

function stopAutoAdvance() {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = null;
  }
}

// Add event listeners for navigation
function initializeCarouselNavigation() {
  // Navigation buttons
  if (prevNavBtn) {
    prevNavBtn.addEventListener('click', () => {
      prevReview();
      stopAutoAdvance(); // Stop auto-advance when user interacts
      setTimeout(startAutoAdvance, 10000); // Restart after 10 seconds
    });
  }

  if (nextNavBtn) {
    nextNavBtn.addEventListener('click', () => {
      nextReview();
      stopAutoAdvance(); // Stop auto-advance when user interacts
      setTimeout(startAutoAdvance, 10000); // Restart after 10 seconds
    });
  }

  // Indicator dots
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showReview(index);
      stopAutoAdvance(); // Stop auto-advance when user interacts
      setTimeout(startAutoAdvance, 10000); // Restart after 10 seconds
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection && isElementInViewport(reviewsSection)) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevReview();
        stopAutoAdvance();
        setTimeout(startAutoAdvance, 10000);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextReview();
        stopAutoAdvance();
        setTimeout(startAutoAdvance, 10000);
      }
    }
  });
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Video testimonial interactions
function initializeVideoInteractions() {
  const playButtons = document.querySelectorAll('.play-btn');
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');

  playButtons.forEach((playBtn, index) => {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Determine video type based on carousel position
      const videoTitles = [
        'Customer Unboxing Experience',
        'Product Styling Tutorial',
        'Customer Review & Rating'
      ];

      // Find which video this is (since videos are mixed in the carousel)
      const currentReviewItem = playBtn.closest('.review-item');
      const reviewIndex = Array.from(reviewItems).indexOf(currentReviewItem);
      const videoIndex = Math.floor(reviewIndex / 3); // Assuming 3 videos in the carousel

      // Show a toast notification
      showToast(`${videoTitles[videoIndex] || 'Customer Video'} would play here. Replace with actual video URL or embed code.`);

      // Add visual feedback
      playBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        playBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
          playBtn.style.transform = '';
        }, 200);
      }, 100);
    });
  });

  // Add click handlers to video placeholders for accessibility
  videoPlaceholders.forEach((placeholder) => {
    placeholder.addEventListener('click', () => {
      const playBtn = placeholder.querySelector('.play-btn');
      if (playBtn) {
        playBtn.click();
      }
    });

    // Add keyboard navigation
    placeholder.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const playBtn = placeholder.querySelector('.play-btn');
        if (playBtn) {
          playBtn.click();
        }
      }
    });

    // Make video placeholders focusable
    placeholder.setAttribute('tabindex', '0');
    placeholder.setAttribute('role', 'button');
    placeholder.setAttribute('aria-label', 'Play video testimonial');
  });
}

// Touch/swipe support for mobile
function initializeTouchSupport() {
  const carousel = document.querySelector('.unified-reviews-carousel');
  if (!carousel) return;

  let startX = 0;
  let endX = 0;
  let startY = 0;
  let endY = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].screenX;
    endY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left - show next
        nextReview();
      } else {
        // Swiped right - show previous
        prevReview();
      }
      stopAutoAdvance();
      setTimeout(startAutoAdvance, 10000);
    }
  }
}

// Smooth scrolling for navigation to reviews section
function smoothScrollToReviews() {
  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection) {
    reviewsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add reviews link to navigation
function addReviewsToNavigation() {
  const navList = document.querySelector('.nav-list');
  if (navList) {
    // Check if reviews link already exists
    const existingReviewsLink = navList.querySelector('[href="#reviews"]');
    if (!existingReviewsLink) {
      const reviewsNavItem = document.createElement('li');
      reviewsNavItem.innerHTML = '<a href="#reviews" class="nav-link">Reviews</a>';

      // Insert before "About" link
      const aboutLink = navList.querySelector('[href="#about"]');
      if (aboutLink && aboutLink.parentElement) {
        navList.insertBefore(reviewsNavItem, aboutLink.parentElement);
      } else {
        navList.appendChild(reviewsNavItem);
      }

      // Add click handler for smooth scrolling
      const reviewsLink = reviewsNavItem.querySelector('a');
      reviewsLink.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToReviews();

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        reviewsLink.classList.add('active');

        // Close mobile menu if open
        if (hamburgerBtn && navMenu) {
          navMenu.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
        }
      });
    }
  }
}

// Enhanced Intersection Observer for cross-device nav link highlighting
let scrollHighlightObserver = null;
let currentActiveSection = null;

// Function to get dynamic header height for responsive rootMargin
function getHeaderHeight() {
  const header = document.querySelector('.header');
  return header ? header.offsetHeight : 70;
}

// Function to get responsive observer options
function getResponsiveObserverOptions() {
  const headerHeight = getHeaderHeight();
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Adjust thresholds and margins based on device type
  let threshold, rootMargin;

  if (isMobile) {
    // Mobile: More sensitive detection, smaller margins
    threshold = [0.1, 0.25, 0.4];
    rootMargin = `-${headerHeight + 10}px 0px -60% 0px`;
  } else if (isTablet) {
    // Tablet: Balanced detection
    threshold = [0.15, 0.3, 0.5];
    rootMargin = `-${headerHeight + 20}px 0px -50% 0px`;
  } else {
    // Desktop: Standard detection
    threshold = [0.2, 0.35, 0.6];
    rootMargin = `-${headerHeight + 30}px 0px -40% 0px`;
  }

  return { threshold, rootMargin };
}

// Enhanced navigation link update function
function updateActiveNavLink(sectionId, forceUpdate = false) {
  // Skip if the same section is already active and not forcing update
  if (currentActiveSection === sectionId && !forceUpdate) {
    return;
  }

  currentActiveSection = sectionId;
  const navLinks = document.querySelectorAll('.nav-link');

  // Remove active state from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.setAttribute('aria-pressed', 'false');
  });

  // Handle special cases and add active state to corresponding link
  let targetHref = `#${sectionId}`;

  // Special case: socials section is inside contact, so highlight contact link
  if (sectionId === 'socials') {
    const contactLink = document.querySelector('a[href="#contact"]');
    const socialsLink = document.querySelector('a[href="#socials"]');

    // Prioritize socials link if it exists, otherwise use contact
    if (socialsLink) {
      socialsLink.classList.add('active');
      socialsLink.setAttribute('aria-pressed', 'true');
    } else if (contactLink) {
      contactLink.classList.add('active');
      contactLink.setAttribute('aria-pressed', 'true');
    }
    return;
  }

  // Find and activate the corresponding navigation link
  const targetLink = document.querySelector(`a[href="${targetHref}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
    targetLink.setAttribute('aria-pressed', 'true');
  }
}

// Initialize scroll highlighting observer
function initScrollHighlighting() {
  // Clean up existing observer
  if (scrollHighlightObserver) {
    scrollHighlightObserver.disconnect();
  }

  const options = getResponsiveObserverOptions();

  scrollHighlightObserver = new IntersectionObserver((entries) => {
    let mostVisibleEntry = null;
    let maxIntersectionRatio = 0;

    // Find the most visible section
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
        maxIntersectionRatio = entry.intersectionRatio;
        mostVisibleEntry = entry;
      }
    });

    // Update active nav link for the most visible section
    if (mostVisibleEntry) {
      const sectionId = mostVisibleEntry.target.id;
      updateActiveNavLink(sectionId);

      // Handle special section behaviors
      if (sectionId === 'reviews') {
        startAutoAdvance();
      }
    }

    // Handle section-specific exit behaviors
    entries.forEach(entry => {
      if (!entry.isIntersecting && entry.target.id === 'reviews') {
        stopAutoAdvance();
      }
    });
  }, options);

  // Observe all sections with IDs, including the socials div
  const sections = document.querySelectorAll('section[id], #socials');
  sections.forEach(section => {
    scrollHighlightObserver.observe(section);
  });
}

// Reinitialize observer on window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initScrollHighlighting();
  }, 250);
});

// Initialize scroll highlighting when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollHighlighting);
} else {
  initScrollHighlighting();
}

// Enhanced toast notification for videos
function showToast(message, duration = 4000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Trigger show animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// Initialize unified reviews section
function initializeUnifiedReviewsSection() {
  // Initialize carousel if reviews exist
  if (reviewItems.length > 0) {
    showReview(0); // Show first review
    initializeCarouselNavigation();
    initializeVideoInteractions();
    initializeTouchSupport();
  }

  // Add reviews to navigation
  addReviewsToNavigation();

  // Add smooth scrolling to existing nav links that might link to reviews
  const existingReviewsLinks = document.querySelectorAll('a[href="#reviews"]');
  existingReviewsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToReviews();
    });
  });
}

// Initialize the app
renderProducts();
updateCartCount();
initSmoothScrolling();
initializeUnifiedReviewsSection();