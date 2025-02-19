# ShopIQ: Virtual Shopping Assistant App

## Overview
ShopIQ is a virtual shopping assistant application designed to simplify online shopping for users. It provides product search, personalized recommendations, and displays product prices and ratings from multiple websites. Users can select their preferred price and rating combination and are redirected to the product's website via an affiliate link. This affiliate system monetizes the app.

---

## Tech Stack

### Frontend
- **React Native (Expo)**: Used to build a mobile app with cross-platform compatibility.

### Backend
- **Node.js**: Provides a lightweight and scalable server-side environment.
- **Express.js**: Handles REST API routing and middleware.

### Database
- **MongoDB**: A NoSQL database to store user data, product information, and affiliate links.

### Additional Tools
- **Axios**: For making API requests from the frontend.
- **JWT (JSON Web Token)**: For secure user authentication.
- **Mongoose**: To interact with MongoDB.
- **Dotenv**: For environment variable management.
- **Nodemon**: To automatically restart the backend server during development.
- **Cors**: To handle cross-origin resource sharing between frontend and backend.

---

## Features

1. **User Authentication**
   - Secure login and registration using JWT.
   - User data encrypted using bcrypt.

2. **Product Search**
   - Search for products across multiple online platforms.
   - Display relevant product details such as price, ratings, and website availability.

3. **Personalized Recommendations**
   - Machine learning logic (future scope) to provide product recommendations based on user preferences and search history.

4. **Affiliate Redirection**
   - Users are redirected to product pages via affiliate links.
   - Enables monetization through affiliate programs.

---

## Project Structure

```
ShopIQ/
│
├── frontend/
│   ├── App.js
│   ├── app/
│   │   ├── navigation/
│   │   │   ├── AppNavigator.js
│   │   │   ├── AuthNavigator.js
│   │   │   └── NavigationContainer.js
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── SearchScreen.js
│   │   │   ├── RecommendationsScreen.js
│   │   │   └── ProductDetailsScreen.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── SearchBar.js
│   │   │   └── ProductCard.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── constants/
│   │       └── colors.js
│   ├── assets/
│   │   └── logo.png
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── recommendationRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── recommendationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── AffiliateLink.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Step-by-Step Guide

### Backend Setup

1. **Initialize Node.js Project**
   ```bash
   mkdir backend && cd backend
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install express mongoose dotenv bcryptjs jsonwebtoken cors body-parser
   npm install --save-dev nodemon
   ```

3. **Create Backend Files**
   - **server.js**: Entry point of the backend.
   - **config/db.js**: MongoDB connection setup.
   - **models/**: Define `User`, `Product`, and `AffiliateLink` schemas.
   - **routes/**: Create routes for authentication, product search, and recommendations.
   - **controllers/**: Implement logic for the routes.
   - **middleware/**: Add authentication middleware using JWT.

4. **Run Backend**
   ```bash
   nodemon server.js
   ```

### Frontend Setup

1. **Initialize Expo Project**
   ```bash
   mkdir frontend && cd frontend
   npx create-expo-app ShopIQ
   ```

2. **Install Dependencies**
   ```bash
   npm install react-navigation react-navigation-stack axios react-native-dotenv
   ```

3. **Create Frontend Files**
   - **App.js**: Main entry point.
   - **navigation/**: Handle navigation using React Navigation.
   - **screens/**: Build screens for login, registration, home, product search, and details.
   - **components/**: Create reusable UI components like headers, search bars, and product cards.
   - **utils/**: Add API call helper functions.

4. **Run Frontend**
   ```bash
   npx expo start
   ```

### Connect Frontend and Backend

- Use **Axios** to make API calls from the frontend to the backend.
- Example API call in `api.js`:

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};
```

---

## Business Model Approach

1. **Monetization through Affiliate Links**
   - Earn a commission whenever users purchase products using the affiliate links provided in the app.

2. **Premium Membership (Future Scope)**
   - Offer a subscription-based premium plan for enhanced features, such as:
     - Advanced recommendations.
     - Ad-free experience.

3. **Ad Revenue**
   - Generate revenue by integrating in-app advertisements.

4. **Partnerships**
   - Partner with e-commerce platforms for exclusive deals and promotions.

---

## Possible Use Cases

1. **Comparison Shopping**
   - Users can compare prices and ratings of products from multiple platforms in one place.

2. **Personalized Recommendations**
   - Users receive recommendations tailored to their preferences and shopping history.

3. **Affiliate Monetization**
   - Businesses can use affiliate links to promote products and increase their revenue.

4. **Simplified Shopping Experience**
   - Users no longer need to visit multiple websites to find the best deals.

---

## Expected Outcomes

1. **User Engagement**
   - A high retention rate due to the simplified and personalized shopping experience.

2. **Revenue Generation**
   - Steady revenue from affiliate marketing and potential premium memberships.

3. **Brand Partnerships**
   - Build partnerships with e-commerce platforms, leading to exclusive affiliate programs.

4. **Customer Insights**
   - Collect anonymized data on user preferences for future product recommendations.

---

## Conclusion
ShopIQ is a comprehensive virtual shopping assistant app designed to enhance the shopping experience. With its focus on price comparison, personalized recommendations, and affiliate-based monetization, it holds potential to revolutionize the way users shop online while creating a sustainable business model.

 