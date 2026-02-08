import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Hammer, Droplets, Stamp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    name: '过关还愿类',
    image: '/images/category-1.jpg',
    patterns: ['过关大神', '好人相逢', '逢凶化吉'],
    meaning: '人与神明的"信用契约"，祈求顺遂、答谢神恩。云南民间相信，向神明许愿后需还愿，甲马是沟通人神的重要媒介。',
  },
  {
    id: 2,
    name: '建房类',
    image: '/images/category-2.jpg',
    patterns: ['土公土母', '木神', '鲁班先师'],
    meaning: '建房各环节护持，祈愿工程顺利、家宅永安。从动土到上梁，每个环节都有对应的甲马祭祀仪式。',
  },
  {
    id: 3,
    name: '节庆类',
    image: '/images/category-3.jpg',
    patterns: ['喜神', '家神', '孔子先师'],
    meaning: '邀请神明共庆，烘托喜庆氛围，凝聚社群认同。春节、婚礼、升学等重要时刻，甲马承载着人们对美好生活的向往。',
  },
  {
    id: 4,
    name: '祭祀类',
    image: '/images/category-4.jpg',
    patterns: ['祖先之神', '灶神', '五福大神'],
    meaning: '沟通人神鬼，表达敬畏、祈求福祉延续。祭祀是甲马最核心的功能，体现了中国人慎终追远的传统。',
  },
  {
    id: 5,
    name: '祈福类',
    image: '/images/category-5.jpg',
    patterns: ['招财进宝', '利市仙官', '人马平安'],
    meaning: '日常许愿，寄托健康、财运、平安的向往。这是甲马最贴近百姓生活的类别，反映了民间最朴素的愿望。',
  },
  {
    id: 6,
    name: '祛病类',
    image: '/images/category-6.jpg',
    patterns: ['药王菩萨', '痘儿哥哥', '病符'],
    meaning: '驱邪送鬼、祈求药力，盼无病无灾。在传统医疗条件有限的年代，甲马是人们面对疾病时的心理慰藉。',
  },
  {
    id: 7,
    name: '祭树祭水类',
    image: '/images/category-7.jpg',
    patterns: ['水神', '风神', '马王'],
    meaning: '感恩自然馈赠，祈求庄稼丰收、人与自然相安。云南多民族地区对自然神灵的崇拜，体现了生态智慧。',
  },
  {
    id: 8,
    name: '祭山神土地类',
    image: '/images/category-8.jpg',
    patterns: ['田公地母', '山神', '山神土地'],
    meaning: '敬畏地方保护神，祈求风调雨顺、出行平安。山神土地是民间信仰中最贴近生活的守护神。',
  },
  {
    id: 9,
    name: '丧葬类',
    image: '/images/category-9.jpg',
    patterns: ['叫魂', '哭神', '刀兵'],
    meaning: '安抚亡灵、指引路途，护佑生者生活重归平静。丧葬甲马体现了中国人对生死的哲学思考。',
  },
];

const processSteps = [
  {
    icon: BookOpen,
    title: '选材',
    description: '选用优质梨木或枣木，木质细腻、纹理清晰，是雕刻甲马版的上乘之选。',
  },
  {
    icon: Hammer,
    title: '刻板',
    description: '匠人运用多种刻刀，在木板上精雕细琢，将图案以阴阳线条呈现。',
  },
  {
    icon: Droplets,
    title: '调墨',
    description: '传统使用松烟墨，调配至适宜浓度，保证印刷效果浓淡相宜。',
  },
  {
    icon: Stamp,
    title: '拓印',
    description: '将宣纸覆于版上，用棕刷均匀施力，使墨色完整转印于纸上。',
  },
];

const masters = [
  {
    name: '张师傅',
    title: '国家级非遗传承人',
    experience: '从艺50年',
    image: '/images/master-1.jpg',
    quote: '甲马是活着的历史，每一刀都刻着先辈的智慧。',
    works: ['招财进宝', '人马平安', '灶神保佑'],
  },
  {
    name: '李阿姨',
    title: '省级非遗传承人',
    experience: '从艺35年',
    image: '/images/master-2.jpg',
    quote: '刻板如绣花，心静手稳，方能刻出神韵。',
    works: ['土公土母', '喜神降临', '药王菩萨'],
  },
  {
    name: '王师傅',
    title: '市级非遗传承人',
    experience: '从艺28年',
    image: '/images/master-3.jpg',
    quote: '年轻人愿意学，这门手艺就不会断。',
    works: ['过关大神', '山神土地', '祖先之神'],
  },
];

