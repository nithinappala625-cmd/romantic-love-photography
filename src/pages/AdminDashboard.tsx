import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Plus, Trash2, Edit3, Star, StarOff, Image, Video,
  X, Check, LayoutGrid, Tag, Upload, AlertCircle
} from 'lucide-react';
import { galleryStore } from '../lib/galleryStore';
import type { GalleryItem, Category } from '../lib/galleryStore';
import './AdminDashboard.css';

const CATEGORIES: { key: Category | 'all'; label: string }[] = [
  { key: 'all',         label: 'All Media' },
  { key: 'wedding',     label: 'Weddings' },
  { key: 'pre-wedding', label: 'Pre-Wedding' },
  { key: 'baby-shoots', label: 'Baby Shoots' },
  { key: 'cinematic',   label: 'Cinematic' },
];

const defaultNew = {
  src: '',
  alt: '',
  category: 'wedding' as Category,
  type: 'image' as 'image' | 'video',
  featured: false,
  thumbnail: '',
};

/* ─── Read a file as a data URL ─────────────────────────────────────────── */
function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── Generate video thumbnail from first frame ─────────────────────────── */
function videoThumb(dataUrl: string): Promise<string> {
  return new Promise(resolve => {
    const video   = document.createElement('video');
    video.src     = dataUrl;
    video.muted   = true;
    video.preload = 'metadata';
    video.onloadeddata = () => {
      video.currentTime = 0.5;
    };
    video.onseeked = () => {
      const canvas    = document.createElement('canvas');
      canvas.width    = 640;
      canvas.height   = Math.round(640 * (video.videoHeight / video.videoWidth));
      const ctx       = canvas.getContext('2d')!;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    video.onerror = () => resolve('');
  });
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [items, setItems]                   = useState<GalleryItem[]>([]);
  const [showAddModal, setShowAddModal]     = useState(false);
  const [editItem, setEditItem]             = useState<GalleryItem | null>(null);
  const [newItem, setNewItem]               = useState({ ...defaultNew });
  const [deleteConfirm, setDeleteConfirm]   = useState<string | null>(null);
  const [notification, setNotification]     = useState('');
  const [uploading, setUploading]           = useState(false);
  const [uploadError, setUploadError]       = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) navigate('/admin/login');
    loadItems();
  }, []);

  useEffect(() => { loadItems(); }, [activeCategory]);

  const loadItems = () => setItems(galleryStore.getByCategory(activeCategory));

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  /* ── File upload handler ─────────────────────────────────────────────── */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) {
      setUploadError('Only image or video files are accepted.');
      return;
    }

    // Warn if file is very large (> 50 MB)
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File is too large (max 50 MB). Please compress or use a URL instead.');
      return;
    }

    setUploadError('');
    setUploading(true);
    try {
      const dataUrl = await fileToDataURL(file);
      let thumb = '';
      if (isVideo) {
        thumb = await videoThumb(dataUrl);
      }
      setNewItem(prev => ({
        ...prev,
        src:       dataUrl,
        type:      isVideo ? 'video' : 'image',
        thumbnail: thumb,
        alt:       prev.alt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      }));
    } catch {
      setUploadError('Failed to read file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  /* ── CRUD ────────────────────────────────────────────────────────────── */
  const handleAdd = () => {
    if (!newItem.src.trim() || !newItem.alt.trim()) return;
    galleryStore.add(newItem);
    loadItems();
    setShowAddModal(false);
    setNewItem({ ...defaultNew });
    setUploadError('');
    notify('✓ Item added to gallery');
  };

  const handleEdit = () => {
    if (!editItem) return;
    galleryStore.update(editItem.id, editItem);
    loadItems();
    setEditItem(null);
    notify('✓ Item updated');
  };

  const handleDelete = (id: string) => {
    galleryStore.delete(id);
    setDeleteConfirm(null);
    loadItems();
    notify('✓ Item deleted');
  };

  const toggleFeatured = (item: GalleryItem) => {
    galleryStore.update(item.id, { featured: !item.featured });
    loadItems();
  };

  const counts = CATEGORIES.map(c => ({
    ...c,
    count: c.key === 'all'
      ? galleryStore.getAll().length
      : galleryStore.getByCategory(c.key as Category).length
  }));

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  const closeAdd = () => {
    setShowAddModal(false);
    setNewItem({ ...defaultNew });
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const thumbSrc = (item: GalleryItem) =>
    item.type === 'video' ? (item.thumbnail || '') : item.src;

  return (
    <div className="admin-dash">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-script">Romantic Love</span>
          <span className="sidebar-logo-tag">Admin Panel</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Gallery</div>
          {counts.map(c => (
            <button
              key={c.key}
              className={`sidebar-item ${activeCategory === c.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(c.key as Category | 'all')}
            >
              <LayoutGrid size={15} />
              <span>{c.label}</span>
              <span className="sidebar-count">{c.count}</span>
            </button>
          ))}
        </nav>

        <button
          className="sidebar-logout"
          onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="admin-main">

        {/* Top Bar */}
        <header className="admin-topbar">
          <div>
            <h1 className="admin-page-title">
              {CATEGORIES.find(c => c.key === activeCategory)?.label}
            </h1>
            <p className="admin-page-sub">
              {items.length} item{items.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Add Media
          </button>
        </header>

        {/* Stats Row */}
        <div className="admin-stats-row">
          {[
            { label: 'Total Media',  value: galleryStore.getAll().length },
            { label: 'Featured',     value: galleryStore.getAll().filter(i => i.featured).length },
            { label: 'Images',       value: galleryStore.getAll().filter(i => i.type === 'image').length },
            { label: 'Videos',       value: galleryStore.getAll().filter(i => i.type === 'video').length },
          ].map((s, i) => (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-val">{s.value}</div>
              <div className="admin-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="media-grid">
          {items.length === 0 && (
            <div className="empty-state">
              <Image size={40} />
              <p>No media in this category</p>
              <button className="add-btn small" onClick={() => setShowAddModal(true)}>
                <Plus size={14} /> Add First Item
              </button>
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className={`media-card ${item.featured ? 'featured' : ''}`}>
              <div className="media-thumb">
                {item.type === 'video'
                  ? item.thumbnail
                    ? <img src={item.thumbnail} alt={item.alt} loading="lazy" />
                    : <div className="media-video-placeholder"><Video size={32} /></div>
                  : <img src={thumbSrc(item)} alt={item.alt} loading="lazy" />
                }
                {item.type === 'video' && (
                  <div className="media-video-play-overlay">
                    <Video size={18} />
                  </div>
                )}
                <div className="media-type-badge">
                  {item.type === 'video' ? <Video size={12} /> : <Image size={12} />}
                  {item.type}
                </div>
                {item.featured && <div className="featured-badge"><Star size={10} />Featured</div>}
              </div>

              <div className="media-info">
                <div className="media-alt">{item.alt}</div>
                <div className="media-cat-tag">
                  <Tag size={10} /> {item.category}
                </div>
              </div>

              <div className="media-actions">
                <button
                  className={`action-btn ${item.featured ? 'gold' : ''}`}
                  onClick={() => toggleFeatured(item)}
                  title={item.featured ? 'Unfeature' : 'Feature on homepage'}
                >
                  {item.featured ? <StarOff size={14} /> : <Star size={14} />}
                </button>
                <button className="action-btn" onClick={() => setEditItem({ ...item })} title="Edit">
                  <Edit3 size={14} />
                </button>
                <button className="action-btn danger" onClick={() => setDeleteConfirm(item.id)} title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ADD MODAL
      ══════════════════════════════════════════════════════════════════ */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeAdd}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Media</h3>
              <button className="modal-close" onClick={closeAdd}><X size={18} /></button>
            </div>

            <div className="modal-body">

              {/* ── Upload zone ─────────────────────────────────────────── */}
              <div
                className="upload-zone"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                {uploading ? (
                  <div className="upload-zone-inner">
                    <div className="upload-spinner" />
                    <span>Processing file…</span>
                  </div>
                ) : newItem.src ? (
                  <div className="upload-zone-inner preview-loaded">
                    {newItem.type === 'video'
                      ? newItem.thumbnail
                        ? <img src={newItem.thumbnail} alt="preview" />
                        : <div className="video-file-icon"><Video size={40} /></div>
                      : <img src={newItem.src} alt="preview" />
                    }
                    <div className="upload-reselect">Click to change file</div>
                  </div>
                ) : (
                  <div className="upload-zone-inner">
                    <Upload size={32} />
                    <span className="upload-label">Click to upload image or video</span>
                    <span className="upload-hint">JPG, PNG, MP4, MOV · Max 50 MB</span>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="upload-error">
                  <AlertCircle size={14} /> {uploadError}
                </div>
              )}

              {/* ── OR paste URL ────────────────────────────────────────── */}
              <div className="form-divider"><span>— or paste a URL —</span></div>

              <div className="form-group">
                <label>Media URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newItem.src.startsWith('data:') ? '' : newItem.src}
                  onChange={e => setNewItem({ ...newItem, src: e.target.value, type: 'image', thumbnail: '' })}
                />
              </div>

              <div className="form-group">
                <label>Description / Alt Text <span>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Wedding couple at sunset"
                  value={newItem.alt}
                  onChange={e => setNewItem({ ...newItem, alt: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newItem.category}
                    onChange={e => setNewItem({ ...newItem, category: e.target.value as Category })}
                  >
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="baby-shoots">Baby Shoots</option>
                    <option value="cinematic">Cinematic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Media Type</label>
                  <select
                    value={newItem.type}
                    onChange={e => setNewItem({ ...newItem, type: e.target.value as 'image' | 'video' })}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="featured-new"
                  checked={newItem.featured}
                  onChange={e => setNewItem({ ...newItem, featured: e.target.checked })}
                />
                <label htmlFor="featured-new">★ Mark as Featured (shown on homepage)</label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel" onClick={closeAdd}>Cancel</button>
              <button
                className="modal-confirm"
                onClick={handleAdd}
                disabled={!newItem.src || !newItem.alt || uploading}
              >
                <Plus size={14} /> Add to Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EDIT MODAL
      ══════════════════════════════════════════════════════════════════ */}
      {editItem && (
        <div className="modal-overlay" onClick={() => setEditItem(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Media</h3>
              <button className="modal-close" onClick={() => setEditItem(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Description / Alt Text</label>
                <input
                  type="text"
                  value={editItem.alt}
                  onChange={e => setEditItem({ ...editItem, alt: e.target.value })}
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editItem.category}
                    onChange={e => setEditItem({ ...editItem, category: e.target.value as Category })}
                  >
                    <option value="wedding">Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="baby-shoots">Baby Shoots</option>
                    <option value="cinematic">Cinematic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Media Type</label>
                  <select
                    value={editItem.type}
                    onChange={e => setEditItem({ ...editItem, type: e.target.value as 'image' | 'video' })}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="featured-edit"
                  checked={editItem.featured}
                  onChange={e => setEditItem({ ...editItem, featured: e.target.checked })}
                />
                <label htmlFor="featured-edit">★ Mark as Featured (shown on homepage)</label>
              </div>
              {/* Preview */}
              <div className="preview-img">
                {editItem.type === 'video'
                  ? editItem.thumbnail
                    ? <img src={editItem.thumbnail} alt="preview" />
                    : <div className="media-video-placeholder" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={36} /></div>
                  : <img src={editItem.src} alt="preview" onError={e => (e.currentTarget.style.display = 'none')} />
                }
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="modal-confirm" onClick={handleEdit}>
                <Check size={14} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          DELETE CONFIRM
      ══════════════════════════════════════════════════════════════════ */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'rgba(250,246,240,0.6)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                This will permanently remove this item from your gallery.<br />This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="modal-confirm danger" onClick={() => handleDelete(deleteConfirm!)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {notification && <div className="admin-toast">{notification}</div>}
    </div>
  );
};

export default AdminDashboard;
