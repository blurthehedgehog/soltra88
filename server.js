const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const applyMiddlewares = require('./middlewares/middleware');
const imageRoutes = require('./routes/imageRoutes');
const likeRoutes = require("./routes/LikeRoutes");
const path = require('path');
const cartRoutes = require("./routes/cartRoute");
const ratingRoutes = require('./routes/rateRoutes');
dotenv.config();

const app = express();

app.use(express.json());
applyMiddlewares(app);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use('/api/rate', ratingRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/users", authRoute);
app.use("/api/cart", cartRoutes);

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});