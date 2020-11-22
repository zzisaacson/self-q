import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList} from 'react-native';

import GoalItem from '../components/GoalItem';
import firebase from 'firebase';
//import Card from '../components/Card'

var once = false;
const Home = props =>{

    const db = firebase.database();
    if (!once){
      db.ref(firebase.auth().currentUser.uid+'/set-list').once("value", function(snapshot) {
        console.log(snapshot.val())
        if(snapshot.val()!=null){
          props.setNoDB(snapshot.val());
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      once=true;
   }


    const removeGoalHandler = goalId=>{
        // props.setQList(currentGoals=>{
        //   return currentGoals.filter((goal)=>goal.id !==goalId);
        // });
        db.ref(firebase.auth().currentUser.uid+'/detail-list/'+goalId).once("value", function(snapshot) {
          const data=snapshot.val();
          props.setRid(goalId);
          props.setQInfo(data);
          props.setScreen(1);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
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