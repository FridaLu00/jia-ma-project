import { Link } from 'react-router-dom';
import { MessageCircle, Share2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#5D4037] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/images/logo.png" 
                alt="甲马映画" 
                className="h-12 object-contain" 
              />
            </Link>
            <p className="text-white/70 leading-relaxed">
              甲马映画是云南甲马非物质文化遗产数字化保护与传承平台，通过AI技术与区块链，让千年木刻版画艺术在数字时代焕发新生。
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">快速链接</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">关于甲马</Link></li>
              <li><Link to="/aigc" className="text-white/70 hover:text-white transition-colors">AIGC工具</Link></li>
              <li><Link to="/trade" className="text-white/70 hover:text-white transition-colors">二创对接</Link></li>
              <li><Link to="/forum" className="text-white/70 hover:text-white transition-colors">社区论坛</Link></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-6">关注我们</h3>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-6 text-white/50 text-sm">
              微信公众号：甲马映画<br />
              微博：@甲马映画官方<br />
              小红书：甲马映画
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>© 2024 甲马映画. 保留所有权利. | 滇ICP备XXXXXXXX号</p>
        </div>
      </div>
    </footer>
  );
}