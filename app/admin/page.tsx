'use client';

import { useState, useEffect } from 'react';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET;

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  });

  useEffect(() => {
    if (localStorage.getItem('auth') === ADMIN_SECRET) {
      setAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      localStorage.setItem('auth', password);
      setAuthorized(true);
      setError('');
    } else {
      setError('Invalid Access Key');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Project Added Successfully!');
      setFormData({ title: '', description: '', imageUrl: '', link: '' });
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-morphism p-10 rounded-3xl w-full max-w-md border-cyan-500/50">
          <h1 className="text-3xl font-bold mb-8 text-white text-center neon-shadow">ADMIN ACCESS</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter Secret Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              AUTHORIZE
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-white neon-shadow tracking-tight">ADD NEW PROJECT</h1>
        <button 
          onClick={() => { localStorage.removeItem('auth'); setAuthorized(false); }}
          className="text-xs text-gray-500 hover:text-cyan-500 uppercase tracking-widest"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass-morphism p-8 rounded-3xl space-y-6 border-cyan-500/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-cyan-500 uppercase font-bold">Project Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/50 border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-cyan-500 uppercase font-bold">Project Link</label>
            <input
              required
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full bg-black/50 border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-cyan-500 uppercase font-bold">Image URL (Optional)</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-black/50 border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500/50"
            placeholder="Direct link to image"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-cyan-500 uppercase font-bold">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black/50 border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500/50 resize-none"
          />
        </div>

        <button className="w-full bg-cyan-500 text-black font-bold py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]">
          PUBLISH TO SHOWCASE
        </button>
      </form>
    </div>
  );
}
