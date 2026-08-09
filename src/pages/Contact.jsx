function Contact() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-20">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Heading */}
        <div className="text-center pb-10 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[55px] font-bold text-[#0c4a6e]">
            Contact Us
          </h1>
           

          <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-medium text-slate-700">
            We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Contact Information */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c4a6e] pb-2">
              Get In Touch
            </h2>

            <div className="mt-8 space-y-4">
              {/* Email */}
              <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4 sm:p-5">
                <p className="font-semibold text-slate-900">Email</p>
                <p className="mt-1 text-sm text-slate-600 sm:text-base break-all">
                  support@appleblossom.com
                </p>
              </div>
              <br></br>

              {/* Phone */}
              <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4 sm:p-5">
                <p className="font-semibold text-slate-900">Phone</p>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">
                  +91 xxxxx xxx10
                </p>
              </div>
              <br></br>
              {/* Address */}
              <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4 sm:p-5">
                <p className="font-semibold text-slate-900">Address</p>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">
                  123 Fashion Street, New Delhi, India
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7 lg:p-8">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-4 sm:pb-6">
              <label className="block text-sm font-semibold text-slate-700">
                Name
                <input
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Email
                <input
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            {/* Message */}
            <label className="mt-4 block text-sm font-semibold text-slate-700 pb-8">
              Message
              <textarea
                className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                placeholder="Tell us how we can help."
              />
            </label>

            {/* Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white transition duration-300 hover:bg-sky-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
