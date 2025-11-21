import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Code, 
  Eye, 
  Wand2, 
  Copy, 
  Github, 
  MapPin, 
  User, 
  Briefcase, 
  Terminal, 
  Palette,
  CheckCircle2
} from 'lucide-react';
import { ProfileData, TechStack } from './types';
import { generateProfileBio } from './services/geminiService';
import MarkdownPreview from './components/MarkdownPreview';

// Default Data based on User Request
const INITIAL_STATE: ProfileData = {
  name: "Muhammad Rama Raditya",
  title: "Vocational Student (SMK RPL)",
  subtitle: "I build websites, I code in PHP & JS, Always learning new tech",
  location: "Ponorogo, Jawa Timur",
  about: "I am a Grade 12 student majoring in Software Engineering (RPL). I have a strong passion for web development and creating interactive user experiences. I enjoy solving problems with code and am currently expanding my knowledge in modern frontend frameworks.",
  skills: [
    TechStack.HTML, 
    TechStack.CSS, 
    TechStack.JavaScript, 
    TechStack.Bootstrap, 
    TechStack.Tailwind, 
    TechStack.PHP, 
    TechStack.MySQL
  ],
  socials: {
    github: "rama-raditya",
    linkedin: "https://linkedin.com/in/rama-raditya",
    instagram: "https://instagram.com/rama.r",
    email: "rama@example.com",
    website: ""
  },
  showStats: true,
  showStreaks: true,
  showTrophies: false,
  theme: "radical" // stats theme
};

