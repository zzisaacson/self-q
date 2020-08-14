import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import Home from './screens/Home' 
import AddSet from './screens/AddSet';

export default function App() { 
  
  const [isAddMode, setIsAddMode]= useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  screen = <Home setScreen = {setIsAddMode} qList ={courseGoals} setQList={setCourseGoals}/>
  if (isAddMode){
    screen = <AddSet setScreen = {setIsAddMode} qList ={courseGoals} setQList={setCourseGoals}/>
  }
  return (
    screen
  );
}
