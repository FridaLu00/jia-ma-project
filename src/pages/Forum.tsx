import { useState } from 'react';
import { Search, MessageSquare, TrendingUp, Clock, Star, Plus, Heart, MessageCircle, Share2, Bookmark, User, Edit3, Image as ImageIcon, Video, Paperclip, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { id: 'all', name: '全部', icon: MessageSquare },
  { id: 'culture', name: '文化科普', icon: Star },
  { id: 'creation', name: '创作交流', icon: Edit3 },
  { id: 'aigc', name: 'AIGC技巧', icon: TrendingUp },
  { id: 'trade', name: '交易经验', icon: MessageSquare },
  { id: 'story', name: '非遗故事', icon: Clock },
];

const posts = [
  {
    id: 1,
    title: '甲马与时尚品牌的跨界联名，传统非遗焕发新生',
    author: '甲马爱好者',
    avatar: '/images/master-1.jpg',
    category: 'culture',
    likes: 456,
    comments: 89,
    views: 2341,
    time: '2小时前',
    verified: true,
    hot: true,
  },
  {
    id: 2,
    title: '新手入门：如何选择适合自己的甲马风格？',
    author: '非遗传承人',
    avatar: '/images/master-2.jpg',
    category: 'creation',
    likes: 234,
    comments: 56,
    views: 1234,
    time: '5小时前',
    verified: true,
    hot: false,
  },
  {
    id: 3,
    title: '分享我的第一幅AI生成甲马作品，求点评',
    author: 'AI创作者',
    avatar: '/images/master-3.jpg',
    category: 'aigc',
    likes: 123,
    comments: 45,
    views: 876,
    time: '1天前',
    verified: false,
    hot: false,
  },
  {
    id: 4,
    title: '云南大理甲马非遗传承人访谈实录',
    author: '文化记者',
    avatar: '/images/master-1.jpg',
    category: 'story',
    likes: 567,
    comments: 123,
    views: 3456,
    time: '2天前',
    verified: true,
    hot: true,
  },
  {
    id: 5,
    title: '甲马NFT数字藏品投资心得与风险提示',
    author: '数字收藏家',
    avatar: '/images/master-2.jpg',
    category: 'trade',
    likes: 345,
    comments: 78,
    views: 1567,
    time: '3天前',
    verified: false,
    hot: false,
  },
];

const hotTopics = [
  '#甲马AI创作大赛',
  '#非遗传承人访谈',
  '#甲马NFT投资',
  '#传统vs现代',
  '#甲马文化科普',
];

const userProfile = {
  name: '甲马爱好者',
  avatar: '/images/master-1.jpg',
  bio: '热爱传统文化，探索数字创新',
  posts: 23,
  followers: 456,
  following: 89,
};

export default function Forum() {
  const [activeTab, setActiveTab] = useState<'home' | 'post' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'best'>('hot');
  const [showPostModal, setShowPostModal] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'hot') return b.likes - a.likes;
    if (sortBy === 'new') return 0; // Would use actual date comparison
    return b.comments - a.comments;
  });

  return (
    <div className="min-h-screen bg-[#349876]">
      <Navbar variant="forum" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">社区论坛</h1>
              <p className="text-white/70">与甲马爱好者交流创作心得，分享非遗文化</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {[
                { id: 'home', name: '论坛首页', icon: MessageSquare },
                { id: 'post', name: '发布帖子', icon: Plus },
                { id: 'profile', name: '我的主页', icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === 'post') setShowPostModal(true);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#F2B263] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Home Tab */}
          {activeTab === 'home' && (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categories */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">话题分类</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-[#F2B263] text-black'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <cat.icon className="w-5 h-5" />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hot Topics */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">热门话题</h3>
                  <div className="space-y-3">
                    {hotTopics.map((topic, index) => (
                      <button
                        key={index}
                        className="block w-full text-left text-white/70 hover:text-[#F2B263] transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Search & Sort */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="搜索帖子、用户、话题..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263]"
                      />
                    </div>
                    <div className="flex space-x-2">
                      {[
                        { id: 'hot', name: '高赞' },
                        { id: 'new', name: '最新' },
                        { id: 'best', name: '精华' },
                      ].map((sort) => (
                        <button
                          key={sort.id}
                          onClick={() => setSortBy(sort.id as any)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            sortBy === sort.id
                              ? 'bg-[#F2B263] text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {sort.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                  {sortedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-white font-medium">{post.author}</span>
                            {post.verified && (
                              <span className="px-2 py-0.5 bg-[#F2B263] text-black text-xs rounded-full">
                                非遗认证
                              </span>
                            )}
                            {post.hot && (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                热门
                              </span>
                            )}
                            <span className="text-white/50 text-sm">{post.time}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 hover:text-[#F2B263] transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-6 text-white/50">
                            <button className="flex items-center space-x-1 hover:text-[#F2B263] transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-[#F2B263] transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-[#F2B263] transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>分享</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-[#F2B263] transition-colors">
                              <Bookmark className="w-4 h-4" />
                              <span>收藏</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F2B263] rounded-full flex items-center justify-center">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h2>
                  <p className="text-white/70 mb-6">{userProfile.bio}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-2xl font-bold text-white">{userProfile.posts}</p>
                      <p className="text-white/50 text-sm">帖子</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{userProfile.followers}</p>
                      <p className="text-white/50 text-sm">粉丝</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{userProfile.following}</p>
                      <p className="text-white/50 text-sm">关注</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#F2B263] text-black rounded-lg font-medium hover:bg-[#D95D39] hover:text-white transition-colors">
                    编辑资料
                  </button>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex space-x-4 mb-6 border-b border-white/10 pb-4">
                    {['我的帖子', '我的回复', '我的收藏', '作品关联'].map((tab, index) => (
                      <button
                        key={index}
                        className={`text-white hover:text-[#F2B263] transition-colors ${
                          index === 0 ? 'text-[#F2B263] font-bold' : ''
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <h3 className="text-white font-bold mb-2">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-white/50 text-sm">
                          <span>{post.time}</span>
                          <span>{post.likes} 赞</span>
                          <span>{post.comments} 评论</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#349876] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">发布新帖子</h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="输入标题..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263]"
                  />
                </div>
                <div>
                  <textarea
                    rows={6}
                    placeholder="分享您的想法..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263] resize-none"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                    <span>图片</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Video className="w-5 h-5" />
                    <span>视频</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Paperclip className="w-5 h-5" />
                    <span>附件</span>
                  </button>
                </div>
                <div>
                  <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-[#F2B263]">
                    <option value="" className="bg-[#349876]">选择话题标签</option>
                    {categories.slice(1).map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#349876]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    取消
                  </button>
                  <button className="px-6 py-3 bg-[#F2B263] text-black rounded-lg font-medium hover:bg-[#D95D39] hover:text-white transition-colors flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>发布</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
