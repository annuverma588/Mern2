import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red","Blue","Green","Black","White","Yellow","Pink","Purple","Orange","Gray"];
  const genders = ["Men", "Women"];
  const sizes = ["S", "M", "L", "XL"];
  const materials = ["Cotton", "Wool", "Denim", "Silk"];
  const brands = ["Nike", "Adidas", "Puma", "Zara"];

  // ✅ URL → state sync
  useEffect(() => {
    const params = Object.fromEntries([...searchParams.entries()]);

    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
  }, [searchParams]);

  // ✅ URL update
  const updateURL = (newFilter) => {
    const params = {};

    if (newFilter.category) params.category = newFilter.category;
    if (newFilter.gender) params.gender = newFilter.gender;
    if (newFilter.color) params.color = newFilter.color;

    if (newFilter.size.length) params.size = newFilter.size.join(",");
    if (newFilter.material.length) params.material = newFilter.material.join(",");
    if (newFilter.brand.length) params.brand = newFilter.brand.join(",");

    params.minPrice = newFilter.minPrice;
    params.maxPrice = newFilter.maxPrice;

    setSearchParams(params);
  };

  // ✅ 🔥 Common handler (console + update)
  const handleChange = (type, value, isCheckbox = false) => {
    let updated;

    if (isCheckbox) {
      let arr = [...filter[type]];
      if (arr.includes(value)) {
        arr = arr.filter((item) => item !== value);
      } else {
        arr.push(value);
      }
      updated = { ...filter, [type]: arr };
    } else {
      updated = { ...filter, [type]: value };
    }

    console.log("Changed 👉", { type, value });
    console.log("Updated Filter 👉", updated);

    setFilter(updated);
    updateURL(updated);
  };

  return (
    <div className='p-4'>
      <h3 className='text-xl font-medium mb-4'>Filter</h3>

      {/* Category */}
      <div className='mb-6'>
        <label className='block mb-2'>Category</label>
        {categories.map((cat) => (
          <div key={cat}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filter.category === cat}
              onChange={() => handleChange("category", cat)}
            /> {cat}
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className='mb-6'>
        <label className='block mb-2'>Gender</label>
        {genders.map((gen) => (
          <div key={gen}>
            <input
              type="radio"
              name="gender"
              value={gen}
              checked={filter.gender === gen}
              onChange={() => handleChange("gender", gen)}
            /> {gen}
          </div>
        ))}
      </div>

      {/* Color */}
      <div className='mb-6'>
        <label className='block mb-2'>Color</label>
        <div className='flex gap-2 flex-wrap'>
          {colors.map((col) => (
            <button
              key={col}
              onClick={() => handleChange("color", col)}
              className={`w-8 h-8 rounded-full border ${
                filter.color === col ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: col.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className='mb-6'>
        <label className='block mb-2'>Size</label>
        {sizes.map((s) => (
          <div key={s}>
            <input
              type="checkbox"
              value={s}
              checked={filter.size.includes(s)}
              onChange={() => handleChange("size", s, true)}
            /> {s}
          </div>
        ))}
      </div>

      {/* Material */}
      <div className='mb-6'>
        <label className='block mb-2'>Material</label>
        {materials.map((mat) => (
          <div key={mat}>
            <input
              type="checkbox"
              value={mat}
              checked={filter.material.includes(mat)}
              onChange={() => handleChange("material", mat, true)}
            /> {mat}
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className='mb-6'>
        <label className='block mb-2'>Brand</label>
        {brands.map((b) => (
          <div key={b}>
            <input
              type="checkbox"
              value={b}
              checked={filter.brand.includes(b)}
              onChange={() => handleChange("brand", b, true)}
            /> {b}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className='mb-6'>
        <label className='block mb-2'>Price Range</label>
        <div className='flex gap-2'>
          <input
            type="number"
            value={filter.minPrice}
            onChange={(e) => handleChange("minPrice", Number(e.target.value))}
            className='border p-1 w-1/2'
            placeholder='Min'
          />
          <input
            type="number"
            value={filter.maxPrice}
            onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
            className='border p-1 w-1/2'
            placeholder='Max'
          />
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() => {
          const reset = {
            category: "",
            gender: "",
            color: "",
            size: [],
            material: [],
            brand: [],
            minPrice: 0,
            maxPrice: 100,
          };
          console.log("Reset Filters 👉", reset);
          setFilter(reset);
          setSearchParams({});
        }}
        className='w-full bg-gray-200 py-2 rounded'
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;