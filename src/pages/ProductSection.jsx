import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

function ProductSection({
  products = [],
  selectedCategory = "All",
  onCategoryChange,
  filterData = {},

  // Backend pagination
  searchTerm = "",
  loading = false,
  currentPage = 1,
  totalPages = 1,
  totalProducts = 0,
  onPageChange,
}) {
  // =====================================================
  // IMAGE URL
  // =====================================================

  const imageURL = import.meta.env.VITE_SERVER_IMAGES_URL;

  // =====================================================
  // FILTER DATA
  // =====================================================

  const categories = filterData.categories?.length
    ? filterData.categories
    : ["All", "Shirts", "Dresses", "Beauty", "Bangles", "Shoes", "Slippers"];

  const brands = filterData.brands?.length
    ? filterData.brands
    : [
        "U.S. POLO ASSN.",
        "Allen Solly",
        "LEVI'S",
        "RED TAPE",
        "VAN HEUSEN",
        "Pepe Jeans",
      ];

  const colors = filterData.colors?.length
    ? filterData.colors
    : ["White", "Multicolor", "Black", "Blue", "Green", "Pink"];

  const fabrics = filterData.fabrics?.length
    ? filterData.fabrics
    : [
        "Cotton Blend",
        "Pure Cotton",
        "Polycotton",
        "Lycra Blend",
        "Satin",
        "Polyester",
      ];

  const sizes = filterData.sizes?.length
    ? filterData.sizes
    : [
        "3XS",
        "2XS",
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
      ];

  const patterns = filterData.patterns?.length
    ? filterData.patterns
    : [
        "Solid",
        "Printed",
        "Checkered",
        "Striped",
        "Self Design",
        "Floral Print",
      ];

  const genders = filterData.genders?.length
    ? filterData.genders
    : ["Men", "Women", "Boys", "Girls", "Unisex"];

  const fits = filterData.fits?.length
    ? filterData.fits
    : [
        "Regular",
        "Slim",
        "Relaxed",
        "Comfort",
        "Oversized",
        "Tailored",
        "Boxy",
        "Super Slim",
        "Comfort Fit",
        "Relaxed Fit",
      ];

  const occasions = filterData.occasions?.length
    ? filterData.occasions
    : [
        "Casual",
        "Formal",
        "Party",
        "Festive",
        "Beach Wear",
        "Wedding",
        "Lounge Wear",
        "Sports",
      ];

  // =====================================================
  // SELECTED FILTERS
  // =====================================================

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [selectedColors, setSelectedColors] = useState([]);

  const [selectedFabrics, setSelectedFabrics] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);

  const [selectedPatterns, setSelectedPatterns] = useState([]);

  const [selectedGenders, setSelectedGenders] = useState([]);

  const [selectedFits, setSelectedFits] = useState([]);

  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState("");

  const [selectedRating, setSelectedRating] = useState("");

  const [selectedDiscount, setSelectedDiscount] = useState("");

  const [selectedOffers, setSelectedOffers] = useState([]);

  const [newArrivals, setNewArrivals] = useState(false);

  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);

  // =====================================================
  // ACCORDION
  // =====================================================

  const [openSections, setOpenSections] = useState({
    categories: true,
    brand: true,
    color: false,
    fabric: false,
    size: false,
    pattern: false,
    gender: false,
    fit: false,
    occasion: false,
    price: true,
    ratings: false,
    discount: false,
    offers: false,
    newArrivals: false,
    availability: false,
  });

  // =====================================================
  // SHOW MORE
  // =====================================================

  const [showMoreBrands, setShowMoreBrands] = useState(false);

  const [showMoreColors, setShowMoreColors] = useState(false);

  const [showMoreFabrics, setShowMoreFabrics] = useState(false);

  const [showMorePatterns, setShowMorePatterns] = useState(false);

  // =====================================================
  // PRICE
  // =====================================================

  const priceOptions = [
    {
      label: "Under ₹300",
      value: "under-300",
      min: 0,
      max: 299,
    },
    {
      label: "₹300 - ₹500",
      value: "300-500",
      min: 300,
      max: 500,
    },
    {
      label: "₹500 - ₹700",
      value: "500-700",
      min: 500,
      max: 700,
    },
    {
      label: "₹700 - ₹1000",
      value: "700-1000",
      min: 700,
      max: 1000,
    },
    {
      label: "₹1000 - ₹1500",
      value: "1000-1500",
      min: 1000,
      max: 1500,
    },
    {
      label: "₹1500+",
      value: "1500-plus",
      min: 1500,
      max: Infinity,
    },
  ];

  // =====================================================
  // RATINGS
  // =====================================================

  const ratings = [
    {
      label: "4★ & above",
      value: "4",
    },
    {
      label: "3★ & above",
      value: "3",
    },
  ];

  // =====================================================
  // DISCOUNTS
  // =====================================================

  const discounts = [
    {
      label: "30% or more",
      value: 30,
    },
    {
      label: "40% or more",
      value: 40,
    },
    {
      label: "50% or more",
      value: 50,
    },
    {
      label: "60% or more",
      value: 60,
    },
    {
      label: "70% or more",
      value: 70,
    },
  ];

  // =====================================================
  // OFFERS
  // =====================================================

  const offers = ["Buy More, Save More", "Special Price"];

  // =====================================================
  // ACCORDION
  // =====================================================

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // =====================================================
  // CHECKBOX
  // =====================================================

  const toggleCheckbox = (value, setter, currentValues) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((item) => item !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  // =====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =====================================================

  useEffect(() => {
    if (onPageChange) {
      onPageChange(1);
    }
  }, [
    selectedBrands,
    selectedColors,
    selectedFabrics,
    selectedSizes,
    selectedPatterns,
    selectedGenders,
    selectedFits,
    selectedOccasions,
    selectedPrice,
    selectedRating,
    selectedDiscount,
    selectedOffers,
    newArrivals,
    includeOutOfStock,
  ]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // ================================================
    // SEARCH
    // ================================================

    if (searchTerm && searchTerm.trim()) {
      const searchText = searchTerm.toLowerCase().trim();

      result = result.filter((product) => {
        const name = String(product.name || product.title || "").toLowerCase();

        const category = String(product.category || "").toLowerCase();

        const brand = String(product.brand || "").toLowerCase();

        const gender = String(product.gender || "").toLowerCase();

        const color = String(product.color || "").toLowerCase();

        const fabric = String(product.fabric || "").toLowerCase();

        const pattern = String(product.pattern || "").toLowerCase();

        const description = String(product.description || "").toLowerCase();

        return (
          name.includes(searchText) ||
          category.includes(searchText) ||
          brand.includes(searchText) ||
          gender.includes(searchText) ||
          color.includes(searchText) ||
          fabric.includes(searchText) ||
          pattern.includes(searchText) ||
          description.includes(searchText)
        );
      });
    }

    // ================================================
    // CATEGORY
    // ================================================

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // ================================================
    // BRAND
    // ================================================

    if (selectedBrands.length) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand),
      );
    }

    // ================================================
    // COLOR
    // ================================================

    if (selectedColors.length) {
      result = result.filter((product) =>
        selectedColors.includes(product.color),
      );
    }

    // ================================================
    // FABRIC
    // ================================================

    if (selectedFabrics.length) {
      result = result.filter((product) =>
        selectedFabrics.includes(product.fabric),
      );
    }

    // ================================================
    // SIZE
    // ================================================

    if (selectedSizes.length) {
      result = result.filter((product) => {
        if (Array.isArray(product.size)) {
          return product.size.some((size) =>
            selectedSizes.includes(String(size)),
          );
        }

        if (typeof product.size === "string") {
          const productSizes = product.size
            .split(",")
            .map((size) => size.trim());

          return productSizes.some((size) => selectedSizes.includes(size));
        }

        return false;
      });
    }

    // ================================================
    // PATTERN
    // ================================================

    if (selectedPatterns.length) {
      result = result.filter((product) =>
        selectedPatterns.includes(product.pattern),
      );
    }

    // ================================================
    // GENDER
    // ================================================

    if (selectedGenders.length) {
      result = result.filter((product) =>
        selectedGenders.includes(product.gender),
      );
    }

    // ================================================
    // FIT
    // ================================================

    if (selectedFits.length) {
      result = result.filter((product) => selectedFits.includes(product.fit));
    }

    // ================================================
    // OCCASION
    // ================================================

    if (selectedOccasions.length) {
      result = result.filter((product) =>
        selectedOccasions.includes(product.occasion),
      );
    }

    // ================================================
    // PRICE
    // ================================================

    if (selectedPrice) {
      const range = priceOptions.find((item) => item.value === selectedPrice);

      if (range) {
        result = result.filter((product) => {
          const price = Number(product.price || 0);

          return price >= range.min && price <= range.max;
        });
      }
    }

    // ================================================
    // RATING
    // ================================================

    if (selectedRating) {
      result = result.filter(
        (product) => Number(product.rating || 0) >= Number(selectedRating),
      );
    }

    // ================================================
    // DISCOUNT
    // ================================================

    if (selectedDiscount) {
      result = result.filter((product) => {
        const oldPrice = Number(product.oldPrice || 0);

        const price = Number(product.price || 0);

        if (!oldPrice || oldPrice <= price) {
          return false;
        }

        const discount = ((oldPrice - price) / oldPrice) * 100;

        return discount >= Number(selectedDiscount);
      });
    }

    // ================================================
    // OFFERS
    // ================================================

    if (selectedOffers.length) {
      result = result.filter((product) => {
        const offer = product.offerType || product.offer || "";

        return selectedOffers.some((selectedOffer) =>
          String(offer).toLowerCase().includes(selectedOffer.toLowerCase()),
        );
      });
    }

    // ================================================
    // NEW ARRIVALS
    // ================================================

    if (newArrivals) {
      result = result.filter(
        (product) =>
          product.newArrival === true || product.newArrival === "true",
      );
    }

    // ================================================
    // AVAILABILITY
    // ================================================

    if (!includeOutOfStock) {
      result = result.filter((product) => {
        if (product.inStock === undefined) {
          return true;
        }

        return (
          product.inStock === true ||
          product.inStock === "true" ||
          product.inStock === 1
        );
      });
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrands,
    selectedColors,
    selectedFabrics,
    selectedSizes,
    selectedPatterns,
    selectedGenders,
    selectedFits,
    selectedOccasions,
    selectedPrice,
    selectedRating,
    selectedDiscount,
    selectedOffers,
    newArrivals,
    includeOutOfStock,
  ]);

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("left-dots");
    }

    let startPage = Math.max(2, currentPage - 1);

    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === 1) {
      startPage = 2;
      endPage = 3;
    }

    if (currentPage === totalPages) {
      startPage = totalPages - 2;

      endPage = totalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("right-dots");
    }

    pages.push(totalPages);

    return pages;
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedPatterns([]);
    setSelectedGenders([]);
    setSelectedFits([]);
    setSelectedOccasions([]);

    setSelectedPrice("");
    setSelectedRating("");
    setSelectedDiscount("");

    setSelectedOffers([]);

    setNewArrivals(false);
    setIncludeOutOfStock(false);

    if (onCategoryChange) {
      onCategoryChange("All");
    }

    if (onPageChange) {
      onPageChange(1);
    }
  };

  // =====================================================
  // CLEAR CATEGORY
  // =====================================================

  const clearCategory = () => {
    if (onCategoryChange) {
      onCategoryChange("All");
    }

    if (onPageChange) {
      onPageChange(1);
    }
  };

  // =====================================================
  // FILTER SECTION
  // =====================================================

  const FilterSection = ({
    title,
    section,
    children,
    onClear,
    hasValue = false,
  }) => {
    const isOpen = openSections[section];

    return (
      <div className="border-b border-slate-200 py-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection(section)}
            className="flex flex-1 items-center justify-between text-left"
          >
            <span className="text-lg font-bold text-slate-800">{title}</span>

            <span className="mr-2 text-2xl text-slate-500">
              {isOpen ? "−" : "+"}
            </span>
          </button>

          {hasValue && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-bold text-cyan-700 hover:text-red-600"
            >
              Clear
            </button>
          )}
        </div>

        {isOpen && <div className="mt-4">{children}</div>}
      </div>
    );
  };

  // =====================================================
  // CHECKBOX
  // =====================================================

  const CheckboxOption = ({ label, checked, onChange }) => (
    <label className="flex cursor-pointer items-center gap-3 py-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 cursor-pointer accent-cyan-800"
      />

      <span className="text-[15px] text-slate-700">{label}</span>
    </label>
  );

  // =====================================================
  // RADIO
  // =====================================================

  const RadioOption = ({ label, checked, onChange, name }) => (
    <label className="flex cursor-pointer items-center gap-3 py-1.5">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 cursor-pointer accent-cyan-800"
      />

      <span className="text-[15px] text-slate-700">{label}</span>
    </label>
  );

  // =====================================================
  // CURRENT PAGE PRODUCT RANGE
  // =====================================================

  const productsPerPage = 8;

  const firstProductIndex = (currentPage - 1) * productsPerPage;

  const lastProductIndex = firstProductIndex + productsPerPage;

  // =====================================================
  // NOTE
  // =====================================================
  //
  // Backend already gives us current page products.
  //
  // Therefore DON'T use:
  //
  // filteredProducts.slice(...)
  //
  // =====================================================

  const currentProducts = filteredProducts;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section className="bg-sky-50 p-4 sm:p-6 lg:p-10">
      <div className="rounded-3xl bg-cyan-800 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[350px_minmax(0,1fr)]">
          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <aside className="h-fit max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl bg-white p-6 sm:p-7 lg:sticky lg:top-24">
            {/* HEADER */}

            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">Filters</h3>

              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-cyan-700 hover:text-red-600"
              >
                Clear All
              </button>
            </div>

            {/* SEARCH */}

            {searchTerm && (
              <div className="mt-4 rounded-lg bg-sky-50 p-3">
                <p className="text-xs text-slate-500">Search results for</p>

                <p className="break-words font-semibold text-cyan-800">
                  "{searchTerm}"
                </p>
              </div>
            )}

            {/* =================================================
                CATEGORIES
            ================================================= */}

            <FilterSection
              title="CATEGORIES"
              section="categories"
              hasValue={selectedCategory !== "All"}
              onClear={clearCategory}
            >
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 py-2"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => {
                      if (onCategoryChange) {
                        onCategoryChange(category);
                      }

                      if (onPageChange) {
                        onPageChange(1);
                      }
                    }}
                    className="h-5 w-5 accent-cyan-800"
                  />

                  <span
                    className={
                      selectedCategory === category
                        ? "font-bold text-cyan-800"
                        : "text-slate-700"
                    }
                  >
                    {category}
                  </span>
                </label>
              ))}
            </FilterSection>

            {/* =================================================
                BRAND
            ================================================= */}

            <FilterSection
              title="Brand"
              section="brand"
              hasValue={selectedBrands.length > 0}
              onClear={() => setSelectedBrands([])}
            >
              {(showMoreBrands ? brands : brands.slice(0, 6)).map((brand) => (
                <CheckboxOption
                  key={brand}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleCheckbox(brand, setSelectedBrands, selectedBrands)
                  }
                />
              ))}

              {brands.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowMoreBrands(!showMoreBrands)}
                  className="mt-2 text-sm font-semibold text-cyan-700 hover:underline"
                >
                  {showMoreBrands ? "Show Less" : `${brands.length - 6} MORE`}
                </button>
              )}
            </FilterSection>

            {/* =================================================
                COLOR
            ================================================= */}

            <FilterSection
              title="Color"
              section="color"
              hasValue={selectedColors.length > 0}
              onClear={() => setSelectedColors([])}
            >
              {(showMoreColors ? colors : colors.slice(0, 6)).map((color) => (
                <CheckboxOption
                  key={color}
                  label={color}
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    toggleCheckbox(color, setSelectedColors, selectedColors)
                  }
                />
              ))}

              {colors.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowMoreColors(!showMoreColors)}
                  className="mt-2 text-sm font-semibold text-cyan-700 hover:underline"
                >
                  {showMoreColors ? "Show Less" : `${colors.length - 6} MORE`}
                </button>
              )}
            </FilterSection>

            {/* =================================================
                FABRIC
            ================================================= */}

            <FilterSection
              title="Fabric"
              section="fabric"
              hasValue={selectedFabrics.length > 0}
              onClear={() => setSelectedFabrics([])}
            >
              {(showMoreFabrics ? fabrics : fabrics.slice(0, 6)).map(
                (fabric) => (
                  <CheckboxOption
                    key={fabric}
                    label={fabric}
                    checked={selectedFabrics.includes(fabric)}
                    onChange={() =>
                      toggleCheckbox(
                        fabric,
                        setSelectedFabrics,
                        selectedFabrics,
                      )
                    }
                  />
                ),
              )}

              {fabrics.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowMoreFabrics(!showMoreFabrics)}
                  className="mt-2 text-sm font-semibold text-cyan-700 hover:underline"
                >
                  {showMoreFabrics ? "Show Less" : `${fabrics.length - 6} MORE`}
                </button>
              )}
            </FilterSection>

            {/* =================================================
                SIZE
            ================================================= */}

            <FilterSection
              title="Size"
              section="size"
              hasValue={selectedSizes.length > 0}
              onClear={() => setSelectedSizes([])}
            >
              {sizes.map((size) => (
                <CheckboxOption
                  key={size}
                  label={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() =>
                    toggleCheckbox(size, setSelectedSizes, selectedSizes)
                  }
                />
              ))}
            </FilterSection>

            {/* =================================================
                PATTERN
            ================================================= */}

            <FilterSection
              title="Pattern"
              section="pattern"
              hasValue={selectedPatterns.length > 0}
              onClear={() => setSelectedPatterns([])}
            >
              {(showMorePatterns ? patterns : patterns.slice(0, 6)).map(
                (pattern) => (
                  <CheckboxOption
                    key={pattern}
                    label={pattern}
                    checked={selectedPatterns.includes(pattern)}
                    onChange={() =>
                      toggleCheckbox(
                        pattern,
                        setSelectedPatterns,
                        selectedPatterns,
                      )
                    }
                  />
                ),
              )}

              {patterns.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowMorePatterns(!showMorePatterns)}
                  className="mt-2 text-sm font-semibold text-cyan-700 hover:underline"
                >
                  {showMorePatterns
                    ? "Show Less"
                    : `${patterns.length - 6} MORE`}
                </button>
              )}
            </FilterSection>

            {/* =================================================
                GENDER
            ================================================= */}

            <FilterSection
              title="Gender"
              section="gender"
              hasValue={selectedGenders.length > 0}
              onClear={() => setSelectedGenders([])}
            >
              {genders.map((gender) => (
                <CheckboxOption
                  key={gender}
                  label={gender}
                  checked={selectedGenders.includes(gender)}
                  onChange={() =>
                    toggleCheckbox(gender, setSelectedGenders, selectedGenders)
                  }
                />
              ))}
            </FilterSection>

            {/* =================================================
                FIT
            ================================================= */}

            <FilterSection
              title="Fit"
              section="fit"
              hasValue={selectedFits.length > 0}
              onClear={() => setSelectedFits([])}
            >
              {fits.map((fit) => (
                <CheckboxOption
                  key={fit}
                  label={fit}
                  checked={selectedFits.includes(fit)}
                  onChange={() =>
                    toggleCheckbox(fit, setSelectedFits, selectedFits)
                  }
                />
              ))}
            </FilterSection>

            {/* =================================================
                OCCASION
            ================================================= */}

            <FilterSection
              title="Occasion"
              section="occasion"
              hasValue={selectedOccasions.length > 0}
              onClear={() => setSelectedOccasions([])}
            >
              {occasions.map((occasion) => (
                <CheckboxOption
                  key={occasion}
                  label={occasion}
                  checked={selectedOccasions.includes(occasion)}
                  onChange={() =>
                    toggleCheckbox(
                      occasion,
                      setSelectedOccasions,
                      selectedOccasions,
                    )
                  }
                />
              ))}
            </FilterSection>

            {/* =================================================
                PRICE
            ================================================= */}

            <FilterSection
              title="Price"
              section="price"
              hasValue={selectedPrice !== ""}
              onClear={() => setSelectedPrice("")}
            >
              {priceOptions.map((price) => (
                <RadioOption
                  key={price.value}
                  name="price"
                  label={price.label}
                  checked={selectedPrice === price.value}
                  onChange={() => setSelectedPrice(price.value)}
                />
              ))}
            </FilterSection>

            {/* =================================================
                RATINGS
            ================================================= */}

            <FilterSection
              title="Customer Ratings"
              section="ratings"
              hasValue={selectedRating !== ""}
              onClear={() => setSelectedRating("")}
            >
              {ratings.map((rating) => (
                <RadioOption
                  key={rating.value}
                  name="rating"
                  label={rating.label}
                  checked={selectedRating === rating.value}
                  onChange={() => setSelectedRating(rating.value)}
                />
              ))}
            </FilterSection>

            {/* =================================================
                DISCOUNT
            ================================================= */}

            <FilterSection
              title="Discount"
              section="discount"
              hasValue={selectedDiscount !== ""}
              onClear={() => setSelectedDiscount("")}
            >
              {discounts.map((discount) => (
                <RadioOption
                  key={discount.value}
                  name="discount"
                  label={discount.label}
                  checked={Number(selectedDiscount) === discount.value}
                  onChange={() => setSelectedDiscount(discount.value)}
                />
              ))}
            </FilterSection>

            {/* =================================================
                OFFERS
            ================================================= */}

            <FilterSection
              title="Offers"
              section="offers"
              hasValue={selectedOffers.length > 0}
              onClear={() => setSelectedOffers([])}
            >
              {offers.map((offer) => (
                <CheckboxOption
                  key={offer}
                  label={offer}
                  checked={selectedOffers.includes(offer)}
                  onChange={() =>
                    toggleCheckbox(offer, setSelectedOffers, selectedOffers)
                  }
                />
              ))}
            </FilterSection>

            {/* =================================================
                NEW ARRIVALS
            ================================================= */}

            <FilterSection
              title="New Arrivals"
              section="newArrivals"
              hasValue={newArrivals}
              onClear={() => setNewArrivals(false)}
            >
              <CheckboxOption
                label="New Arrivals"
                checked={newArrivals}
                onChange={() => setNewArrivals(!newArrivals)}
              />
            </FilterSection>

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <FilterSection
              title="Availability"
              section="availability"
              hasValue={includeOutOfStock}
              onClear={() => setIncludeOutOfStock(false)}
            >
              <CheckboxOption
                label="Include Out of Stock"
                checked={includeOutOfStock}
                onChange={() => setIncludeOutOfStock(!includeOutOfStock)}
              />
            </FilterSection>

            {/* CLEAR ALL */}

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 w-full rounded-lg bg-cyan-800 py-3 font-semibold text-white duration-200 hover:bg-cyan-950"
            >
              Clear All Filters
            </button>
          </aside>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="min-w-0">
            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mb-8 text-white">
              <h2 className="text-3xl font-bold">Products</h2>

              <p className="pt-2 text-[17px] text-slate-100">
                {searchTerm
                  ? `Search results for "${searchTerm}"`
                  : selectedCategory === "All"
                    ? "Browse all products available in the store."
                    : `Showing ${selectedCategory} products.`}
              </p>

              {/* DATABASE TOTAL */}

              <p className="mt-2 text-sm text-slate-200">
                {totalProducts} products in database
              </p>
            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (
              <div className="rounded-3xl bg-white p-14 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-800" />

                <p className="mt-4 text-slate-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              /* =================================================
                  NO PRODUCTS
              ================================================= */

              <div className="rounded-3xl bg-white p-14 text-center">
                <h3 className="text-2xl font-semibold text-slate-800">
                  No products found
                </h3>

                <p className="mt-3 text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-cyan-800 px-6 py-3 font-semibold text-white hover:bg-cyan-950"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <br />
                {/* =================================================
                    PRODUCTS GRID
                ================================================= */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {currentProducts.map((item) => {
                    const price = Number(item.price || 0);

                    const oldPrice = Number(item.oldPrice || 0);

                    const hasOldPrice = oldPrice > price;

                    const discount = hasOldPrice
                      ? Math.round(((oldPrice - price) / oldPrice) * 100)
                      : 0;

                    return (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="block"
                      >
                        <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-md duration-300 hover:scale-[1.03]">
                          {/* IMAGE */}

                          <div className="relative">
                            <img
                              src={`${imageURL}/${item.image}`}
                              alt={item.name || item.title || "Product"}
                              className="h-72 w-full object-cover sm:h-80"
                            />

                            {hasOldPrice && (
                              <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                                {discount}% OFF
                              </span>
                            )}
                          </div>

                          {/* INFO */}

                          <div className="p-4 text-center">
                            <p className="text-sm text-slate-500">
                              {item.category}
                            </p>

                            <h2 className="mt-1 text-xl font-semibold text-slate-900">
                              {item.name || item.title}
                            </h2>

                            <div className="mt-3 flex items-center justify-center gap-3">
                              <span className="text-lg font-bold text-slate-900">
                                ₹{item.price}
                              </span>

                              {hasOldPrice && (
                                <span className="text-slate-400 line-through">
                                  ₹{item.oldPrice}
                                </span>
                              )}
                            </div>

                            {hasOldPrice && (
                              <p className="mt-2 font-semibold text-green-600">
                                {item.offer || `${discount}% OFF`}
                              </p>
                            )}

                            {item.rating && (
                              <p className="mt-2 text-sm font-semibold text-yellow-600">
                                ★ {item.rating}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* =================================================
                    BACKEND PAGINATION
                ================================================= */}
                <br />
                <br />
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => onPageChange(currentPage - 1)}
                      className={`rounded-lg px-4 py-2 font-semibold transition ${
                        currentPage === 1
                          ? "cursor-not-allowed bg-slate-300 text-slate-500"
                          : "bg-white text-cyan-800 hover:bg-cyan-100"
                      }`}
                    >
                      Previous
                    </button>

                    {/* PAGE NUMBERS */}

                    {getPageNumbers().map((page, index) => {
                      if (typeof page === "string") {
                        return (
                          <span
                            key={`${page}-${index}`}
                            className="px-3 py-2 font-bold text-white"
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          type="button"
                          key={page}
                          onClick={() => onPageChange(page)}
                          className={`min-w-[42px] rounded-lg px-4 py-2 font-semibold transition ${
                            currentPage === page
                              ? "bg-cyan-950 text-white"
                              : "bg-white text-cyan-800 hover:bg-cyan-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* NEXT */}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => onPageChange(currentPage + 1)}
                      className={`rounded-lg px-4 py-2 font-semibold transition ${
                        currentPage === totalPages
                          ? "cursor-not-allowed bg-slate-300 text-slate-500"
                          : "bg-white text-cyan-800 hover:bg-cyan-100"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* =================================================
                    PAGE INFO
                ================================================= */}

                {totalPages > 1 && (
                  <div className="pb-3 pt-5 text-center text-white">
                    <p>
                      Page <span className="font-bold">{currentPage}</span> of{" "}
                      <span className="font-bold">{totalPages}</span>
                    </p>

                    <p className="mt-1 text-sm text-slate-200">
                      Showing {firstProductIndex + 1}-
                      {Math.min(lastProductIndex, totalProducts)} of{" "}
                      {totalProducts} products
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
