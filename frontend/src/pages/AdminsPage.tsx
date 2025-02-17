import React from 'react';
import { Disc as Discord } from 'lucide-react';

const admins = [
  {
    name: 'xxxa',
    role: 'Creator',
    discord: 'toro6666',
    image: '/img/vip.png'
  },
  {
    name: 'beautiful life',
    role: 'Head Administrator',
    discord: 'yyoungfacee',
    image: '/img/vip.png'
  }
];

function AdminsPage() {
  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Администрация
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div key={admin.name} className="bg-gray-800/50 rounded-lg overflow-hidden border border-pink-500/20 hover:border-pink-500/40 transition-colors">
            <img src={admin.image} alt={admin.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{admin.name}</h3>
              <p className="text-pink-400 mb-3">{admin.role}</p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Discord size={16} />
                <span>{admin.discord}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminsPage;
