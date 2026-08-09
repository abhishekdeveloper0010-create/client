function About() {
  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#f5fbff_0%,#eef9ff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-sky-100 bg-white shadow-[0_20px_60px_-20px_rgba(2,132,199,0.22)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">About Us</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              We bring style, comfort, and confidence together.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Apple Blossom is a modern fashion destination focused on everyday elegance, premium quality, and a seamless shopping experience.
              From statement pieces to daily essentials, our carefully curated collection is designed to fit every moment of your life.
            </p>
          </div>

          <div className="bg-sky-50/80 p-6 sm:p-8 lg:p-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Curated Picks</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Hand-selected fashion and beauty essentials for every season.</p>
              </div>
              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Fast Delivery</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Quick and reliable shipping so you can enjoy your favorites sooner.</p>
              </div>
              <div className="rounded-[24px] bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                <h2 className="text-lg font-semibold text-slate-900">Customer First</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">We are committed to making every shopping journey easy and pleasant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
