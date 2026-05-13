/**
 * Canvas Crush Studio - Central Data Store
 * CCS Global Object
 */

const CCS = {

  defaultArtworks: [
    {
      id: 1,
      title: "Coral Symphony",
      artist: "Canvas Crush Studio",
      category: "abstract",
      medium: "Acrylic on Canvas",
      year: 2025,
      dimensions: 'TBD',
      originalPrice: 0,
      printsAvailable: true,
      printSizes: [],
      featured: true,
      badge: null,
      description: "An immersive underwater world where sunlight filters through shimmering waves to illuminate a vibrant coral reef. Schools of orange fish dart between formations of pink, purple, and gold coral — a meditation on the quiet abundance beneath the surface.",
      images: ["/assets/paintings/coral-symphony.jpg"]
    },
    {
      id: 2,
      title: "Voyager's Dawn",
      artist: "Canvas Crush Studio",
      category: "passionate",
      medium: "Acrylic on Canvas",
      year: 2025,
      dimensions: 'TBD',
      originalPrice: 0,
      printsAvailable: true,
      printSizes: [],
      featured: true,
      badge: null,
      description: "A mighty tall ship surges through stormy seas against a blazing amber sunset. Bold, expressive brushwork captures the raw power of wind and water — a timeless image of courage, movement, and the relentless human drive forward.",
      images: ["/assets/paintings/voyagers-dawn.jpg"]
    },
    {
      id: 3,
      title: "Rose Tide I",
      artist: "Canvas Crush Studio",
      category: "abstract",
      medium: "Mixed Media on Canvas",
      year: 2025,
      dimensions: 'TBD',
      originalPrice: 0,
      printsAvailable: true,
      printSizes: [],
      featured: false,
      badge: "Triptych · Panel I",
      setId: "rose-tide",
      setName: "Rose Tide Triptych",
      setPrice: 0,
      description: "The first panel of the Rose Tide Triptych. Luminous rose pink flows across a textured canvas in rhythmic wave forms — tactile, radiant, and alive with texture. Available individually or as part of the complete three-panel set.",
      images: ["/assets/paintings/rose-tide-1.jpg", "/assets/paintings/rose-tide-triptych.jpg"]
    },
    {
      id: 4,
      title: "Rose Tide II",
      artist: "Canvas Crush Studio",
      category: "abstract",
      medium: "Mixed Media on Canvas",
      year: 2025,
      dimensions: 'TBD',
      originalPrice: 0,
      printsAvailable: true,
      printSizes: [],
      featured: true,
      badge: "Triptych · Panel II",
      setId: "rose-tide",
      setName: "Rose Tide Triptych",
      setPrice: 0,
      description: "The centrepiece of the Rose Tide Triptych. Deeper rose and silver shimmer through undulating waves — the most luminous of the three panels. Available individually or as part of the complete three-panel set.",
      images: ["/assets/paintings/rose-tide-2.jpg", "/assets/paintings/rose-tide-triptych.jpg"]
    },
    {
      id: 5,
      title: "Rose Tide III",
      artist: "Canvas Crush Studio",
      category: "abstract",
      medium: "Mixed Media on Canvas",
      year: 2025,
      dimensions: 'TBD',
      originalPrice: 0,
      printsAvailable: true,
      printSizes: [],
      featured: false,
      badge: "Triptych · Panel III",
      setId: "rose-tide",
      setName: "Rose Tide Triptych",
      setPrice: 0,
      description: "The closing panel of the Rose Tide Triptych. Muted mauve and violet undertones settle into a quieter rhythm — a graceful resolution to the trilogy's emotional arc. Available individually or as part of the complete three-panel set.",
      images: ["/assets/paintings/rose-tide-3.jpg", "/assets/paintings/rose-tide-triptych.jpg"]
    }
  ],

  // ─── Artwork Methods ────────────────────────────────────────────────────────

  getArtworks() {
    try {
      const saved = localStorage.getItem('ccs_artworks');
      return saved ? JSON.parse(saved) : [...this.defaultArtworks];
    } catch(e) {
      return [...this.defaultArtworks];
    }
  },

  saveArtworks(artworks) {
    localStorage.setItem('ccs_artworks', JSON.stringify(artworks));
  },

  getArtwork(id) {
    const artworks = this.getArtworks();
    return artworks.find(a => a.id === parseInt(id)) || null;
  },

  getFeaturedArtworks() {
    return this.getArtworks().filter(a => a.featured);
  },

  // Returns the resolved print sizes for an artwork (handles legacy printPrice field)
  getPrintSizes(artwork) {
    if (!artwork) return [];
    if (artwork.printsAvailable === false) return [];
    if (artwork.printSizes && artwork.printSizes.length > 0) return artwork.printSizes;
    // Legacy fallback: single size from old printPrice field
    if (artwork.printPrice && artwork.printPrice > 0) {
      return [{ label: 'Standard Print', price: artwork.printPrice }];
    }
    return [];
  },

  // ─── Cart Methods ───────────────────────────────────────────────────────────

  getCart() {
    try {
      const saved = localStorage.getItem('ccs_cart');
      return saved ? JSON.parse(saved) : {};
    } catch(e) {
      return {};
    }
  },

  saveCart(cart) {
    localStorage.setItem('ccs_cart', JSON.stringify(cart));
    this.updateCartBadge();
  },

  addToCart(artworkId, type, frame, printSize) {
    const artwork = this.getArtwork(artworkId);
    if (!artwork) return false;
    const cart = this.getCart();
    const sizeKey = (type === 'print' && printSize) ? printSize.label.replace(/[^a-z0-9]/gi, '_') : 'none';
    const key = `${artworkId}_${type}_${frame || 'none'}_${sizeKey}`;
    if (cart[key]) {
      cart[key].quantity = (cart[key].quantity || 1) + 1;
    } else {
      let price;
      if (type === 'original') {
        price = artwork.originalPrice;
      } else if (printSize) {
        price = printSize.price;
      } else {
        const sizes = this.getPrintSizes(artwork);
        price = sizes.length > 0 ? sizes[0].price : 0;
      }
      cart[key] = {
        artworkId: parseInt(artworkId),
        type,
        frame: frame || 'none',
        printSize: (type === 'print' && printSize) ? printSize.label : null,
        quantity: 1,
        price,
        title: artwork.title,
        artist: artwork.artist,
        image: artwork.images[0],
        medium: artwork.medium
      };
    }
    this.saveCart(cart);
    return true;
  },

  removeFromCart(key) {
    const cart = this.getCart();
    delete cart[key];
    this.saveCart(cart);
  },

  updateQuantity(key, qty) {
    const cart = this.getCart();
    if (!cart[key]) return;
    if (qty <= 0) {
      delete cart[key];
    } else {
      cart[key].quantity = qty;
    }
    this.saveCart(cart);
  },

  clearCart() {
    localStorage.removeItem('ccs_cart');
    this.updateCartBadge();
  },

  getCartTotal() {
    const cart = this.getCart();
    return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCartCount() {
    const cart = this.getCart();
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  },

  updateCartBadge() {
    const count = this.getCartCount();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // ─── Settings ───────────────────────────────────────────────────────────────

  getSettings() {
    try {
      const saved = localStorage.getItem('ccs_settings');
      const defaults = {
        adminPassword: 'canvas2024',
        stripePaymentLink: '',
        formspreeId: '',
        shippingRate: 45,
        taxRate: 0.1,
        githubToken: '',
        githubRepo: 'sanskrutishah99/canvas-crush-studio'
      };
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch(e) {
      return { adminPassword: 'canvas2024', stripePaymentLink: '', formspreeId: '', shippingRate: 45, taxRate: 0.1, githubToken: '', githubRepo: 'sanskrutishah99/canvas-crush-studio' };
    }
  },

  saveSettings(obj) {
    const current = this.getSettings();
    localStorage.setItem('ccs_settings', JSON.stringify({ ...current, ...obj }));
  },

  // ─── Admin Auth ──────────────────────────────────────────────────────────────

  isAdminLoggedIn() {
    return sessionStorage.getItem('ccs_admin') === 'true';
  },

  adminLogin(password) {
    const settings = this.getSettings();
    if (password === settings.adminPassword) {
      sessionStorage.setItem('ccs_admin', 'true');
      return true;
    }
    return false;
  },

  adminLogout() {
    sessionStorage.removeItem('ccs_admin');
  },

  // ─── Branding ────────────────────────────────────────────────────────────────

  getBranding() {
    try {
      const saved = localStorage.getItem('ccs_branding');
      const defaults = { studioName: 'Canvas Crush Studio', tagline: 'Curating Passion', logoUrl: '' };
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch(e) { return { studioName: 'Canvas Crush Studio', tagline: 'Curating Passion', logoUrl: '' }; }
  },

  saveBranding(obj) {
    const current = this.getBranding();
    localStorage.setItem('ccs_branding', JSON.stringify({ ...current, ...obj }));
  },

  applyBranding() {
    const b = this.getBranding();
    // Studio name in nav and footer
    document.querySelectorAll('[data-brand="name"]').forEach(el => { el.textContent = b.studioName; });
    // Copyright line
    document.querySelectorAll('[data-brand="copyright"]').forEach(el => {
      el.textContent = `© ${new Date().getFullYear()} ${b.studioName}. ${b.tagline}.`;
    });
    // Logo: if a URL is set replace the nav text with an image
    if (b.logoUrl) {
      document.querySelectorAll('[data-brand="logo-wrap"]').forEach(wrap => {
        wrap.innerHTML = `<img src="${b.logoUrl}" alt="${b.studioName}" style="height:38px;object-fit:contain;display:block;"/>`;
      });
    }
    // Page title
    if (b.studioName && b.studioName !== 'Canvas Crush Studio') {
      document.title = document.title.replace(/Canvas Crush Studio/g, b.studioName);
    }
    // Apply nav icons
    const icons = this.getNavIcons();
    document.querySelectorAll('[data-icon="search"]').forEach(el => el.textContent = icons.search);
    document.querySelectorAll('[data-icon="cart"]').forEach(el => el.textContent = icons.cart);
    document.querySelectorAll('[data-icon="menu"]').forEach(el => el.textContent = icons.menu);
  },

  // ─── Nav Icons ───────────────────────────────────────────────────────────────

  getNavIcons() {
    try {
      const saved = localStorage.getItem('ccs_nav_icons');
      const defaults = { search: 'search', cart: 'shopping_cart', menu: 'menu' };
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch(e) { return { search: 'search', cart: 'shopping_cart', menu: 'menu' }; }
  },

  saveNavIcons(icons) {
    localStorage.setItem('ccs_nav_icons', JSON.stringify(icons));
  },

  // ─── Page Content ────────────────────────────────────────────────────────────

  getPageContent(pageId) {
    try {
      const all = JSON.parse(localStorage.getItem('ccs_page_content') || '{}');
      return all[pageId] || null;
    } catch(e) { return null; }
  },

  savePageContent(pageId, content) {
    try {
      const all = JSON.parse(localStorage.getItem('ccs_page_content') || '{}');
      if (content === null) { delete all[pageId]; } else { all[pageId] = content; }
      localStorage.setItem('ccs_page_content', JSON.stringify(all));
    } catch(e) {}
  },

  applyPageContent(pageId) {
    const content = this.getPageContent(pageId);
    if (!content) return;
    if (content.heroHeading) {
      document.querySelectorAll('[data-page="hero-heading"]').forEach(el => { el.textContent = content.heroHeading; });
    }
    if (content.heroSub) {
      document.querySelectorAll('[data-page="hero-sub"]').forEach(el => { el.textContent = content.heroSub; });
    }
    if (content.ctaLabel) {
      document.querySelectorAll('[data-page="cta-label"]').forEach(el => { el.textContent = content.ctaLabel; });
    }
    if (content.ctaLink) {
      document.querySelectorAll('[data-page="cta-link"]').forEach(el => { el.href = content.ctaLink; });
    }
    if (content.meta) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
      meta.content = content.meta;
    }
    if (content.title) {
      document.title = content.title;
    }
  },

  // ─── Custom Pages ────────────────────────────────────────────────────────────

  getCustomPages() {
    try { return JSON.parse(localStorage.getItem('ccs_custom_pages') || '[]'); } catch(e) { return []; }
  },

  saveCustomPages(pages) {
    localStorage.setItem('ccs_custom_pages', JSON.stringify(pages));
  },

  // ─── Utils ───────────────────────────────────────────────────────────────────

  formatPrice(n) {
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  getCategoryLabel(cat) {
    const map = {
      passionate: 'Vitality',
      abstract: 'Serenity',
      cultural: 'Culture'
    };
    return map[cat] || cat;
  },

  // ─── Set / Triptych Methods ──────────────────────────────────────────────────

  getArtworksBySet(setId) {
    return this.getArtworks().filter(a => a.setId === setId);
  },

  addSetToCart(setId) {
    const artworks = this.getArtworksBySet(setId);
    if (!artworks.length) return false;
    const cart = this.getCart();
    const first = artworks[0];
    const setPrice = first.setPrice || artworks.reduce((sum, a) => sum + (a.originalPrice || 0), 0);
    const setName = first.setName || 'Triptych Set';
    const key = `set_${setId}_original`;
    if (cart[key]) {
      cart[key].quantity = (cart[key].quantity || 1) + 1;
    } else {
      const triptychImg = artworks[0].images[1] || artworks[0].images[0];
      cart[key] = {
        isSet: true,
        setId,
        artworkIds: artworks.map(a => a.id),
        type: 'original',
        frame: 'none',
        printSize: null,
        quantity: 1,
        price: setPrice,
        title: setName,
        artist: first.artist,
        image: triptychImg,
        medium: first.medium
      };
    }
    this.saveCart(cart);
    return true;
  }

};

// ─── Auto data-version reset ─────────────────────────────────────────────────
// Bumping DATA_VERSION clears saved artworks so everyone sees the latest defaults.
(function() {
  const DATA_VERSION = '2026-v2';
  if (localStorage.getItem('ccs_data_version') !== DATA_VERSION) {
    localStorage.removeItem('ccs_artworks');
    localStorage.setItem('ccs_data_version', DATA_VERSION);
  }
})();
