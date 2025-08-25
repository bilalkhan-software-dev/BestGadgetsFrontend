import { FaYoutube, FaInstagram, FaFacebook, FaAmazon } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import ProfileLogo from "./assets/channels4_profile.png";
import { useEffect, useState } from "react";
import { APP_BASE_URL } from "./assets/constant";

const App = () => {
  // State variables
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

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

  // Handling search with debounce
  useEffect(() => {
    if (searchQuery.trim() === "") {
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
      const response = await fetch(
        `${APP_BASE_URL}/product/search?query=${encodeURIComponent(query)}`
      );
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
    setSearchQuery("");
    setDisplayProducts(allProducts);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen w-full text-white bg-gradient-to-br from-gray-900 via-blue-900/80 to-gray-900">
      {/* Upper half - Header */}
      <header className="h-40 flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white/90">
            Best Gadgets Store
          </h1>
          <p className="text-blue-100 mt-2 mb-8">
            Discover amazing tech products at great prices
          </p>
        </div>
      </header>

      {/* Profile section */}
      <section className="relative">
        {/* Bio section (lower half) */}
        <div className="pt-20 pb-8 bg-gradient-to-b from-blue-900/70 to-blue-900/90">
          <div className="container mx-auto flex flex-col items-center justify-center">
            {/* Profile image */}
            <img
              src={ProfileLogo}
              alt="profile-photo"
              className="h-32 w-32 rounded-full hover:border-blue-400
              hover:scale-105 transition-all duration-300 object-cover mb-4 border-4 border-blue-800/80 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-lg"
            />

            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Best G@dget
              </h2>
              <p className="text-blue-100 mb-6 max-w-md text-center px-4">
                As an Amazon Associate, I earn from qualifying purchases
              </p>
              <div className="flex flex-row gap-6 text-blue-200 text-2xl">
                <a
                  href="https://www.youtube.com/@BestGadgets1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.instagram.com/bestgadgets1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61563800903849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors hover:scale-110"
                  aria-label="Amazon"
                >
                  <FaAmazon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="container mx-auto py-8 px-4">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-3 px-6 pr-12 rounded-full bg-blue-900/60 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-700/50 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <RiCloseFill className="h-5 w-5" />
                </button>
              )}
              <button className="text-blue-200 hover:text-white transition-colors">
                <IoIosSearch className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="text-center mt-2 text-blue-200">
            {isSearching ? (
              <span>
                Showing search results for{" "}
                <span className="font-semibold text-white">
                  "{searchQuery}"
                </span>
              </span>
            ) : (
              <span>Showing all {displayProducts.length} products</span>
            )}
          </div>
        </div>
      </section>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <>
          {" "}
          <div className="bg-red-900/70 border-4 border-red-500 text-red-100 px-4 py-3 rounded-xl mx-auto max-w-2xl mb-6 text-center backdrop-blur-sm">
            Error: {error}
          </div>
          <div className="bg-gray-900/70 border-4 border-blue-500 shadow-blue-400 shadow-2xl/100 text-white px-4 py-3 rounded-xl mx-auto max-w-2xl mb-6 text-center">
            You are seeing this error because the backend server is currently
            unavailable or has crashed. If you reached this page through my
            portfolio to view the project overview, you can still check it out
            through the following video link below:
            <div className="text-center m-4">
              <a
                href="https://drive.google.com/file/d/1nD1EUcngafzPhCvxpXRxB-dWurptSLqq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-l from-blue-400 to-blue-800 px-6 py-2 rounded-lg text-white font-semibold shadow-md hover:from-blue-800 hover:to-blue-400 transition duration-200"
                aria-label="Overview link"
              >
                Overview Link
              </a>
            </div>
          </div>
        </>
      )}

      {/* Product grid */}
      <section className="container mx-auto py-8 px-4">
        {!isLoading && displayProducts.length === 0 ? (
          <div className="text-center py-12 text-blue-200">
            {isSearching ? (
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 mx-auto text-blue-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-xl font-medium mb-2 text-white">
                  No products found
                </h3>
                <p className="text-blue-200">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 mx-auto text-blue-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <h3 className="text-xl font-medium mb-2 text-white">
                  No products available
                </h3>
                <p className="text-blue-200">
                  Check back later for new gadget recommendations
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <a
                key={product.id}
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900/50 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-blue-800/50 hover:border-blue-400/50 group"
              >
                <div className="h-48 overflow-hidden bg-white relative">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 p-2 group-hover:scale-105"
                    style={{
                      mixBlendMode: "multiply",
                      filter: "contrast(1.1)",
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Amazon
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-100 font-medium text-md line-clamp-2 group-hover:text-white transition-colors">
                    {product.productName}
                  </h3>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-blue-200">
                      Affiliate Link
                    </span>
                    {/* <span className="text-blue-300 text-sm font-medium">
                      View Deal →
                    </span> */}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 mt-12 bg-gradient-to-t from-blue-900/90 to-blue-900/50 border-t border-blue-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* <div className="flex space-x-6 mb-4">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div> */}
            <p className="text-blue-200 text-sm">
              © 2025 Best G@dgets. All rights reserved.
            </p>
            <p className="text-blue-300/70 text-xs mt-2">
              As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
