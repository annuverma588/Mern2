const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 🔧 सबसे पहले env load करो
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// 🛡️ MIDDLEWARE
// =============================================
app.use(express.json());
app.use(cors());

// =============================================
// 📡 DATABASE CONNECTION
// =============================================
connectDB();

// =============================================
// 🛣️ ROUTES
// =============================================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running!',
  });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// =============================================
// ❌ 404 HANDLER (FIXED)
// =============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// =============================================
// 🚀 START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
