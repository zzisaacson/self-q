import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList} from 'react-native';

import GoalItem from '../components/GoalItem';
import firebase from 'firebase';
//import Card from '../components/Card'

//var once = 0;
const ClassSelectCustom = props =>{
    const [nameList, setNameList]=useState([]);
    const db = firebase.database();
    //if (firebase.auth().currentUser.uid!=once){
      db.ref(firebase.auth().currentUser.uid+'/custom-prompts').once("value", function(snapshot) {

        //console.log(snapshot.val())
        if(snapshot.val()!=null){
          var l =[];
            for (var n in snapshot.val()){
               l.push({'id':n,'value':n});
           }
          setNameList(l);
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
     // once=firebase.auth().currentUser.uid;
  // }


    const removeGoalHandler = goalId=>{
        // props.setQList(currentGoals=>{
        //   return currentGoals.filter((goal)=>goal.id !==goalId);
        // });
        db.ref(firebase.auth().currentUser.uid+'/custom-prompts/'+goalId).once("value", function(snapshot) {
          const data=snapshot.val();
          //console.log(goalId)
          props.setQInfo(data);
          props.setScreen(15);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      }; 
    return   (
    <View style={styles.screen}>
      <Button title  = 'New Custom Set' onPress={()=>props.setScreen(15)}/>
      <FlatList data = {nameList}
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

export default ClassSelectCustom;