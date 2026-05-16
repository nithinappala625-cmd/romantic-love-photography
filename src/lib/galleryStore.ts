// Shared gallery store — used by both Gallery page and Admin Dashboard
export type Category = 'wedding' | 'pre-wedding' | 'maternity' | 'baby-shoots' | 'cinematic';

export interface GalleryItem {
  id: string;
  category: Category;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  featured: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'rlp_gallery_v3';

// ─── Real portfolio items from /public/portfolio ─────────────────────────────
const defaultItems: GalleryItem[] = [
  // ── WEDDING (9 images) ─────────────────────────────────────────────────────
  { id: 'w1',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06678.jpg',   alt: 'Wedding Moments',        featured: true,  createdAt: '2024-01-01T00:00:00Z' },
  { id: 'w2',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06692.jpg',   alt: 'Bridal Elegance',        featured: false, createdAt: '2024-01-02T00:00:00Z' },
  { id: 'w3',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06713.jpg',   alt: 'Sacred Vows',            featured: false, createdAt: '2024-01-03T00:00:00Z' },
  { id: 'w4',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06780Aa.jpg', alt: 'Couple Portrait',        featured: true,  createdAt: '2024-01-04T00:00:00Z' },
  { id: 'w5',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06794.jpg',   alt: 'Wedding Ceremony',       featured: false, createdAt: '2024-01-05T00:00:00Z' },
  { id: 'w6',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06822.JPG',   alt: 'Bridal Party',           featured: false, createdAt: '2024-01-06T00:00:00Z' },
  { id: 'w7',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06846.jpg',   alt: 'Wedding Celebration',    featured: false, createdAt: '2024-01-07T00:00:00Z' },
  { id: 'w8',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC06894A.jpg',  alt: 'Wedding Kiss',           featured: true,  createdAt: '2024-01-08T00:00:00Z' },
  { id: 'w9',  category: 'wedding', type: 'image', src: '/portfolio/wedding/DSC08100.jpg',   alt: 'Wedding Reception',      featured: false, createdAt: '2024-01-09T00:00:00Z' },

  // ── PRE-WEDDING (35 images) ────────────────────────────────────────────────
  { id: 'pw1',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/001.jpg',         alt: 'Pre-Wedding Bliss',      featured: true,  createdAt: '2024-02-01T00:00:00Z' },
  { id: 'pw2',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00898A.jpg',   alt: 'Couple in Love',         featured: false, createdAt: '2024-02-02T00:00:00Z' },
  { id: 'pw3',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00923A.jpg',   alt: 'Romantic Sunset',        featured: false, createdAt: '2024-02-03T00:00:00Z' },
  { id: 'pw4',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00942A.jpg',   alt: 'Garden Romance',         featured: true,  createdAt: '2024-02-04T00:00:00Z' },
  { id: 'pw5',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00961A.jpg',   alt: 'Tender Moments',         featured: false, createdAt: '2024-02-05T00:00:00Z' },
  { id: 'pw6',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00972.JPG',    alt: 'Countryside Romance',    featured: false, createdAt: '2024-02-06T00:00:00Z' },
  { id: 'pw7',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC00999.JPG',    alt: 'Dreamy Couple',          featured: false, createdAt: '2024-02-07T00:00:00Z' },
  { id: 'pw8',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01089.JPG',    alt: 'Golden Hour Love',       featured: false, createdAt: '2024-02-08T00:00:00Z' },
  { id: 'pw9',  category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01214.JPG',    alt: 'Lakeside Romance',       featured: false, createdAt: '2024-02-09T00:00:00Z' },
  { id: 'pw10', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01283.JPG',    alt: 'Floral Portrait',        featured: false, createdAt: '2024-02-10T00:00:00Z' },
  { id: 'pw11', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01311.JPG',    alt: 'Breezy Romance',         featured: false, createdAt: '2024-02-11T00:00:00Z' },
  { id: 'pw12', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01418A.jpg',   alt: 'Intimate Moments',       featured: true,  createdAt: '2024-02-12T00:00:00Z' },
  { id: 'pw13', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01438.JPG',    alt: 'Radiant Couple',         featured: false, createdAt: '2024-02-13T00:00:00Z' },
  { id: 'pw14', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01446.JPG',    alt: 'Whispered Love',         featured: false, createdAt: '2024-02-14T00:00:00Z' },
  { id: 'pw15', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01480.JPG',    alt: 'Mountain Romance',       featured: false, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'pw16', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01606A.jpg',   alt: 'Heritage Romance',       featured: false, createdAt: '2024-02-16T00:00:00Z' },
  { id: 'pw17', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01683.JPG',    alt: 'Misty Meadow',           featured: false, createdAt: '2024-02-17T00:00:00Z' },
  { id: 'pw18', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01697.JPG',    alt: 'Together Forever',       featured: false, createdAt: '2024-02-18T00:00:00Z' },
  { id: 'pw19', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01793.JPG',    alt: 'Twilight Couple',        featured: false, createdAt: '2024-02-19T00:00:00Z' },
  { id: 'pw20', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC01815.JPG',    alt: 'Serene Love',            featured: false, createdAt: '2024-02-20T00:00:00Z' },
  { id: 'pw21', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09046A.jpg',   alt: 'Outdoor Romance',        featured: false, createdAt: '2024-02-21T00:00:00Z' },
  { id: 'pw22', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09093A.jpg',   alt: 'Timeless Love',          featured: false, createdAt: '2024-02-22T00:00:00Z' },
  { id: 'pw23', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09101A.jpg',   alt: 'Enchanted Couple',       featured: false, createdAt: '2024-02-23T00:00:00Z' },
  { id: 'pw24', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09118A.jpg',   alt: 'Forest Romance',         featured: false, createdAt: '2024-02-24T00:00:00Z' },
  { id: 'pw25', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09132A.jpg',   alt: 'Sunset Silhouette',      featured: false, createdAt: '2024-02-25T00:00:00Z' },
  { id: 'pw26', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09167A.jpg',   alt: 'Bohemian Love',          featured: false, createdAt: '2024-02-26T00:00:00Z' },
  { id: 'pw27', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09221A.jpg',   alt: 'Ethereal Romance',       featured: false, createdAt: '2024-02-27T00:00:00Z' },
  { id: 'pw28', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09311A.jpg',   alt: 'Couple by the River',    featured: false, createdAt: '2024-02-28T00:00:00Z' },
  { id: 'pw29', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09339A.jpg',   alt: 'Whispering Winds',       featured: false, createdAt: '2024-03-01T00:00:00Z' },
  { id: 'pw30', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09451A.jpg',   alt: 'Sunlit Love',            featured: false, createdAt: '2024-03-02T00:00:00Z' },
  { id: 'pw31', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09517A.jpg',   alt: 'Meadow Couple',          featured: false, createdAt: '2024-03-03T00:00:00Z' },
  { id: 'pw32', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09570A.jpg',   alt: 'Dusk Romance',           featured: false, createdAt: '2024-03-04T00:00:00Z' },
  { id: 'pw33', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09714A.jpg',   alt: 'Starlit Couple',         featured: false, createdAt: '2024-03-05T00:00:00Z' },
  { id: 'pw34', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09829A.jpg',   alt: 'Candid Romance',         featured: false, createdAt: '2024-03-06T00:00:00Z' },
  { id: 'pw35', category: 'pre-wedding', type: 'image', src: '/portfolio/prewedding/DSC09861A.jpg',   alt: 'Eternal Bond',           featured: false, createdAt: '2024-03-07T00:00:00Z' },

  // ── BABY SHOOTS (11 images) ────────────────────────────────────────────────
  { id: 'b1',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_20240930_093927.jpg', alt: 'Little Miracle',      featured: true,  createdAt: '2024-04-01T00:00:00Z' },
  { id: 'b2',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8071.JPG',            alt: 'Tiny Toes',           featured: false, createdAt: '2024-04-02T00:00:00Z' },
  { id: 'b3',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8084.JPG',            alt: 'Dreaming Baby',       featured: false, createdAt: '2024-04-03T00:00:00Z' },
  { id: 'b4',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8107.JPG',            alt: 'Sweet Newborn',       featured: true,  createdAt: '2024-04-04T00:00:00Z' },
  { id: 'b5',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8152.JPG',            alt: 'Bundle of Joy',       featured: false, createdAt: '2024-04-05T00:00:00Z' },
  { id: 'b6',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8280.JPG',            alt: 'Baby Bliss',          featured: false, createdAt: '2024-04-06T00:00:00Z' },
  { id: 'b7',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8294.JPG',            alt: 'Angel Face',          featured: false, createdAt: '2024-04-07T00:00:00Z' },
  { id: 'b8',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8309.JPG',            alt: 'First Smile',         featured: false, createdAt: '2024-04-08T00:00:00Z' },
  { id: 'b9',  category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8342.JPG',            alt: 'Soft Slumber',        featured: false, createdAt: '2024-04-09T00:00:00Z' },
  { id: 'b10', category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8437.JPG',            alt: 'Precious Moments',    featured: false, createdAt: '2024-04-10T00:00:00Z' },
  { id: 'b11', category: 'baby-shoots', type: 'image', src: '/portfolio/baby-shoots/IMG_8451.JPG',            alt: 'New Beginnings',      featured: false, createdAt: '2024-04-11T00:00:00Z' },

  // ── CINEMATIC VIDEOS (2 videos) ────────────────────────────────────────────
  { id: 'v1', category: 'cinematic', type: 'video', src: '/portfolio/videos/Couple Song_2.mp4',   thumbnail: '/portfolio/wedding/DSC06678.jpg',    alt: 'Couple Song Highlight',  featured: true,  createdAt: '2024-05-01T00:00:00Z' },
  { id: 'v2', category: 'cinematic', type: 'video', src: '/portfolio/videos/Solo Song_2.mp4',     thumbnail: '/portfolio/prewedding/DSC09046A.jpg', alt: 'Solo Song Highlight',    featured: false, createdAt: '2024-05-02T00:00:00Z' },
];

export const galleryStore = {
  /** Returns from localStorage; first-run seeds with defaults (clears old key). */
  getAll(): GalleryItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(defaultItems);
        return defaultItems;
      }
      return JSON.parse(raw) as GalleryItem[];
    } catch {
      return defaultItems;
    }
  },

  save(items: GalleryItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Notify all listeners (Gallery, Home) to re-render in real time
    window.dispatchEvent(new CustomEvent('gallery-updated'));
  },

  add(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const items = this.getAll();
    const newItem: GalleryItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.save([newItem, ...items]);   // newest first
    return newItem;
  },

  update(id: string, updates: Partial<GalleryItem>): void {
    const items = this.getAll().map(i => i.id === id ? { ...i, ...updates } : i);
    this.save(items);
  },

  delete(id: string): void {
    this.save(this.getAll().filter(i => i.id !== id));
  },

  getByCategory(cat: Category | 'all'): GalleryItem[] {
    const all = this.getAll();
    return cat === 'all' ? all : all.filter(i => i.category === cat);
  },

  getFeatured(limit = 6): GalleryItem[] {
    return this.getAll().filter(i => i.featured).slice(0, limit);
  },

  /** Wipes localStorage so fresh defaults are reloaded on next getAll() */
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
