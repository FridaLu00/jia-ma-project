import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const artists = [
  { id: 1, image: '/images/nft-1.jpg', name: '招财进宝', artist: '李甲马', title: '非遗传承人', style: '传统甲马版画', use: '商业包装设计', original: true },
  { id: 2, image: '/images/nft-2.jpg', name: '人马平安', artist: '张木匠', title: '专业甲马画师', style: '现代国潮甲马', use: '广告宣传素材', original: true },
  { id: 3, image: '/images/nft-3.jpg', name: '灶神保佑', artist: '王工坊', title: '优质二创作者', style: '极简甲马纹样', use: '文创产品纹样', original: false },
  { id: 4, image: '/images/nft-4.jpg', name: '土公土母', artist: '刘传承', title: '非遗传承人', style: '场景定制甲马', use: '个人收藏', original: true },
  { id: 5, image: '/images/nft-5.jpg', name: '药王菩萨', artist: '陈匠人', title: '专业甲马画师', style: '传统甲马版画', use: '商业包装设计', original: true },
  { id: 6, image: '/images/category-1.jpg', name: '过关大神', artist: '赵新秀', title: '优质二创作者', style: '现代国潮甲马', use: '广告宣传素材', original: false },
  { id: 7, image: '/images/category-2.jpg', name: '木神鲁班', artist: '孙大师', title: '非遗传承人', style: '极简甲马纹样', use: '文创产品纹样', original: true },
  { id: 8, image: '/images/category-3.jpg', name: '喜神降临', artist: '周工坊', title: '专业甲马画师', style: '场景定制甲马', use: '个人收藏', original: false },
];

const artistTypes = [
  { id: 'inheritor', name: '非遗传承人' },
  { id: 'professional', name: '专业甲马画师' },
  { id: 'creator', name: '优质二创作者' },
];

const artStyles = [
  { id: 'traditional', name: '传统甲马版画' },
  { id: 'modern', name: '现代国潮甲马' },
  { id: 'minimal', name: '极简甲马纹样' },
  { id: 'custom', name: '场景定制甲马' },
];

const artUses = [
  { id: 'packaging', name: '商业包装设计' },
  { id: 'advertising', name: '广告宣传素材' },
  { id: 'cultural', name: '文创产品纹样' },
  { id: 'collection', name: '个人收藏' },
];

