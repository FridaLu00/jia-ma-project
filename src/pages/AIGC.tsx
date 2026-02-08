import { useState, useRef } from 'react';
import { Upload, Link, Image, Settings, Download, Share2, Gem, History, Play, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const styles = [
  {
    id: 'traditional',
    name: '传统手绘',
    description: '经典甲马木刻风格，粗犷线条',
    image: '/images/style-1.jpg',
  },
  {
    id: 'modern',
    name: '现代潮流',
    description: '融合当代设计元素，时尚前卫',
    image: '/images/style-2.jpg',
  },
  {
    id: 'minimal',
    name: '极简线条',
    description: '简洁线条勾勒，意境深远',
    image: '/images/style-3.jpg',
  },
];

const tutorials = [
  {
    title: '如何调整纹样密度',
    description: '学习如何通过参数调整控制甲马纹样的疏密程度',
    duration: '3:45',
  },
  {
    title: '生成失败解决方案',
    description: '常见问题排查与解决方法汇总',
    duration: '5:20',
  },
  {
    title: '风格选择指南',
    description: '不同场景下的风格推荐与搭配技巧',
    duration: '4:15',
  },
];

const historyItems = [
  { id: 1, image: '/images/history-1.jpg', style: '传统手绘', date: '2024-03-15' },
  { id: 2, image: '/images/history-2.jpg', style: '现代潮流', date: '2024-03-14' },
  { id: 3, image: '/images/history-3.jpg', style: '极简线条', date: '2024-03-13' },
];

export default function AIGC() {
  const [uploadMethod, setUploadMethod] = useState<'local' | 'url'>('local');
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [parameters, setParameters] = useState({
    density: 50,
    saturation: 70,
    detail: 60,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!uploadedImage) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGeneratedImage('/images/jieguo.jpg');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#3F548A]">
      <Navbar variant="aigc" />
      
      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AIGC 甲马风格生成
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              上传您的照片，AI智能转换为传统甲马木刻版画风格
            </p>
          </div>

          {/* Creation Area */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16 items-stretch">
            {/* Left Panel - Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6">
              {/* Upload Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  上传图片
                </h3>
                
                {/* Upload Method Tabs */}
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setUploadMethod('local')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      uploadMethod === 'local'
                        ? 'bg-[#F2B263] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Image className="w-4 h-4" />
                    <span>本地上传</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      uploadMethod === 'url'
                        ? 'bg-[#F2B263] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Link className="w-4 h-4" />
                    <span>图片URL</span>
                  </button>
                </div>

                {/* Upload Area */}
                {uploadMethod === 'local' ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/30 rounded-xl p-2 md:p-3 text-center cursor-pointer hover:border-white/50 transition-colors"
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-24 mx-auto rounded-lg"
                      />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mx-auto text-white/50 mb-1" />
                        <p className="text-white/70 mb-1 text-xs">点击或拖拽上传图片</p>
                        <p className="text-white/50 text-xs">支持 JPG、PNG、WEBP 格式</p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="输入图片URL地址"
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263]"
                    />
                    <button className="w-full py-2 bg-[#F2B263] text-black rounded-lg font-medium hover:bg-[#D95D39] hover:text-white transition-colors">
                      加载图片
                    </button>
                  </div>
                )}
              </div>

              {/* Text Prompt Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  文本提示
                </h3>
                <textarea
                  placeholder="输入文本提示词，描述您想要的风格效果，例如：传统甲马风格，财神爷，喜庆氛围，红色调..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#F2B263] min-h-32 resize-none"
                />
                <p className="text-white/50 text-xs mt-2">提示词越详细，生成效果越符合预期</p>
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Image className="w-5 h-5 mr-2" />
                  选择风格
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-xl overflow-hidden transition-all ${
                        selectedStyle === style.id
                          ? 'ring-2 ring-[#F2B263] ring-offset-2 ring-offset-[#3F548A]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                        <span className="text-white font-bold text-sm">{style.name}</span>
                        <span className="text-white/70 text-xs">{style.description}</span>
                      </div>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#F2B263] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameters */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  参数调整
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-white mb-1 text-sm">
                      <span>纹样密度</span>
                      <span>{parameters.density}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={parameters.density}
                      onChange={(e) => setParameters({ ...parameters, density: Number(e.target.value) })}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F2B263]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-white mb-1 text-sm">
                      <span>色彩饱和度</span>
                      <span>{parameters.saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={parameters.saturation}
                      onChange={(e) => setParameters({ ...parameters, saturation: Number(e.target.value) })}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F2B263]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-white mb-1 text-sm">
                      <span>细节保留度</span>
                      <span>{parameters.detail}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={parameters.detail}
                      onChange={(e) => setParameters({ ...parameters, detail: Number(e.target.value) })}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F2B263]"
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!uploadedImage || isGenerating}
                className={`w-full py-3 rounded-xl font-bold text-base flex items-center justify-center space-x-2 transition-all ${
                  !uploadedImage || isGenerating
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-[#F2B263] text-black hover:bg-[#D95D39] hover:text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>立即生成</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-4">结果预览</h3>
              
              <div className="mb-6">
                {/* Generated */}
                <p className="text-white/70 text-sm mb-2">AI生成结果</p>
                <div className="aspect-[3/4] bg-white/5 rounded-xl overflow-hidden flex flex-col justify-center">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-[#F2B263] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/70">AI生成中...</p>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-contain"
                    />
                  ) : uploadedImage ? (
                    <div className="text-center text-white/30">
                      <Gem className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">点击生成按钮开始AI创作</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/30">
                      <Gem className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">上传图片后点击生成</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {generatedImage && (
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>下载</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 bg-[#F2B263] rounded-lg text-black hover:bg-[#D95D39] hover:text-white transition-colors">
                    <Gem className="w-4 h-4" />
                    <span>生成NFT</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>分享</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <History className="w-5 h-5 mr-2" />
                历史生成记录
              </h3>
              <span className="text-white/50 text-sm">登录后查看全部</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {historyItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt="History"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="text-white/70 text-sm">{item.style}</p>
                  <p className="text-white/50 text-xs">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorial Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">使用教程</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white/50" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tutorial.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{tutorial.description}</p>
                  <div className="flex items-center text-white/50 text-sm">
                    <Play className="w-4 h-4 mr-1" />
                    <span>{tutorial.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
