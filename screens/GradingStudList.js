import React, {useState} from 'react';
import {StatusBar, View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const GradingStudList = props =>{
    const [toDoOpen, setToDoOpen]= useState(true);
    const [completeOpen, setCompleteOpen]= useState(false);
    console.log("http://education.selfq.org/link?assignment="+props.rid+"&class="+props.className.replaceAll(" ", "%20"));
    
    const handleStudClick=(id)=>{
        // console.log('handleStudClick');
        // console.log(props.classDetails);
        // console.log(props.rid);
       
        var qInfo = props.classDetails['assignments']['details'][props.rid];
        if (props.classDetails['responses']!=null&&props.classDetails['responses'][props.rid]!=null&&props.classDetails['responses'][props.rid][id]!=null){
            qInfo = props.classDetails['responses'][props.rid][id];
            
        }

        var fInfo={//'grade': '',
        'gFeedback':'',
        'focus':'',
        'gather':'',
        'brainstorm':'',
        'evaluate':'',
        'plan':'',
        'reflect':''};

        if (props.classDetails['responses']!=null&&props.classDetails['responses'][props.rid]!=null&&props.classDetails['responses'][props.rid][id]!=null &&props.classDetails['responses'][props.rid][id]['feedback']!=null){
            fInfo = props.classDetails['responses'][props.rid][id]['feedback'];
            
        }

        props.setStudent(id);
        props.setQInfo(qInfo);
        props.setFInfo(fInfo);
        props.setScreen(20);
    };


    var data = props.classDetails['names']!=null?props.classDetails['names']:[];

    var to_grade=[];
    var graded=[];
    data.forEach(element => {
        console.log(element);
        if(props.classDetails['responses'][props.rid]==null||props.classDetails['responses'][props.rid][element['id']]==null||props.classDetails['responses'][props.rid][element['id']]['feedback']==null){
           
            to_grade.push(element);
        }
        else{
            console.log(element['value']);
            const el ={'id':element['id'],'value': element['value']};//+" - "+props.classDetails['responses'][props.rid][element['id']]['feedback']['grade']};
            graded.push(el);
        }
    });

    return   (
    <View style={{padding:20}}>
        <StatusBar hidden />
        <View style={{flexDirection:'row'}}>
            <Text style={{color:'grey'}}>{"Link to Share: "}</Text>
            <TextInput style={{flex:1}}value={"http://education.selfq.org/link?assignment="+props.rid+"&class="+props.className.replaceAll(" ", "%20")}/>
        </View> 
         <View style={styles.row}>
                <TouchableOpacity style={{width:'100%'}} onPress= {()=>setToDoOpen(!toDoOpen)}>
                    <View style = {styles.listItem}>
                        <Text>{(toDoOpen?'v':'>') +'  To Provide Feeback  '}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        {
             toDoOpen&&<View>
                 <FlatList style={{flex:1}}data = {to_grade}
             keyExtractor={(item, index)=> item.id}
             renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={(id)=>handleStudClick(id)}title ={itemData.item.value}/>}/>
             {to_grade.length==0&&<Text style={{fontStyle:'italic'}}>All done.</Text>}
             </View>

            }

            <View style={styles.row}>
                <TouchableOpacity style={{width:'100%'}} onPress= {()=>setCompleteOpen(!completeOpen)}>
                    <View style = {styles.listItem}>
                        <Text>{(completeOpen?'v':'>') +'  Feedback Provided  '}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
             completeOpen&&<FlatList style={{flex:1}}data = {graded}
             keyExtractor={(item, index)=> item.id}
             renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={(id)=>handleStudClick(id)}title ={itemData.item.value}/>}/>

            }

        
           

    </View>
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
  

export default GradingStudList;