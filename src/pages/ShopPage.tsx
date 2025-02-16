import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: {
    monthly: number;
    permanent: number;
  };
  category: 'vip' | 'admin' | 'character';
};

const products: Product[] = [
  {
    id: 1,
    name: 'VIP Статус',
    description: 'Получите доступ к эксклюзивным функциям и привилегиям',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 299,
      permanent: 2999
    },
    category: 'vip'
  },
  {
    id: 2,
    name: 'Админ Статус',
    description: 'Полный контроль над сервером и расширенные возможности',
    image: 'https://images.unsplash.com/photo-1614680376408-12c9ea5ebd4f?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 599,
      permanent: 5999
    },
    category: 'admin'
  },
  {
    id: 3,
    name: 'Оперативник "Фантом"',
    description: 'Элитный боец спецподразделения',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 199,
      permanent: 799
    },
    category: 'character'
  },
  {
    id: 4,
    name: 'Наемник "Призрак"',
    description: 'Тактический специалист в маскировке',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 249,
      permanent: 899
    },
    category: 'character'
  },
  {
    id: 5,
    name: 'Штурмовик "Ворон"',
    description: 'Специалист по ближнему бою',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 199,
      permanent: 799
    },
    category: 'character'
  },
  {
    id: 6,
    name: 'Разведчик "Тень"',
    description: 'Мастер скрытного проникновения',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 229,
      permanent: 849
    },
    category: 'character'
  },
  {
    id: 7,
    name: 'Медик "Ангел"',
    description: 'Специалист по поддержке команды',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 219,
      permanent: 829
    },
    category: 'character'
  },
  {
    id: 8,
    name: 'Снайпер "Сокол"',
    description: 'Эксперт дальнего боя',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=300',
    price: {
      monthly: 239,
      permanent: 879
    },
    category: 'character'
  }
];

function ShopPage() {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vip' | 'admin' | 'character'>('all');

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price.permanent - b.price.permanent;
        case 'price-desc':
          return b.price.permanent - a.price.permanent;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Магазин
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-gray-800 text-white border border-pink-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 w-full sm:w-auto"
          >
            <option value="all">Все категории</option>
            <option value="vip">VIP Статус</option>
            <option value="admin">Админ Статус</option>
            <option value="character">Модели персонажей</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 text-white border border-pink-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 w-full sm:w-auto"
          >
            <option value="price-asc">Цена (по возрастанию)</option>
            <option value="price-desc">Цена (по убыванию)</option>
            <option value="name">По названию</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-gray-800/50 rounded-lg overflow-hidden border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div className="relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 h-12">{product.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Месяц:</span>
                  <span className="font-semibold text-pink-400">{product.price.monthly} ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Навсегда:</span>
                  <span className="font-semibold text-pink-400">{product.price.permanent} ₽</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]">
                Купить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;