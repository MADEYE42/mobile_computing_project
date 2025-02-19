// frontend/app/screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching products. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Products</Text>
      <TextInput placeholder="Enter product name" value={query} onChangeText={setQuery} style={styles.input} />
      <Button title="Search" onPress={handleSearch} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={results}
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
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});