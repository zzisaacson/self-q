import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firebase from 'firebase';
const Linking = props =>{
    global.linked=true;
    //console.log(global.linked);
    //global.setScreen(9);

    firebase.auth().onAuthStateChanged((user) => {
       // console.log('LOG '+global.linked)
        if (user) {
            console.log(props);
         global.handleAssignmentLink(props.route.params.class,props.route.params.assignment);
        }
     });
    return   (
    <View>
       
    </View>
    );
}


export default Linking;