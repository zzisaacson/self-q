import React, {useState} from 'react';
import {TouchableOpacity, CheckBox, View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ChildSignUp = props =>{
   // const [done, setDone] = useState(false);
    //console.log('HERE SIR');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]=useState('');
    const [isSelected, setSelection] = useState(false);
    const [nickname, setNickname] = useState(props.nickname);
    const handleSignUp = ()=>{
        console.log("Handle sign up");
        if(isSelected){
            setError('Loading...');
            if(!(/^[a-z0-9]+$/i.test(nickname)) || nickname.length<1){
                setError('Nicknames cannot be empty, and must be alpha-numeric.');
                return;
            }
            setError('Loading...');
            const db = firebase.database();
            db.ref('/nicknames/').once("value", function(snapshot) {
                console.log("Read nicknames");
                var data=snapshot.val();
                if (data!=null && data.hasOwnProperty(nickname.toLocaleLowerCase())){
                    setError('A user with this nickname already exists, please select another.');
                }
                else{
                    console.log("Unique nicknames");
                    const parentUid = firebase.auth().currentUser.uid;
                    const parentNickname = props.nickname;
                    firebase.auth().signOut().then(()=>{
                        console.log("Signed out");
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(()=>{
                            console.log("New user signed up.");
                            props.setNickname(nickname);
                            db.ref('/nicknames/'+nickname.toLocaleLowerCase()).set(firebase.auth().currentUser.uid);
                            props.setNicknameToIds({
                                ...props.nicknameToIds,
                                nickname: firebase.auth().currentUser.uid
                            });
                            const members ={};
                            members[firebase.auth().currentUser.uid]=true;
                            members[parentUid]= true;
                            const name  = props.parentNickname+'-'+nickname;
                            console.log("creating class named: "+name.toLowerCase());
                            db.ref('/classes/'+name.toLowerCase()+'/members').set(members, function(error) {
                                if (error) {
                                console.log("Data could not be saved." + error);
                                } else {
                                    console.log("Data saved successfully.");
                                }
                            });
                            db.ref('/classes/'+name.toLowerCase()+'/owner').set(parentUid);
                            db.ref('/'+parentUid+"/requests/"+name.toLowerCase()).set(true);
                            db.ref('/'+firebase.auth().currentUser.uid+"/requests/"+name.toLowerCase()).set(true);
                            props.setClassName(name.toLowerCase());
                            
                            props.setClassDetails({//'password':password,
                                                'members':[firebase.auth().currentUser.uid, parentUid],
                                                'owner':parentUid
                
                            });
                           // props.setScreen(12);
                            firebase.auth().signOut();
                            props.clearAll();
                        })
                        .catch((error)=>{
                            setError(error+' Please try again.');
                        })});

                    }
              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });

    }
    else{
        setError('You must agree to Privacy Policy and Parental Agreement')
    }
     
    }
    const handleBack = ()=>{
        //setError('This will cancel account creation and lose any progress related to this child you may have saved (Press back again to continue).');
       // if(done){
            props.setScreen(9);
        //}
       //setDone(true);
     
    }
    return   (
    <View style={styles.container}>
        <View style ={styles.header}>
            <Image 
            source={require('../assets/self-q.png')}
            style={styles.logo}
            resizeMode={"stretch"}/>
        </View>
        <View style ={styles.footer}>
            <Text style={styles.title}>Register A New Linked Child Account</Text>
            <Text style = {styles.text}>Create a completely new account for your child so you can assign them question sets. Only one needed per child. This action will save your data and sing you out, you will need to sign back in either as yourself or you new child account.</Text>
            <TextInput placeholder={"Nickname"} value ={nickname} style ={styles.input} onChangeText={setNickname}/>
            <TextInput placeholder={"Child's Email"} style ={styles.input} onChangeText={setEmail}/>
            <TextInput secureTextEntry={true} placeholder={"Child's Password"} style ={styles.input} onChangeText={setPassword}/>
            
            <View style={styles.centerRow}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={ {
                        alignSelf: "center",
                    }}/>
                <Text  style={styles.text}> I agree to the </Text>
                <TouchableOpacity onPress={()=>{props.setScreen(23)}}>
                    <Text  style = {styles.clickableText}>Privacy Policy and Parental Agreement</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{error}</Text>
            <View style={styles.centerRow}>
                <View style={styles.button}>
                    <Button style={styles.button} title="Sign Up" onPress ={()=>handleSignUp()}/>
                </View>
                <View style={styles.button}>
                    <Button style={styles.button} title="Back" onPress ={()=>handleBack()}/>
                </View>
            </View>
        </View>
    </View>
    );
}

const {height,width} = Dimensions.get("screen");
const height_logo = height * 0.14;

const styles = StyleSheet.create({
    container: {
      flex: 2, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    clickableText: {
        color: 'blue',
        fontWeight: 'bold',
        marginTop:10
    },
    smallHeader: {
        color: '#05375a',
        fontWeight: 'bold',
        marginTop:10
    },
    button: {
        width:"20%",
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    input:{
        width: '90%', 
         borderColor:'black', 
         borderWidth:1, 
         padding:5,
        margin: 10
       },
    button:{
        padding:20, 
        width:'40%'
    },
    centerRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center'
    }
  });
  

export default ChildSignUp;