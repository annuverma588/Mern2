import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: "",
    maxPrice: "",
  });

  const categories = ["Shirts", "Jackets", "Dresses", "Pants"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Gray"];
  const genders = [
    { label: "Men", value: "male" },
    { label: "Women", value: "female" },
    { label: "Unisex", value: "unisex" },
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const materials = ["Cotton", "Wool", "Denim", "Linen"];
  const brands = ["Rabbit", "Bloom"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams.entries()]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
    });
  }, [searchParams]);

  const updateURL = (newFilter) => {
    const params = Object.fromEntries([...searchParams.entries()]);
    delete params.page;

    ["category", "gender", "color", "minPrice", "maxPrice"].forEach((key) => {
      if (newFilter[key]) params[key] = newFilter[key];
      else delete params[key];
    });

    ["size", "material", "brand"].forEach((key) => {
      if (newFilter[key].length) params[key] = newFilter[key].join(",");
      else delete params[key];
    });

    setSearchParams(params);
  };

  const handleChange = (type, value, isCheckbox = false) => {
    let updated;

    if (isCheckbox) {
      const selected = filter[type].includes(value)
        ? filter[type].filter((item) => item !== value)
        : [...filter[type], value];
      updated = { ...filter, [type]: selected };
    } else {
      updated = { ...filter, [type]: value };
    }

    setFilter(updated);
    updateURL(updated);
  };

  const clearFilters = () => {
    setFilter({
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: "",
      maxPrice: "",
    });
    setSearchParams({});
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-xl font-medium">Filter</h3>

      <div className="mb-6">
        <label className="mb-2 block">Category</label>
        {categories.map((category) => (
          <label key={category} className="block">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filter.category === category}
              onChange={() => handleChange("category", category)}
            />{" "}
            {category}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Gender</label>
        {genders.map((gender) => (
          <label key={gender.value} className="block">
            <input
              type="radio"
              name="gender"
              value={gender.value}
              checked={filter.gender === gender.value}
              onChange={() => handleChange("gender", gender.value)}
            />{" "}
            {gender.label}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange("color", color)}
              className={`h-8 w-8 rounded-full border ${
                filter.color === color ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Size</label>
        {sizes.map((size) => (
          <label key={size} className="block">
            <input
              type="checkbox"
              value={size}
              checked={filter.size.includes(size)}
              onChange={() => handleChange("size", size, true)}
            />{" "}
            {size}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Material</label>
        {materials.map((material) => (
          <label key={material} className="block">
            <input
              type="checkbox"
              value={material}
              checked={filter.material.includes(material)}
              onChange={() => handleChange("material", material, true)}
            />{" "}
            {material}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Brand</label>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={() => handleChange("brand", brand, true)}
            />{" "}
            {brand}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="mb-2 block">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filter.minPrice}
            onChange={(event) => handleChange("minPrice", event.target.value)}
            className="w-1/2 border p-1"
            placeholder="Min"
          />
          <input
            type="number"
            value={filter.maxPrice}
            onChange={(event) => handleChange("maxPrice", event.target.value)}
            className="w-1/2 border p-1"
            placeholder="Max"
          />
        </div>
      </div>

      <button onClick={clearFilters} className="w-full rounded bg-gray-200 py-2">
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