const historyTimeline = [
  {
    period: '东汉时期',
    title: '起源萌芽',
    description: '根据保山史料《永昌府志》和《保山县志》记载推论，甲马画的起源可能早于唐代，极有可能在东汉时期就已存在。早期的甲马主要用于祭祀活动，是人们与神灵沟通的媒介。',
  },
  {
    period: '唐宋时期',
    title: '"纸马"雏形',
    description: '唐宋时期，甲马发展为"纸马"形式，最初是祭祀时焚烧用的纸制神像。据史料记载，唐代时期甲马已在中原地区广泛使用，后随着汉人的南迁传入云南。《水浒传》中神行太保戴宗将甲马绑于腿上日行500里的描述，反映了当时甲马在交通出行中的信仰功能。',
  },
  {
    period: '明清时期',
    title: '云南地区盛行',
    description: '明清时期是甲马在云南的重要发展期，大理、丽江、昆明、红河等地都形成了独特的地方风格。白族、彝族等民族将自身文化特色融入甲马创作，使其题材更加丰富多样。制作工艺也日趋成熟，从简单的纸制发展为精美的木刻版画形式，成为民间信仰和艺术表达的重要载体。',
  },
  {
    period: '民国时期',
    title: '鼎盛发展',
    description: '民国时期是甲马发展的黄金时代，题材涵盖了生产生活的各个方面，包括农业生产、商业贸易、婚姻嫁娶、生老病死等。制作工艺达到顶峰，雕刻精细、印刷清晰，形成了完整的民间艺术体系。甲马不仅是信仰工具，更是反映当时社会生活的百科全书。',
  },
  {
    period: '现代',
    title: '非遗保护与传承',
    description: '2011年，云南甲马被列入国家级非物质文化遗产名录，受到官方和社会的高度重视。近年来，随着非物质文化遗产保护工作的深入开展，甲马的保护与传承进入了新阶段。数字化技术的应用为甲马的保存和传播提供了新途径，年轻一代的参与也为这门古老艺术注入了新活力。2017年6月，甲马被云南省人民政府公布列入第四批州级非物质文化遗产名录，标志着其保护工作迈上了新台阶。',
  },
];

