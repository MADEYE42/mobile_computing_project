// frontend/app/screens/ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching product details. Try again.');
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || 'Loading product details...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <FlatList
        data={product.offers}
        keyExtractor={(offer) => offer.website}
        renderItem={({ item }) => (
          <View style={styles.offer}>
            <Text>{item.website} - ${item.price} - Rating: {item.rating}</Text>
            <Button title="Buy Now" onPress={() => window.open(item.affiliateLink, '_blank')} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, marginBottom: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  offer: { padding: 10, borderBottomWidth: 1 }
});