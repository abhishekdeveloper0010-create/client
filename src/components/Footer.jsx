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
    <footer className="w-full bg-[#0c4a6e] text-white">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 xl:grid-cols-4 xl:gap-12">
          {/* Explore */}
          <div>
            <h2 className="pb-4 text-2xl font-semibold sm:text-3xl">Explore</h2>

            <ul className="space-y-3 text-lg text-gray-200 sm:space-y-4 sm:text-2xl">
              <li>
                <Link to="/shop" className="transition hover:text-sky-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-sky-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-sky-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition hover:text-sky-300">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="transition hover:text-sky-300"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition hover:text-sky-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="pb-4 text-2xl font-semibold sm:text-3xl">
              Services
            </h2>

            <ul className="space-y-3 text-lg text-gray-200 sm:space-y-4 sm:text-2xl">
              <li>
                <Link to="/contact" className="transition hover:text-sky-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-sky-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition hover:text-sky-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition hover:text-sky-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-sky-300">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center">
            <h2 className="pb-8 text-3xl font-semibold sm:pb-12 sm:text-4xl">
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
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Your existing newsletter input/button here */}
            </div>

            <p className="pt-2 text-lg text-gray-200 sm:text-xl">
              Stay updated with new trends and offers
            </p>

            <h3 className="pb-6 pt-12 text-2xl font-semibold sm:pb-8 sm:pt-20 sm:text-3xl">
              Connect with us
            </h3>

            <div className="flex justify-center gap-5 pb-6 text-3xl sm:gap-8 sm:pb-10 sm:text-4xl">
              <FaInstagram className="cursor-pointer hover:text-pink-400 duration-300" />
              <FaFacebookF className="cursor-pointer hover:text-blue-400 duration-300" />
              <FaTelegramPlane className="cursor-pointer hover:text-sky-400 duration-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-300 duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="pb-4 text-2xl font-semibold sm:pl-16 sm:text-3xl">
              Quick Links
            </h2>

            <ul className="space-y-3 pb-6 text-lg text-gray-200 sm:space-y-4 sm:pl-16 sm:text-2xl">
              <li>
                <Link to="/about" className="transition hover:text-sky-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition hover:text-sky-300">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="transition hover:text-sky-300"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-sky-300">
                  Support
                </Link>
              </li>
            </ul>

            <h3 className="pt-8 text-2xl sm:pl-10 sm:pt-12 sm:text-3xl">
              We accepted payments
            </h3>

            <div className="flex gap-5 pt-6 text-4xl sm:gap-8 sm:pl-16 sm:pt-8 sm:text-5xl">
              <FaCcVisa />
              <FaGooglePay />
              <FaIdCard />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-white/40 sm:my-10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 pt-5 text-center text-lg text-gray-200 sm:text-xl lg:flex-row lg:pt-10 lg:text-left lg:text-2xl">
          <p>© 2026 Apple Blossom. All Rights Reserved</p>

          <div className="flex flex-wrap justify-center gap-3">
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
