import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getBodyPartList, 
  getEquipmentList, 
  getTargetList 
} from '../../services/exerciseApi';
import logo from '../../assets/logo/logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [targetMuscles, setTargetMuscles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bodyPartsData, equipmentsData, targetsData] = await Promise.all([
          getBodyPartList(),
          getEquipmentList(),
          getTargetList()
        ]);
        
        setBodyParts(bodyPartsData.slice(0, 6));
        setEquipments(equipmentsData.slice(0, 6));
        setTargetMuscles(targetsData.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Footer verileri yüklenirken hata:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const capitalize = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleNavigate = (paramName: string, paramValue: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/exercises?${paramName}=${paramValue}`, { replace: true });
    
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-gray-200">
      <div className="container mx-auto px-4 pt-8 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={logo} 
                  alt="Egzersiz Rehberi Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Egzersiz Rehberi
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mt-2 max-w-md">
              Sağlıklı yaşam ve fitness yolculuğunuzda en iyi egzersizleri keşfedin ve kişisel hedeflerinize ulaşın.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <h3 className="font-semibold text-lg mb-3 relative inline-block">
              <span className="relative z-10">Bültenimize Abone Olun</span>
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-blue-500/20 -z-10 rounded-lg transform -rotate-1"></span>
            </h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-gray-700/70 backdrop-blur-sm px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-600"
              />
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-r text-white transition-colors transform hover:scale-105 transition duration-300">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t border-b border-gray-700/50">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              <span className="relative z-10">Hakkımızda</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 -z-10 rounded-lg"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-300 transition-all flex items-center group">
                  <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1.5 rounded-md mr-2 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-300 transition-all flex items-center group">
                  <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1.5 rounded-md mr-2 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">İletişim</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-300 transition-all flex items-center group">
                  <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1.5 rounded-md mr-2 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">SSS</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-300 transition-all flex items-center group">
                  <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1.5 rounded-md mr-2 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Gizlilik Politikası</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              <span className="relative z-10">Vücut Bölümleri</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 -z-10 rounded-lg"></span>
            </h3>
            {loading ? (
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 w-24 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {bodyParts.map(part => (
                  <a 
                    key={part}
                    href={`/exercises?bodyPart=${part}`}
                    onClick={handleNavigate('bodyPart', part)} 
                    className="text-gray-400 hover:text-blue-300 transition-all flex items-center cursor-pointer group"
                  >
                    <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1 rounded-md mr-1.5 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{capitalize(part)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              <span className="relative z-10">Hedef Kaslar</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 -z-10 rounded-lg"></span>
            </h3>
            {loading ? (
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 w-24 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {targetMuscles.map(target => (
                  <a 
                    key={target}
                    href={`/exercises?target=${target}`}
                    onClick={handleNavigate('target', target)}
                    className="text-gray-400 hover:text-blue-300 transition-all flex items-center cursor-pointer group"
                  >
                    <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1 rounded-md mr-1.5 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{capitalize(target)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              <span className="relative z-10">Ekipmanlar</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 -z-10 rounded-lg"></span>
            </h3>
            {loading ? (
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 w-24 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {equipments.map(equipment => (
                  <a 
                    key={equipment}
                    href={`/exercises?equipment=${equipment}`}
                    onClick={handleNavigate('equipment', equipment)}
                    className="text-gray-400 hover:text-blue-300 transition-all flex items-center cursor-pointer group"
                  >
                    <span className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1 rounded-md mr-1.5 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{capitalize(equipment)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">© {currentYear} Egzersiz Rehberi. Tüm hakları saklıdır.</p>
            <p className="text-xs text-gray-500 mt-1">
              Bu uygulama eğitim amaçlı geliştirilmiştir ve herhangi bir ticari faaliyet içermemektedir.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;