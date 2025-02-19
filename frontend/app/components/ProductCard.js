
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: 'white', borderRadius: 8, marginBottom: 16 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { marginTop: 8, fontSize: 16, fontWeight: 'bold' }
});

export default ProductCard