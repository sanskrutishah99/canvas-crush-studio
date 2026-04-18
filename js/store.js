/**
 * Canvas Crush Studio - Central Data Store
 * CCS Global Object
 */

const CCS = {

  defaultArtworks: [
    { id:1, title:"Eternal Ember", artist:"Canvas Crush Studio", category:"passionate", medium:"Oil on Belgian Linen", year:2024, dimensions:'48"×60"×1.5"', originalPrice:4200, printsAvailable:true, printSizes:[{label:'8"×10"',price:115},{label:'12"×16"',price:195},{label:'18"×24"',price:285}], featured:true, badge:null, description:"A powerful exploration of raw passion rendered in thick, expressive brushwork. Fiery terracotta and deep umber tones converge on the canvas, creating electric visual tension.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuAYXOSUN_lMEOOitILwQ2lM41K_-1rzecEOvOZtzygyExBLETtk0WDaL0J0F-MdQzhp0yWQgymfFavTHsPdvBlJ0TmLL9Nx31lyoXPIFa_tO7F5E5m6i-LdUONRYfy9CK3W6ObQUuZCn9G2uKGw2rlAQCqsfswx5XnxeB0boQ2UDQApgV4cKz1F0kWn2GUeBpw4jNh3on_-mgXfg0pIUDOfz2DMS8SBPFWASJZoD3H7y5qWW9AcnkMfcz4zDzhZ8L4QjpsJfZnbzq0"] },
    { id:2, title:"Crimson Gaze", artist:"Canvas Crush Studio", category:"passionate", medium:"Mixed Media", year:2024, dimensions:'36"×48"×1"', originalPrice:1850, printsAvailable:true, printSizes:[{label:'8"×10"',price:50},{label:'12"×16"',price:80},{label:'18"×24"',price:120}], featured:false, badge:null, description:"A study in quiet intensity. Warm terracotta and sand tones layer to create a portrait of emotion that lingers long after first glance.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuCZTJWN2LI9STkmW8ngyyd38DH8q-R_c7E1RCZDAErp0zq90GPbdw2lpFx1uzrjJzSs3aDznvMM4pkmxQkigzPlOYllMxbnzXe26cavgxprq_nV6LRCWQm_W_lD3LbGI-15LzLncW20yGiMsm_9BoBOSrCJCzLG1xmRNg6J0bSlyrn64lPVzs2upmcNZ6XijHYxTKUK-LNrksazYbOiAYynveS4SIKRbMWKBwRRQwcFhbpRS-bNk6UGFfI_ajsbd276FLdteALUb1Y"] },
    { id:3, title:"Pulse of Earth", artist:"Canvas Crush Studio", category:"passionate", medium:"Acrylic on Canvas", year:2024, dimensions:'30"×30"×1.5"', originalPrice:2100, printsAvailable:true, printSizes:[{label:'8"×10"',price:60},{label:'12"×16"',price:100},{label:'18"×24"',price:145}], featured:false, badge:null, description:"An abstract explosion of earthy orange and muted terracotta paints colliding on a warm cream background, capturing the primal energy of the natural world.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuBRn4s2j3rixUoFJPWEiV9lbOf-60hgNCBOnCcOztd7MwGj2mQV68To-QPUAKTarMr7tQjkm6TQ8zvKvuex89tbDfFa4TfgJMNb0NolX5DdUP2vVx4MsgEJ1ayItCYs-d2NYgZbJO-97vSiGYTnsKmUWLg-uNQ4jYhAFQNhs_YdzRRvslD63ozjU7ehIT_EQyRNI_ABNiFM5DdDJwyIjGHi3emKMSdXcvn2fTeo6ghFhMk3mYmsI4oMgo6lF_wVTr2BoIEaEXQco4A"] },
    { id:4, title:"Liquid Calm", artist:"Canvas Crush Studio", category:"abstract", medium:"Ink and Resin", year:2024, dimensions:'24"×24"×0.75"', originalPrice:950, printsAvailable:true, printSizes:[{label:'8"×10"',price:40},{label:'12"×16"',price:65},{label:'18"×24"',price:95}], featured:false, badge:null, description:"Swirling clouds of sienna and muted burnt orange ink in water create ethereal organic textures. A meditation on stillness within chaos.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuBL2TKvlW2xV6b4jtJLbq_56lpoVVkThWaX5SgvTahek97FWmQKaHCqtLecH2ikjMyMrM5ocNVHpMQRg_ap1q-edgSYEG8c_cE0OT1ZEE95VPJmbyd-4SqwOwRSU4KxBJyZDr4-S82kRHNJjHjmg8x1CsJB23ArK-l067PTR8hPKtUk2LXLsGW6TKhxeO21mFk_pVIx32mt8FlqYwUVWHRgv-d5kfdrBruzk3BRPfiD-XXdzGOtPy70l_Ph58e9S3wSxR9nrvnhunY"] },
    { id:5, title:"The Heart's Architecture", artist:"Canvas Crush Studio", category:"passionate", medium:"Oil on Canvas", year:2024, dimensions:'60"×72"×2"', originalPrice:12500, printsAvailable:true, printSizes:[{label:'8"×10"',price:195},{label:'12"×16"',price:320},{label:'18"×24"',price:480}], featured:true, badge:"Artist Spotlight", description:"Our signature piece for the season. A study in the geometry of emotion, rendered over six months of intense studio work in our signature terracotta palette.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuCbSTR2fjBcNkntOltfcHiw54ivAJ0DaGi3WETuUPooeJOznRMjVrlwZU5dDrUzWWQ5sNxg5PqwYUJRrKXVa69ii_uHJkTQbdZk-VXHFDJ72QTkOfaQKrGB4PvGyNRamiYPhisOS6q9vgbqRlqWhM4pDWUCkZsD04tKDck1jsy3itnb-b_mYJ5SKaPIbA2CI8Qdz-mpPuiLcRbwlmRzmsMymhKtt1yxeFVSSRBHHTp9EKuBo2c2BrXqPg1xJh-4C97tjl7io_igUrA"] },
    { id:6, title:"Whispers of Crimson Dawn", artist:"Elena Vance", category:"abstract", medium:"Mixed Media on Canvas", year:2024, dimensions:'48"×60"×1.5"', originalPrice:2850, printsAvailable:true, printSizes:[{label:'8"×10"',price:80},{label:'12"×16"',price:130},{label:'18"×24"',price:195}], featured:true, badge:"Signed Original", description:"An exploration of the quiet turbulence found in the transition between shadow and light. Elena Vance utilizes a palette knife technique to layer raw pigments, creating a physical topography that invites the viewer to touch the emotion.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuDTJMbQ4j97tb71QNK4lFRYruXunPzz4eXZgNTV8Lo4Z3QS_Q8Kq05a74hOL92_yWB5yRni4sSppZeERQ8MtCyFbmtfd5avSY5SRPb0vDSSIteI0Bz2c0yoOyoPhpC5O9JY7tcUvcIzResLFnYUeUUazHUrPAaNOsWfs1pW4FV-0yErPKhNSqYSG6ssH961WmDlc-lUhjBYkHLmv4m1934u2yDAvUzxPBbFP_Y-UBF7aAL5xiVBDBX4hUGCDCxb6RpR4Sg857kE9cg", "https://lh3.googleusercontent.com/aida-public/AB6AXuARNVnxM_NQZ-0ICHXw7NpNL94GhSA-AEEUROl4hEJtoLiy0oT2XSpvFtCAQB5AvksYjjZ6ZJWtVu-efk5xNNF63QNbIggtegd4zvYa0IbUcXZiDWQiRR6u46_KRar_ua8P-sjqLvE84CiKQDWloQhW7wZ0MSa_NfYHo_AzrQrgLqk8NKDRRzARQhnerEaeOg4YyK_S_YGSF0GbmvLfYokVtiqNw4oOvwNH2FOjtexFsuHqmXN54mjBSwz2FWRalXyKfO2rDMqGG50"] },
    { id:7, title:"Oceanic Nocturne", artist:"Canvas Crush Studio", category:"abstract", medium:"Oil on Canvas", year:2024, dimensions:'40"×60"×1.5"', originalPrice:1800, printsAvailable:true, printSizes:[{label:'8"×10"',price:55},{label:'12"×16"',price:95},{label:'18"×24"',price:140}], featured:false, badge:null, description:"Moody blue and gold leaf highlights dance across a dark canvas, evoking the mysterious depths of midnight seas.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuBNI4BXrUg-5ySuhmdKir6M9hMNp68cTRKVFpl9cXbD6jQRYz6WPsEmPWbU08KcgDcxtK8Lzt_MO6gLZlCb2nUUW3mqvBSqZNHX6hzAzaSjGH6KT3QiLSKgzsEk50Y-5avnfNufBaz3CVsLKTaKwyGp1Y8wbHhtRSaj_JB28nP_41mrrJdm0Yt_RuN5MEl5lcBKI_eGLfio-Jok-p84caqVvyxWYH0PCfOwhsZPOx8nrRZXGRxFGBFCil5Ubs96Q_Y3IFhy8POxmo1GGjQ"] },
    { id:8, title:"Sahara Gold", artist:"Canvas Crush Studio", category:"cultural", medium:"Oil on Canvas", year:2024, dimensions:'48"×24"×1.5"', originalPrice:1200, printsAvailable:true, printSizes:[{label:'8"×10"',price:40},{label:'12"×16"',price:65},{label:'18"×24"',price:95}], featured:false, badge:null, description:"A panoramic landscape painting of a desert sunset with warm sand tones and a purple sky. Heritage and memory captured in a single sweeping vista.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuBU_K2EGRtCWYMIMsZ1G-mICe13OH7UxgGFwjodCmrbBilF-ttXRJgLx6R2NSF1LzhTHkLN-FxSi4-8CBlYVHXKYuPYT5xBeT8BLFMdhvI8aeBO_Mu1UaDWKxjOe4vE0zCgUc7JvkbDxMZCp2phjuPt8W67gx3SuZuku3N8A2fkco9B1-VvJFRQn4m53b0zc-IrcyAvn3VHHGmfKH4yvc5I6BL5e8ZPuZ0auCFHvd92bcZPOA1RETNKP50aHJlpkMOJBjY-dMHT3-g"] },
    { id:9, title:"Inner Silence", artist:"Canvas Crush Studio", category:"abstract", medium:"Mixed Media", year:2024, dimensions:'24"×24"×1"', originalPrice:1400, printsAvailable:true, printSizes:[{label:'8"×10"',price:45},{label:'12"×16"',price:75},{label:'18"×24"',price:110}], featured:false, badge:null, description:"Minimalist sculptural painting with layered neutral tones and deep shadow gaps. A study in restraint and the beauty of negative space.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuCCqoxOvLjYCHkATYrly2I4vneZcAS_j1Ue-KSPZUABlJd3pHb4TJiqjNSUG8ds9I4tlEghrNpOJYBFAufzD1QjLEgn9_6GkNnxa7MSOB8uyH4WORHQjfv-4FTfrp_9k34f1XaADvamDWydw_GksnoZ4UAZhvyBE7EE-dPteznQzIFw4L86BL0kkAGnwPWDwWr6KXBmIpnlrPHKk93WBGbQBQkR4HOuwcJ5i2iL2LOnAdpCVcvwIRhWYdkGXFJ1iszlqFSLsyAT6Q4"] },
    { id:10, title:"Ochre Horizon", artist:"Canvas Crush Studio", category:"cultural", medium:"Oil on Belgian Linen", year:2024, dimensions:'60"×40"×1.5"', originalPrice:4200, printsAvailable:true, printSizes:[{label:'8"×10"',price:115},{label:'12"×16"',price:195},{label:'18"×24"',price:285}], featured:true, badge:null, description:"Dramatic abstract painting with expressive brushstrokes of terracotta, ochre, and soft sand on a textured gallery canvas. The horizon as emotional metaphor.", images:["https://lh3.googleusercontent.com/aida-public/AB6AXuBUOiYJgcYDfhRQPznzXSATXoSpU6S71OC2wOs4RdMfLspVjMOF9RdiLgL04sp_zbQhFU8_dXZdZRxYmB1tLW1ji0XifCZK-W_stYYCHphJVI7RCV5JGxjt0aPAgsPJXHji2ssq1WGE12Ou8GMCRCrUe8IqH6ITUfSHG3R_4mpYIAgAqJ2qVbWOo2zkucJoEugBe496D70nC6DCj6z-B4nytj3hxdXH1aBsnwifzU29wwISILkVDRwZPzybw7cGPzGjDwjPioFQ4AI"] }
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
  },

  // ─── Utils ───────────────────────────────────────────────────────────────────

  formatPrice(n) {
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  getCategoryLabel(cat) {
    const map = {
      passionate: 'Passionate',
      abstract: 'Emotional',
      cultural: 'Cultural'
    };
    return map[cat] || cat;
  }

};
