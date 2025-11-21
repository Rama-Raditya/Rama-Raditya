import React from 'react';
import { ProfileData } from '../types';

interface MarkdownPreviewProps {
  data: ProfileData;
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ data, markdown }) => {
  // Helper to extract the typing SVG url from markdown if possible, or generate fresh for preview
  const typingSvgUrl = `https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=58A6FF&background=00000000&center=false&vCenter=true&width=435&lines=${encodeURIComponent(data.subtitle.split(',').join(';'))}`;

  const skillBaseUrl = "https://skillicons.dev/icons?i=";
  const skillsParam = data.skills.map(s => s.toLowerCase().replace(' ', '')).join(',');

  return (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto font-sans">
      {/* Mock GitHub Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-col md:flex-row items-start md:items-center gap-4">
          <span>Hi there <span className="animate-bounce inline-block">👋</span>, I'm {data.name}</span>
          {data.showVisitorCount && (
             <img src={`https://komarev.com/ghpvc/?username=${data.socials.github}&label=Profile%20Views&color=0e75b6&style=flat`} alt="Profile Views" className="h-6" />
          )}
        </h1>
      </div>

      {/* Typing Effect Mock */}
      <div className="h-12 mb-6">
        <img src={typingSvgUrl} alt="Typing SVG" />
      </div>

      {/* About Section */}
      <div className="prose max-w-none mb-8 text-gray-700 leading-relaxed whitespace-pre-wrap">
        {data.about}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm font-mono">
         <div className="flex items-center gap-2">
            🔭 I’m currently working on <span className="font-bold text-blue-600">School Final Projects</span>
         </div>
         <div className="flex items-center gap-2">
            🌱 I’m currently learning <span className="font-bold text-blue-600">React & Advanced PHP</span>
         </div>
         <div className="flex items-center gap-2">
            👯 I’m looking to collaborate on <span className="font-bold text-blue-600">Open Source Web Apps</span>
         </div>
         <div className="flex items-center gap-2">
            📍 Located in <span className="font-bold text-blue-600">{data.location}</span>
         </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Languages and Tools</h3>
        <div className="flex flex-wrap gap-2">
           <img src={`${skillBaseUrl}${skillsParam}&theme=${data.theme}`} alt="Skills" />
        </div>
      </div>

      {/* Connect */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Connect with me</h3>
        <div className="flex gap-4">
          {data.socials.github && (
            <a href={`https://github.com/${data.socials.github}`} className="opacity-80 hover:opacity-100 transition">
              <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
            </a>
          )}
          {data.socials.linkedin && (
             <a href={data.socials.linkedin} className="opacity-80 hover:opacity-100 transition">
               <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
             </a>
          )}
          {data.socials.instagram && (
             <a href={data.socials.instagram} className="opacity-80 hover:opacity-100 transition">
               <img src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
             </a>
          )}
        </div>
      </div>

      {/* Stats */}
      {(data.showStats || data.showStreaks || data.showTrophies || data.showTopLangs) && (
        <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">GitHub Stats</h3>
            <div className="flex flex-wrap gap-2 items-start">
                {data.showStats && (
                    <img src={`https://github-readme-stats.vercel.app/api?username=${data.socials.github}&show_icons=true&theme=${data.theme}`} alt="Stats" className="h-40" />
                )}
                {data.showStreaks && (
                    <img src={`https://github-readme-streak-stats.herokuapp.com/?user=${data.socials.github}&theme=${data.theme}`} alt="Streaks" className="h-40" />
                )}
                {data.showTopLangs && (
                    <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${data.socials.github}&layout=compact&theme=${data.theme}`} alt="Top Langs" className="h-40" />
                )}
            </div>
            {data.showTrophies && (
                <div className="mt-4">
                     <img src={`https://github-profile-trophy.vercel.app/?username=${data.socials.github}&theme=${data.theme.replace('dark', 'onedark')}&no-frame=true&column=3`} alt="Trophies" className="h-40" />
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;