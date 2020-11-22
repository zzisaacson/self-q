import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';




const TypeSelect = props =>{
    const [academic_open, set_academic_open]= useState(true);
    const [personal_open, set_personal_open]= useState(false);
    const science=()=>{
        props.setQList(['What are my questions? Which question is most relevent?',
                        'How will I gather information? What is my hypothesis?',
                        'How will I design an experiment? How is this similar to previous experiments?',
                        'What is the best choice?',
                        'What do I do first, second ..? Is this working?',
                        'What did I learn? How do I know?']);
        props.setScreen(1);
    }
    const math=()=>{
        props.setQList(['What is the problem asking me to solve?',
                        'How do I know? What do I need to know?',
                        'What are the ways I can solve this problem?',
                        'What is the best way to solve this problem?',
                        'Can I make a model?',
                        'Did it work? How do I know?']);
        props.setScreen(1);
    }
    const reading=()=>{
        props.setQList(["Do I understand what I'm reading? Does what I'm reading make sense?",
                        'What do I understand? What do I need to understand?',
                        'What strategies could help me understand?',
                        'Which is the best choice? Why?',
                        'What should I tr first? Second?',
                        'Is this working? Do I understand now?']);
        props.setScreen(1);
    }

    const writing=()=>{
        props.setQList(['How do I select a topic/focus? What questions do I have about any topic/focus? What are my best questions?',
                        'How will I gather information on some or all of my questions?',
                        'How could I organize and present my information?',
                        'What is the best choice? Why?',
                        'What do I do first, second ..? Is this working?',
                        'What was surprising about my research? What did I do well and how can I improve?']);
        props.setScreen(1);
    }

    const social=()=>{
        props.setQList(['What are my questions? Which question is most relevent?',
                        'How will I gather information? What is my hypothesis?',
                        'How will I design an experiment? How is this similar to previous experiments?',
                        'What is the best choice?',
                        'What do I do first, second ..? Is this working?',
                        'What did I learn? How do I know?']);
        props.setScreen(1);
    }

    const emotional=()=>{
        props.setQList(['What am I feeling?',
                        'What is causing this feeling?',
                        'What strategies can I use to make myself feel better?',
                        'Has this helped me in the past? How did it help? How did I feel after?',
                        'How can I use this strategy?',
                        'Did it work? How do I know? Do I need to go back and try again to solve this?']);
        props.setScreen(1);
    }

    var academic = 
    <React.Fragment>
    <View style={styles.row}>
    <TouchableOpacity onPress={science}>
    <Image style={styles.image}
    source={require('../assets/selfq_science.png')}
    resizeMode={"stretch"}
    /></TouchableOpacity>
    <TouchableOpacity onPress={math}>
    <Image style={styles.image}
    source={require('../assets/selfq_math.png')}
    resizeMode={"stretch"}/>
    </TouchableOpacity>
</View>
<View style={styles.row}>
    <TouchableOpacity onPress={reading}>
    <Image style={styles.image}
    source={require('../assets/selfq_reading.png')}
    resizeMode={"stretch"}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={writing}>
    <Image style={styles.image}
    source={require('../assets/selfq_writing.png')}
    resizeMode={"stretch"}/>
    </TouchableOpacity>
</View></React.Fragment>;
     var personal = 
    <React.Fragment>
    <View style={styles.row}>
    <TouchableOpacity onPress={social}>
    <Image style={styles.image}
    source={require('../assets/selfq_social.png')}
    resizeMode={"stretch"}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={emotional}>
    <Image style={styles.image}
    source={require('../assets/selfq_emotional.png')}
    resizeMode={"stretch"}/>
    </TouchableOpacity>
</View></React.Fragment>;

    return   (
    <View>
        <ScrollView>
            <View style={styles.row}>
                <TouchableOpacity style={styles.dropdown} onPress= {set_academic_open.bind(this,!academic_open)}>
                    <View style = {styles.listItem}>
                        <Text>{(academic_open?'v':'>') +'  Academic'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {academic_open && academic}

            <View style={styles.row}>
                <TouchableOpacity style={styles.dropdown} onPress= {set_personal_open.bind(this,!personal_open)}>
                    <View style = {styles.listItem}>
                        <Text>{(personal_open?'v':'>') +'  Personal'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {personal_open && personal}

        </ScrollView>
    </View>
    );
}

/*

*/
const {width} = Dimensions.get("screen");
const image_width =Math.min( width * 0.45,250);
const styles = StyleSheet.create({
    image:{
        height:image_width,
        width:image_width,
        margin:15
    },
    dropdown:{
        width:2*image_width +30
    },
    row:{
        flexDirection:'row',
        justifyContent:'center'
    },
    listItem:{ 
        padding:10,
        marginVertical:10,
        backgroundColor: '#ccc',
        borderColor:'black',
        borderWidth:1
      }
  });
  

export default TypeSelect;