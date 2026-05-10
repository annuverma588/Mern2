const mongoose = require("mongoose");
const Product = require("../models/product");

const productFields = [
  "name",
  "description",
  "price",
  "discountPrice",
  "countInStock",
  "category",
  "brand",
  "sizes",
  "colors",
  "collection",
  "material",
  "gender",
  "images",
  "isFeatured",
  "isPublished",
  "tags",
  "dimensions",
  "weight",
  "sku",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createProduct = async (req, res, next) => {
  try {
    const productData = productFields.reduce((data, field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
      return data;
    }, {});

    const product = await Product.create({
      ...productData,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
      page,
    } = req.query;

    const query = {};

    if (collection && collection !== "all") query.collection = collection;
    if (category && category !== "all") query.category = category;
    if (material) query.material = { $in: material.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (color) query.colors = { $in: color.split(",") };
    if (gender && gender !== "all") query.gender = gender;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy === "priceAsc") sort = { price: 1 };
    if (sortBy === "priceDesc") sort = { price: -1 };
    if (sortBy === "rating") sort = { rating: -1 };

    const pageSize = Math.min(Number(limit) || 20, 100);
    const currentPage = Math.max(Number(page) || 1, 1);
    const count = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sort)
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      count: products.length,
      total: count,
      page: currentPage,
      pages: Math.ceil(count / pageSize) || 1,
      products,
    });
  } catch (error) {
    return next(error);
  }
};

const getBestSeller = async (req, res, next) => {
  try {
    const product = await Product.findOne({ isPublished: true }).sort({
      rating: -1,
      numReviews: -1,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No best seller found",
      });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return next(error);
  }
};

const getNewArrivals = async (req, res, next) => {
  try {
    const products = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return next(error);
  }
};

const getSimilarProducts = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const products = await Product.find({
      _id: { $ne: product._id },
      gender: product.gender,
      category: product.category,
      isPublished: true,
    }).limit(4);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    productFields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const createProductReview = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => String(review.user) === String(req.user._id)
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      product.reviews.push({
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      });
    }

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length;

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Review saved successfully",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getBestSeller,
  getNewArrivals,
  getProductById,
  getSimilarProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
};
