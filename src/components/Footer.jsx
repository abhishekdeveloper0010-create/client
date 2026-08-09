import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaCcVisa,
  FaGooglePay,
  FaIdCard,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#173f63] text-white pt-14 pb-6">
      <div className="max-w-[1700px] mx-auto px-8">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">

          {/* Explore */}
          <div>
            <h2 className="text-3xl font-semibold pb-4">Explore</h2>

            <ul className="space-y-4 text-2xl text-gray-200">
              <li><Link to="/shop" className="transition hover:text-sky-300">Shop</Link></li>
              <li><Link to="/about" className="transition hover:text-sky-300">About Us</Link></li>
              <li><Link to="/contact" className="transition hover:text-sky-300">Contact</Link></li>
              <li><Link to="/wishlist" className="transition hover:text-sky-300">Wishlist</Link></li>
              <li><Link to="/order-tracking" className="transition hover:text-sky-300">Track Order</Link></li>
              <li><Link to="/login" className="transition hover:text-sky-300">Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-3xl font-semibold pb-4">Services</h2>

            <ul className="space-y-4 text-2xl text-gray-200">
              <li><Link to="/contact" className="transition hover:text-sky-300">Contact Us</Link></li>
              <li><Link to="/about" className="transition hover:text-sky-300">Our Story</Link></li>
              <li><Link to="/terms" className="transition hover:text-sky-300">Terms of Service</Link></li>
              <li><Link to="/privacy" className="transition hover:text-sky-300">Privacy Policy</Link></li>
              <li><Link to="/cart" className="transition hover:text-sky-300">Cart</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center">
            <h2 className="text-4xl font-semibold pb-12">
              Join Our Newsletter
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <input
    type="email"
    placeholder="Email address"
    className="w-full max-w-[320px] h-12 rounded-xl px-5 text-black text-base md:text-xl outline-none bg-white"
  />

  <button className="w-full sm:w-auto bg-[#E6A07B] px-5 py-2 text-base sm:px-7 sm:text-lg md:px-10 md:text-2xl rounded-xl hover:bg-[#d98c63] duration-300">
    Apply
  </button>
</div>

            <p className="pt-2 text-xl text-gray-200">
              Stay updated with new trends and offers
            </p>

            <h3 className="text-3xl font-semibold pt-20 pb-8">
              Connect with us
            </h3>

            <div className="flex justify-center gap-8 text-4xl pb-10">
              <FaInstagram className="cursor-pointer hover:text-pink-400 duration-300" />
              <FaFacebookF className="cursor-pointer hover:text-blue-400 duration-300" />
              <FaTelegramPlane className="cursor-pointer hover:text-sky-400 duration-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-300 duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-3xl font-semibold pb-4 pl-16">Quick Links</h2>

            <ul className="space-y-4 text-2xl text-gray-200 pl-16 pb-6">
              <li><Link to="/about" className="transition hover:text-sky-300">About Us</Link></li>
              <li><Link to="/wishlist" className="transition hover:text-sky-300">Wishlist</Link></li>
              <li><Link to="/order-tracking" className="transition hover:text-sky-300">Track Order</Link></li>
              <li><Link to="/contact" className="transition hover:text-sky-300">Support</Link></li>
            </ul>

            <h3 className="text-3xl pt-12 pl-10  ">
              We accepted payments
            </h3>

            <div className="flex gap-8 text-5xl pl-16 pt-8">
              <FaCcVisa />
              <FaGooglePay />
              <FaIdCard />
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/40 my-10" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 text-2xl text-gray-200 pt-10">
          <p>© 2026 Apple Blossom. All Rights Reserved</p>

          <div className="flex gap-3">
            <Link to="/terms">Term of Service</Link>
            <span>|</span>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;