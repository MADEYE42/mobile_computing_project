// frontend/app/screens/ProductDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailsScreen({ navigation, route }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample product data (replace with your actual data)
  const product = {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 99.99,
    description: 'High-quality wireless earbuds with active noise cancellation and premium sound quality. Features include touch controls, voice assistant support, and up to 24 hours of battery life.',
    rating: 4.5,
    reviews: 128,
    colors: ['Black', 'White', 'Blue'],
    images: [
      require('../../assets/images/product1.png'),
      require('../../assets/images/product1.png'),
      require('../../assets/images/product1.png'),
    ],
    features: [
      'Active Noise Cancellation',
      '24-hour Battery Life',
      'Touch Controls',
      'Voice Assistant Support',
    ]
  };

  const handleQuantityChange = (increment) => {
    setQuantity(Math.max(1, quantity + increment));
  };

  const handleAddToCart = () => {
    // Add to cart logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF6B6B" : "#333"} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Images */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {product.images.map((image, index) => (
            <Image 
              key={index}
              source={image}
              style={styles.productImage}
              resizeMode="contain"
            />
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= product.rating ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>

          {/* Color Selection */}
          <Text style={styles.sectionTitle}>Select Color</Text>
          <View style={styles.colorContainer}>
            {product.colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                <Text style={styles.colorText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
            >
              <Ionicons name="remove" size={20} color="#666" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
            >
              <Ionicons name="add" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#6200ee" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <LinearGradient
            colors={['#6200ee', '#9747FF']}
            style={styles.gradient}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: width * 0.8,
  },
  productImage: {
    width: width,
    height: width * 0.8,
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviews: {
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  selectedColor: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  colorText: {
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  description: {
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    color: '#666',
    fontSize: 14,
  },
  totalPrice: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flex: 1,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});