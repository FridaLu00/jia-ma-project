import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

const heroSlides = [
  {
    image: '/images/hero-caiyuan.jpg',
    title: '财源滚滚',
    subtitle: '招财进宝 · 富贵吉祥',
  },
  {
    image: '/images/hero-pingan.jpg',
    title: '平安祈福',
    subtitle: '神明护佑 · 家宅安宁',
  },
  {
    image: '/images/hero-fengshou.jpg',
    title: '丰收祭祀',
    subtitle: '五谷丰登 · 感恩天地',
  },
];

const aigcSteps = [
  {
    image: '/images/aigc-step1.jpg',
    title: '上传照片',
    description: '选择您喜欢的照片，支持JPG、PNG、WEBP格式',
  },
  {
    image: '/images/aigc-step2.jpg',
    title: '选择风格',
    description: '传统手绘、现代潮流、极简线条三种风格任选',
  },
  {
    image: '/images/aigc-step3.jpg',
    title: '生成作品',
    description: 'AI智能转换，瞬间生成专属甲马艺术作品',
  },
];

const communityHot = [
  { id: 1, title: '甲马与时尚品牌的跨界联名，传统非遗焕发新生', hot: 2341 },
  { id: 2, title: '新手入门：如何选择适合自己的甲马风格？', hot: 1856 },
  { id: 3, title: '分享我的第一幅AI生成甲马作品，求点评', hot: 1523 },
  { id: 4, title: '云南大理甲马非遗传承人访谈实录', hot: 1289 },
  { id: 5, title: '甲马NFT数字藏品投资心得与风险提示', hot: 967 },
  { id: 6, title: '传统刻板技艺与现代数字技术的碰撞', hot: 845 },
];

const events = [
  { id: 1, image: '/images/event-1.jpg', title: '稀物集 x 非遗甲马', date: '2024.03.15-04.15', description: '展示云南各地区传统甲马艺术精品，包括木刻板和成品，让观众感受千年非遗魅力。' },
  { id: 2, image: '/images/event-2.jpg', title: '响盆云南下饭菜 x 非遗甲马', date: '2024.03.20', description: '非遗传承人现场教授甲马刻板技艺，参与者可亲手体验传统木刻版画制作过程。' },
  { id: 3, image: '/images/event-3.jpg', title: '第二届壹触即发民族说唱季', date: '2024.04.01-04.07', description: '汇集云南各民族传统文化，包括甲马展示、民族歌舞、传统手工艺等，打造沉浸式文化体验。' },
  { id: 4, image: '/images/event-4.jpg', title: '喜纯黄芪鲜阿胶 x 非遗甲马', date: '2024.04.10-05.10', description: '结合VR、AR技术，打造数字甲马艺术沉浸体验，让传统艺术与现代科技完美融合。' },
  { id: 5, image: '/images/event-5.jpg', title: 'Maries x 非遗甲马', date: '2024.04.20', description: '发布最新甲马文创产品系列，包括服饰、家居用品、数字藏品等，推动非遗融入现代生活。' },
];

