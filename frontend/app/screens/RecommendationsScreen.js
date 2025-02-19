// frontend/app/screens/RecommendationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recommendations');
        setRecommendations(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching recommendations. Try again.');
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Products</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});