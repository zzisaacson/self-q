import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';




const AssignTypeSelect = props =>{
    const [academic_open, set_academic_open]= useState(true);
    const [personal_open, set_personal_open]= useState(false);
    const science=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
                        'focus':{
                            'prompt':'What are my questions? Which question is most relevant?',
                            'answer':''
                        },
                        'gather':{
                            'prompt':'How will I gather information? What is my hypothesis?',
                            'answer':''
                        },
                        'brainstorm':{
                            'prompt':  'How will I design an experiment? How is this similar to previous experiments?',
                            'answer':''
                        },
                        'evaluate':{
                            'prompt':'What is the best choice?',
                            'answer':''
                        },
                        'plan':{
                            'prompt':'What do I do first, second ..? Is this working?',
                            'answer':''
                        },
                        'reflect':{
                            'prompt':'What did I learn? How do I know?',
                            'answer':''
                        }});
        props.setScreen(15);
    }
    const math=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
                        'focus':{
                            'prompt':'What is the problem asking me to solve?',
                            'answer':''
                        },
                        'gather':{
                            'prompt':'How do I know? What do I need to know?',
                            'answer':''
                        },
                        'brainstorm':{
                            'prompt':   'What are the ways I can solve this problem?',
                            'answer':''
                        },
                        'evaluate':{
                            'prompt': 'What is the best way to solve this problem?',
                            'answer':''
                        },
                        'plan':{
                            'prompt':  'Can I make a model?',
                            'answer':''
                        },
                        'reflect':{
                            'prompt':'Did it work? How do I know?',
                            'answer':''
                        }});
        props.setScreen(15);
    }
    const reading=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
        'focus':{
            'prompt':"Do I understand what I'm reading? Does what I'm reading make sense?",
            'answer':''
        },
        'gather':{
            'prompt':'What do I understand? What do I need to understand?',
            'answer':''
        },
        'brainstorm':{
            'prompt':   'What strategies could help me understand?',
            'answer':''
        },
        'evaluate':{
            'prompt':  'Which is the best choice? Why?',
            'answer':''
        },
        'plan':{
            'prompt':  'What should I try first? Second?',
            'answer':''
        },
        'reflect':{
            'prompt': 'Is this working? Do I understand now?',
            'answer':''
        }});
  
        props.setScreen(15);
    }

    const writing=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
        'focus':{
            'prompt':'How do I select a topic/focus? What questions do I have about any topic/focus? What are my best questions?',
            'answer':''
        },
        'gather':{
            'prompt': 'How will I gather information on some or all of my questions?',
            'answer':''
        },
        'brainstorm':{
            'prompt':    'How could I organize and present my information?',
            'answer':''
        },
        'evaluate':{
            'prompt':   'What is the best choice? Why?',
            'answer':''
        },
        'plan':{
            'prompt':  'What do I do first, second ..? Is this working?',
            'answer':''
        },
        'reflect':{
            'prompt': 'What was surprising about my research? What did I do well and how can I improve?',
            'answer':''
        }});

        props.setScreen(13);
    }

    const social=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
        'focus':{
            'prompt':'What happened?',
            'answer':''
        },
        'gather':{
            'prompt': 'Who? What? Where? When? Why? How?',
            'answer':''
        },
        'brainstorm':{
            'prompt':    'What am I willing to do? What have a I tried? What might work?',
            'answer':''
        },
        'evaluate':{
            'prompt':   'What are the pros and cons? What is the best choice? ',
            'answer':''
        },
        'plan':{
            'prompt':  'What are my next steps? How can I do it?',
            'answer':''
        },
        'reflect':{
            'prompt': 'Did it work? How do I know? Do I need to go back and try again to solve this?',
            'answer':''
        }});
        props.setScreen(15);
    }

    const emotional=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
        'focus':{
            'prompt':'What am I feeling?',
            'answer':''
        },
        'gather':{
            'prompt': 'What is causing this feeling?',
            'answer':''
        },
        'brainstorm':{
            'prompt':     'What strategies can I use to make myself feel better?',
            'answer':''
        },
        'evaluate':{
            'prompt':   'Has this helped me in the past? How did it help? How did I feel after?',
            'answer':''
        },
        'plan':{
            'prompt':  'How can I use this strategy?',
            'answer':''
        },
        'reflect':{
            'prompt': 'Did it work? How do I know? Do I need to go back and try again to solve this?',
            'answer':''
        }});
        props.setScreen(15);
    }
    const custom=()=>{
        props.setRid(Math.random().toString().substring(2));
        props.setQInfo({'name':'',
        'focus':{
            'prompt':'',
            'answer':''
        },
        'gather':{
            'prompt': '',
            'answer':''
        },
        'brainstorm':{
            'prompt':     '',
            'answer':''
        },
        'evaluate':{
            'prompt':   '',
            'answer':''
        },
        'plan':{
            'prompt':  '',
            'answer':''
        },
        'reflect':{
            'prompt': '',
            'answer':''
        }});
        props.setScreen(15);
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
                <View style={styles.extraSpacing}>
                    <TouchableOpacity onPress={custom}>
                        <Image style={styles.image}
                        source={require('../assets/selfq_custom.png')}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                </View>
            </View>
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
      },
      extraSpacing:{
          marginRight:image_width+15
        }
  });
  

export default AssignTypeSelect;