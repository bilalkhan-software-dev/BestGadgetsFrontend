import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import ProfileLogo from "./assets/channels4_profile.jpg";
import { useEffect, useState, useRef } from "react";
import { APP_BASE_URL } from "./assets/constant";

const App = () => {
  // State variables
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const mobileTopAdRef = useRef(null);
  const desktopAdRef = useRef(null);
  const mobileBottomAdRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all products on page refresh
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${APP_BASE_URL}/product/all`);
        const data = await response.json();
        setAllProducts(data.data.products);
        setDisplayProducts(data.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Load ads
  useEffect(() => {
    // Mobile top ad
    if (isMobile && mobileTopAdRef.current && !mobileTopAdRef.current.hasChildNodes()) {
      const script1 = document.createElement('script');
      script1.innerHTML = `
        atOptions = {
          'key': '60252b93698a4ddb4f86487fc1e54a4b',
          'format': 'iframe',
          'height': 50,
          'width': 320,
          'params': {}
        };
      `;
      mobileTopAdRef.current.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = '//www.highperformanceformat.com/60252b93698a4ddb4f86487fc1e54a4b/invoke.js';
      script2.async = true;
      mobileTopAdRef.current.appendChild(script2);
    }

    // Desktop ad
    if (!isMobile && desktopAdRef.current && !desktopAdRef.current.hasChildNodes()) {
      const script1 = document.createElement('script');
      script1.innerHTML = `
        atOptions = {
          'key': 'a523bc4dd4df0efefa6ffbf891afc92f',
          'format': 'iframe',
          'height': 100,
          'width': 728,
          'params': {}
        };
      `;
      desktopAdRef.current.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = '//www.highperformanceformat.com/a523bc4dd4df0efefa6ffbf891afc92f/invoke.js';
      script2.async = true;
      desktopAdRef.current.appendChild(script2);
    }

    // Mobile bottom ad (this is the crucial fix)
    if (isMobile && mobileBottomAdRef.current && !mobileBottomAdRef.current.hasChildNodes()) {
      const script1 = document.createElement('script');
      script1.innerHTML = `
        atOptions = {
          'key': '60252b93698a4ddb4f86487fc1e54a4b',
          'format': 'iframe',
          'height': 50,
          'width': 320,
          'params': {}
        };
      `;
      mobileBottomAdRef.current.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = '//www.highperformanceformat.com/60252b93698a4ddb4f86487fc1e54a4b/invoke.js';
      script2.async = true;
      mobileBottomAdRef.current.appendChild(script2);
    }
  }, [isMobile]); // Only depends on isMobile now

  // Handling search with debounce
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setDisplayProducts(allProducts);
      setIsSearching(false);
      return;
    }

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery, allProducts]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setIsSearching(true);
      setIsLoading(true);
      const response = await fetch(`${APP_BASE_URL}/product/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setDisplayProducts(data.data.products || []);
    } catch (error) {
      setError(error.message);
      setDisplayProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDisplayProducts(allProducts);
    setIsSearching(false);
  };

  return (
      <div className="bg-gray-900 min-h-screen w-full text-white">
        {/* Mobile Top Banner Ad (Sticky) */}
        <div className="lg:hidden sticky top-0 z-50 w-full h-[50px] bg-gray-700 flex items-center justify-center">
          <div ref={mobileTopAdRef} className="w-[320px] h-[50px]"></div>
        </div>

        {/* Upper half - Header */}
        <header className="bg-gray-800 h-40 flex items-center justify-center">
          {/* Desktop Top Banner Ad (hidden on mobile) */}
          {!isMobile && (
              <div className="w-full max-w-4xl mx-4 h-[100px] bg-gray-700 rounded flex items-center justify-center">
                <div ref={desktopAdRef} className="w-[728px] h-[100px]"></div>
              </div>
          )}
        </header>

        {/* Profile section */}
        <section className="relative">
          {/* Bio section (lower half) */}
          <div className="bg-gray-700 pt-20 pb-8">
            <div className="container mx-auto flex flex-col items-center justify-center">
              {/* Profile image */}
              <img
                  src={ProfileLogo}
                  alt="profile-photo"
                  className="h-32 w-32 rounded-full hover:border-blue-300
              hover:scale-105 transition-all duration-300 object-cover mb-4 border-4 border-gray-800 absolute -top-16 left-1/2 transform -translate-x-1/2"
              />

              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2">Best G@dget</h2>
                <p className="text-gray-300 mb-6 max-w-md text-center px-4">As an Amazon Associate, I earn from qualifying purchases</p>
                <div className="flex flex-row gap-6 text-gray-200 text-2xl">
                  <a href="https://www.youtube.com/@BestGadgets1122" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                  <a href="https://www.instagram.com/bestgadgets1122" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61563800903849" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search bar */}
        <section className="container mx-auto py-8 px-4">
          <div className="relative max-w-2xl mx-auto">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-6 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
            )}
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="text-center mt-2 text-gray-400">
            {isSearching ? `Showing search results for "${searchQuery}"` : `Showing all products`}
          </div>
        </section>

        {/* Loading state */}
        {isLoading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )}

        {/* Error state */}
        {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mx-auto max-w-2xl mb-6 text-center">
              Error: {error}
            </div>
        )}

        {/* Product grid */}
        <section className="container mx-auto py-8 px-4">
          {!isLoading && displayProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {isSearching ?
                    'No products found matching your search' :
                    'No products available'}
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                    <a
                        key={product.id}
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                    >
                      <div className="h-48 overflow-hidden bg-white">
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            loading="lazy"
                            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 p-2"
                            style={{
                              mixBlendMode: 'multiply',
                              filter: 'contrast(1.1)',
                            }}
                        />
                      </div>
                      <div className="p-2 flex-grow">
                        <h3 className="text-gray-200 font-medium text-md line-clamp-2 hover:line-clamp-none transition-all">{product.productName}</h3>
                      </div>
                    </a>
                ))}
              </div>
          )}
        </section>

        {/* Mobile Bottom Banner Ad (Sticky)  */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[50px] w-full bg-gray-700 flex items-center justify-center">
          <div ref={mobileBottomAdRef} className="w-[320px] h-[50px]"></div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 py-8 mt-8 lg:mb-0 mb-[50px]"> {/* Added mb-[50px] to account for bottom ad */}
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <p className="text-gray-400">© 2025 Best G@dgets. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default App;