// Available themes for Stats
const THEMES = [
  "radical", "merko", "gruvbox", "tokyonight", "onedark", "cobalt", "synthwave", "highcontrast", "dracula"
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'code'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field: keyof typeof profile.socials, value: string) => {
    setProfile(prev => ({ ...prev, socials: { ...prev.socials, [field]: value } }));
  };

  const toggleSkill = (skill: string) => {
    setProfile(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    try {
      const bio = await generateProfileBio(profile);
      setProfile(prev => ({ ...prev, about: bio }));
    } catch (error) {
      alert("Failed to generate bio. Please check your API key or internet connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMarkdown = () => {
    const skillsString = profile.skills.map(s => s.toLowerCase().replace(' ', '')).join(',');
    const typingLines = profile.subtitle.split(',').map(s => s.trim()).join(';');
    
    return `
<div align="center">

# Hi there, I'm ${profile.name} 👋

![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=58A6FF&background=00000000&center=true&vCenter=true&width=435&lines=${encodeURIComponent(typingLines)})

</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=header"/>
</div>

### 👨‍💻 About Me

${profile.about}

- 🔭 I’m currently working on **School Projects**
- 🌱 I’m currently learning **React, Laravel & System Design**
- 👯 I’m looking to collaborate on **Web Development Projects**
- 📍 Located in **${profile.location}**

---

### 🛠️ Languages & Tools

<div align="center">
  <img src="https://skillicons.dev/icons?i=${skillsString}&theme=${profile.theme === 'highcontrast' ? 'light' : 'dark'}" />
</div>

---

### 📊 GitHub Stats

<div align="center">

${profile.showStats ? `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${profile.socials.github}&show_icons=true&theme=${profile.theme})` : ''}
${profile.showStreaks ? `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${profile.socials.github}&theme=${profile.theme})` : ''}

</div>

${profile.showTrophies ? `
<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${profile.socials.github}&theme=${profile.theme === 'radical' ? 'flat' : 'onedark'}&no-frame=true&column=7"/>
</div>
` : ''}

---

<div align="center">

${profile.socials.linkedin ? `[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](${profile.socials.linkedin})` : ''}
${profile.socials.instagram ? `[![Instagram](https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white)](${profile.socials.instagram})` : ''}
${profile.socials.website ? `[![Website](https://img.shields.io/badge/website-000000.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](${profile.socials.website})` : ''}

</div>
    `.trim();
  };

  useEffect(() => {
    setGeneratedMarkdown(generateMarkdown());
  }, [profile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className="min-h-screen bg-github-dark text-github-text font-sans selection:bg-github-blue selection:text-white">
      {/* Header */}
      <header className="border-b border-github-border bg-github-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Layout className="w-8 h-8 text-github-blue" />
            <div>
              <h1 className="text-xl font-bold text-white">ProReadMe Generator</h1>
              <p className="text-xs text-gray-400">For Muhammad Rama Raditya</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === 'edit' ? 'bg-github-blue text-white' : 'hover:bg-github-border'}`}
            >
              <User size={18} /> <span className="hidden sm:inline">Edit Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === 'preview' ? 'bg-github-blue text-white' : 'hover:bg-github-border'}`}
            >
              <Eye size={18} /> <span className="hidden sm:inline">Preview</span>
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === 'code' ? 'bg-github-blue text-white' : 'hover:bg-github-border'}`}
            >
              <Code size={18} /> <span className="hidden sm:inline">Markdown</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* EDIT TAB */}
        {activeTab === 'edit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Personal Info */}
            <div className="lg:col-span-7 space-y-6">
              <section className="bg-github-panel border border-github-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <User className="text-github-blue" /> Personal Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Role/Title</label>
                    <input 
                      type="text" 
                      value={profile.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Typing Subtitle <span className="text-xs text-gray-500">(Separate phrases with comma)</span>
                  </label>
                  <input 
                    type="text" 
                    value={profile.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                    placeholder="I code things, I build web apps..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <input 
                    type="text" 
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                  />
                </div>

                <div className="mb-4 relative">
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-sm font-medium">About Me</label>
                    <button 
                      onClick={handleGenerateBio}
                      disabled={isGenerating}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full flex items-center gap-1 transition disabled:opacity-50"
                    >
                      <Wand2 size={12} /> {isGenerating ? 'Writing...' : 'Generate with AI'}
                    </button>
                  </div>
                  <textarea 
                    value={profile.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    className="w-full h-32 bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition leading-relaxed"
                  />
                </div>
              </section>

              <section className="bg-github-panel border border-github-border rounded-lg p-6">
                 <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Terminal className="text-github-blue" /> Skills & Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TechStack).map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleSkill(tech)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        profile.skills.includes(tech)
                          ? 'bg-github-blue/20 border-github-blue text-github-blue'
                          : 'bg-github-dark border-github-border text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Config */}
            <div className="lg:col-span-5 space-y-6">
              <section className="bg-github-panel border border-github-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Github className="text-github-blue" /> Social & Config
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub Username (Required for Stats)</label>
                     <div className="flex items-center bg-github-dark border border-github-border rounded px-2">
                        <span className="text-gray-500">@</span>
                        <input 
                          type="text" 
                          value={profile.socials.github}
                          onChange={(e) => handleSocialChange('github', e.target.value)}
                          className="w-full bg-transparent p-2 focus:outline-none"
                        />
                     </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input 
                      type="text" 
                      value={profile.socials.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium mb-1">Instagram URL</label>
                    <input 
                      type="text" 
                      value={profile.socials.instagram}
                      onChange={(e) => handleSocialChange('instagram', e.target.value)}
                      className="w-full bg-github-dark border border-github-border rounded p-2 focus:border-github-blue focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="border-t border-github-border pt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Palette size={16} /> Appearance
                  </h3>
                  
                  <div className="mb-4">
                     <label className="block text-sm text-gray-400 mb-2">Color Theme (Stats & Icons)</label>
                     <select 
                        value={profile.theme}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        className="w-full bg-github-dark border border-github-border rounded p-2"
                     >
                        {THEMES.map(t => (
                          <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                        ))}
                     </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.showStats}
                        onChange={(e) => handleInputChange('showStats', e.target.checked)}
                        className="rounded border-github-border bg-github-dark text-github-blue focus:ring-0"
                      />
                      <span>Show GitHub Stats Card</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.showStreaks}
                        onChange={(e) => handleInputChange('showStreaks', e.target.checked)}
                        className="rounded border-github-border bg-github-dark text-github-blue focus:ring-0"
                      />
                      <span>Show Commit Streak</span>
                    </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.showTrophies}
                        onChange={(e) => handleInputChange('showTrophies', e.target.checked)}
                        className="rounded border-github-border bg-github-dark text-github-blue focus:ring-0"
                      />
                      <span>Show Trophies</span>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* PREVIEW TAB */}
        {activeTab === 'preview' && (
           <div className="animate-in fade-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Preview</h2>
                <p className="text-sm text-gray-400">This is an approximation of how it looks on GitHub light/dark mode.</p>
             </div>
             <MarkdownPreview data={profile} markdown={generatedMarkdown} />
           </div>
        )}

        {/* CODE TAB */}
        {activeTab === 'code' && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Markdown Code</h2>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition ${
                    copyStatus === 'copied' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-github-blue text-white hover:bg-blue-600'
                  }`}
                >
                  {copyStatus === 'copied' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copyStatus === 'copied' ? 'Copied!' : 'Copy Markdown'}
                </button>
             </div>
            <div className="bg-github-panel border border-github-border rounded-lg p-4 overflow-hidden">
              <pre className="font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre p-4">
                {generatedMarkdown}
              </pre>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;