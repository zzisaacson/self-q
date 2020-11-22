import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList} from 'react-native';

import GoalItem from '../components/GoalItem';
import firebase from 'firebase';
//import Card from '../components/Card'

const Home = props =>{
    var serverList = {};
    const db = firebase.database();
    db.ref(firebase.auth().currentUser.uid).once("value", function(snapshot) {
      console.log(snapshot.val())
      if(snapshot.val()!=null){
        props.setNoDB(snapshot.val());
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    const removeGoalHandler = goalId=>{
        props.setQList(currentGoals=>{
          return currentGoals.filter((goal)=>goal.id !==goalId);
        });
      }; 
    return   (
    <View style={styles.screen}>
      <Button title  = 'New Question Set' onPress={()=>props.setScreen(4)}/>
      <FlatList data = {props.qList}
      keyExtractor={(item, index)=> item.id}
      renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={removeGoalHandler}title ={itemData.item.value}/>}/>
    </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        padding:30
      }
});

export default Home;