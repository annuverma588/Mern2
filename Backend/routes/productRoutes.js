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


// Get all products (Public)
router.get("/", async (req, res) => {
    try {
        const{
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
        } = req.query;

        let query = {};

        if(collection && collection !== "all"){
             query.collection = collection;}
        if(size && category  !== "all"){
             query.category = category;}
        if (material) {
            query.material ={ $in: material.split(",") };
        }
        if (brand) {
            query.brand ={ $in: brand.split(",") };
        }
        if (size) {
            query.sizes ={ $in: size.split(",") };
        }
        if (color) {
            query.colors ={ $in: [color] };    
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Sorting
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "newest":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }


        // fatech products based on query
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 20);
        res.json(products);

    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send( "Server error" );
    }
});

// Delete a product (Admin only)
router.delete("/best-seller", async (req, res) => {
    try {
        const bestSellers = await Product.findOne().sort({ rating: -1 });
        if (!bestSellers) {
        res.json(bestSellers);
        } else {
        res.status(404).json({ message: "No best sellers found" });
        }
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        res.status(500).send("Server error");
    }
});

//api/products/new-arrivals
router.delete("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.json(newArrivals);
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        res.status(500).send("Server error");
    }
});

// Get a single product by ID (Public)
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send( "Server error" );
    }

});


    // Delete a product (Admin only)
router.delete("/similar/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const similarProducts = await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category
        }).limit(4);
        res.json(similarProducts);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Server error");
    }
});
    



module.exports = router;
