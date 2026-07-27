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
    Object.entries(content).forEach(([key, val]) => {
      if (!val && val !== 0) return;
      if (key === 'meta') {
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
        meta.content = val; return;
      }
      if (key === 'title') { document.title = val; return; }
      document.querySelectorAll(`[data-page="${key}"]`).forEach(el => {
        if (key === 'richContent') el.innerHTML = val;
        else if (el.tagName === 'A') el.href = val;
        else el.textContent = val;
      });
    });
  },

  getGlobalContent() {
    try { return JSON.parse(localStorage.getItem('ccs_global') || '{}'); } catch(e) { return {}; }
  },

  saveGlobalContent(obj) {
    const cur = this.getGlobalContent();
    localStorage.setItem('ccs_global', JSON.stringify({ ...cur, ...obj }));
  },

  applyGlobalContent() {
    const g = this.getGlobalContent();
    Object.entries(g).forEach(([key, val]) => {
      if (!val) return;
      document.querySelectorAll(`[data-global="${key}"]`).forEach(el => {
        if (el.tagName === 'A') el.href = val;
        else el.textContent = val;
      });
    });
  },

  // ─── Custom Pages ────────────────────────────────────────────────────────────

  getCustomPages() {
    try { return JSON.parse(localStorage.getItem('ccs_custom_pages') || '[]'); } catch(e) { return []; }
  },

  saveCustomPages(pages) {
    localStorage.setItem('ccs_custom_pages', JSON.stringify(pages));
  },

  // ─── Home Sections ───────────────────────────────────────────────────────────

  getSections() {
    try {
      const saved = localStorage.getItem('ccs_home_sections');
      return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
  },

  saveSections(obj) {
    localStorage.setItem('ccs_home_sections', JSON.stringify(obj));
  },

  applySections() {
    const s = this.getSections();
    if (!s) return;
    const setImg = (key, url) => {
      document.querySelectorAll(`[data-section="${key}"]`).forEach(el => {
        if (url) {
          el.src = url;
          el.style.display = '';
          // hide placeholder sibling
          const ph = document.querySelector(`[data-section-placeholder="${key}"]`);
          if (ph) ph.style.display = 'none';
        }
      });
    };
    const set = (key, prop, val) => {
      if (!val) return;
      if (prop === 'src') { setImg(key, val); return; }
      document.querySelectorAll(`[data-section="${key}"]`).forEach(el => {
        if (prop === 'href') el.href = val;
        else el.textContent = val;
      });
    };
    ['vitality', 'serenity', 'culture'].forEach(sec => {
      const d = s[sec]; if (!d) return;
      set(`${sec}-label`,    'text', d.label);
      set(`${sec}-heading`,  'text', d.heading);
      set(`${sec}-desc`,     'text', d.desc);
      set(`${sec}-cta-text`, 'text', d.ctaText);
      set(`${sec}-cta-link`, 'href', d.ctaLink);
      set(`${sec}-img`,      'src',  d.imgSrc);
    });
    if (s.culture) {
      set('culture-quote',        'text', s.culture.quote);
      set('culture-quote-author', 'text', s.culture.quoteAuthor);
    }
    // Hero extras
    if (s.hero) {
      set('hero-label',    'text', s.hero.label);
      set('hero-cta2-text','text', s.hero.cta2Text);
      set('hero-cta2-link','href', s.hero.cta2Link);
      set('hero-img',      'src',  s.hero.imgSrc);
    }
    // Insight row
    ['insight1','insight2','insight3'].forEach(k => {
      const d = s[k]; if (!d) return;
      set(`${k}-heading`, 'text', d.heading);
      set(`${k}-body`,    'text', d.body);
    });
    // Collections heading
    if (s.collectionsHeading) set('collections-heading', 'text', s.collectionsHeading.heading);
    // Featured Works section
    if (s.featured) {
      set('featured-heading', 'text', s.featured.heading);
      set('featured-sub',     'text', s.featured.sub);
    }
    // Newsletter section
    if (s.newsletter) {
      set('newsletter-heading', 'text', s.newsletter.heading);
      set('newsletter-body',    'text', s.newsletter.body);
      set('newsletter-btn',     'text', s.newsletter.btn);
      set('newsletter-note',    'text', s.newsletter.note);
    }
  },

  // ─── Orders ──────────────────────────────────────────────────────────────────

  getOrders() {
    try { return JSON.parse(localStorage.getItem('ccs_orders') || '[]'); } catch(e) { return []; }
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order); // newest first
    localStorage.setItem('ccs_orders', JSON.stringify(orders));
  },

  updateOrderStatus(orderNum, status) {
    const orders = this.getOrders();
    const o = orders.find(x => x.orderNum === orderNum);
    if (o) { o.status = status; localStorage.setItem('ccs_orders', JSON.stringify(orders)); }
  },

  // Mark an original artwork as sold (auto-called after purchase)
  markOriginalSold(artworkId) {
    const artworks = this.getArtworks();
    const art = artworks.find(a => a.id === parseInt(artworkId));
    if (art) { art.sold = true; this.saveArtworks(artworks); }
  },

  // Toggle sold status manually (admin use)
  toggleSold(artworkId) {
    const artworks = this.getArtworks();
    const art = artworks.find(a => a.id === parseInt(artworkId));
    if (art) { art.sold = !art.sold; this.saveArtworks(artworks); return art.sold; }
    return false;
  },

  // Decrement print stock after purchase
  decrementPrintStock(artworkId, sizeLabel, qty) {
    const artworks = this.getArtworks();
    const art = artworks.find(a => a.id === parseInt(artworkId));
    if (!art || !art.printSizes) return;
    const size = art.printSizes.find(s => s.label === sizeLabel);
    if (size && size.stock !== undefined && size.stock !== null) {
      size.stock = Math.max(0, size.stock - (qty || 1));
      this.saveArtworks(artworks);
    }
  },

  // ─── Subscribers ─────────────────────────────────────────────────────────────

  getSubscribers() {
    try { return JSON.parse(localStorage.getItem('ccs_subscribers') || '[]'); } catch(e) { return []; }
  },

  addSubscriber(email, source) {
    if (!email) return;
    const list = this.getSubscribers();
    // avoid duplicate emails (case-insensitive)
    if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) return;
    list.push({ email, source: source || 'unknown', date: new Date().toISOString() });
    localStorage.setItem('ccs_subscribers', JSON.stringify(list));
  },

  // ─── Blog ────────────────────────────────────────────────────────────────────

  defaultBlogPosts: [
    {
      id: 2,
      title: "Red Makes You Precise. Blue Makes You Free.",
      slug: "red-makes-you-precise-blue-makes-you-free",
      excerpt: "A 2009 study in Science ran six experiments on colour and thinking. The results were simple, specific, and changed how we think about every room we put art into.",
      content: `We read a lot. Articles, studies, books that float around the studio. Most of them confirm things you already felt. This one surprised us.\n\nIn 2009, researchers Ravi Mehta and Rui Zhu published a paper in the journal Science titled "Blue or Red? Exploring the Effect of Color on Cognitive Task Performances." They ran six separate experiments with hundreds of participants. The question was simple: does the colour behind a task change how well you do it?\n\nYes. A lot.\n\n<h2>What They Did</h2>\n\nThe setup was straightforward. Participants sat in front of screens. Some screens had red backgrounds. Some had blue. Then they were given tasks.\n\nThe detail tasks involved things like proofreading text, solving anagrams, and recalling specific words from a list. Things that require you to slow down, pay attention, and catch what is wrong.\n\nThe creative tasks involved things like brainstorming and finding unexpected connections between objects. Things that require you to open up and move in less obvious directions.\n\nAcross experiments with groups ranging from 42 to 208 participants, the pattern held.\n\nRed backgrounds produced better results on the detail tasks. People were sharper. More accurate. More careful.\n\nBlue backgrounds produced better results on the creative tasks. People generated more ideas. More original ones.\n\nOne experiment confirmed that people did not even know it was happening. The colour was doing its work without being noticed.\n\n<h2>Why Red. Why Blue.</h2>\n\nThe researchers traced it back to association.\n\nRed has followed us through life as a warning. Stop signs. Error marks. A teacher's pen correcting a test. Over time, red has been wired to something in us that says: be careful here. Look closely. Do not miss anything.\n\nThat cautious state, it turns out, is exactly what detail work needs.\n\nBlue has a different history. Sky. Water. Open space. Things that feel calm and large and without edges. That association opens the mind up rather than tightening it. And open minds make more connections.\n\nNeither of these is conscious. You do not see blue and decide to be creative. It happens underneath the decision.\n\n<h2>Our Reading</h2>\n\nThis is where it gets interesting for us.\n\nThe paper talks about screens and lab tasks. We think about rooms and walls and the art that fills them.\n\nA painting is not a background. But it is a presence. It carries colour into a space the same way a screen carried it into those experiments. And if colour activates a state of mind without the person in the room choosing it, then the art you hang is doing something whether you think about it or not.\n\nOur Vitality collection is built on reds, corals, and warm earth tones. We put those in rooms where precision matters. A home office. A space for catching every detail.\n\nOur Serenity collection lives in blues and deep greens. A studio. A reading corner. A living room. Anywhere ideas need room to grow.\n\nWe do not think of this as colour theory. We think of it as giving a room a job to do.\n\n<h2>Source</h2>\n\nMehta, R., and Zhu, R. J. (2009). Blue or red? Exploring the effect of color on cognitive task performances. <em>Science, 323</em>(5918), 1226-1229. <a href="https://www.science.org/doi/abs/10.1126/science.1169144" target="_blank" rel="noopener">doi.org/10.1126/science.1169144</a>`,
      author: "Canvas Crush Studio",
      date: "2026-05-17",
      category: "Art Theory",
      coverImage: "/images/blog/colour-psychology.svg",
      published: true,
      tags: ["colour theory", "psychology", "research", "interior design"]
    },
    {
      id: 3,
      title: "It's Not Just the Colour. It's How Much of It.",
      slug: "its-not-just-the-colour-its-how-much-of-it",
      excerpt: "A 1994 study broke colour into three separate qualities and tested each one. The results changed how we think about picking art — because the version of a colour matters as much as the colour itself.",
      content: `We had a conversation in the studio recently about why some blues feel energising and others feel heavy. Same colour, completely different rooms. We went looking for an answer and found a study from 1994 that cleared it up.\n\nPatricia Valdez and Albert Mehrabian published a paper in the Journal of Experimental Psychology: General called "Effects of Color on Emotions." They were not asking which colour is most popular. They were asking which qualities of colour drive how we feel, and how strongly.\n\n<h2>Three Things, Not One</h2>\n\nMost colour talk treats colour as one thing. Red. Blue. Green. But Valdez and Mehrabian broke it into three separate dimensions and tested each one.\n\nThe first is hue. The actual colour itself.\n\nThe second is saturation. How rich or pale the colour is. A deep cobalt versus a washed-out grey-blue.\n\nThe third is brightness. How light or dark the colour is. A pale sky versus a midnight navy.\n\nThey measured two emotional responses across these dimensions: how pleasant the colour felt, and how activating or arousing it felt.\n\n<h2>What They Found</h2>\n\nOn hue alone, blue and blue-green tones were rated as most pleasant. Yellow and yellow-green scored highest for arousal.\n\nBut here is the part that stays with us.\n\nSaturation mattered just as much as hue, for both responses. A richly saturated version of almost any colour was rated as more pleasant and more arousing than a pale version of the same colour. A rich terracotta and a dusty blush share a base hue. They do not share an emotional effect.\n\nBrightness split differently. Lighter colours were rated as more pleasant. But darker colours scored higher on arousal. Deep, dark tones are not restful. They pull you in. They create presence in a room.\n\n<h2>What This Means for a Room</h2>\n\nWhen you choose a piece of art, you are not just choosing a colour. You are choosing a specific version of that colour. The saturation of it. The weight of it.\n\nA pale watercolour seascape and a deep indigo abstract are both blue. But they are not doing the same thing in the room. The watercolour is gentle. The indigo is arresting.\n\nBoth of those can be right. They are just different jobs.\n\nAt Canvas Crush Studio we think about this when we look at new work. Not just what colour is in it, but how much of it. How saturated. How bright. Those qualities carry emotional information that arrives before the subject of the piece does.\n\n<h2>Source</h2>\n\nValdez, P., and Mehrabian, A. (1994). Effects of color on emotions. <em>Journal of Experimental Psychology: General, 123</em>(4), 394-409. <a href="https://doi.org/10.1037/0096-3445.123.4.394" target="_blank" rel="noopener">doi.org/10.1037/0096-3445.123.4.394</a>`,
      author: "Canvas Crush Studio",
      date: "2026-07-21",
      category: "Art Theory",
      coverImage: "/images/blog/saturation-brightness.svg",
      published: true,
      tags: ["colour theory", "psychology", "research", "saturation", "brightness"]
    },
    {
      id: 4,
      title: "Green Is the Colour of New Ideas",
      slug: "green-is-the-colour-of-new-ideas",
      excerpt: "A 2012 study found that a brief glimpse of green before a creative task produced meaningfully better results. Not as a mood lifter — as a specific signal about what the mind is allowed to do.",
      content: `We had not thought about green this way before reading this paper.\n\nIn 2012, Stephanie Lichtenfeld and colleagues published a study in Personality and Social Psychology Bulletin called "Fertile Green: Green Facilitates Creative Performance." They ran five separate experiments to test a simple question: does seeing green before a creative task change how well you do?\n\nIt does. Consistently, and by a meaningful margin.\n\n<h2>What They Did</h2>\n\nParticipants in each experiment were briefly shown a coloured rectangle before working on a creative task. The colours tested were green, white, grey, red, and blue, depending on the experiment.\n\nThe creative tasks involved things like generating unusual uses for a common object, completing sentences with imaginative endings, and solving problems that required thinking outside the obvious categories.\n\nAcross five experiments with different participant groups, different tasks, and different comparison colours, green consistently produced the best creative results.\n\n<h2>Why Green</h2>\n\nThe researchers traced the effect back to association.\n\nGreen is the colour of growing things. Grass coming through in spring. New leaves. Fresh shoots. In nature, green signals that conditions are right for growth — that the environment is safe, rich, and ready.\n\nOver a lifetime of seeing green in these contexts, the mind builds a shortcut. Green means: something is developing here. It is okay to reach, to try, to begin something that is not yet finished.\n\nThat state — open, reaching, unguarded — is exactly the state creative work needs.\n\nThe effect happened quickly and without awareness. Participants did not consciously think about plants or growth. The colour did its work before they could notice it.\n\n<h2>What This Means for a Room</h2>\n\nIf a few seconds of exposure to green can shift how a mind works, what does a piece of green art in a room do over hours and days?\n\nA painting holds colour in a space consistently. It does not just pass across your vision. It lives in the periphery, contributes to the feeling of the room, sets a background that your brain reads continuously.\n\nGreen art in a creative space is not decoration. It is a signal, carried daily, that says: growth is happening here. It is safe to reach.\n\nAt Canvas Crush Studio we think about this with the Serenity collection. Blues and deep greens together. Not only because they look well beside each other — though they do — but because they both point toward the same mental state: open, exploratory, free to make something new. A studio is exactly the kind of room that deserves that signal on the wall.\n\n<h2>Source</h2>\n\nLichtenfeld, S., Elliot, A. J., Maier, M. A., and Pekrun, R. (2012). Fertile green: Green facilitates creative performance. <em>Personality and Social Psychology Bulletin, 38</em>(6), 784-797. <a href="https://doi.org/10.1177/0146167212436611" target="_blank" rel="noopener">doi.org/10.1177/0146167212436611</a>`,
      author: "Canvas Crush Studio",
      date: "2026-07-21",
      category: "Art Theory",
      coverImage: "/images/blog/fertile-green.svg",
      published: true,
      tags: ["colour theory", "psychology", "research", "green", "creativity"]
    },
    {
      id: 5,
      title: "Some Colours Mean the Same Thing Everywhere",
      slug: "some-colours-mean-the-same-thing-everywhere",
      excerpt: "A study across 30 nations and nearly 5,000 people found that certain colour-emotion links are consistent across cultures. Others are entirely personal. Knowing which is which changes how you think about what art does to a room.",
      content: `Most colour research is done in one country, with one group of participants. The findings feel universal. But are they?\n\nIn 2020, Domicele Jonauskaite and a team of researchers across Europe published a study in Psychological Science that asked exactly this. They surveyed 4,598 people from 30 nations and asked each person to link colours with emotions. The question was simple: which colour-emotion associations are shared across cultures, and which are not?\n\nThe answer split in a way we found genuinely surprising.\n\n<h2>What They Found</h2>\n\nSome associations held up everywhere. Yellow and joy appeared together in nearly every country. Black and sadness. White and relief. Red consistently linked to both love and anger — the same colour pulling in two directions, but the same two directions, across the world.\n\nThese, the researchers concluded, are likely rooted in something deeper than learning. Yellow shares something with sunlight. Black shares something with darkness and loss. These connections are old enough that culture has not overwritten them.\n\nBut many other associations were different across countries. Green meant hope and nature in some places. In others it carried associations with disgust or envy. Purple ranged from dignity to mourning depending on where participants grew up. The differences were not small — they were meaningful and consistent within each culture.\n\nThe researchers found that geographical and cultural proximity mattered. Countries near each other, sharing languages or histories, tended to share more colour-emotion associations. The further apart, the more the meanings diverged.\n\n<h2>What This Means for a Room</h2>\n\nThere are two things here that we think about.\n\nThe first is that some colours carry meaning that does not require shared experience. If you hang a piece built around deep yellow warmth or rich black weight, those signals will reach most people in roughly the same way. The emotional core is shared.\n\nThe second is that colour is also personal. Where you grew up, the associations you have built over a lifetime — these shape what a colour means to you in ways that are real and valid and different from the person next to you.\n\nAt Canvas Crush Studio we work with the universal signals as a foundation. But we also believe a room should ultimately reflect the person in it. The research tells us what colours do broadly. You decide what they mean here, in this space, in your life.\n\nThat conversation between the universal and the personal is, honestly, what makes choosing art interesting.\n\n<h2>Source</h2>\n\nJonauskaite, D., Abu-Akel, A., Dael, N., Oberfeld, D., Vesala, M., Wojtczuk, A., and Mohr, C. (2020). Universal and culture-specific factors in the colour-emotion association. <em>Psychological Science, 31</em>(1), 58-74. <a href="https://doi.org/10.1177/0956797619876895" target="_blank" rel="noopener">doi.org/10.1177/0956797619876895</a>`,
      author: "Canvas Crush Studio",
      date: "2026-07-21",
      category: "Art Theory",
      coverImage: "/images/blog/colour-across-cultures.svg",
      published: true,
      tags: ["colour theory", "psychology", "research", "culture", "emotion"]
    }
  ],

  getBlogPosts() {
    try { return JSON.parse(localStorage.getItem('ccs_blog_posts') || 'null') || this.defaultBlogPosts; } catch(e) { return this.defaultBlogPosts; }
  },

  saveBlogPosts(posts) {
    localStorage.setItem('ccs_blog_posts', JSON.stringify(posts));
  },

  getPublishedPosts() {
    return this.getBlogPosts().filter(p => p.published).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getBlogPostBySlug(slug) {
    return this.getBlogPosts().find(p => p.slug === slug);
  },

  formatBlogDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

// ─── Hard reset to correct artworks ─────────────────────────────────────────
// Bump DATA_VERSION any time defaultArtworks changes — forces all browsers to update.
(function() {
  const DATA_VERSION = '2026-v8';
  if (localStorage.getItem('ccs_data_version') !== DATA_VERSION) {
    localStorage.setItem('ccs_artworks', JSON.stringify(CCS.defaultArtworks));
    localStorage.setItem('ccs_blog_posts', JSON.stringify(CCS.defaultBlogPosts));
    localStorage.setItem('ccs_data_version', DATA_VERSION);
  }
})();
