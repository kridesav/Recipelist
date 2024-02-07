import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.list}>
          <Text>{item.strMeal}</Text>
          <Image source={{uri: item.strMealThumb}}	style={{width: 50, height: 50}}	/>
          </View>
        )}
      />
      <TextInput
        style={{textAlign: 'center', height: 30, borderColor: 'gray', borderWidth: 1}}
        placeholder="Search for recipes"
        onChangeText={setSearch}
        value={search}
      />
      <Button title="Search" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    
  },
  list: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});
