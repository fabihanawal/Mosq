import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Stethoscope, 
  Utensils, 
  ShieldCheck, 
  Calculator, 
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  ShoppingBag,
  ShoppingCart,
  Package,
  MapPin,
  Phone,
  User,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ onAdminClick, onHomeClick, onShopClick, cartCount }: { onAdminClick: () => void, onHomeClick: () => void, onShopClick: () => void, cartCount: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <div className="bg-primary p-2 rounded-lg mr-2">
              <Heart className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">মসজিদ উন্নয়ন মডেল</span>
            <span className="text-xl font-bold text-primary sm:hidden">মসজিদ মডেল</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-slate-600 hover:text-primary transition-colors">সেবাসমূহ</a>
            <button onClick={onShopClick} className="text-slate-600 hover:text-primary transition-colors">শপ (পণ্য)</button>
            <a href="#transparency" className="text-slate-600 hover:text-primary transition-colors">স্বচ্ছতা</a>
            <a href="#calculator" className="text-slate-600 hover:text-primary transition-colors">যাকাত ক্যালকুলেটর</a>
            <button 
              onClick={onAdminClick}
              className="flex items-center text-slate-600 hover:text-primary transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              এডমিন
            </button>
            <div className="relative cursor-pointer" onClick={onShopClick}>
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <a href="#donate" className="btn-primary">দান করুন</a>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <div className="relative cursor-pointer" onClick={onShopClick}>
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600">সেবাসমূহ</a>
              <button onClick={() => { onShopClick(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-slate-600">শপ (পণ্য)</button>
              <a href="#transparency" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600">স্বচ্ছতা</a>
              <a href="#calculator" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600">যাকাত ক্যালকুলেটর</a>
              <button 
                onClick={() => { onAdminClick(); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 text-slate-600"
              >
                এডমিন প্যানেল
              </button>
              <a href="#donate" onClick={() => setIsOpen(false)} className="block px-3 py-2 bg-primary text-white rounded-lg text-center">দান করুন</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSlider = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
        const response = await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Slides`);
        const result = await response.json();
        const fetchedSlides = Array.isArray(result) ? result : [];
        
        if (fetchedSlides.length > 0) {
          setSlides(fetchedSlides);
        } else {
          // Fallback to default slides if none found in DB
          setSlides([
            {
              title: "মসজিদ ভিত্তিক অর্থনৈতিক উন্নয়ন",
              desc: "যাকাত ও সদকার সঠিক ব্যবহারের মাধ্যমে একটি স্বনির্ভর সমাজ গঠন আমাদের লক্ষ্য।",
              img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop"
            },
            {
              title: "শিক্ষায় সহায়তা",
              desc: "দরিদ্র মেধাবী শিক্ষার্থীদের উচ্চশিক্ষার পথ সুগম করতে আমরা কাজ করছি।",
              img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            },
            {
              title: "স্বাস্থ্য সেবা সবার জন্য",
              desc: "অসহায় মানুষের চিকিৎসা সেবায় মসজিদ মডেলের বিশেষ তহবিল।",
              img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
            }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (loading) return <div className="h-[600px] w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">লোড হচ্ছে...</div>;

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="max-w-4xl px-4 text-center text-white">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 text-slate-200"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href="#donate" className="btn-primary text-lg px-8 py-3">এখনই অংশ নিন</a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={cn("w-3 h-3 rounded-full transition-all", i === current ? "bg-white w-8" : "bg-white/50")}
          />
        ))}
      </div>
    </div>
  );
};

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    business: 0,
    other: 0
  });

  const total = Object.values(assets).reduce((a: number, b: number) => a + b, 0) as number;
  const zakat = total * 0.025;

  return (
    <section id="calculator" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">যাকাত ক্যালকুলেটর</h2>
          <p className="text-slate-600">আপনার বাৎসরিক যাকাতের পরিমাণ সহজেই হিসাব করুন (২.৫%)।</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">নগদ টাকা (ব্যাংক ও হাতে)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="৳ ০.০০"
                onChange={(e) => setAssets({...assets, cash: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">স্বর্ণের মূল্য</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="৳ ০.০০"
                onChange={(e) => setAssets({...assets, gold: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">রুপার মূল্য</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="৳ ০.০০"
                onChange={(e) => setAssets({...assets, silver: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">ব্যবসায়িক পণ্য/পুঁজি</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="৳ ০.০০"
                onChange={(e) => setAssets({...assets, business: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">মোট সম্পদ:</span>
              <span className="text-2xl font-bold text-slate-900">৳ {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-primary/20">
              <span className="text-xl font-bold text-primary">প্রদেয় যাকাত:</span>
              <span className="text-3xl font-bold text-primary">৳ {zakat.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DonationForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    type: 'General'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
      if (!apiId) throw new Error("API ID missing");

      const response = await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            ...formData,
            date: new Date().toLocaleString()
          }]
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', amount: '', type: 'General' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="donate" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">আপনার দান সমাজ পরিবর্তনের হাতিয়ার</h2>
          <p className="text-lg text-slate-600 mb-8">
            মসজিদ মডেলের মাধ্যমে আপনার যাকাত ও সদকা সরাসরি পৌঁছাবে প্রকৃত অভাবী মানুষের কাছে। আমরা প্রতিটি পয়সার হিসাব রাখি এবং স্বচ্ছতা বজায় রাখি।
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-lg mr-4">
                <CheckCircle2 className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">১০০% স্বচ্ছতা</h4>
                <p className="text-slate-500">প্রতিটি লেনদেনের অডিট রিপোর্ট অনলাইনে পাওয়া যায়।</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-lg mr-4">
                <CheckCircle2 className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">সরাসরি সহায়তা</h4>
                <p className="text-slate-500">মাঝারি কোনো খরচ ছাড়াই সরাসরি উপকারভোগীর কাছে সাহায্য পৌঁছায়।</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-2xl font-bold mb-6">দান করুন</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">আপনার নাম</label>
              <input 
                required
                className="input-field" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ফোন নম্বর</label>
              <input 
                required
                className="input-field" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">পরিমাণ (৳)</label>
                <input 
                  required
                  type="number"
                  className="input-field" 
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">দানের ধরণ</label>
                <select 
                  className="input-field"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="General">সাধারণ দান</option>
                  <option value="Zakat">যাকাত</option>
                  <option value="Sadaqah">সদকা</option>
                  <option value="Project">বিশেষ প্রকল্প</option>
                </select>
              </div>
            </div>
            <button 
              disabled={status === 'loading'}
              className="w-full btn-primary py-4 text-lg mt-4 flex justify-center items-center"
            >
              {status === 'loading' ? 'প্রসেসিং...' : 'দান সম্পন্ন করুন'}
            </button>
            
            {status === 'success' && (
              <p className="text-green-600 text-center font-medium mt-2">আপনার দান সফলভাবে গৃহীত হয়েছে। ধন্যবাদ!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center font-medium mt-2">দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const HelpForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Education',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
      const response = await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=HelpRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            ...formData,
            date: new Date().toLocaleString()
          }]
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', projectType: 'Education', description: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="help" className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">সহায়তার জন্য আবেদন</h2>
          <p className="text-slate-400">আপনার যদি শিক্ষা, চিকিৎসা বা খাদ্যের জন্য সহায়তার প্রয়োজন হয়, তবে নিচের ফর্মটি পূরণ করুন।</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">আবেদনকারীর নাম</label>
              <input 
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ফোন নম্বর</label>
              <input 
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">সহায়তার ধরণ</label>
            <select 
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              value={formData.projectType}
              onChange={e => setFormData({...formData, projectType: e.target.value})}
            >
              <option value="Education" className="text-black">শিক্ষা সহায়তা</option>
              <option value="Health" className="text-black">চিকিৎসা সহায়তা</option>
              <option value="Food" className="text-black">খাদ্য সহায়তা</option>
              <option value="Business" className="text-black">ক্ষুদ্র ব্যবসা পুঁজি</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">বিস্তারিত বর্ণনা</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <button 
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-bold text-lg transition-all"
          >
            {status === 'loading' ? 'আবেদন পাঠানো হচ্ছে...' : 'আবেদন জমা দিন'}
          </button>
          {status === 'success' && (
            <p className="text-emerald-400 text-center font-medium">আপনার আবেদন জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।</p>
          )}
        </form>
      </div>
    </section>
  );
};

const ShoppingSection = ({ onAddToCart }: { onAddToCart: (product: any) => void }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
        const response = await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Products`);
        const result = await response.json();
        const fetchedProducts = Array.isArray(result) ? result : [];
        
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          // Fallback products
          setProducts([
            { id: '1', name: 'খাঁটি মধু (৫০০ গ্রাম)', price: 450, description: 'সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু।', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1974&auto=format&fit=crop', category: 'খাদ্য' },
            { id: '2', name: 'জৈব সরিষার তেল (১ লিটার)', price: 220, description: 'ঘানি ভাঙা খাঁটি সরিষার তেল। স্বাস্থ্যসম্মত ও পুষ্টিকর।', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2036&auto=format&fit=crop', category: 'খাদ্য' },
            { id: '3', name: 'ইসলামিক ক্যালিগ্রাফি ফ্রেম', price: 1200, description: 'হাতে তৈরি সুন্দর ক্যালিগ্রাফি ফ্রেম। ঘর সাজানোর জন্য চমৎকার।', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop', category: 'ঘর সাজানো' },
            { id: '4', name: 'উন্নত মানের জায়নামাজ', price: 850, description: 'আরামদায়ক ও টেকসই তুর্কি জায়নামাজ।', img: 'https://images.unsplash.com/photo-1590076175582-40940b43f021?q=80&w=2070&auto=format&fit=crop', category: 'অন্যান্য' },
            { id: '5', name: 'কালিজিরা তেল (১০০ মিলি)', price: 180, description: 'মৃত্যু ব্যতীত সকল রোগের মহৌষধ খাঁটি কালিজিরা তেল।', img: 'https://images.unsplash.com/photo-1612231223165-4b0507941c3c?q=80&w=2070&auto=format&fit=crop', category: 'খাদ্য' },
            { id: '6', name: 'তসবিহ (আকিক পাথর)', price: 350, description: 'আকিক পাথরের তৈরি সুন্দর তসবিহ।', img: 'https://images.unsplash.com/photo-1590076175582-40940b43f021?q=80&w=2070&auto=format&fit=crop', category: 'অন্যান্য' }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['সব', 'খাদ্য', 'ঘর সাজানো', 'বই', 'পোশাক', 'অন্যান্য'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'সব' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="shop" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">ইসলামিক পণ্য ও সমৃদ্ধি শপ</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            আপনার প্রয়োজনীয় পণ্য কিনুন এবং মসজিদ মডেলের আর্থ-সামাজিক উন্নয়নে ভূমিকা রাখুন। প্রতিটি বিক্রয়ের লভ্যাংশ মসজিদ তহবিলে জমা হয়।
          </p>
        </div>

        <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              className="input-field pl-12"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === cat 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">৳ {product.price}</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CartModal = ({ cart, isOpen, onClose, onRemove, onUpdateQuantity, onCheckout }: { cart: any[], isOpen: boolean, onClose: () => void, onRemove: (id: string) => void, onUpdateQuantity: (id: string, q: number) => void, onCheckout: (details: any) => void }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [details, setDetails] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onCheckout(details);
    setIsSubmitting(false);
    setStep('cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-2 text-primary" />
            {step === 'cart' ? 'আপনার শপিং কার্ট' : 'অর্ডার সম্পন্ন করুন'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' ? (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500">আপনার কার্ট খালি।</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 border-b border-slate-50 pb-6">
                      <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-primary font-bold">৳ {item.price}</p>
                      </div>
                      <div className="flex items-center space-x-3 bg-slate-100 rounded-lg p-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1 text-primary" /> নাম
                  </label>
                  <input 
                    required
                    className="input-field"
                    value={details.name}
                    onChange={e => setDetails({...details, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-primary" /> ফোন নম্বর
                  </label>
                  <input 
                    required
                    className="input-field"
                    value={details.phone}
                    onChange={e => setDetails({...details, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-primary" /> ঠিকানা
                </label>
                <textarea 
                  required
                  rows={3}
                  className="input-field"
                  value={details.address}
                  onChange={e => setDetails({...details, address: e.target.value})}
                />
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h5 className="font-bold mb-4">অর্ডার সামারি</h5>
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>৳ {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between font-bold text-lg">
                  <span>মোট:</span>
                  <span className="text-primary">৳ {total}</span>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="text-lg font-bold">
            মোট: <span className="text-primary">৳ {total}</span>
          </div>
          <div className="space-x-4">
            {step === 'cart' ? (
              <button 
                disabled={cart.length === 0}
                onClick={() => setStep('checkout')}
                className="btn-primary"
              >
                অর্ডার করুন
              </button>
            ) : (
              <>
                <button onClick={() => setStep('cart')} className="text-slate-600 font-medium">পিছনে যান</button>
                <button 
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'অর্ডার পাঠানো হচ্ছে...' : 'কনফার্ম করুন'}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "শিক্ষা সহায়তা",
      desc: "দরিদ্র শিক্ষার্থীদের বই, খাতা এবং টিউশন ফি প্রদান করা হয়।"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "চিকিৎসা সেবা",
      desc: "জরুরি অপারেশন এবং ঔষধ ক্রয়ে আর্থিক সহায়তা প্রদান।"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "খাদ্য ব্যাংক",
      desc: "অসহায় ও বিধবা পরিবারগুলোর জন্য মাসিক রেশন ব্যবস্থা।"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "ক্ষুদ্র উদ্যোক্তা",
      desc: "সুদমুক্ত ঋণের মাধ্যমে বেকার যুবকদের কর্মসংস্থান সৃষ্টি।"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">আমাদের সেবাসমূহ</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">মসজিদ ভিত্তিক এই মডেলের মাধ্যমে আমরা সমাজের প্রতিটি স্তরে ইতিবাচক পরিবর্তন আনতে বদ্ধপরিকর।</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-primary mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Transparency = () => {
  return (
    <section id="transparency" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-6">স্বচ্ছতা ও অডিট</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
          আমরা বিশ্বাস করি স্বচ্ছতাই আস্থার মূল ভিত্তি। আমাদের প্রতিটি আয়ের উৎস এবং ব্যয়ের খাত জনসাধারণের জন্য উন্মুক্ত। প্রতি মাসে একজন পেশাদার অডিটর দ্বারা আমাদের হিসাব যাচাই করা হয়।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h4 className="text-3xl font-bold text-primary mb-2">১০০%</h4>
            <p className="text-slate-500">সরাসরি বিতরণ</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h4 className="text-3xl font-bold text-primary mb-2">০%</h4>
            <p className="text-slate-500">প্রশাসনিক খরচ (দান থেকে)</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h4 className="text-3xl font-bold text-primary mb-2">২৪/৭</h4>
            <p className="text-slate-500">অনলাইন রিপোর্ট এক্সেস</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center text-white mb-6">
            <Heart className="text-primary w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">মসজিদ উন্নয়ন মডেল</span>
          </div>
          <p className="max-w-md">
            একটি সামাজিক উদ্যোগ যা মসজিদকে কেন্দ্র করে অর্থনৈতিক মুক্তি ও সামাজিক সাম্য প্রতিষ্ঠার লক্ষ্যে কাজ করে।
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">লিঙ্ক</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-primary transition-colors">হোম</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">সেবাসমূহ</a></li>
            <li><a href="#transparency" className="hover:text-primary transition-colors">স্বচ্ছতা</a></li>
            <li><a href="#donate" className="hover:text-primary transition-colors">দান করুন</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">যোগাযোগ</h4>
          <p>ঢাকা, বাংলাদেশ</p>
          <p>ইমেইল: info@mosquemodel.org</p>
          <p>ফোন: +৮৮০ ১২৩৪ ৫৬৭৮৯০</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-sm">
        &copy; {new Date().getFullYear()} মসজিদ ভিত্তিক অর্থনৈতিক উন্নয়ন মডেল। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
};

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      onLogin();
    } else {
      setError('ভুল ইউজারনেম বা পাসওয়ার্ড');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200"
      >
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">এডমিন লগইন</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">ইউজারনেম</label>
            <input 
              className="input-field"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
            <input 
              type="password"
              className="input-field"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full btn-primary py-3">লগইন করুন</button>
        </form>
      </motion.div>
    </div>
  );
};

const OrderDetailsModal = ({ order, isOpen, onClose, onUpdateStatus }: { order: any, isOpen: boolean, onClose: () => void, onUpdateStatus: (id: string, status: string) => void }) => {
  if (!isOpen || !order) return null;
  const items = JSON.parse(order.items || '[]');

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-2xl font-bold flex items-center">
            <Package className="mr-2 text-primary" />
            অর্ডার ডিটেইলস
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">গ্রাহকের তথ্য</h4>
              <div className="space-y-2">
                <p className="flex items-center text-lg font-bold"><User className="w-4 h-4 mr-2 text-primary" /> {order.customerName}</p>
                <p className="flex items-center text-slate-600"><Phone className="w-4 h-4 mr-2 text-primary" /> {order.customerPhone}</p>
                <p className="flex items-start text-slate-600"><MapPin className="w-4 h-4 mr-2 mt-1 text-primary" /> {order.customerAddress}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">অর্ডার তথ্য</h4>
              <div className="space-y-2">
                <p className="text-slate-600">আইডি: <span className="font-mono font-bold">#{order.id}</span></p>
                <p className="text-slate-600">তারিখ: <span className="font-bold">{order.date}</span></p>
                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">স্ট্যাটাস পরিবর্তন করুন</label>
                  <select 
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className={cn(
                      "w-full px-4 py-2 rounded-xl border-2 font-bold transition-all outline-none",
                      order.status === 'Pending' ? "border-amber-200 bg-amber-50 text-amber-700" :
                      order.status === 'Processing' ? "border-blue-200 bg-blue-50 text-blue-700" :
                      order.status === 'Shipped' ? "border-indigo-200 bg-indigo-50 text-indigo-700" :
                      order.status === 'Delivered' ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                      "border-red-200 bg-red-50 text-red-700"
                    )}
                  >
                    <option value="Pending">পেন্ডিং</option>
                    <option value="Processing">প্রসেসিং</option>
                    <option value="Shipped">পাঠানো হয়েছে</option>
                    <option value="Delivered">ডেলিভারি সম্পন্ন</option>
                    <option value="Cancelled">বাতিল</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">অর্ডার আইটেম</h4>
            <div className="space-y-4">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-slate-500">৳ {item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-primary">৳ {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
              <span className="text-lg font-bold">সর্বমোট:</span>
              <span className="text-2xl font-bold text-primary">৳ {order.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold transition-colors">
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [donations, setDonations] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'slides' | 'products' | 'orders'>('stats');
  const [slideForm, setSlideForm] = useState({ title: '', desc: '', img: '', id: '' });
  const [productForm, setProductForm] = useState({ name: '', price: '', desc: '', img: '', category: 'খাদ্য', id: '' });
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
      
      // Fetch all sheets in parallel
      const [donationsRes, helpRes, slidesRes, productsRes, ordersRes] = await Promise.all([
        fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Donations`),
        fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=HelpRequests`),
        fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Slides`),
        fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Products`),
        fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Orders`)
      ]);

      const [donationsData, helpData, slidesData, productsData, ordersData] = await Promise.all([
        donationsRes.json(),
        helpRes.json(),
        slidesRes.json(),
        productsRes.json(),
        ordersRes.json()
      ]);

      setDonations(Array.isArray(donationsData) ? donationsData : []);
      setHelpRequests(Array.isArray(helpData) ? helpData : []);
      setSlides(Array.isArray(slidesData) ? slidesData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
    
    try {
      if (isEditingSlide) {
        await fetch(`https://sheetdb.io/api/v1/${apiId}/id/${slideForm.id}?sheet=Slides`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              title: slideForm.title,
              desc: slideForm.desc,
              img: slideForm.img
            }
          })
        });
      } else {
        const newId = Date.now().toString();
        await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Slides`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{
              ...slideForm,
              id: newId,
              date: new Date().toLocaleString()
            }]
          })
        });
      }
      setSlideForm({ title: '', desc: '', img: '', id: '' });
      setIsEditingSlide(false);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
    
    try {
      if (isEditingProduct) {
        await fetch(`https://sheetdb.io/api/v1/${apiId}/id/${productForm.id}?sheet=Products`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              name: productForm.name,
              price: productForm.price,
              description: productForm.desc,
              img: productForm.img,
              category: productForm.category
            }
          })
        });
      } else {
        const newId = 'prod_' + Date.now().toString();
        await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{
              ...productForm,
              id: newId,
              date: new Date().toLocaleString()
            }]
          })
        });
      }
      setProductForm({ name: '', price: '', desc: '', img: '', category: 'খাদ্য', id: '' });
      setIsEditingProduct(false);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    setLoading(true);
    const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
    try {
      await fetch(`https://sheetdb.io/api/v1/${apiId}/id/${id}?sheet=Orders`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { status } })
      });
      await fetchData();
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, type: string) => {
    if (!confirm(`আপনি কি নিশ্চিত যে এই ${type}টি ডিলিট করতে চান?`)) return;
    setLoading(true);
    const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
    
    let sheet = 'Donations';
    if (type === 'স্লাইড') sheet = 'Slides';
    if (type === 'পণ্য') sheet = 'Products';
    if (type === 'অর্ডার') sheet = 'Orders';
    if (type === 'আবেদন') sheet = 'HelpRequests';

    try {
      await fetch(`https://sheetdb.io/api/v1/${apiId}/id/${id}?sheet=${sheet}`, {
        method: 'DELETE'
      });
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editSlide = (slide: any) => {
    setSlideForm({ title: slide.title, desc: slide.desc, img: slide.img, id: slide.id });
    setIsEditingSlide(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editProduct = (prod: any) => {
    setProductForm({ name: prod.name, price: prod.price, desc: prod.description, img: prod.img, category: prod.category, id: prod.id });
    setIsEditingProduct(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalDonation = donations.reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
  const totalSales = orders.filter((o: any) => o.status !== 'Cancelled').reduce((sum: number, item: any) => sum + Number(item.totalAmount || 0), 0);
  
  const barData = {
    labels: ['যাকাত', 'সদকা', 'সাধারণ', 'প্রকল্প'],
    datasets: [
      {
        label: 'দানের পরিমাণ (৳)',
        data: [
          donations.filter((d: any) => d.type === 'Zakat').reduce((s: number, i: any) => s + Number(i.amount), 0),
          donations.filter((d: any) => d.type === 'Sadaqah').reduce((s: number, i: any) => s + Number(i.amount), 0),
          donations.filter((d: any) => d.type === 'General').reduce((s: number, i: any) => s + Number(i.amount), 0),
          donations.filter((d: any) => d.type === 'Project').reduce((s: number, i: any) => s + Number(i.amount), 0),
        ],
        backgroundColor: '#065f46',
      },
    ],
  };

  const pieData = {
    labels: ['শিক্ষা', 'চিকিৎসা', 'খাদ্য', 'ব্যবসা'],
    datasets: [
      {
        data: [
          helpRequests.filter((h: any) => h.projectType === 'Education').length,
          helpRequests.filter((h: any) => h.projectType === 'Health').length,
          helpRequests.filter((h: any) => h.projectType === 'Food').length,
          helpRequests.filter((h: any) => h.projectType === 'Business').length,
        ],
        backgroundColor: ['#065f46', '#047857', '#f59e0b', '#1e293b'],
      },
    ],
  };

  const orderStatusData = {
    labels: ['পেন্ডিং', 'প্রসেসিং', 'শিপড', 'ডেলিভারড', 'বাতিল'],
    datasets: [
      {
        data: [
          orders.filter((o: any) => o.status === 'Pending').length,
          orders.filter((o: any) => o.status === 'Processing').length,
          orders.filter((o: any) => o.status === 'Shipped').length,
          orders.filter((o: any) => o.status === 'Delivered').length,
          orders.filter((o: any) => o.status === 'Cancelled').length,
        ],
        backgroundColor: ['#f59e0b', '#3b82f6', '#6366f1', '#10b981', '#ef4444'],
      },
    ],
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutDashboard className="mr-3 text-primary" />
            এডমিন ড্যাশবোর্ড
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setActiveTab('stats')}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all", activeTab === 'stats' ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-200")}
            >
              পরিসংখ্যান
            </button>
            <button 
              onClick={() => setActiveTab('slides')}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all", activeTab === 'slides' ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-200")}
            >
              স্লাইডার
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all", activeTab === 'products' ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-200")}
            >
              পণ্য (Shop)
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all", activeTab === 'orders' ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-200")}
            >
              অর্ডারসমূহ
            </button>
            <button onClick={onLogout} className="text-slate-600 hover:text-red-500 flex items-center ml-2">
              <X className="mr-1 w-4 h-4" /> লগআউট
            </button>
          </div>
        </div>

        {activeTab === 'stats' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <DollarSign className="text-emerald-700" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm">মোট সংগ্রহ (দান)</p>
                <h3 className="text-2xl font-bold">৳ {totalDonation.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <ShoppingBag className="text-blue-700" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm">মোট বিক্রয় (শপ)</p>
                <h3 className="text-2xl font-bold">৳ {totalSales.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-xl">
                    <Users className="text-amber-700" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm">আবেদনকারী</p>
                <h3 className="text-2xl font-bold">{helpRequests.length} জন</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-slate-100 p-3 rounded-xl">
                    <Package className="text-slate-700" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm">মোট অর্ডার</p>
                <h3 className="text-2xl font-bold">{orders.length} টি</h3>
              </div>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 lg:col-span-2">
            <h4 className="text-lg font-bold mb-6">দানের পরিসংখ্যান</h4>
            <Bar data={barData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold mb-6">অর্ডারের অবস্থা</h4>
            <div className="max-w-[250px] mx-auto">
              <Pie data={orderStatusData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold mb-6">সহায়তার ধরণ (আবেদন)</h4>
            <div className="max-w-[300px] mx-auto">
              <Pie data={pieData} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <h4 className="text-lg font-bold mb-6">সাম্প্রতিক অর্ডার</h4>
            <div className="space-y-4">
              {(orders || []).slice(-5).reverse().map((order, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-bold text-sm">{order.customerName}</div>
                    <div className="text-xs text-slate-500">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary text-sm">৳ {order.totalAmount}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">{order.status}</div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-center text-slate-400 py-10">কোনো অর্ডার নেই</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h4 className="text-lg font-bold">সাম্প্রতিক লেনদেন</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-sm">
                <tr>
                  <th className="px-6 py-4">নাম</th>
                  <th className="px-6 py-4">ধরণ</th>
                  <th className="px-6 py-4">পরিমাণ/বিবরণ</th>
                  <th className="px-6 py-4">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ...donations.map(d => ({ ...d, formType: 'Donation' })),
                  ...helpRequests.map(h => ({ ...h, formType: 'HelpRequest' }))
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-bold",
                        item.formType === 'Donation' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {item.formType === 'Donation' ? 'দান' : 'আবেদন'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.formType === 'Donation' ? `৳ ${item.amount}` : item.projectType}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {activeTab === 'slides' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                {isEditingSlide ? <Edit className="mr-2 text-primary" /> : <Plus className="mr-2 text-primary" />}
                {isEditingSlide ? 'স্লাইড এডিট করুন' : 'নতুন স্লাইড যোগ করুন'}
              </h3>
              <form onSubmit={handleSlideSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">স্লাইড শিরোনাম</label>
                  <input 
                    required
                    className="input-field"
                    value={slideForm.title}
                    onChange={e => setSlideForm({...slideForm, title: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">স্লাইড বর্ণনা</label>
                  <textarea 
                    required
                    rows={3}
                    className="input-field"
                    value={slideForm.desc}
                    onChange={e => setSlideForm({...slideForm, desc: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">ইমেজ ইউআরএল (Image URL)</label>
                  <div className="flex space-x-2">
                    <input 
                      required
                      className="input-field"
                      placeholder="https://example.com/image.jpg"
                      value={slideForm.img}
                      onChange={e => setSlideForm({...slideForm, img: e.target.value})}
                    />
                    {slideForm.img && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={slideForm.img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                  {isEditingSlide && (
                    <button 
                      type="button"
                      onClick={() => { setIsEditingSlide(false); setSlideForm({ title: '', desc: '', img: '', id: '' }); }}
                      className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      বাতিল
                    </button>
                  )}
                  <button type="submit" className="btn-primary">
                    {isEditingSlide ? 'আপডেট করুন' : 'স্লাইড সেভ করুন'}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={slide.img} alt={slide.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button 
                        onClick={() => editSlide(slide)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteItem(slide.id, 'স্লাইড')}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold mb-2 line-clamp-1">{slide.title}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2">{slide.desc}</p>
                  </div>
                </div>
              ))}
              {slides.length === 0 && (
                <div className="md:col-span-3 py-20 text-center text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>কোনো স্লাইড পাওয়া যায়নি। নতুন স্লাইড যোগ করুন।</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                {isEditingProduct ? <Edit className="mr-2 text-primary" /> : <Plus className="mr-2 text-primary" />}
                {isEditingProduct ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}
              </h3>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">পণ্যের নাম</label>
                  <input 
                    required
                    className="input-field"
                    value={productForm.name}
                    onChange={e => setProductForm({...productForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">মূল্য (৳)</label>
                  <input 
                    required
                    type="number"
                    className="input-field"
                    value={productForm.price}
                    onChange={e => setProductForm({...productForm, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ক্যাটাগরি</label>
                  <select 
                    className="input-field"
                    value={productForm.category}
                    onChange={e => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="খাদ্য">খাদ্য</option>
                    <option value="ঘর সাজানো">ঘর সাজানো</option>
                    <option value="বই">বই</option>
                    <option value="পোশাক">পোশাক</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ইমেজ ইউআরএল</label>
                  <input 
                    required
                    className="input-field"
                    value={productForm.img}
                    onChange={e => setProductForm({...productForm, img: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">পণ্যের বর্ণনা</label>
                  <textarea 
                    required
                    rows={3}
                    className="input-field"
                    value={productForm.desc}
                    onChange={e => setProductForm({...productForm, desc: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                  {isEditingProduct && (
                    <button 
                      type="button"
                      onClick={() => { setIsEditingProduct(false); setProductForm({ name: '', price: '', desc: '', img: '', category: 'খাদ্য', id: '' }); }}
                      className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      বাতিল
                    </button>
                  )}
                  <button type="submit" className="btn-primary">
                    {isEditingProduct ? 'আপডেট করুন' : 'পণ্য সেভ করুন'}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button onClick={() => editProduct(prod)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-primary hover:bg-primary hover:text-white transition-all shadow-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteItem(prod.id, 'পণ্য')} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold line-clamp-1">{prod.name}</h4>
                      <span className="text-primary font-bold">৳ {prod.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-2">{prod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-lg font-bold">অর্ডার তালিকা</h4>
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">মোট {orders.length} টি অর্ডার</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4">অর্ডার আইডি</th>
                    <th className="px-6 py-4">গ্রাহক</th>
                    <th className="px-6 py-4">পণ্যসমূহ</th>
                    <th className="px-6 py-4">মোট মূল্য</th>
                    <th className="px-6 py-4">স্ট্যাটাস</th>
                    <th className="px-6 py-4">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(orders || []).slice().reverse().map((order, i) => {
                    const items = JSON.parse(order.items || '[]');
                    return (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-slate-400">#{order.id?.slice(-6) || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-xs text-slate-500">{order.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {items.map((it: any, idx: number) => (
                              <div key={idx}>{it.name} x {it.quantity}</div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary">৳ {order.totalAmount}</td>
                        <td className="px-6 py-4">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={cn(
                              "text-xs font-bold px-2 py-1 rounded-full border-none outline-none cursor-pointer",
                              order.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                              order.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                              order.status === 'Shipped' ? "bg-indigo-100 text-indigo-700" :
                              order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" :
                              "bg-red-100 text-red-700"
                            )}
                          >
                            <option value="Pending">পেন্ডিং</option>
                            <option value="Processing">প্রসেসিং</option>
                            <option value="Shipped">পাঠানো হয়েছে</option>
                            <option value="Delivered">ডেলিভারি সম্পন্ন</option>
                            <option value="Cancelled">বাতিল</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="p-2 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-all"
                              title="বিস্তারিত দেখুন"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteItem(order.id, 'অর্ডার')} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="py-20 text-center text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>এখনো কোনো অর্ডার আসেনি।</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <OrderDetailsModal 
          order={selectedOrder} 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdateStatus={updateOrderStatus}
        />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'admin-login' | 'admin-dashboard'>('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, q: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const handleCheckout = async (details: any) => {
    const apiId = (import.meta as any).env.VITE_SHEETDB_API_ID || 'qfsnyep962u9j';
    const orderId = 'ord_' + Date.now().toString();
    const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    try {
      await fetch(`https://sheetdb.io/api/v1/${apiId}?sheet=Orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            id: orderId,
            customerName: details.name,
            customerPhone: details.phone,
            customerAddress: details.address,
            items: JSON.stringify(cart),
            totalAmount: total,
            status: 'Pending',
            date: new Date().toLocaleString()
          }]
        })
      });
      setCart([]);
      alert('আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
    } catch (err) {
      console.error(err);
      alert('দুঃখিত, অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।');
    }
  };

  const handleAdminClick = () => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setView('admin-dashboard');
    } else {
      setView('admin-login');
    }
  };

  const handleLogin = () => {
    localStorage.setItem('isAdmin', 'true');
    setView('admin-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setView('home');
  };

  const handleHomeClick = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = () => {
    setView('home');
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (view === 'admin-login') return <AdminLogin onLogin={handleLogin} />;
  if (view === 'admin-dashboard') return <AdminDashboard onLogout={handleLogout} />;

  return (
    <div className="min-h-screen font-sans">
      <Navbar 
        onAdminClick={handleAdminClick} 
        onHomeClick={handleHomeClick} 
        onShopClick={handleShopClick}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />
      <main className="pt-16">
        <HeroSlider />
        <Services />
        <ShoppingSection onAddToCart={handleAddToCart} />
        <ZakatCalculator />
        <DonationForm />
        <HelpForm />
        <Transparency />
      </main>
      <Footer />
      <CartModal 
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
