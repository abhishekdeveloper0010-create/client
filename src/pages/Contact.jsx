function Contact() {
  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#f5fbff_0%,#eef9ff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[36px] border border-sky-100 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(2,132,199,0.22)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Contact Us</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Whether you need help with an order, want styling advice, or just want to say hello, our team is here for you.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4">
              <p className="font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">support@appleblossom.com</p>
            </div>
            <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4">
              <p className="font-semibold text-slate-900">Phone</p>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">+91 98765 43210</p>
            </div>
            <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4">
              <p className="font-semibold text-slate-900">Address</p>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">123 Fashion Street, New Delhi, India</p>
            </div>
          </div>
        </div>

        <form className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Name
              <input className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500" placeholder="Your name" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Email
              <input className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500" placeholder="you@example.com" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Message
            <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500" placeholder="Tell us how we can help." />
          </label>
          <button className="mt-6 w-full rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
