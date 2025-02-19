import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 }
});

export default SearchBar;
