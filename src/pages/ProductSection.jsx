import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ProductSection({
  products = [],
  selectedCategory = "All",
  onCategoryChange,
  filterData = {},
}) {
  const imageURL = import.meta.env.VITE_SERVER_IMAGES_URL;

  const [searchParams] = useSearchParams();

  // =====================================================
  // SEARCH FROM HEADER
  // =====================================================

  const searchTerm = searchParams.get("search") || "";

  // =====================================================
  // FILTER VALUES
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
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

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
  // RATING
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
  // DISCOUNT
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
  // CHECKBOX TOGGLE
  // =====================================================

  const toggleCheckbox = (value, setter, currentValues) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((item) => item !== value));
    } else {
      setter([...currentValues, value]);
    }

    setCurrentPage(1);
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // =================================================
    // SEARCH
    // =================================================

    if (searchTerm.trim()) {
      const searchText = searchTerm.toLowerCase().trim();

      result = result.filter((product) => {
        const name = String(product.name || "").toLowerCase();

        const category = String(product.category || "").toLowerCase();

        const brand = String(product.brand || "").toLowerCase();

        const gender = String(product.gender || "").toLowerCase();

        const color = String(product.color || "").toLowerCase();

        const fabric = String(product.fabric || "").toLowerCase();

        const pattern = String(product.pattern || "").toLowerCase();

        return (
          name.includes(searchText) ||
          category.includes(searchText) ||
          brand.includes(searchText) ||
          gender.includes(searchText) ||
          color.includes(searchText) ||
          fabric.includes(searchText) ||
          pattern.includes(searchText)
        );
      });
    }

    // =================================================
    // CATEGORY
    // =================================================

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // =================================================
    // BRAND
    // =================================================

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand),
      );
    }

    // =================================================
    // COLOR
    // =================================================

    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        selectedColors.includes(product.color),
      );
    }

    // =================================================
    // FABRIC
    // =================================================

    if (selectedFabrics.length > 0) {
      result = result.filter((product) =>
        selectedFabrics.includes(product.fabric),
      );
    }

    // =================================================
    // SIZE
    // =================================================

    if (selectedSizes.length > 0) {
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

    // =================================================
    // PATTERN
    // =================================================

    if (selectedPatterns.length > 0) {
      result = result.filter((product) =>
        selectedPatterns.includes(product.pattern),
      );
    }

    // =================================================
    // GENDER
    // =================================================

    if (selectedGenders.length > 0) {
      result = result.filter((product) =>
        selectedGenders.includes(product.gender),
      );
    }

    // =================================================
    // FIT
    // =================================================

    if (selectedFits.length > 0) {
      result = result.filter((product) => selectedFits.includes(product.fit));
    }

    // =================================================
    // OCCASION
    // =================================================

    if (selectedOccasions.length > 0) {
      result = result.filter((product) =>
        selectedOccasions.includes(product.occasion),
      );
    }

    // =================================================
    // PRICE
    // =================================================

    if (selectedPrice) {
      const range = priceOptions.find((item) => item.value === selectedPrice);

      if (range) {
        result = result.filter((product) => {
          const price = Number(product.price || 0);

          return price >= range.min && price <= range.max;
        });
      }
    }

    // =================================================
    // RATING
    // =================================================

    if (selectedRating) {
      result = result.filter(
        (product) => Number(product.rating || 0) >= Number(selectedRating),
      );
    }

    // =================================================
    // DISCOUNT
    // =================================================

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

    // =================================================
    // OFFERS
    // =================================================

    if (selectedOffers.length > 0) {
      result = result.filter((product) => {
        const offer = product.offerType || product.offer || "";

        return selectedOffers.some((selectedOffer) =>
          String(offer).toLowerCase().includes(selectedOffer.toLowerCase()),
        );
      });
    }

    // =================================================
    // NEW ARRIVALS
    // =================================================

    if (newArrivals) {
      result = result.filter(
        (product) =>
          product.newArrival === true || product.newArrival === "true",
      );
    }

    // =================================================
    // AVAILABILITY
    // =================================================

    if (!includeOutOfStock) {
      result = result.filter((product) => {
        if (product.inStock === undefined) {
          return true;
        }

        return product.inStock === true || product.inStock === "true";
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
  // RESET PAGE WHEN FILTER CHANGES
  // =====================================================

  useMemo(() => {
    if (
      currentPage >
      Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))
    ) {
      setCurrentPage(1);
    }
  }, [filteredProducts.length, currentPage]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex,
  );

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CLEAR ALL
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

    setCurrentPage(1);

    if (onCategoryChange) {
      onCategoryChange("All");
    }
  };

  // =====================================================
  // CLEAR INDIVIDUAL FILTER
  // =====================================================

  const clearCategory = () => {
    if (onCategoryChange) {
      onCategoryChange("All");
    }

    setCurrentPage(1);
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
            className="flex-1 flex items-center justify-between text-left"
          >
            <span className="text-lg font-bold text-slate-800">{title}</span>

            <span className="text-2xl text-slate-500 mr-2">
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
    <label className="flex items-center gap-3 py-1.5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-cyan-800 cursor-pointer"
      />

      <span className="text-[15px] text-slate-700">{label}</span>
    </label>
  );

  // =====================================================
  // RADIO
  // =====================================================

  const RadioOption = ({ label, checked, onChange, name }) => (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-cyan-800 cursor-pointer"
      />

      <span className="text-[15px] text-slate-700">{label}</span>
    </label>
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section className="bg-sky-50 p-4 sm:p-6 lg:p-10">
      <div className="bg-cyan-800 rounded-3xl p-4 sm:p-6">
        <br/>
        <div className="grid grid-cols-1 lg:grid-cols-[350px_minmax(0,1fr)] gap-8">
          {/* =================================================
              LEFT FILTER
          ================================================= */}

          <aside className="bg-white rounded-2xl p-6 sm:p-7 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* FILTER HEADER */}

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

            {/* SEARCH RESULT */}

            {searchTerm && (
              <div className="mt-4 rounded-lg bg-sky-50 p-3">
                <p className="text-xs text-slate-500">Search results for</p>

                <p className="font-semibold text-cyan-800 break-words">
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
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => {
                      if (onCategoryChange) {
                        onCategoryChange(category);
                      }

                      setCurrentPage(1);
                    }}
                    className="w-5 h-5 accent-cyan-800"
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
                  className="text-cyan-700 font-semibold text-sm mt-2 hover:underline"
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
                  className="text-cyan-700 font-semibold text-sm mt-2 hover:underline"
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
                  className="text-cyan-700 font-semibold text-sm mt-2 hover:underline"
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
                  className="text-cyan-700 font-semibold text-sm mt-2 hover:underline"
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
                  onChange={() => {
                    setSelectedPrice(price.value);
                    setCurrentPage(1);
                  }}
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
                  onChange={() => {
                    setSelectedRating(rating.value);
                    setCurrentPage(1);
                  }}
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
                  onChange={() => {
                    setSelectedDiscount(discount.value);
                    setCurrentPage(1);
                  }}
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
                onChange={() => {
                  setNewArrivals(!newArrivals);
                  setCurrentPage(1);
                }}
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
                onChange={() => {
                  setIncludeOutOfStock(!includeOutOfStock);
                  setCurrentPage(1);
                }}
              />
            </FilterSection>

            {/* CLEAR ALL */}

            <button
              type="button"
              onClick={resetFilters}
              className="w-full mt-6 bg-cyan-800 text-white py-3 rounded-lg font-semibold hover:bg-cyan-950 duration-200"
            >
              Clear All Filters
            </button>
          </aside>

          {/* =================================================
              RIGHT PRODUCT AREA
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

              <p className="mt-2 text-sm text-slate-200">
                {filteredProducts.length} products found
              </p>
            </div>
            <br/>

            {/* =================================================
                NO PRODUCTS
            ================================================= */}

            {filteredProducts.length === 0 ? (
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
                  className="mt-5 bg-cyan-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-950"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        <div className="rounded-xl overflow-hidden hover:scale-[1.03] duration-300 cursor-pointer bg-white h-full flex flex-col justify-between shadow-md">
                          {/* IMAGE */}

                          <div className="relative">
                            <img
                              src={`${imageURL}/${item.image}`}
                              alt={item.name || "Product"}
                              className="w-full h-72 sm:h-80 object-cover"
                            />

                            {hasOldPrice && (
                              <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                {discount}% OFF
                              </span>
                            )}
                          </div>

                          {/* PRODUCT INFO */}

                          <div className="p-4 text-center">
                            <p className="text-sm text-slate-500">
                              {item.category}
                            </p>

                            <h2 className="text-slate-900 text-xl font-semibold mt-1">
                              {item.name}
                            </h2>

                            <div className="flex items-center justify-center gap-3 mt-3">
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
                              <p className="text-green-600 font-semibold mt-2">
                                {item.offer || `${discount}% OFF`}
                              </p>
                            )}

                            {item.rating && (
                              <p className="mt-2 text-sm text-yellow-600 font-semibold">
                                ★ {item.rating}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
<br/><br/>
                {/* =================================================
                    PAGINATION
                ================================================= */}

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        currentPage === 1
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-white text-cyan-800 hover:bg-cyan-100"
                      }`}
                    >
                      Previous
                    </button>

                    {/* PAGE NUMBERS */}

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => index + 1,
                    ).map((pageNumber) => (
                      <button
                        type="button"
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          currentPage === pageNumber
                            ? "bg-cyan-950 text-white"
                            : "bg-white text-cyan-800 hover:bg-cyan-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    {/* NEXT */}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        currentPage === totalPages
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-white text-cyan-800 hover:bg-cyan-100"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                <p className="text-center text-white pt-4">
                  Page {currentPage} of {totalPages}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
