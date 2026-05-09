const express = require("express");
const Product = require("../models/product");
const {protect, admin} = require("../Middleware/authMiddleware");

const router = express.Router();

// Create a new product (Admin only)

router.post("/", protect, admin, async (req, res) => {
    try {
        const{
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const newProduct = new Product({
           name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors, 
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id, 
        });

        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send( "Server error" );
    }

        });


// Get all products (Public)
router.put("/:id", protect, admin, async (req, res) => {
    try {
         const{
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = await Product.findById(req.params.id)

        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collection = collection || product.collection;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
       
        }
    }
        catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send( "Server error" );
        }
});




module.exports = router;