export default function Trade() {
  const [selectedArtistType, setSelectedArtistType] = useState('all');
  const [selectedArtStyle, setSelectedArtStyle] = useState('all');
  const [selectedArtUse, setSelectedArtUse] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showArtistDetailsModal, setShowArtistDetailsModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const filteredArtists = artists.filter((artist) => {
    if (selectedArtistType !== 'all' && artist.title !== artistTypes.find(t => t.id === selectedArtistType)?.name) return false;
    if (selectedArtStyle !== 'all' && artist.style !== artStyles.find(s => s.id === selectedArtStyle)?.name) return false;
    if (selectedArtUse !== 'all' && artist.use !== artUses.find(u => u.id === selectedArtUse)?.name) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#963D35]">
      <Navbar variant="trade" showTradeActions={true} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">甲马作品对接平台</h1>
              <p className="text-xl font-bold text-[#F2B263]">找甲马画师/选甲马作品，一键对接定制</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="搜作品名/画师名/风格"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263]"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>筛选</span>
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-white mb-3">作品风格</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedArtStyle('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedArtStyle === 'all'
                            ? 'bg-[#F2B263] text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        全部
                      </button>
                      {artStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedArtStyle(style.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedArtStyle === style.id
                              ? 'bg-[#F2B263] text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white mb-3">画师类型</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedArtistType('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedArtistType === 'all'
                            ? 'bg-[#F2B263] text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        全部
                      </button>
                      {artistTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedArtistType(type.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedArtistType === type.id
                              ? 'bg-[#F2B263] text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white mb-3">作品用途</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedArtUse('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedArtUse === 'all'
                            ? 'bg-[#F2B263] text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        全部
                      </button>
                      {artUses.map((use) => (
                        <button
                          key={use.id}
                          onClick={() => setSelectedArtUse(use.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedArtUse === use.id
                              ? 'bg-[#F2B263] text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {use.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Area */}
          <div className="border-4 border-[#D95D39] bg-[#F2B263]/20 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">发布我的甲马设计需求</h3>
                <p className="text-white/70 text-sm">需求发布后，将在平台展示匹配</p>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-[#D95D39] text-white rounded-xl font-bold hover:bg-[#B84A2E] transition-colors">
                  发布需求
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">甲马作品对接</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="bg-white rounded-xl overflow-hidden card-hover group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {artist.original && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-[#D95D39] text-white text-xs rounded-full">
                        原创
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-1">{artist.name}</h3>
                    <p className="text-black/50 text-sm mb-3">@{artist.artist} · {artist.title}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">{artist.style}</span>
                      <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">{artist.use}</span>
                    </div>
                    <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedArtist(artist);
                        setShowContactModal(true);
                      }}
                      className="flex-1 py-2 bg-[#D95D39] text-white rounded-lg text-sm font-medium hover:bg-[#B84A2E] transition-colors"
                    >
                      联系画师
                    </button>
                    <button
                      onClick={() => {
                        setSelectedArtist(artist);
                        setShowArtistDetailsModal(true);
                      }}
                      className="flex-1 py-2 bg-gray-200 text-black rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      查看详情
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Artist Modal */}
          {showContactModal && selectedArtist && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#F9F4E8] rounded-xl p-6 max-w-md w-full mx-4 border-2 border-[#D95D39]">
                <h3 className="text-2xl font-bold text-[#963D35] mb-4">对接画师：{selectedArtist.artist}</h3>
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-[#D95D39] rounded-full flex items-center justify-center text-white font-bold">
                      {selectedArtist.artist.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#963D35]">{selectedArtist.artist}</p>
                      <p className="text-sm text-[#963D35]/70">{selectedArtist.title}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-[#963D35]/70 mb-1">作品名称</p>
                    <p className="font-medium text-[#963D35]">{selectedArtist.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#963D35] mb-2">您的需求类型</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-[#D95D39] text-[#963D35] focus:outline-none focus:ring-2 focus:ring-[#F2B263]">
                      <option value="custom">定制设计</option>
                      <option value="license">版权授权</option>
                      <option value="collab">合作洽谈</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#963D35] mb-2">您的联系方式</label>
                    <input
                      type="text"
                      placeholder="手机号 / 微信"
                      className="w-full px-4 py-2 rounded-lg border border-[#D95D39] text-[#963D35] placeholder-[#963D35]/50 focus:outline-none focus:ring-2 focus:ring-[#F2B263]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#963D35] mb-2">需求备注</label>
                    <textarea
                      rows={3}
                      placeholder="50字内简述需求"
                      className="w-full px-4 py-2 rounded-lg border border-[#D95D39] text-[#963D35] placeholder-[#963D35]/50 focus:outline-none focus:ring-2 focus:ring-[#F2B263] resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-[#F2B263] text-black rounded-lg font-bold hover:bg-[#D95D39] hover:text-white transition-colors">
                      提交对接
                    </button>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="flex-1 py-3 bg-white/50 text-[#963D35] rounded-lg font-bold hover:bg-white/70 transition-colors"
                    >
                      关闭
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Artist Details Modal */}
          {showArtistDetailsModal && selectedArtist && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#F9F4E8] rounded-xl p-6 max-w-2xl w-full mx-4 border-2 border-[#D95D39]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#963D35]">画师详情：{selectedArtist.artist}</h3>
                  <button
                    onClick={() => setShowArtistDetailsModal(false)}
                    className="text-[#963D35] hover:text-[#D95D39] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-square rounded-lg overflow-hidden mb-4">
                      <img
                        src={selectedArtist.image}
                        alt={selectedArtist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-[#963D35]/70 mb-1">代表作品</p>
                        <p className="font-medium text-[#963D35]">{selectedArtist.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#963D35]/70 mb-1">作品风格</p>
                        <p className="font-medium text-[#963D35]">{selectedArtist.style}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#963D35]/70 mb-1">作品用途</p>
                        <p className="font-medium text-[#963D35]">{selectedArtist.use}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-16 h-16 bg-[#D95D39] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedArtist.artist.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#963D35]">{selectedArtist.artist}</p>
                        <p className="text-sm text-[#963D35]/70">{selectedArtist.title}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm text-[#963D35]/70 mb-1">个人简介</p>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-[#963D35]">专注于{selectedArtist.style}创作，拥有多年甲马艺术经验，作品风格独特，深受客户喜爱。</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm text-[#963D35]/70 mb-1">擅长领域</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#F2B263] text-[#963D35] rounded-full text-sm">{selectedArtist.style}</span>
                        <span className="px-3 py-1 bg-[#F2B263] text-[#963D35] rounded-full text-sm">{selectedArtist.use}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowArtistDetailsModal(false);
                          setShowContactModal(true);
                        }}
                        className="flex-1 py-3 bg-[#D95D39] text-white rounded-lg font-bold hover:bg-[#B84A2E] transition-colors"
                      >
                        联系画师
                      </button>
                      <button className="flex-1 py-3 bg-[#F2B263] text-[#963D35] rounded-lg font-bold hover:bg-[#D95D39] hover:text-white transition-colors">
                        查看更多作品
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
