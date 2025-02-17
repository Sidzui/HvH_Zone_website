import React from 'react';
import { Link } from 'react-router-dom';

const cases = [
  {
    id: 'spring',
    name: 'Spring Case',
    image: '/img/vip.png',
    price: 299
  },
  {
    id: 'winter',
    name: 'Winter Case',
    image: '/img/vip.png',
    price: 399
  },
  {
    id: 'neverlose',
    name: 'Neverlose Case',
    image: '/img/vip.png',
    price: 499
  },
  {
    id: 'skeet',
    name: 'Skeet.cc Case',
    image: '/img/vip.png',
    price: 599
  }
];

function CasesPage() {
  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Кейсы
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cases.map((case_) => (
          <Link
            key={case_.id}
            to={`/cases/${case_.id}`}
            className="bg-gray-800/50 rounded-lg overflow-hidden border border-pink-500/20 hover:border-pink-500/40 transition-all hover:transform hover:scale-105"
          >
            <img src={case_.image} alt={case_.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{case_.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Цена:</span>
                <span className="font-semibold text-pink-400">{case_.price} ₽</span>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                Открыть кейс
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CasesPage;
