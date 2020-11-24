import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList, TouchableOpacity, TextInput} from 'react-native';

import GoalItem from '../components/GoalItem';
import firebase from 'firebase';
//import Card from '../components/Card'

const AddCustomPrompts = props =>{
    const handleEdit=()=>{
        props.setScreen(1);
    }

    const[yesSave, setYesSave]=useState(false);
    const[name, setName]=useState('');

    const handleSetSave=()=>{
        setYesSave(true);
    }
   
    const handleNo=()=>{
        props.setScreen(0);
    }
    const handleCancel=()=>{
        setYesSave(false);
    }
    const handleSave=()=>{
        const db= firebase.database();
        var details=props.qInfo;
        details['name']='';
        details['focus']['answer']='';
        details['gather']['answer']='';
        details['brainstorm']['answer']='';
        details['plan']['answer']='';
        details['reflect']['answer']='';
        db.ref(firebase.auth().currentUser.uid+'/custom-prompts/'+name).set(details);
        props.setScreen(0);
    }
    return   (
    <View style={styles.screen}>
        <Text style={{color: '#05375a',fontSize: 30,fontWeight: 'bold',padding:15}}>Set Saved!</Text>
        <Text style={{color: '#05375a',fontSize: 30}}>Also save custom prompt list for reuse?</Text>
        
        {!yesSave&&<View style={{flexDirection:'row'}}>
            <View style={{padding:15}}>
                <Button  title=' Yes ' onPress={handleSetSave}/>
            </View>
            <View style={{padding:15}}>
                <Button  title=' No ' onPress={handleNo}/>
            </View>
        </View>}
        {yesSave&&<View  style={styles.screen}>
            <TextInput style={{width: '100%', borderColor:'black', borderWidth:1, padding:10,marginBottom: 10}}placeholder='Name this prompt set' value={name} onChangeText={setName}/>
            <View style={{flexDirection:'row'}}>
                <View style={{padding:15}}>
                    <Button  title=' Save ' onPress={handleSave}/>
                </View>
                <View style={{padding:15}}>
                    <Button  title=' Cancel ' onPress={handleCancel}/>
                </View>
            </View>
        </View>}

        <Text style={{fontWeight:'bold', color :'red'}}>Select A Focus</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['focus']['prompt']}</Text>
        </TouchableOpacity>

        <Text style={{fontWeight:'bold', color :'orange'}}>Gather Information</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['gather']['prompt']}</Text>
        </TouchableOpacity>

        <Text style={{fontWeight:'bold', color :'yellow'}}>Brainstorm</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['brainstorm']['prompt']}</Text>
        </TouchableOpacity>

        <Text style={{fontWeight:'bold', color :'green'}}>Evaluate</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['evaluate']['prompt']}</Text>
        </TouchableOpacity>

        <Text style={{fontWeight:'bold', color :'blue'}}>Plan and Act</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['plan']['prompt']}</Text>
        </TouchableOpacity>

        <Text style={{fontWeight:'bold', color :'purple'}}>Reflect</Text>
        <TouchableOpacity onPress={handleEdit}>
            <Text>{props.qInfo['reflect']['prompt']}</Text>
        </TouchableOpacity>

    </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        padding:30,
        alignItems:'center'
      }
});

export default AddCustomPrompts;