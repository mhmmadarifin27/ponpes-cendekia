"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { supabase } from '@/lib/supabase';
import { 
  LayoutGrid, Users, FileText, Building2, Settings, LogOut, 
  Search, Bell, Moon, Sun, TrendingUp, MoreHorizontal, 
  UserPlus, Mail, GraduationCap, Wifi, BookOpen, Coffee,
  Camera, Plus, Trash2, Edit, Loader2, X, UploadCloud, Menu
} from 'lucide-react';

const AdminDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // --- STATE MENU MOBILE ---
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // --- STATE FASILITAS ---
  const [facilities, setFacilities] = useState<any[]>([]);
  const [isLoadingFasilitas, setIsLoadingFasilitas] = useState(false);
  const [isModalFasilitasOpen, setIsModalFasilitasOpen] = useState(false);
  const [formDataFasilitas, setFormDataFasilitas] = useState({ nama: '', kategori: '', deskripsi: '', gambar_url: '' });
  const [fileFasilitas, setFileFasilitas] = useState<File | null>(null);

  // --- STATE WARTA ---
  const [warta, setWarta] = useState<any[]>([]);
  const [isLoadingWarta, setIsLoadingWarta] = useState(false);
  const [isModalWartaOpen, setIsModalWartaOpen] = useState(false);
  const [formDataWarta, setFormDataWarta] = useState({ judul: '', konten: '', penulis: '', gambar_url: '' });
  const [fileWarta, setFileWarta] = useState<File | null>(null);

  // --- STATE DOKUMENTASI ---
  const [dokumentasi, setDokumentasi] = useState<any[]>([]);
  const [isLoadingDokumentasi, setIsLoadingDokumentasi] = useState(false);
  const [isModalDokumentasiOpen, setIsModalDokumentasiOpen] = useState(false);
  const [formDataDokumentasi, setFormDataDokumentasi] = useState({ judul: '', deskripsi: '', gambar_url: '' });
  const [fileDokumentasi, setFileDokumentasi] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch data berdasarkan tab yang aktif
  useEffect(() => {
    if (activeTab === 'fasilitas') fetchFacilities();
    if (activeTab === 'berita') fetchWarta();
    if (activeTab === 'dokumentasi') fetchDokumentasi();
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  // Fungsi untuk ganti tab + otomatis tutup menu di HP
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  const uploadImage = async (file: File, folderName: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const filePath = `${folderName}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images') 
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // ==========================================
  // --- FUNGSI CRUD FASILITAS ---
  // ==========================================
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
      if (fileFasilitas) {
        imageUrl = await uploadImage(fileFasilitas, 'fasilitas_images');
      }

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

  // ==========================================
  // --- FUNGSI CRUD WARTA ---
  // ==========================================
  const fetchWarta = async () => {
    setIsLoadingWarta(true);
    const { data } = await supabase.from('warta').select('*').order('created_at', { ascending: false });
    if (data) setWarta(data);
    setIsLoadingWarta(false);
  };

  const handleSaveWarta = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      let imageUrl = formDataWarta.gambar_url;
      if (fileWarta) {
        imageUrl = await uploadImage(fileWarta, 'warta_images');
      }

      const { error } = await supabase.from('warta').insert([{ ...formDataWarta, gambar_url: imageUrl }]);
      if (error) throw error;

      setIsModalWartaOpen(false);
      setFormDataWarta({ judul: '', konten: '', penulis: '', gambar_url: '' });
      setFileWarta(null);
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

  // ==========================================
  // --- FUNGSI CRUD DOKUMENTASI ---
  // ==========================================
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
      
      {/* --- BACKDROP MOBILE SIDEBAR --- */}
      {/* Muncul gelap di belakang menu saat HP */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR KIRI --- */}
      {/* Ditambahkan efek slide-in animasi khusus layar kecil */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo & Close Button (Mobile) */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-gray-900 dark:text-white tracking-wide">PP Admin</h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-widest">MANAGEMENT</p>
            </div>
          </div>
          {/* Tombol Silang (Hanya di HP) */}
          <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigasi Utama */}
        <nav className="flex-1 py-6 flex flex-col gap-1 px-4 overflow-y-auto">
          <button onClick={() => handleTabClick('overview')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <LayoutGrid size={18} /> Overview
          </button>
          
          <button onClick={() => handleTabClick('ppdb')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'ppdb' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <Users size={18} /> Kelola PPDB
          </button>

          <button onClick={() => handleTabClick('berita')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'berita' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <FileText size={18} /> Manajemen Berita
          </button>

          <button onClick={() => handleTabClick('fasilitas')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'fasilitas' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <Building2 size={18} /> Kelola Fasilitas
          </button>

          <button onClick={() => handleTabClick('dokumentasi')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'dokumentasi' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'}`}>
            <Camera size={18} /> Dokumentasi
          </button>
        </nav>

        {/* Menu Bawah (Settings & Logout) */}
        <div className="p-4 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50 transition-all">
            <Settings size={18} /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* --- AREA KONTEN UTAMA --- */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* HEADER ATAS */}
        <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 md:px-8 z-10 transition-colors duration-500 sticky top-0">
          
          <div className="flex items-center gap-4">
            {/* Tombol Garis Tiga (Hamburger) Khusus HP */}
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
              <input type="text" placeholder="Search data..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"/>
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
              <img src="https://ui-avatars.com/api/?name=Admin+Utama&background=047857&color=fff" alt="Profile" className="w-8 h-8 md:w-9 md:h-9 rounded-full" />
            </div>
          </div>
        </header>

        {/* ISI KONTEN */}
        <div className="p-4 md:p-8 overflow-y-auto pb-24">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg"><UserPlus size={20} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"><TrendingUp size={12}/> +12%</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">New Applicants</p>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">128</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><FileText size={20} /></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total News</p>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">45</h3>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-lg"><Building2 size={20} /></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Facilities</p>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">24</h3>
                </div>
              </div>

              {/* Tabel Dummy Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Applicants</h3>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold">Program</th>
                        <th className="p-4 font-semibold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-4 font-semibold text-gray-900 dark:text-white">Ahmad Fauzi</td>
                        <td className="p-4 text-gray-500 dark:text-gray-400">Tahfidz Qur'an</td>
                        <td className="p-4 text-center"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
                              <td className="p-4"><img src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} alt="img" className="w-16 h-12 object-cover rounded-md" /></td>
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
                <button onClick={() => setIsModalWartaOpen(true)} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex justify-center items-center gap-2">
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
                          <th className="p-4 font-semibold text-center w-24">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                        {warta.map((w) => (
                            <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="p-4"><img src={w.gambar_url || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80"} alt="img" className="w-16 h-12 object-cover rounded-md" /></td>
                              <td className="p-4 font-semibold text-gray-900 dark:text-white border-none whitespace-normal"><p className="line-clamp-2">{w.judul}</p></td>
                              <td className="p-4 text-gray-500 dark:text-gray-400">{w.penulis}</td>
                              <td className="p-4 text-center">
                                <button onClick={() => handleDeleteWarta(w.id)} className="text-red-500 hover:text-red-700 transition-colors hover:scale-110"><Trash2 size={18} /></button>
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
                <button onClick={() => setIsModalDokumentasiOpen(true)} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm w-full sm:w-auto transition-transform active:scale-95">
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

          {/* TAB: PPDB PLACEHOLDER */}
          {activeTab === 'ppdb' && (
            <div className="max-w-7xl mx-auto animate-in fade-in text-center py-20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Manajemen PPDB</h3>
              <p className="text-gray-500">Fitur sedang dikoordinasikan dengan pengelola.</p>
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
      {/* MODAL TAMBAH WARTA */}
      {/* ========================================================= */}
      {isModalWartaOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-100 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Publikasi Warta / Berita</h3>
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
                  <label className="block text-sm font-medium mb-1">Upload Gambar Cover</label>
                  <input type="file" accept="image/*" onChange={(e) => setFileWarta(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-50 dark:bg-gray-900 border rounded-lg px-4 py-2 text-sm dark:border-gray-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Isi Berita</label>
                <textarea rows={6} value={formDataWarta.konten} onChange={(e) => setFormDataWarta({...formDataWarta, konten: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border rounded-lg px-4 py-2 text-sm resize-none dark:border-gray-700 outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex justify-center items-center gap-2">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Publikasi Berita'}
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <input required type="file" accept="image/*" onChange={(e) => setFileDokumentasi(e.target.files ? e.target.files[0] : null)} className="text-sm w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Judul / Keterangan Foto *</label>
                <input required type="text" value={formDataDokumentasi.judul} onChange={(e) => setFormDataDokumentasi({...formDataDokumentasi, judul: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-yellow-500" />
              </div>
              <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="submit" disabled={isSaving} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex justify-center items-center gap-2">
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