"use client";
import React, { useState, useEffect } from 'react';
import { Newspaper, Building2, LogOut, Plus, User, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('warta');
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // State untuk Form Input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setDataList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // --- FUNGSI UPLOAD GAMBAR ---
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${activeTab}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images') // Nama bucket di Supabase Storage
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Mapping payload sesuai tabel
      let payload = {};
      if (activeTab === 'warta') {
        payload = { judul: judul, konten: konten, gambar_url: imageUrl, penulis: 'Admin' };
      } else if (activeTab === 'fasilitas') {
        payload = { nama: judul, deskripsi: konten, gambar_url: imageUrl };
      } else if (activeTab === 'dokumentasi') {
        payload = { judul: judul, deskripsi: konten, gambar_url: imageUrl };
      }

      const { error } = await supabase.from(activeTab).insert([payload]);

      if (error) throw error;

      alert("Data berhasil disimpan!");
      setIsModalOpen(false);
      setJudul('');
      setKonten('');
      setImageFile(null);
      fetchData();
    } catch (err: any) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin mau hapus data ini?")) {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex transition-colors">
      {/* SIDEBAR */}
      <aside className="w-64 bg-emerald-950 dark:bg-gray-900 text-white flex flex-col fixed h-full z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-emerald-950 font-bold">Az</div>
            <span className="font-bold text-lg">Dashboard</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'warta', label: 'Warta', icon: <Newspaper size={18} /> },
              { id: 'fasilitas', label: 'Fasilitas', icon: <Building2 size={18} /> },
              { id: 'dokumentasi', label: 'Dokumentasi', icon: <ImageIcon size={18} /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeTab === tab.id ? 'bg-yellow-500 text-emerald-950 shadow-lg' : 'text-white/60 hover:bg-white/5'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} className="mt-auto p-8 text-red-400 flex items-center gap-2 hover:bg-red-500/5 transition-all"><LogOut size={18} /> Keluar</button>
      </aside>

      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-950 dark:text-white capitalize">Kelola {activeTab}</h1>
            <p className="text-gray-400 text-sm mt-1">Total {dataList.length} data ditemukan</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-900 dark:bg-yellow-500 text-white dark:text-emerald-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Plus size={18} /> Tambah {activeTab}
          </button>
        </header>

        {/* LIST DATA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-yellow-500" size={40} /></div>
          ) : dataList.length > 0 ? (
            dataList.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-xl transition-all">
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 relative">
                  {item.gambar_url ? (
                    <img src={item.gambar_url} className="w-full h-full object-cover" alt="img" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={32} /></div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-emerald-900 dark:text-white line-clamp-1">{item.judul || item.nama}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 mb-4">{item.konten || item.deskripsi}</p>
                  <button onClick={() => handleDelete(item.id)} className="w-full py-2 bg-red-50 text-red-500 dark:bg-red-500/10 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={14} /> Hapus Data
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] text-center text-gray-400">
              Belum ada data {activeTab}.
            </div>
          )}
        </div>

        {/* MODAL INPUT */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-emerald-950 dark:text-white mb-6">Input {activeTab} Baru</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <input 
                  type="text" placeholder={`Judul / Nama ${activeTab}`} 
                  className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-black text-white focus:border-yellow-500 outline-none transition-all"
                  value={judul} onChange={(e) => setJudul(e.target.value)} required
                />
                <textarea 
                  placeholder={`Deskripsi Lengkap...`} rows={4}
                  className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-black text-white focus:border-yellow-500 outline-none transition-all"
                  value={konten} onChange={(e) => setKonten(e.target.value)} required
                />
                
                {/* INPUT FILE */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest ml-1">Unggah Foto</label>
                  <input 
                    type="file" accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-yellow-500 file:text-emerald-950 hover:file:bg-yellow-400 transition-all cursor-pointer"
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-white transition-colors">Batal</button>
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="flex-1 py-4 bg-yellow-500 text-emerald-950 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Simpan Sekarang'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;