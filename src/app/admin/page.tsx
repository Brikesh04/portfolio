'use client';

import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  desc_en: string;
  category_en: string;
  year: string;
  tags: string[];
  img: string;
  date: string;
  images: string[];
}

interface Settings {
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  photo_url: string;
  translations: {
    en: Record<string, string>;
  };
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'translations' | 'projects'>('general');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: 'success' });

  // Projects editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Check session storage for auto-login
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
        fetchData();
      } else {
        alert('Incorrect passcode!');
      }
    } catch {
      alert('Authentication error. Please try again.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [settingsRes, projectsRes] = await Promise.all([
        fetch('/api/v1/settings'),
        fetch('/api/v1/projects')
      ]);
      if (settingsRes.ok && projectsRes.ok) {
        setSettings(await settingsRes.json());
        setProjects(await projectsRes.json());
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: 'success' }), 3000);
  };

  const saveAllSettings = async (updatedSettings: Settings) => {
    setSaving(true);
    try {
      const res = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
      if (res.ok) {
        setSettings(updatedSettings);
        triggerStatus('Settings updated successfully!');
      } else {
        throw new Error('Server returned error');
      }
    } catch (err: any) {
      triggerStatus('Error saving settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveAllProjects = async (updatedProjects: Project[]) => {
    setSaving(true);
    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProjects)
      });
      if (res.ok) {
        setProjects(updatedProjects);
        setEditingProject(null);
        triggerStatus('Projects database saved successfully!');
      } else {
        throw new Error('Server returned error');
      }
    } catch (err: any) {
      triggerStatus('Error saving projects: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleGeneralSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;
    const formData = new FormData(e.currentTarget);
    const updated: Settings = {
      ...settings,
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      linkedin_url: formData.get('linkedin_url') as string,
      github_url: formData.get('github_url') as string,
      photo_url: formData.get('photo_url') as string,
    };
    saveAllSettings(updated);
  };

  const handleTranslationChange = (key: string, value: string) => {
    if (!settings) return;
    const updated = { ...settings };
    updated.translations.en[key] = value;
    setSettings(updated);
  };

  // Projects CRUD Actions
  const handleEditProject = (proj: Project) => {
    setEditingProject({ ...proj });
  };

  const handleNewProject = () => {
    setEditingProject({
      id: '',
      title: '',
      desc_en: '',
      category_en: '',
      year: new Date().getFullYear().toString(),
      tags: [],
      img: '',
      date: '',
      images: []
    });
  };

  const handleSaveProjectForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    // Check ID validation
    if (!editingProject.id.trim()) {
      alert('Project ID is required!');
      return;
    }

    const index = projects.findIndex(p => p.id === editingProject.id);
    let updatedList = [...projects];

    if (index >= 0) {
      // Update existing project
      updatedList[index] = editingProject;
    } else {
      // Add new project
      updatedList.push(editingProject);
    }

    saveAllProjects(updatedList);
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updatedList = projects.filter(p => p.id !== id);
    saveAllProjects(updatedList);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-sans px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-wider text-rose-500 uppercase">Admin CMS Gateway</h1>
            <p className="text-xs text-neutral-400 mt-2">Enter credentials to edit your portfolio dynamically</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase text-neutral-500 tracking-wider">Passcode</label>
            <input 
              type="password" 
              placeholder="Enter your passcode" 
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none text-white transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-rose-600 hover:bg-rose-500 active:scale-[0.98] py-3 rounded-lg text-sm font-semibold tracking-wider transition-all">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs tracking-widest uppercase text-neutral-500">Loading Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col">
      {/* Toast Alert */}
      {statusMsg.text && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl text-sm border flex items-center gap-2 animate-bounce ${
          statusMsg.type === 'error' ? 'bg-red-950/90 border-red-800 text-red-200' : 'bg-green-950/90 border-green-800 text-green-200'
        }`}>
          <span>{statusMsg.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-neutral-900 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-lg">B</div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest">Brikesh CMS</h1>
            <p className="text-[10px] text-rose-400 font-mono">v3.0 NEXT ARCHITECTURE</p>
          </div>
        </div>

        <nav className="flex bg-neutral-950 border border-neutral-850 p-1 rounded-lg">
          <button 
            onClick={() => { setActiveTab('general'); setEditingProject(null); }}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${activeTab === 'general' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            General Settings
          </button>
          <button 
            onClick={() => { setActiveTab('translations'); setEditingProject(null); }}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${activeTab === 'translations' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Translations CMS
          </button>
          <button 
            onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${activeTab === 'projects' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Projects Manager
          </button>
        </nav>

        <div>
          <a href="/" className="text-xs border border-neutral-800 hover:border-neutral-600 px-4 py-2 rounded-lg transition-all text-neutral-400 hover:text-white">
            View Live Site
          </a>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8">
        
        {/* Tab 1: General Settings */}
        {activeTab === 'general' && settings && (
          <form onSubmit={handleGeneralSubmit} className="bg-neutral-900/60 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
            <h2 className="text-lg font-bold text-neutral-350 border-b border-neutral-850 pb-3">Configure General Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">First Name</label>
                <input type="text" name="first_name" defaultValue={settings.first_name} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">Last Name</label>
                <input type="text" name="last_name" defaultValue={settings.last_name} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">Email Address</label>
                <input type="email" name="email" defaultValue={settings.email} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">LinkedIn URL</label>
                <input type="url" name="linkedin_url" defaultValue={settings.linkedin_url} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">GitHub URL</label>
                <input type="url" name="github_url" defaultValue={settings.github_url} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-neutral-500 tracking-wider">Profile Photo Asset Path</label>
                <input type="text" name="photo_url" defaultValue={settings.photo_url} className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" required />
              </div>
            </div>

            <button type="submit" disabled={saving} className="bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 disabled:text-neutral-500 font-semibold py-3 rounded-lg text-sm mt-4 tracking-wider transition-all self-end px-10">
              {saving ? 'Writing changes...' : 'Save General Settings'}
            </button>
          </form>
        )}

        {/* Tab 2: Translations Editor */}
        {activeTab === 'translations' && settings && (
          <div className="bg-neutral-900/60 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <h2 className="text-lg font-bold text-neutral-350">Side-by-Side Translation Editor</h2>
              <button 
                onClick={() => saveAllSettings(settings)}
                disabled={saving}
                className="bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-850 py-2 px-6 rounded-lg text-xs font-semibold tracking-wider transition-all"
              >
                {saving ? 'Saving...' : 'Save Translation Database'}
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {Object.keys(settings.translations.en).map((key) => (
                <div key={key} className="border-b border-neutral-900 pb-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-rose-400">{key}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <textarea 
                        rows={2}
                        className="bg-neutral-950 border border-neutral-850 rounded-lg px-3 py-2 text-xs focus:border-rose-500 outline-none font-sans"
                        value={settings.translations.en[key]}
                        onChange={(e) => handleTranslationChange(key, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Projects CRUD */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            {!editingProject ? (
              <div className="bg-neutral-900/60 border border-neutral-900 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                  <h2 className="text-lg font-bold text-neutral-350">Dynamic Works Portfolio</h2>
                  <button 
                    onClick={handleNewProject}
                    className="bg-rose-600 hover:bg-rose-500 py-2 px-6 rounded-lg text-xs font-semibold tracking-wider transition-all"
                  >
                    + Add New Project
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-850 text-neutral-500 uppercase tracking-widest text-[10px]">
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Category (EN/FR)</th>
                        <th className="py-3 px-4">Year</th>
                        <th className="py-3 px-4">Tags</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj.id} className="border-b border-neutral-900 hover:bg-neutral-950/40 transition-colors">
                          <td className="py-4 px-4 font-bold text-rose-100 flex items-center gap-3">
                            <img src={proj.img} className="w-12 h-8 rounded border border-neutral-800 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/projects/Covers/CyberDiag.avif' }} />
                            <span>{proj.title}</span>
                          </td>
                          <td className="py-4 px-4 text-xs text-neutral-400">
                            {proj.category_en}
                          </td>
                          <td className="py-4 px-4 text-xs font-mono text-neutral-400">{proj.year}</td>
                          <td className="py-4 px-4 text-xs text-neutral-400">
                            {proj.tags.join(', ')}
                          </td>
                          <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditProject(proj)}
                              className="text-xs bg-neutral-800 hover:bg-neutral-750 px-3 py-1.5 rounded transition-all text-neutral-300 hover:text-white"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-xs bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 px-3 py-1.5 rounded transition-all text-red-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Individual Project Edit Form
              <form onSubmit={handleSaveProjectForm} className="bg-neutral-900/60 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                  <h2 className="text-lg font-bold text-neutral-350">
                    {projects.some(p => p.id === editingProject.id) ? `Edit: ${editingProject.title}` : 'Create New Project'}
                  </h2>
                  <button 
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="text-xs bg-neutral-800 hover:bg-neutral-750 py-2 px-6 rounded-lg font-semibold tracking-wider transition-all text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Project ID (unique URL key)</label>
                    <input 
                      type="text" 
                      value={editingProject.id} 
                      onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none disabled:text-neutral-500" 
                      disabled={projects.some(p => p.id === editingProject.id)}
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Project Title</label>
                    <input 
                      type="text" 
                      value={editingProject.title} 
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Category</label>
                    <input 
                      type="text" 
                      value={editingProject.category_en} 
                      onChange={(e) => setEditingProject({ ...editingProject, category_en: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Year</label>
                    <input 
                      type="text" 
                      value={editingProject.year} 
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Date (MM YYYY)</label>
                    <input 
                      type="text" 
                      value={editingProject.date} 
                      onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Main Cover Image Path</label>
                    <input 
                      type="text" 
                      value={editingProject.img} 
                      onChange={(e) => setEditingProject({ ...editingProject, img: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Gallery Images (Comma-separated asset paths)</label>
                    <textarea 
                      rows={2}
                      value={editingProject.images.join(', ')} 
                      onChange={(e) => setEditingProject({ ...editingProject, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-xs focus:border-rose-500 outline-none font-mono" 
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Tags (Comma-separated)</label>
                    <input 
                      type="text" 
                      value={editingProject.tags.join(', ')} 
                      onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none font-mono" 
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase text-neutral-500 tracking-wider">Description</label>
                    <textarea 
                      rows={3}
                      value={editingProject.desc_en} 
                      onChange={(e) => setEditingProject({ ...editingProject, desc_en: e.target.value })}
                      className="bg-neutral-950 border border-neutral-850 rounded-lg px-4 py-3 text-sm focus:border-rose-500 outline-none" 
                      required 
                    />
                  </div>
                </div>

                <button type="submit" disabled={saving} className="bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-800 disabled:text-neutral-500 font-semibold py-3 rounded-lg text-sm mt-4 tracking-wider transition-all self-end px-10">
                  {saving ? 'Writing database...' : 'Save Project Details'}
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
