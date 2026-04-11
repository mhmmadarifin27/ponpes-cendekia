"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { supabase } from '@/lib/supabase';
import { 
  LayoutGrid, FileText, Building2, Settings, LogOut, 
  Search, Bell, Moon, Sun, Camera, Plus, Trash2, Loader2, X, UploadCloud, Menu,
  BarChart3, Image as ImageIcon, Zap, Edit // <-- DITAMBAHKAN ICON EDIT
} from 'lucide-react';

const AdminDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [stats, setStats] = useState({ warta: 0, fasilitas: 0, dokumentasi: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const [facilities, setFacilities] = useState<any[]>([]);
  const [isLoadingFasilitas, setIsLoadingFasilitas] = useState(false);
  const [isModalFasilitasOpen, setIsModalFasilitasOpen] = useState(false);
  const [formDataFasilitas, setFormDataFasilitas] = useState({ nama: '', kategori: '', deskripsi: '', gambar_url: '' });
  const [fileFasilitas, setFileFasilitas] = useState<File | null>(null);

  const [warta, setWarta] = useState<any[]>([]);
  const [isLoadingWarta, setIsLoadingWarta] = useState(false);
  const [isModalWartaOpen, setIsModalWartaOpen] = useState(false);
  const [formDataWarta, setFormDataWarta] = useState({ judul: '', konten: '', penulis: '', gambar_url: '' });
  const [fileWarta, setFileWarta] = useState<File | null>(null);
  
  // --- DITAMBAHKAN: STATE UNTUK MELACAK ID BERITA YANG MAU DIEDIT ---
  const [editingWartaId, setEditingWartaId] = useState<number | null>(null);

  const [dokumentasi, setDokumentasi] = useState<any[]>([]);
  const [isLoadingDokumentasi, setIsLoadingDokumentasi] = useState(false);
  const [isModalDokumentasiOpen, setIsModalDokumentasiOpen] = useState(false);
  const [formDataDokumentasi, setFormDataDokumentasi] = useState({ judul: '', deskripsi: '', gambar_url: '' });
  const [fileDokumentasi, setFileDokumentasi] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab === 'overview') fetchStats();
    if (activeTab === 'fasilitas') fetchFacilities();
    if (activeTab === 'berita') fetchWarta();
    if (activeTab === 'dokumentasi') fetchDokumentasi();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  const uploadImage = async (file: File, folderName: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folderName}/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    const { count: wCount } = await supabase.from('warta').select('*', { count: 'exact', head: true });
    const { count: fCount } = await supabase.from('fasilitas').select('*', { count: 'exact', head: true });
    const { count: dCount } = await supabase.from('dokumentasi').select('*', { count: 'exact', head: true });
    
    setStats({
      warta: wCount || 0,
      fasilitas: fCount || 0,
      dokumentasi: dCount || 0
    });
    setIsLoadingStats(false);
  };

  const fetchFacilities = async () => {
    setIsLoadingFasilitas(true);
    const { data } = await supabase.from('fasilitas').select('*').order('created_at', { ascending: false });
    if (data) setFacilities(data);
    setIsLoadingFasilitas(false);
  };

  const handleSaveFasilitas = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let imageUrl = formDataFasilitas.gambar_url;
      if (fileFasilitas) imageUrl = await uploadImage(fileFasilitas, 'fasilitas_images');
      const { error } = await supabase.from('fasilitas').insert([{ ...formDataFasilitas, gambar_url: imageUrl }]);
      if (error) throw error;
      setIsModalFasilitasOpen(false);
      setFormDataFasilitas({ nama: '', kategori: '', deskripsi: '', gambar_url: '' });
      setFileFasilitas(null);
      fetchFacilities();
    } catch (error: any) {
      alert('Gagal menyimpan Fasilitas: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFasilitas = async (id: number) => {
    if(confirm('Yakin ingin menghapus fasilitas ini?')) {
      await supabase.from('fasilitas').delete().eq('id', id);
      fetchFacilities();
    }
  };

  // ==========================================================
  // BAGIAN WARTA (SUDAH DITAMBAHKAN LOGIKA EDIT)
  // ==========================================================
  const fetchWarta = async () => {
    setIsLoadingWarta(true);
    const { data } = await supabase.from('warta').select('*').order('created_at', { ascending: false });
    if (data) setWarta(data);
    setIsLoadingWarta(false);
  };

  // --- DITAMBAHKAN: FUNGSI UNTUK MEMBUKA MODAL TAMBAH (KOSONGAN) ---
  const handleOpenAddWartaModal = () => {
    setEditingWartaId(null);
    setFormDataWarta({ judul: '', konten: '', penulis: '', gambar_url: '' });
    setFileWarta(null);
    setIsModalWartaOpen(true);
  };

  // --- DITAMBAHKAN: FUNGSI UNTUK MEMBUKA MODAL EDIT (ISI DATA LAMA) ---
  const handleEditWarta = (w: any) => {
    setEditingWartaId(w.id);
    setFormDataWarta({
      judul: w.judul,
      konten: w.konten,
      penulis: w.penulis || '',
      gambar_url: w.gambar_url || ''
    });
    setFileWarta(null);
    setIsModalWartaOpen(true);
  };

  const handleSaveWarta = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let imageUrl = formDataWarta.gambar_url;
      // Jika ada file baru yang diupload, ganti imageUrl-nya
      if (fileWarta) imageUrl = await uploadImage(fileWarta, 'warta_images');
      
      // --- DITAMBAHKAN: CEK APAKAH LAGI EDIT ATAU TAMBAH ---
      if (editingWartaId) {
        // Lakukan UPDATE jika editingWartaId ada
        const { error } = await supabase
          .from('warta')
          .update({ ...formDataWarta, gambar_url: imageUrl })
          .eq('id', editingWartaId);
        if (error) throw error;
      } else {
        // Lakukan INSERT jika editingWartaId null (Baru)
        const { error } = await supabase
          .from('warta')
          .insert([{ ...formDataWarta, gambar_url: imageUrl }]);
        if (error) throw error;
      }

      setIsModalWartaOpen(false);
      setFormDataWarta({ judul: '', konten: '', penulis: '', gambar_url: '' });
      setFileWarta(null);
      setEditingWartaId(null); // Reset state edit
      fetchWarta();
    } catch (error: any) {
      alert('Gagal menyimpan Warta: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWarta = async (id: number) => {
    if(confirm('Yakin ingin menghapus warta ini?')) {
      await supabase.from('warta').delete().eq('id', id);
      fetchWarta();
    }
  };

  // ==========================================================
  // BAGIAN DOKUMENTASI (TETAP SAMA)
  // ==========================================================
  const fetchDokumentasi = async () => {
    setIsLoadingDokumentasi(true);
    const { data } = await supabase.from('dokumentasi').select('*').order('created_at', { ascending: false });
    if (data) setDokumentasi(data);
    setIsLoadingDokumentasi(false);
  };

  const handleSaveDokumentasi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let imageUrl = formDataDokumentasi.gambar_url;
      if (fileDokumentasi) {
        imageUrl = await uploadImage(fileDokumentasi, 'dokumentasi_images');
      } else if (!imageUrl) {
        throw new Error("Pilih file foto untuk dokumentasi!");
      }
      const { error } = await supabase.from('dokumentasi').insert([{ ...formDataDokumentasi, gambar_url: imageUrl }]);
      if (error) throw error;
      setIsModalDokumentasiOpen(false);
      setFormDataDokumentasi({ judul: '', deskripsi: '', gambar_url: '' });
      setFileDokumentasi(null);
      fetchDokumentasi();
    } catch (error: any) {
      alert('Gagal menyimpan Dokumentasi: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDokumentasi = async (id: number) => {
    if(confirm('Yakin ingin menghapus foto dokumentasi ini?')) {
      await supabase.from('dokumentasi').delete().eq('id', id);
      fetchDokumentasi();
    }
  };
  
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-100">
      
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2.5">
            
            {/* Kumpulan Gambar Logo */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Logo Cendekia */}
              <img 
                src="/logo.png" 
                alt="Logo Cendekia" 
                className="h-8 md:h-9 w-auto object-contain drop-shadow-sm" 
              />
              {/* Garis Pemisah */}
              <div className="h-5 w-[1.5px] bg-gray-200 dark:bg-gray-700 rounded-full mx-0.5" />
              {/* Logo Baznas */}
              <img 
                src="/logo baznas.png" 
                alt="Logo Baznas" 
                className="h-6 md:h-8 w-auto object-contain drop-shadow-sm" 
              />
            </div>
            
            {/* Teks Pendamping */}
            <div className="flex flex-col justify-center ml-1">
              <h1 className="text-gray-900 dark:text-white font-black text-sm md:text-SM leading-none tracking-tight">Pondok Pesantren</h1>
              <p className="text-[8px] md:text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest mt-0.5">
                Cendekia Baznas
              </p>
            </div>

          </div>
          
          {/* Tombol Tutup Sidebar di HP (Kalau ada di kodingan aslimu, biarkan saja di sini) */}
          <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 px-4 overflow-y-auto">
          <button onClick={() => handleTabClick('overview')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <LayoutGrid size={18} /> Overview
          </button>

          <button onClick={() => handleTabClick('berita')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'berita' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <FileText size={18} /> Manajemen Berita
          </button>

          <button onClick={() => handleTabClick('fasilitas')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'fasilitas' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <Building2 size={18} /> Kelola Fasilitas
          </button>

          <button onClick={() => handleTabClick('dokumentasi')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'dokumentasi' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <Camera size={18} /> Galeri & Dokumentasi
          </button>
        </nav>

        <div className="p-4 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        
        <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 md:px-8 z-40 transition-colors duration-500 sticky top-0 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white capitalize">
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={16} />
              <input type="text" placeholder="Cari data..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"/>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-gray-500 dark:text-gray-400">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                {!mounted ? <Moon size={20} className="opacity-50" /> : theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="flex items-center gap-3 md:pl-6 sm:border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Admin Utama</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Super Admin</p>
              </div>
              <img src="logo.png" alt="Profile" className="w-8 h-8 md:w-9 md:h-10 rounded-full border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto pb-24">
          
          {activeTab === 'overview' && (
            <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {isLoadingStats ? (
                <div className="flex justify-center items-center py-32 text-gray-400"><Loader2 className="animate-spin mr-2" /> Mengambil data statistik...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors" />
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"><FileText size={22} /></div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1 relative z-10">Total Berita Dipublikasi</p>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white relative z-10">{stats.warta}</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors" />
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl"><Building2 size={22} /></div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1 relative z-10">Fasilitas Terdaftar</p>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white relative z-10">{stats.fasilitas}</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-50 dark:bg-yellow-900/20 rounded-full blur-2xl group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/40 transition-colors" />
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-xl"><ImageIcon size={22} /></div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1 relative z-10">Foto Dokumentasi</p>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white relative z-10">{stats.dokumentasi}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* GRAFIK 1: Distribusi Konten */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden p-6 md:p-8 relative h-[400px] flex flex-col">
                      <div className="flex items-center justify-between mb-8 shrink-0">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <BarChart3 className="text-emerald-600 dark:text-emerald-400" size={20} />
                            Distribusi Konten Database
                          </h3>
                        </div>
                      </div>

                      {(() => {
                        const total = stats.warta + stats.fasilitas + stats.dokumentasi || 1; 
                        const wPct = Math.max(10, Math.round((stats.warta / total) * 100));
                        const fPct = Math.max(10, Math.round((stats.fasilitas / total) * 100));
                        const dPct = Math.max(10, Math.round((stats.dokumentasi / total) * 100));

                        return (
                          <div className="relative flex-grow flex">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-10 border-t border-gray-300 dark:border-gray-600">
                              <div className="h-full border-b border-gray-300 dark:border-gray-600 border-dashed"></div>
                              <div className="h-full border-b border-gray-300 dark:border-gray-600 border-dashed"></div>
                              <div className="h-full border-b border-gray-300 dark:border-gray-600 border-dashed"></div>
                            </div>

                            <div className="flex items-end justify-around w-full px-4 sm:px-12 relative z-10 pt-6 pb-2">
                              <div className="flex flex-col items-center justify-end group w-1/3 h-full">
                                <div className="w-full h-full flex items-end justify-center">
                                  <div className="w-full max-w-[50px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl relative transition-all duration-1000 ease-out flex items-start justify-center group-hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.3)]" style={{ height: `${wPct}%` }}>
                                    <span className="absolute -top-7 text-xs font-bold text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">{stats.warta}</span>
                                  </div>
                                </div>
                                <span className="mt-3 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400">Berita</span>
                              </div>

                              <div className="flex flex-col items-center justify-end group w-1/3 h-full">
                                <div className="w-full h-full flex items-end justify-center">
                                  <div className="w-full max-w-[50px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl relative transition-all duration-1000 ease-out flex items-start justify-center group-hover:opacity-90 shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ height: `${fPct}%` }}>
                                    <span className="absolute -top-7 text-xs font-bold text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">{stats.fasilitas}</span>
                                  </div>
                                </div>
                                <span className="mt-3 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400">Fasilitas</span>
                              </div>

                              <div className="flex flex-col items-center justify-end group w-1/3 h-full">
                                <div className="w-full h-full flex items-end justify-center">
                                  <div className="w-full max-w-[50px] bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-xl relative transition-all duration-1000 ease-out flex items-start justify-center group-hover:opacity-90 shadow-[0_0_15px_rgba(234,179,8,0.3)]" style={{ height: `${dPct}%` }}>
                                    <span className="absolute -top-7 text-xs font-bold text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">{stats.dokumentasi}</span>
                                  </div>
                                </div>
                                <span className="mt-3 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400">Galeri</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* AKSES CEPAT (Pengganti Grafik Dummy) */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col h-[400px]">
                      <div className="flex items-center justify-between mb-6 shrink-0">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Zap className="text-yellow-500" size={20} />
                            Akses Cepat
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Jalan pintas untuk mengelola konten website.</p>
                        </div>
                      </div>

                      <div className="flex-grow flex flex-col justify-center gap-4">
                        <button 
                          onClick={() => { setActiveTab('berita'); setTimeout(() => setIsModalWartaOpen(true), 100); }} 
                          className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform"><FileText size={18} /></div>
                            <div className="text-left"><p className="font-bold text-gray-900 dark:text-white text-sm">Tulis Berita Baru</p><p className="text-xs text-gray-500 dark:text-gray-400">Publikasikan informasi terkini</p></div>
                          </div>
                          <Plus size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </button>

                        <button 
                          onClick={() => { setActiveTab('dokumentasi'); setTimeout(() => setIsModalDokumentasiOpen(true), 100); }} 
                          className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-200 dark:hover:border-yellow-800 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-500 rounded-lg group-hover:scale-110 transition-transform"><Camera size={18} /></div>
                            <div className="text-left"><p className="font-bold text-gray-900 dark:text-white text-sm">Upload Galeri</p><p className="text-xs text-gray-500 dark:text-gray-400">Tambahkan foto dokumentasi</p></div>
                          </div>
                          <Plus size={18} className="text-gray-400 group-hover:text-yellow-600 transition-colors" />
                        </button>

                        <button 
                          onClick={() => { setActiveTab('fasilitas'); setTimeout(() => setIsModalFasilitasOpen(true), 100); }} 
                          className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:scale-110 transition-transform"><Building2 size={18} /></div>
                            <div className="text-left"><p className="font-bold text-gray-900 dark:text-white text-sm">Tambah Fasilitas</p><p className="text-xs text-gray-500 dark:text-gray-400">Perbarui sarana prasarana</p></div>
                          </div>
                          <Plus size={18} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB: FASILITAS */}
          {activeTab === 'fasilitas' && (
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Fasilitas</h3>
                </div>
                <button onClick={() => setIsModalFasilitasOpen(true)} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm w-full sm:w-auto transition-transform active:scale-95">
                  <Plus size={18} /> Tambah Fasilitas
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                {isLoadingFasilitas ? (
                  <div className="flex justify-center items-center py-20 text-gray-400"><Loader2 className="animate-spin mr-2" /></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4 font-semibold w-24">Foto</th>
                          <th className="p-4 font-semibold">Nama Fasilitas</th>
                          <th className="p-4 font-semibold">Kategori</th>
                          <th className="p-4 font-semibold text-center w-24">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                        {facilities.map((f) => (
                            <tr key={f.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="p-4"><img src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} alt="img" className="w-16 h-12 object-cover rounded-md border border-gray-200 dark:border-gray-700" /></td>
                              <td className="p-4 font-semibold text-gray-900 dark:text-white">{f.nama}</td>
                              <td className="p-4"><span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold">{f.kategori}</span></td>
                              <td className="p-4 text-center">
                                <button onClick={() => handleDeleteFasilitas(f.id)} className="text-red-500 hover:text-red-700 transition-colors hover:scale-110"><Trash2 size={18} /></button>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

         {/* TAB: WARTA (BERITA) */}
          {activeTab === 'berita' && (
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Berita (Warta)</h3>
                </div>
               {/* UBAH DARI handleOpenAddModal MENJADI handleOpenAddWartaModal */}
<button onClick={handleOpenAddWartaModal} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex justify-center items-center gap-2 transition-transform active:scale-95 shadow-sm">
  <Plus size={18} /> Tambah Warta
</button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                {isLoadingWarta ? (
                  <div className="flex justify-center items-center py-20 text-gray-400"><Loader2 className="animate-spin mr-2" /></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-4 font-semibold w-24">Gambar</th>
                          <th className="p-4 font-semibold min-w-[200px]">Judul Berita</th>
                          <th className="p-4 font-semibold">Penulis</th>
                          <th className="p-4 font-semibold text-center w-32">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                        {warta.map((w) => (
                            <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="p-4"><img src={w.gambar_url || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80"} alt="img" className="w-16 h-12 object-cover rounded-md border border-gray-200 dark:border-gray-700" /></td>
                              <td className="p-4 font-semibold text-gray-900 dark:text-white border-none whitespace-normal"><p className="line-clamp-2">{w.judul}</p></td>
                              <td className="p-4 text-gray-500 dark:text-gray-400">{w.penulis}</td>
                              
                              {/* Kolom Aksi dengan tombol Edit & Delete */}
                              <td className="p-4 text-center">
                                <div className="flex justify-center items-center gap-3">
                                  <button onClick={() => handleEditWarta(w)} className="text-blue-500 hover:text-blue-700 transition-colors hover:scale-110" title="Edit Berita">
                                    <Edit size={18} />
                                  </button>
                                  <button onClick={() => handleDeleteWarta(w.id)} className="text-red-500 hover:text-red-700 transition-colors hover:scale-110" title="Hapus Berita">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: DOKUMENTASI */}
          {activeTab === 'dokumentasi' && (
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Galeri Dokumentasi</h3>
              </div>
                <button onClick={() => setIsModalDokumentasiOpen(true)} className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm w-full sm:w-auto transition-transform active:scale-95">
                  <Plus size={18} /> Upload Foto Baru
                </button>
              </div>

              {isLoadingDokumentasi ? (
                  <div className="flex justify-center items-center py-20 text-gray-400"><Loader2 className="animate-spin mr-2" /></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dokumentasi.map((d) => (
                    <div key={d.id} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                      <img src={d.gambar_url} alt="Dokumentasi" className="w-full h-48 sm:h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <h4 className="text-white text-xs font-bold truncate">{d.judul}</h4>
                        <button onClick={() => handleDeleteDokumentasi(d.id)} className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-lg text-white hover:bg-red-600 hover:scale-110 transition-transform"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL TAMBAH FASILITAS */}
      {/* ========================================================= */}
      {isModalFasilitasOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-100 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Fasilitas Baru</h3>
              <button onClick={() => setIsModalFasilitasOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveFasilitas} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Fasilitas *</label>
                <input required type="text" value={formDataFasilitas.nama} onChange={(e) => setFormDataFasilitas({...formDataFasilitas, nama: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select value={formDataFasilitas.kategori} onChange={(e) => setFormDataFasilitas({...formDataFasilitas, kategori: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500">
                  <option value="">Pilih Kategori</option>
                  <option value="Ibadah">Ibadah</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Asrama">Asrama</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Foto Fasilitas</label>
                <input type="file" accept="image/*" onChange={(e) => setFileFasilitas(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
                <textarea rows={3} value={formDataFasilitas.deskripsi} onChange={(e) => setFormDataFasilitas({...formDataFasilitas, deskripsi: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm resize-none outline-none focus:border-emerald-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex justify-center items-center gap-2">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Simpan Fasilitas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL TAMBAH & EDIT WARTA */}
      {/* ========================================================= */}
      {isModalWartaOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-100 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              {/* Judul Modal berubah otomatis */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingWartaId ? 'Edit Warta / Berita' : 'Publikasi Warta / Berita'}
              </h3>
              <button onClick={() => setIsModalWartaOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveWarta} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Berita *</label>
                <input required type="text" value={formDataWarta.judul} onChange={(e) => setFormDataWarta({...formDataWarta, judul: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Penulis</label>
                  <input type="text" value={formDataWarta.penulis} onChange={(e) => setFormDataWarta({...formDataWarta, penulis: e.target.value})} placeholder="Admin" className="w-full bg-gray-50 dark:bg-gray-900 border rounded-lg px-4 py-2.5 text-sm dark:border-gray-700 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {editingWartaId ? 'Ganti Gambar Cover (Opsional)' : 'Upload Gambar Cover'}
                  </label>
                  <input type="file" accept="image/*" onChange={(e) => setFileWarta(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-50 dark:bg-gray-900 border rounded-lg px-4 py-2 text-sm dark:border-gray-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Isi Berita</label>
                <textarea rows={6} value={formDataWarta.konten} onChange={(e) => setFormDataWarta({...formDataWarta, konten: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border rounded-lg px-4 py-2 text-sm resize-none dark:border-gray-700 outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex justify-center items-center gap-2">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : (editingWartaId ? 'Simpan Perubahan' : 'Publikasi Berita')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL UPLOAD DOKUMENTASI */}
      {/* ========================================================= */}
      {isModalDokumentasiOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-100 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Foto Galeri</h3>
              <button onClick={() => setIsModalDokumentasiOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveDokumentasi} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Upload Foto *</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <input required type="file" accept="image/*" onChange={(e) => setFileDokumentasi(e.target.files ? e.target.files[0] : null)} className="text-sm w-full text-center" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Judul / Keterangan Foto *</label>
                <input required type="text" value={formDataDokumentasi.judul} onChange={(e) => setFormDataDokumentasi({...formDataDokumentasi, judul: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-yellow-500" />
              </div>
              <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg flex justify-center items-center gap-2">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Upload Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;