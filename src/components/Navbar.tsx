import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, HelpCircle, Menu, X, ShoppingBag, Paintbrush, MessageSquare, Info, Home, Upload, FileText, MessageSquareText } from 'lucide-react';

interface NavbarProps {
  variant?: 'home' | 'aigc' | 'trade' | 'forum' | 'about';
  showTradeActions?: boolean;
}

export default function Navbar({ variant = 'home', showTradeActions = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBgColor = () => {
    switch (variant) {
      case 'home':
        return isScrolled ? 'bg-[#F2B263]/95 backdrop-blur-md' : 'bg-transparent';
      case 'aigc':
        return isScrolled ? 'bg-[#3F548A]/95 backdrop-blur-md' : 'bg-[#3F548A]';
      case 'trade':
        return isScrolled ? 'bg-[#963D35]/95 backdrop-blur-md' : 'bg-[#963D35]';
      case 'forum':
        return isScrolled ? 'bg-[#349876]/95 backdrop-blur-md' : 'bg-[#349876]';
      case 'about':
        return isScrolled ? 'bg-[#F9F3E3]/95 backdrop-blur-md shadow-md' : 'bg-[#F9F3E3]';
      default:
        return 'bg-transparent';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'aigc':
      case 'trade':
      case 'forum':
        return 'text-white';
      case 'about':
        return 'text-[#5D4037]';
      case 'home':
      default:
        return isScrolled ? 'text-[#5D4037]' : 'text-white';
    }
  };

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/about', label: '关于甲马', icon: Info },
    { path: '/aigc', label: 'AIGC工具', icon: Paintbrush },
    { path: '/trade', label: '二创对接', icon: ShoppingBag },
    { path: '/forum', label: '社区论坛', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getBgColor()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="甲马映画" 
              className="h-12 md:h-16 object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${getTextColor()} ${
                  isActive(item.path) ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {showTradeActions ? (
              <>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#F2B263] text-[#963D35] rounded-lg hover:bg-[#D95D39] hover:text-white transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">发布作品</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">发布需求</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  <MessageSquareText className="w-4 h-4" />
                  <span className="text-sm">我的对接</span>
                </button>
              </>
            ) : (
              <>
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索..."
                    className={`w-40 lg:w-56 px-4 py-2 rounded-full text-sm bg-black/10 border-none outline-none placeholder-current/50 ${getTextColor()}`}
                  />
                  <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getTextColor()}`} />
                </div>

                {/* Help Icon (AIGC page only) */}
                {variant === 'aigc' && (
                  <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${getTextColor()}`}>
                    <HelpCircle className="w-5 h-5" />
                  </button>
                )}

                {/* Login/Register */}
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                  variant === 'about' && !isScrolled
                    ? 'border-[#5D4037] text-[#5D4037] hover:bg-[#5D4037] hover:text-white'
                    : 'border-white/50 text-white hover:bg-white hover:text-black'
                }`}>
                  <User className="w-4 h-4" />
                  <span className="text-sm">登录</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${getTextColor()}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${getBgColor()} border-t border-black/10`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-black/10'
                    : 'hover:bg-black/5'
                } ${getTextColor()}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-black/10">
              <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border ${
                variant === 'about'
                  ? 'border-[#5D4037] text-[#5D4037]'
                  : 'border-white/50 text-white'
              }`}>
                <User className="w-5 h-5" />
                <span>登录 / 注册</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
