const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/product");
const Cart = require("./models/Carts");
const Order = require("./models/Order");
const Wishlist = require("./models/Wishlist");
const users = require("./data/users");
const products = require("./data/products");

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Cart.deleteMany();
    await Order.deleteMany();
    await Wishlist.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find((user) => user.role === "admin");

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Data imported successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeder import failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Cart.deleteMany();
    await Order.deleteMany();
    await Wishlist.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeder destroy failed: ${error.message}`);
    process.exit(1);
  }
};

const command = process.argv[2];

if (command === "destroy") {
  destroyData();
} else if (command === "import") {
  importData();
} else {
  console.log("Please run `npm run seed` or `npm run destroy`");
  mongoose.connection.close();
  process.exit(1);
}