const recentTrades = [
  { id: 1, image: '/images/nft-1.jpg', name: '招财进宝', artist: '李甲马', title: '非遗传承人', style: '传统甲马版画', use: '商业包装设计', original: true },
  { id: 2, image: '/images/nft-2.jpg', name: '人马平安', artist: '张木匠', title: '专业甲马画师', style: '现代国潮甲马', use: '广告宣传素材', original: true },
  { id: 3, image: '/images/nft-3.jpg', name: '灶神保佑', artist: '王工坊', title: '优质二创作者', style: '极简甲马纹样', use: '文创产品纹样', original: false },
  { id: 4, image: '/images/nft-4.jpg', name: '土公土母', artist: '刘传承', title: '非遗传承人', style: '场景定制甲马', use: '个人收藏', original: true },
  { id: 5, image: '/images/nft-5.jpg', name: '药王菩萨', artist: '陈匠人', title: '专业甲马画师', style: '传统甲马版画', use: '商业包装设计', original: true },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-char',
        { opacity: 0, rotateX: 90, y: -50 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, width: 0 },
        { opacity: 1, width: '100%', duration: 1, delay: 1, ease: 'steps(20)' }
      );

      gsap.fromTo(
        '.hero-image',
        { clipPath: 'inset(100% 0 0 0)', skewY: 10 },
        {
          clipPath: 'inset(0% 0 0 0)',
          skewY: 0,
          duration: 1.4,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero-btn',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 1.5, ease: 'back.out(1.7)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextEvent = () => setCurrentEvent((prev) => (prev + 1) % events.length);
  const prevEvent = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);

  return (
    <div className="min-h-screen">
      <Navbar variant="home" />
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen jima-gradient-home pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 paper-texture opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-4 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 z-10">
              <h1
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
                style={{ perspective: '1000px' }}
              >
                {'甲马映画'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-title-char inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              
              <div className="overflow-hidden">
                <p className="hero-subtitle text-xl md:text-2xl text-black/80 font-medium whitespace-nowrap overflow-hidden">
                  云南甲马非遗智创交流平台
                </p>
              </div>
              
              <p className="text-base md:text-lg text-black/70 max-w-lg leading-relaxed">
                千年甲马，一印一世界。甲马映画，不止于复刻传统，以AIGC重释云南民间木刻版画，让祭祀图腾跃入数字画布——创作、交流、共生，让古老符码焕发当代想象。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="hero-btn btn-primary inline-flex items-center space-x-2 text-base"
                >
                  <span>了解甲马文化</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/aigc"
                  className="hero-btn px-6 py-3 rounded-lg font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <span>开始创作</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Right Carousel */}
            <div className="relative hero-image -mt-14">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden woodcut-shadow max-w-md mx-auto">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-black'
                        : 'bg-black/30 hover:bg-black/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Ink Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-black/10 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* AIGC Feature Section */}
      <section className="py-20 md:py-32 bg-[#F9F3E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-[#5D4037]">AIGC 智能创作</h2>
            <p className="text-lg text-[#5D4037]/70 max-w-2xl mx-auto">
              上传照片，选择风格，AI瞬间将您的照片转换为甲马版画艺术
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {aigcSteps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden woodcut-shadow card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#F2B263] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-[#5D4037]">{step.title}</h3>
                  </div>
                  <p className="text-[#5D4037]/70">{step.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < aigcSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#D95D39]">
                    <ArrowRight className="absolute right-0 -top-2 w-4 h-4 text-[#D95D39]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/aigc"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>立即开始创作</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community & Events Section */}
      <section className="py-20 md:py-32 bg-[#F2B263]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Community Hot */}
            <div>
              <h2 className="section-title text-black mb-8">社群热点</h2>
              <div className="space-y-4">
                {communityHot.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#D95D39] text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-black font-medium group-hover:text-[#D95D39] transition-colors line-clamp-1">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-black/50 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.hot}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Latest Events */}
            <div className="flex flex-col items-center">
              <h2 className="section-title text-black mb-6 text-center">最新动态</h2>
              <div className="relative w-full max-w-xs mb-6">
                <div className="aspect-[3/4] rounded-xl overflow-hidden woodcut-shadow">
                  <img
                    src={events[currentEvent].image}
                    alt={events[currentEvent].title}
                    className="w-full h-full object-contain transition-transform duration-500 bg-white"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevEvent}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextEvent}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Event Title */}
              <div className="text-center mb-4">
                <h3 className="text-base font-bold text-black">{events[currentEvent].title}</h3>
              </div>
              
              {/* Event Indicators */}
              <div className="flex space-x-1 justify-center">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEvent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentEvent
                        ? 'w-4 bg-black'
                        : 'bg-black/30 hover:bg-black/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Trades Section */}
      <section className="py-20 md:py-32 bg-[#D95D39]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="section-title text-white mb-2">二创对接</h2>
              <p className="text-white/70">热门甲马作品对接动态</p>
            </div>
            <Link
              to="/trade"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-white hover:text-[#F2B263] transition-colors"
            >
              <span>查看全部</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {recentTrades.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden card-hover"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.original && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-[#D95D39] text-white text-xs rounded-full">
                      原创
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black mb-1">{item.name}</h3>
                  <p className="text-sm text-black/50 mb-2">@{item.artist} · {item.title}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">{item.style}</span>
                    <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">{item.use}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Footer */}
    <Footer />
  </div>
);
}