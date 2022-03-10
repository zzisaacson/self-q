import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
import Popup from '../components/Popup';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomDetails = props =>{

    const [toDoOpen, setToDoOpen]= useState(true);
    const [completeOpen, setCompleteOpen]= useState(false);
    //console.log(props.classDetails)
    const assignHandler=()=>{
        props.setScreen(13);
    };
    const handleAssingmentClick=(id)=>{
        // console.log(props.classDetails);
        // console.log(props.classDetails['responses'][id]);
        var qInfo = props.classDetails['assignments']['details'][id];
        if (props.classDetails['responses']!=null&&props.classDetails['responses'][id]!=null&&props.classDetails['responses'][id][firebase.auth().currentUser.uid]!=null){
            qInfo = props.classDetails['responses'][id][firebase.auth().currentUser.uid];
        }

        
        var fInfo={'grade': '',
        'gFeedback':'',
        'focus':'',
        'gather':'',
        'brainstorm':'',
        'evaluate':'',
        'plan':'',
        'reflect':''};
        var targetScreen =16;
        console.log(props.classDetails);
        if (props.classDetails['responses']!=null&&props.classDetails['responses'][id]!=null&&props.classDetails['responses'][id][firebase.auth().currentUser.uid]!=null &&props.classDetails['responses'][id][firebase.auth().currentUser.uid]['feedback']!=null){
            fInfo = props.classDetails['responses'][id][firebase.auth().currentUser.uid]['feedback'];
            targetScreen=21;
        }
        props.setFInfo(fInfo);
        props.setRid(id);
        props.setQInfo(qInfo);
        props.setScreen(targetScreen);
    };

    const ownerAssignmentClicked=(id)=>{
        props.setRid(id);
        props.setScreen(18);
    }
    var isOwned = firebase.auth().currentUser.uid==props.classDetails['owner'];

    var data = props.classDetails['assignments']!=null&&props.classDetails['assignments']['set-list'] !=null?props.classDetails['assignments']['set-list']:[];
    var to_do=[];
    var complete=[];
    if(!isOwned){
        data.forEach(element => {
            if(props.classDetails['responses']==null||props.classDetails['responses'][element['id']]==null||props.classDetails['responses'][element['id']][firebase.auth().currentUser.uid]==null){

                to_do.push(element);
            }
            else{
                complete.push(element);
            }
        });
    }
    // else{
    //     data.forEach(element => {
    //         var existsUngraded =false;
    //         console.log( props.classDetails['responses'][element['id']])
    //         props.classDetails['responses'][element['id']].forEach(([key,value]) => {
    //             if(value==null || value['feedback']==null){
    //                 existsUngraded=true;
    //             }
    //         });
    //         if(existsUngraded){
    //             to_do.push(element);
    //         }
    //         else{
    //             complete.push(element);
    //         }

             
    //     });
    // }

    return   (
    <ScrollView>
    <View style={{height:'100%', width: '100%'}}>
        <View style={{position:'absolute', zIndex: 3, elevation: 3}}>
            {props.link.length!=0&&<Popup   link={props.link} setLink={props.setLink}/>}
        </View>

        <View style={{padding:20}}>
         {props.link.length!=0&&<Popup link={props.link} setLink={props.setLink}/>}
           <Text style={styles.header}>{props.name.replace(props.nickname,'')}</Text>
            {isOwned&&<View>
                <View style={styles.row}> 
                <View style={{margin:15}}>
                    <Button title=' Assign ' onPress={assignHandler}/>  
                </View> 
            </View>
             <FlatList style={{flex:1}}data = {data}
             keyExtractor={(item, index)=> item.id}
             renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={id=>ownerAssignmentClicked(id)}title ={itemData.item.value}/>}/>
             </View>}
             {!isOwned&&<View>
            <View style={styles.row}>
                <TouchableOpacity style={{width:'100%'}} onPress= {()=>setToDoOpen(!toDoOpen)}>
                    <View style = {styles.listItem}>
                        <Text>{(toDoOpen?'v':'>') +'  To-Do  '}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
             toDoOpen&&<View>
                 <FlatList style={{flex:1}}data = {to_do}
             keyExtractor={(item, index)=> item.id}
             renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={(id)=>handleAssingmentClick(id)}title ={itemData.item.value}/>}/>
             {to_do.length==0&&<Text style={{fontStyle:'italic'}}>All done.</Text>}
             </View>

            }

            <View style={styles.row}>
                <TouchableOpacity style={{width:'100%'}} onPress= {()=>setCompleteOpen(!completeOpen)}>
                    <View style = {styles.listItem}>
                        <Text>{(completeOpen?'v':'>') +'  Complete  '}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
             completeOpen&&<FlatList style={{flex:1}}data = {complete}
             keyExtractor={(item, index)=> item.id}
             renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={(id)=>handleAssingmentClick(id)}title ={itemData.item.value}/>}/>

            }
            </View>

            
             
             }


           

    </View>
    
    
    </View>
    </ScrollView>
    );
}

const {width} = Dimensions.get("screen");
const image_width =Math.min( width * 0.45,250);
const styles = StyleSheet.create({
    
    row:{
        flexDirection:'row',
        justifyContent:'center'
    },
    listItem:{ 
        padding:10,
        marginVertical:10,
        backgroundColor: '#add8e6',
        borderColor:'black',
        borderWidth:1
      },
      extraSpacing:{
          marginRight:image_width+15
        },
    header:{
            color: '#05375a',
            fontSize: 30,
            fontWeight: 'bold'
    }
  });
  

export default ClassroomDetails;