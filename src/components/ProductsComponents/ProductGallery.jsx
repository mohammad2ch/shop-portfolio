import { useState } from "react";

const ProductGallery = ({ images = [], alt }) => {
  const [active, setActive] = useState(0); // شماره‌ی عکس بزرگ

  if (images.length === 0) return null;

  // عکس‌های کوچک: همه به‌جز عکسی که الان بزرگ است
  const thumbs = images
    .map((src, i) => ({ src, i }))
    .filter((item) => item.i !== active);

  return (
    <div>
      {/* عکس بزرگ */}
      <div className="overflow-hidden rounded-3xl border border-border bg-linear-to-br from-brand/10 to-fuchsia-500/10">
        <img
          key={images[active]}
          src={images[active]}
          alt={alt}
          className="aspect-square w-full object-contain p-6 transition-opacity duration-500 starting:opacity-0 sm:p-10"
        />
      </div>

      {/* عکس‌های کوچک */}
      <div className="mt-3 grid grid-cols-3 gap-3 sm:mt-4 sm:gap-4">
        {thumbs.map(({ src, i }) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${alt} ${i + 1}`}
            className="overflow-hidden rounded-2xl border border-border bg-linear-to-br from-brand/10 to-fuchsia-500/10 transition-all hover:-translate-y-0.5 hover:border-brand"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;