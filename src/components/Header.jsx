import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      setUser(currentUser);
    };

    const countWishlist = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(saved.length);
    };

    const countCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = savedCart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0,
      );
      setCartCount(totalItems);
    };

    syncUser();
    countWishlist();
    countCart();

    const handleAuthChanged = () => {
      syncUser();
    };

    window.addEventListener("authChanged", handleAuthChanged);
    window.addEventListener("storage", countCart);
    window.addEventListener("storage", handleAuthChanged);
    window.addEventListener("wishlistChanged", countWishlist);
    window.addEventListener("cartChanged", countCart);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
      window.removeEventListener("storage", countCart);
      window.removeEventListener("storage", handleAuthChanged);
      window.removeEventListener("wishlistChanged", countWishlist);
      window.removeEventListener("cartChanged", countCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-[#d8edf8] shadow-md sticky top-0 z-50">
      <div className="w-full px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="pl-8">
            <Link
              to="/"
              className="text-3xl font-bold text-sky-600 whitespace-nowrap"
            >
              Apple Blossom
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-12 text-lg font-medium">
            <Link to="/" className="hover:text-sky-600">
              Home
            </Link>

            <Link to="/shop" className="hover:text-sky-600">
              Products
            </Link>

            <Link to="/about" className="hover:text-sky-600">
              About
            </Link>

            <Link to="/contact" className="hover:text-sky-600">
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">

            

            

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-black hover:text-sky-600"
            >
              <FaShoppingCart />
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
             <div
  className="relative"
  onMouseEnter={() => setProfileOpen(true)}
  onMouseLeave={() => setProfileOpen(false)}
>
  <button
    className="flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-white transition duration-300 hover:bg-sky-700"
  >
    <FaUserCircle />
    My Profile
  </button>

  {profileOpen && (
    <div className="absolute right-0 mt-2 w-62 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
      <h2 className="pl-2 text-lg font-bold">My Profile</h2>

      <hr className="my-2 border-slate-400" />

      <Link
        to="/order-tracking"
        onClick={() => setProfileOpen(false)}
        className="block rounded-xl px-3 py-2 text-1sm text-slate-700 hover:bg-sky-50"
      >
        Order Tracking
      </Link>

      <Link
        to="/wishlist"
        onClick={() => setProfileOpen(false)}
        className="block rounded-xl px-3 py-2 text-1sm text-slate-700 hover:bg-sky-50"
      >
        Wishlist
      </Link>

      <button
        onClick={handleLogout}
        className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
      >
        Logout
      </button>
    </div>
  )}
</div>
            ) : (
              <Link
                to="/login"
                className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-700"
              >
                Login
              </Link>
            )}

            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="w-64 px-4 py-2 outline-none"
              />

              <button type="submit" className="text-grey px-4 py-2 hover:bg-sky-700 hover:text-white">
                <FaSearch />
              </button>
            </form>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl pl-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col gap-5 px-6 py-5">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>

            {user ? (
              <>
                <Link to="/order-tracking" onClick={() => setMenuOpen(false)}>
                  Order Tracking
                </Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="font-semibold text-sky-700">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="text-left text-rose-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}

            <form onSubmit={handleSearch} className="flex border rounded-full overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 outline-none"
              />

              <button type="submit" className="bg-sky-600 text-white px-4">
                <FaSearch />
              </button>
            </form>

          </div>
        </div>
      )}
    </header>
  );
}

export default Header;