export default function About() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const workshopRef = useRef<HTMLDivElement>(null);
  const mastersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // History section animation
      gsap.fromTo(
        '.history-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: historyRef.current,
            start: 'top 80%',
          },
        }
      );

      // Workshop steps animation
      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: workshopRef.current,
            start: 'top 80%',
          },
        }
      );

      // Masters animation
      gsap.fromTo(
        '.master-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: mastersRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const nextCategory = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCategory((prev) => (prev + 1) % categories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevCategory = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCategory((prev) => (prev - 1 + categories.length) % categories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#F9F3E3]">
      <Navbar variant="about" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Video Section */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-12">
              <video 
                className="w-full aspect-video"
                controls
                poster="/images/workshop-preview.jpg"
              >
                <source src="/videos/jia-ma-making-process.mp4" type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section ref={historyRef} className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-[#5D4037] text-center mb-16">甲马历史</h2>
          
          <div className="relative">
            {/* Horizontal Timeline */}
            <div className="hidden md:block">
              {/* Timeline Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#D95D39]/20 transform -translate-y-1/2" />
              
              {/* Timeline Items */}
              <div className="grid grid-cols-5 gap-4 relative">
                {historyTimeline.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#D95D39] rounded-full border-4 border-white z-10" />
                    
                    {/* Content */}
                    <div className="pt-12">
                      <span className="inline-block px-4 py-1 bg-[#D95D39] text-white text-sm rounded-full mb-3">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold text-[#5D4037] mb-3">{item.title}</h3>
                      <p className="text-[#5D4037]/90 leading-relaxed text-sm pl-4">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Vertical Timeline */}
            <div className="md:hidden space-y-12">
              {historyTimeline.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-[#D95D39]/20 pb-8">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-[#D95D39] rounded-full border-4 border-white" />
                  
                  {/* Content */}
                  <div>
                    <span className="inline-block px-4 py-1 bg-[#D95D39] text-white text-sm rounded-full mb-3">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-[#5D4037] mb-3">{item.title}</h3>
                    <p className="text-[#5D4037]/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9 Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-[#5D4037] text-center mb-4">甲马九大类</h2>
          <p className="text-center text-[#5D4037]/70 mb-16 max-w-2xl mx-auto">
            云南甲马按功能可分为九大类，涵盖人生各个重要场景，体现了民间信仰的丰富内涵
          </p>

          {/* Category Display */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevCategory}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#5D4037] text-white rounded-full flex items-center justify-center hover:bg-[#D95D39] transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCategory}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#5D4037] text-white rounded-full flex items-center justify-center hover:bg-[#D95D39] transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Content */}
            <div className="px-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden woodcut-shadow">
                    <img
                      src={categories[currentCategory].image}
                      alt={categories[currentCategory].name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}
                    />
                  </div>
                  {/* Category Number */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#D95D39] rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{currentCategory + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                  <h3 className="text-4xl font-bold text-[#5D4037] mb-6">
                    {categories[currentCategory].name}
                  </h3>
                  
                  <div className="mb-6">
                    <p className="text-sm text-[#5D4037]/50 mb-2">核心纹样</p>
                    <div className="flex flex-wrap gap-2">
                      {categories[currentCategory].patterns.map((pattern, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-[#F2B263]/20 text-[#5D4037] rounded-full text-sm font-medium"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#5D4037]/50 mb-2">寓意解读</p>
                    <p className="text-[#5D4037]/80 leading-relaxed text-lg">
                      {categories[currentCategory].meaning}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Indicators */}
            <div className="flex justify-center space-x-2 mt-12">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentCategory(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentCategory
                      ? 'w-8 bg-[#D95D39]'
                      : 'w-2 bg-[#5D4037]/20 hover:bg-[#5D4037]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section ref={workshopRef} className="py-20 bg-[#5D4037]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-white text-center mb-4">非遗工坊</h2>
          <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
            甲马制作是一门精湛的传统手工艺，从选材到成品，每一步都凝聚着匠人的心血
          </p>

          {/* Split Layout: Left - Process Steps, Right - Video */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Process Steps and Quote */}
            <div>
              {/* Process Steps */}
              <div className="mb-8">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="process-step mb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 bg-[#F2B263] rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-[#5D4037]" />
                        </div>
                        {/* Step Number */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#5D4037] font-bold text-xs">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/70 text-xs leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    {/* Vertical Connector */}
                    {index < processSteps.length - 1 && (
                      <div className="ml-8 mt-2 h-4 border-l-2 border-white/20" />
                    )}
                  </div>
                ))}
              </div>

              {/* Master Quote */}
              <div className="mt-4">
                <blockquote className="text-sm md:text-base text-white font-medium leading-relaxed italic">
                  "刻板如绣花，心静手稳，方能刻出神韵。每一刀下去，都是与先辈的对话。"
                </blockquote>
                <p className="text-white/70 mt-2 text-xs">—— 云南甲马非遗传承人</p>
              </div>
            </div>

            {/* Right: Video */}
            <div>
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <video 
                  className="w-full aspect-video"
                  controls
                  poster="/images/workshop-preview-2.jpg"
                >
                  <source src="/videos/jia-ma-making-process-2.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
              <p className="text-center text-white/70 mt-4">甲马制作工艺流程展示</p>
            </div>
          </div>
        </div>
      </section>

      {/* Masters Section */}
      <section ref={mastersRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-[#5D4037] text-center mb-4">传承人风采</h2>
          <p className="text-center text-[#5D4037]/70 mb-16 max-w-2xl mx-auto">
            他们是甲马艺术的守护者，用一生的时间传承这门千年技艺
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {masters.map((master, index) => (
              <div
                key={index}
                className="master-card bg-white rounded-2xl overflow-hidden woodcut-shadow card-hover"
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={master.image}
                    alt={master.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{master.name}</h3>
                    <p className="text-[#F2B263] text-sm">{master.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#5D4037]/50 text-sm mb-4">{master.experience}</p>
                  <blockquote className="text-[#5D4037]/80 italic mb-4 border-l-4 border-[#F2B263] pl-4">
                    "{master.quote}"
                  </blockquote>
                  <div>
                    <p className="text-sm text-[#5D4037]/50 mb-2">代表作品</p>
                    <div className="flex flex-wrap gap-2">
                      {master.works.map((work, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#F9F3E3] text-[#5D4037] text-sm rounded-full"
                        >
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#D95D39]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            一起守护这份千年文化遗产
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
        通过甲马映画平台，您可以对接甲马画师 / 传承人定制专属作品、体验甲马风格AI创作、
        洽谈甲马文化商业合作，让传统甲马艺术在数字时代与实用场景中焕发新生。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/aigc"
              className="px-8 py-4 bg-[#F2B263] text-black rounded-xl font-bold hover:bg-white transition-colors"
            >
              开始AI创作
            </a>
            <a
              href="/trade"
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              甲马商业合作
            </a>
          </div>
        </div>
      </section>
      <Footer /> {/* 添加这一行 */}
    </div>
  );
}
