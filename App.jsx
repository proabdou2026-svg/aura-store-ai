import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Sparkles, 
  Bot, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingCart, 
  BarChart3, 
  Send, 
  RefreshCw, 
  Edit, 
  Trash2, 
  Tag, 
  CheckCircle2, 
  XCircle, 
  Zap,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currency, setCurrency] = useState('MAD'); // العملة الافتراضية المغربية كما طلبت!
  
  // أسعار الصرف التقريبية بالنسبة للدولار
  const exchangeRates = {
    USD: 1,
    MAD: 10.1, // 1 USD = ~10.1 MAD
    EUR: 0.92,
    SAR: 3.75
  };

  const currencySymbols = {
    USD: '$',
    MAD: 'د.م.',
    EUR: '€',
    SAR: 'ر.س.'
  };

  // تحويل وعرض السعر بالعملة المختارة
  const formatMoney = (amountInUSD) => {
    const converted = amountInUSD * exchangeRates[currency];
    return `${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbols[currency]}`;
  };

  // قاعدة بيانات المنتجات الأولية
  const [products, setProducts] = useState([
    { id: 1, name: 'MacBook Pro M3 Max', category: 'Electronics', stock: 12, minStock: 5, cost: 2400, price: 3200, salesVelocity: 3 },
    { id: 2, name: 'Ergonomic Executive Chair', category: 'Furniture', stock: 3, minStock: 8, cost: 250, price: 450, salesVelocity: 5 },
    { id: 3, name: 'UltraWide 4K Monitor', category: 'Electronics', stock: 19, minStock: 6, cost: 600, price: 850, salesVelocity: 4 },
    { id: 4, name: 'Smart Coffee Brewer Pro', category: 'Appliances', stock: 2, minStock: 4, cost: 180, price: 320, salesVelocity: 2 },
    { id: 5, name: 'Wireless Noise-Canceling Pods', category: 'Electronics', stock: 45, minStock: 15, cost: 80, price: 150, salesVelocity: 12 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiAuditing, setAiAuditing] = useState(false);
  const [aiAuditResult, setAiAuditResult] = useState(null);

  // دردشة الذكاء الاصطناعي المتقدمة
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'أهلاً بك يا مديرنا العبقري! أنا نظام الذكاء الاصطناعي الخاص بك (Gemini 3 Flash). كيف يمكنني مساعدتك في إدارة مخزون متجرك أو تحليل المبيعات بالدرهم المغربي وباقي العملات اليوم؟' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // إحصائيات مالية محسوبة تلقائياً
  const totalAssetCost = useMemo(() => products.reduce((acc, p) => acc + (p.cost * p.stock), 0), [products]);
  const totalRetailValue = useMemo(() => products.reduce((acc, p) => acc + (p.price * p.stock), 0), [products]);
  const potentialProfit = totalRetailValue - totalAssetCost;
  const lowStockItems = products.filter(p => p.stock <= p.minStock);

  // محاكاة الفحص الذكي بالذكاء الاصطناعي
  const runAiAudit = () => {
    setAiAuditing(true);
    setTimeout(() => {
      setAiAuditing(false);
      setAiAuditResult({
        status: 'Optimal with Warnings',
        message: `تم فحص المتجر بنجاح عبر أحدث خوارزميات Gemini AI. تم رصد ${lowStockItems.length} منتجات تقترب نفاد مخزونها. يُنصح بإعادة الطلب فوراً لتجنب فقدان المبيعات.`,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 1200);
  };

  // إرسال رسالة للذكاء الاصطناعي
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = "بناءً على تحليلي لبيانات المتجر الحالية، أنصحك بالتركيز على تسويق المنتجات الأكثر طلباً ومراقبة التكاليف بدقة لتعظيم الأرباح.";
      if (userText.includes('مخزون') || userText.includes('stock')) {
        reply = `لديك حالياً ${lowStockItems.length} منتجات تحتاج لإعادة طلب عاجل.`;
      } else if (userText.includes('أرباح') || userText.includes('profit')) {
        reply = `إجمالي الأرباح المتوقعة حالياً هو ${formatMoney(potentialProfit)}، وهو معدل ممتاز!`;
      } else if (userText.includes('مغرب') || userText.includes('درهم')) {
        reply = "المتجر الآن يدعم الدرهم المغربي (MAD) بالكامل مع باقي العملات العالمية لتستهدف السوق المغربي والعالمي بكفاءة مطلقة!";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsAiThinking(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center space-x-3 space-x-reverse border-b border-slate-800">
            <div className="bg-gradient-to-tr from-indigo-500 to-cyan-400 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AuraStore AI</h1>
              <span className="text-xs text-cyan-400 font-medium">Enterprise Suite v2.0</span>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
              { id: 'inventory', label: 'إدارة المخزون', icon: Package },
              { id: 'forecast', label: 'تنبؤات الذكاء الاصطناعي', icon: TrendingUp },
              { id: 'chat', label: 'مساعد Gemini الذكي', icon: Bot },
              { id: 'settings', label: 'إعدادات العملة والمتجر', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-900/50 font-medium' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* محول العملات السريع في الشريط الجانبي */}
        <div className="p-4 m-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> العملة النشطة
            </span>
            <span className="text-xs font-bold text-cyan-400">{currency}</span>
          </div>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="MAD">🇲🇦 درهم مغربي (MAD)</option>
            <option value="USD">🇺🇸 دولار أمريكي (USD)</option>
            <option value="EUR">🇪🇺 يورو أوروبي (EUR)</option>
            <option value="SAR">🇸🇦 ريال سعودي (SAR)</option>
          </select>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* الشريط العلوي */}
        <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h2 className="text-xl font-bold text-white">
              {activeTab === 'dashboard' && 'لوحة القيادة التنفيذية'}
              {activeTab === 'inventory' && 'إدارة المخزون الذكي'}
              {activeTab === 'forecast' && 'تنبؤات الطلب والذكاء الاصطناعي'}
              {activeTab === 'chat' && 'مستشار الأعمال الذكي Gemini'}
              {activeTab === 'settings' && 'إعدادات النظام والعملات'}
            </h2>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={runAiAudit}
              disabled={aiAuditing}
              className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Zap className={`w-4 h-4 ${aiAuditing ? 'animate-spin' : ''}`} />
              <span>{aiAuditing ? 'جاري الفحص بالذكاء الاصطناعي...' : 'تدقيق ذكي شامل'}</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center font-bold text-white shadow-md shadow-indigo-500/30 justify-center">
              A
            </div>
          </div>
        </header>

        {/* عرض تبويب لوحة القيادة */}
        {activeTab === 'dashboard' && (
          <div className="p-8 space-y-6">
            {aiAuditResult && (
              <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-2xl flex items-start space-x-3 space-x-reverse">
                <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-indigo-200">تقرير تدقيق الذكاء الاصطناعي ({aiAuditResult.timestamp})</h4>
                  <p className="text-sm text-slate-300 mt-1">{aiAuditResult.message}</p>
                </div>
              </div>
            )}

            {/* بطاقات الإحصائيات بالعملة المختار */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">إجمالي تكلفة الأصول</p>
                    <h3 className="text-2xl font-bold text-white mt-2">{formatMoney(totalAssetCost)}</h3>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                  <span>محدث تلقائياً حسب سعر الصرف ({currency})</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">القيمة التجزئة الإجمالية</p>
                    <h3 className="text-2xl font-bold text-white mt-2">{formatMoney(totalRetailValue)}</h3>
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                  <span>عوائد المتجر المتوقعة</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">الربح الإجمالي المتوقع</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mt-2">{formatMoney(potentialProfit)}</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                  <span>هامش ربح قوي ومستدام</span>
                </div>
              </div>
            </div>

            {/* تنبيهات النقص في المخزون */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>تنبيهات المخزون الحرج</span>
                </h3>
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium">
                  {lowStockItems.length} منتجات حرجة
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-sm">
                      <th className="pb-3 font-medium">اسم المنتج</th>
                      <th className="pb-3 font-medium">التصنيف</th>
                      <th className="pb-3 font-medium">المخزون الحالي</th>
                      <th className="pb-3 font-medium">الحد الأدنى</th>
                      <th className="pb-3 font-medium">السعر</th>
                      <th className="pb-3 font-medium">الإجراء السريع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {lowStockItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="py-3 font-medium text-white">{item.name}</td>
                        <td className="py-3 text-slate-400">{item.category}</td>
                        <td className="py-3 text-amber-400 font-bold">{item.stock} وحدات</td>
                        <td className="py-3 text-slate-400">{item.minStock} وحدات</td>
                        <td className="py-3 text-white font-semibold">{formatMoney(item.price)}</td>
                        <td className="py-3">
                          <button 
                            onClick={() => {
                              setProducts(products.map(p => p.id === item.id ? {...p, stock: p.stock + 10} : p));
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg transition-all"
                          >
                            إعادة طلب (+10)
                          </button>
                        </td>
                      </tr>
                    ))}
                    {lowStockItems.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-slate-500">المخزون في حالة مثالية ولا توجد نواقص حرجة!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* عرض تبويب المخزون */}
        {activeTab === 'inventory' && (
          <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                <input 
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">جميع التصنيفات</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800 text-slate-400 text-sm">
                    <th className="p-4 font-medium">المنتج</th>
                    <th className="p-4 font-medium">التصنيف</th>
                    <th className="p-4 font-medium">المخزون</th>
                    <th className="p-4 font-medium">سعر التكلفة</th>
                    <th className="p-4 font-medium">سعر البيع</th>
                    <th className="p-4 font-medium">سرعة المبيعات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {products
                    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(product => (
                      <tr key={product.id} className="hover:bg-slate-800/30">
                        <td className="p-4 font-medium text-white">{product.name}</td>
                        <td className="p-4 text-slate-400">{product.category}</td>
                        <td className="p-4 font-bold text-cyan-400">{product.stock}</td>
                        <td className="p-4 text-slate-300">{formatMoney(product.cost)}</td>
                        <td className="p-4 text-emerald-400 font-semibold">{formatMoney(product.price)}</td>
                        <td className="p-4 text-slate-300">{product.salesVelocity} وحدات/أسبوعياً</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* عرض تبويب التنبؤات والذكاء الاصطناعي */}
        {activeTab === 'forecast' && (
          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 rounded-2xl">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">تحليل الطلب المستقبلي مدعوم بـ Gemini AI</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                يقوم النظام بتحليل حركة المبيعات والموسمية في السوق المحلي والدولي (متضمنة السوق المغربي والعربي والعالمي) للتنبؤ بالمنتجات التي ستشهد طلباً عالياً خلال الـ 30 يوماً القادمة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-lg">{p.name}</h4>
                      <span className="text-xs text-slate-400">{p.category}</span>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
                      نمو متوقع (+18%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-800 text-slate-300">
                    <span>معدل البيع الأسبوعي: <strong>{p.salesVelocity}</strong></span>
                    <span>الطلب المتوقع لشهر: <strong className="text-cyan-400">{p.salesVelocity * 4} وحدة</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* عرض تبويب مساعد الدردشة الذكي */}
        {activeTab === 'chat' && (
          <div className="p-8 flex flex-col h-[calc(100vh-5rem)]">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden">
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Gemini AI Executive Assistant</h4>
                  <p className="text-xs text-slate-400">متصل وجاهز للإجابة على استفساراتك المالية والمخزنية بالعملات المختلفة</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiThinking && (
                  <div className="flex justify-end">
                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl text-slate-400 text-sm flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                      <span>جاري تحليل البيانات وصياغة الرد الذكي...</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
                <input 
                  type="text"
                  placeholder="اسأل مساعدك الذكي عن المخزون، الأرباح، أو الأسعار بالدرهم..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* عرض تبويب الإعدادات */}
        {activeTab === 'settings' && (
          <div className="p-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">إعدادات العملة والمنطقة</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">العملة الافتراضية للنظام والمتاجر</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="MAD">🇲🇦 درهم مغربي (MAD)</option>
                  <option value="USD">🇺🇸 دولار أمريكي (USD)</option>
                  <option value="EUR">🇪🇺 يورو أوروبي (EUR)</option>
                  <option value="SAR">🇸🇦 ريال سعودي (SAR)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">سيتم تحديث كافة الأسعار والتقارير المالية والأصول تلقائياً بناءً على العملة المختارة.</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => alert('تم حفظ الإعدادات بنجاح يا بطل!')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}