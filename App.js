import React, {useState } from 'react';
import { Platform, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {StackNavigator} from '@react-navigation/stack'

//import GLOBAl from './global'
import Home from './screens/Home' 
import AddSet from './screens/AddSet';
import Login from './screens/Login';
import MenuBar from './components/MenuBar';
import TypeSelect from './screens/TypeSelect';
import Settings from './screens/Settings';
import AddCustomPrompts from './screens/AddCustomPrompts';
import SelectCustom from './screens/SelectCustom';
import SwipeAddSet from './screens/SwipeAddSet';


import firebase from 'firebase';
import SignUp from './screens/SignUp';
import ClassroomMain from './screens/ClassroomMain';
import ClassroomCreate from './screens/ClassroomCreate';
import ClassroomJoin from './screens/ClassroomJoin';
import ClassroomDetails from './screens/ClassDetails';
import AssignTypeSelect from './screens/AssignTypeSelect';
import AssignSet from './screens/AssignSet';
import AddSetClass from './screens/AddSetClass';
import SwipeAddSetClass from './screens/SwipeAddSetClass';
import GradingStudList from './screens/GradingStudList';
import ClassSelectCustom from './screens/ClassSelectCustom';
import LeaveFeedback from './screens/LeaveFeedback';
import ViewFeedback from './screens/ViewFeedback';
import AssignCustom from './screens/AssignCustom';
import Blank from './components/Blank';
import Linking from './components/Linking';
import LinkLoading from './screens/LinkLoading';
global.linked=false;
//import { firebaseConfig } from './components/config';
//import { firebaseConfig } from './components/config';
const firebaseConfig={
  apiKey: "AIzaSyC9IrMEpuMkTgDdYnXzay5PnZ1MYgrqeyU",
  authDomain: "self-q.firebaseapp.com",
  databaseURL: "https://self-q.firebaseio.com",
  projectId: "self-q",
  storageBucket: "self-q.appspot.com",
  messagingSenderId: "815667248878",
  appId: "1:815667248878:web:5101ab55ce6deac57ffdff",
  measurementId: "G-C9QTCTBDSL"
}
var done =false;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.database();
console.disableYellowBox = true;

export default function App() { 

  const [currScreen, setScreen]= useState(2);
  const [courseGoals, setCourseGoals] = useState([]);
  const [colorList, setColorList] = useState(['lightgrey','lightgrey','lightgrey','lightblue']); 
  const [qInfo, setQInfo]= useState(4);
  const [rid, setRid]=useState(0);
  const [classes, setClasses]=useState([]);
  const [classDetails, setClassDetails]=useState([]);
  const [className, setClassName]=useState('');
  const [student, setStudent]=useState('');
  const [fInfo, setFInfo]=useState('');
  const [link, setLink]=useState('');
  const setScreenHandler=s=>{
    console.log('To '+s +' and beyond');
    var cList = [];
    if(s == 0){
      cList= ['lightblue','lightgrey','lightgrey','lightgrey'];
    }
    else if(s==1||s==4||s==7||s==8){
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    else if(s==9||s==10||s==11||s==12||s==13||s==14||s==15||s==16||s==17||s==18){
      cList= ['lightgrey','lightgrey','lightblue','lightgrey'];
    }
    else if(s==2 ||s==3 || s==5) {
      cList= ['lightgrey','lightgrey','lightgrey','lightblue'];
    }
    else{
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    setColorList(cList);
    //console.log(global.nav.current.navigate);
    // if (s==0 ){
    //   global.nav.current.navigate('home');
    // }
    // if (s==1){
    //   global.nav.current.navigate('add-set');
    // }
    // if (s==2){
    //   global.nav.current.navigate('login');
    // }
    // if (s==3){
    //   global.nav.current.navigate('sign-up');
    // }
    // if (s==4){
    //   global.nav.current.navigate('type-select');
    // }
    // if (s==5){
    //   global.nav.current.navigate('settings');
    // }
    // if (s==6){
    //   global.nav.current.navigate('add-custom-prompts');
    // }
    // if (s==7){
    //   global.nav.current.navigate('select-custom');
    // }
    // if (s==8){
    //   global.nav.current.navigate('swipe-add-set');
    // }
    // if (s==9){
    //   global.nav.current.navigate('classroom-main');
    // }
    // if (s==10){
    //   global.nav.current.navigate('classroom-create');
    // }
    // if (s==11){
    //   global.nav.current.navigate('classroom-join');
    // }
    // if (s==12){
    //   global.nav.current.navigate('classroom-data');
    // }
    // if (s==13){
    //   global.nav.current.navigate('assign-type-select');
    // }
    // if (s==14){
    //   global.nav.current.navigate('assign-custom');
    // }
    // if (s==15){
    //   global.nav.current.navigate('assign-set');
    // }
    // if (s==16){
    //   global.nav.current.navigate('add-set-class');
    // }
    // if (s==17){
    //   global.nav.current.navigate('swipe-add-set-class');
    // }
    // if (s==18){
    //   global.nav.current.navigate('grading-stud-list');
    // }
    // if (s==19){
    //   global.nav.current.navigate('class-select-custom');
    // }
    // if (s==20){
    //   global.nav.current.navigate('leave-feedback');
    // }
    // if (s==21){
    //   global.nav.current.navigate('view-feedback');
    // }
    

    return setScreen(s)
  }
 
  global.handleAssignmentLink=(cls, id)=>{
        setClassName(cls);
        db.ref('/classes/'+cls).once("value", function(snapshot) {
            var data=snapshot.val();
            console.log(data)
            setClassDetails(data);

            if(!data['members'].includes(firebase.auth().currentUser.uid)){
              return;
            }
            
            var qInfo = data['assignments']['details'][id];
            if (data['responses']!=null&&data['responses'][id]!=null&&data['responses'][id][firebase.auth().currentUser.uid]!=null){
                qInfo = data['responses'][id][firebase.auth().currentUser.uid];
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
            //console.log(props.classDetails);
            if (data['responses']!=null&&data['responses'][id]!=null&&data['responses'][id][firebase.auth().currentUser.uid]!=null &&data['responses'][id][firebase.auth().currentUser.uid]['feedback']!=null){
                fInfo = data['responses'][id][firebase.auth().currentUser.uid]['feedback'];
                targetScreen=21;
            }
            if(firebase.auth().currentUser.uid==data['owner']){
              targetScreen=18;
            }

            setFInfo(fInfo);
            setRid(id);
            setQInfo(qInfo);
            setScreenHandler(targetScreen);


              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });
            }; 
  
  

  if (currScreen==2 && firebase.auth().currentUser!=null && !done){
    //console.log('memememememe');
    done=true;
    setScreen(0);
  }

  //console.log(firebase.auth().currentUser.uid)
  const setGoalsHanlder=goals=>{
    //console.log(firebase.auth().currentUser.uid)
    db.ref(firebase.auth().currentUser.uid+'/set-list').set(goals);
    return setCourseGoals(goals);
  }

  const goClassroomHandler=()=>{
    var l =[];
    //console.log(firebase.auth().currentUser.uid)
    db.ref('/classes').once("value", function(snapshot) {
      const data=snapshot.val();
      const uid = firebase.auth().currentUser.uid;
      
      for(var c in data){
          
          for(var m in data[c]['members']){
              if(uid==data[c]['members'][m]){
                  l.push({'id':c,'value':c});
              }
          }
          
      }

      console.log(l);
      setClasses(l);
      setScreenHandler(9);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code+' Please try again');
    });
    
  }
  global.goClassroom=goClassroomHandler;
  
  global.setScreen=setScreenHandler;
  const globalUpdate = ()=>{
    console.log('global update, qlist='+courseGoals)
    global.props={currScreen:currScreen,
      setScreen:setScreenHandler,
      courseGoals:courseGoals,
      setCourseGoals:setCourseGoals,
      colorList:colorList,
      setColorList:setColorList,
      qInfo:qInfo,
      setQInfo:setQInfo,
      rid:rid,
      setRid:setRid,
      classes: classes,
      setClasses: setClasses,
      classDetails:classDetails,
      setClassDetails:setClassDetails,
      className: className,
      setClassName:setClassName,
      student:student,
      setStudent:setStudent,
      fInfo: fInfo,
      setFInfo: setFInfo,
      qList:courseGoals,
      setQList:setGoalsHanlder,
      setNoDB:setCourseGoals
  
    }
  }

  global.props={currScreen:currScreen,
    setScreen:setScreenHandler,
    courseGoals:courseGoals,
    setCourseGoals:setCourseGoals,
    colorList:colorList,
    setColorList:setColorList,
    qInfo:qInfo,
    setQInfo:setQInfo,
    rid:rid,
    setRid:setRid,
    classes: classes,
    setClasses: setClasses,
    classDetails:classDetails,
    setClassDetails:setClassDetails,
    className: className,
    setClassName:setClassName,
    student:student,
    setStudent:setStudent,
    fInfo: fInfo,
    setFInfo: setFInfo,
    qList:courseGoals,
    setQList:setGoalsHanlder,
    setNoDB:setCourseGoals,
    globalUpdate:globalUpdate
  };
  const Stack = createStackNavigator();
  const nav = React.useRef(null);
  const navCon =  <NavigationContainer  linking={{ enabled: true }} ref={nav} fallback={<Login setScreen = {setScreenHandler}/>}>
  <Stack.Navigator>
      <Stack.Screen  name="selfq" component={Blank}/>
      <Stack.Screen  name="link" component={Linking}/>
      {/*<Stack.Screen  name="login" component={Login}/>
      <Stack.Screen  name="home" component={Home}/>
      <Stack.Screen  name="add-set" component={AddSet}/>
      <Stack.Screen  name="sign-up" component={SignUp}/>
      <Stack.Screen  name="type-select" component={AddSet}/>
      <Stack.Screen  name="settings" component={Settings}/>
      <Stack.Screen  name="add-custom-prompts" component={AddCustomPrompts}/>
      <Stack.Screen  name="select-custom" component={SelectCustom}/>
      <Stack.Screen  name="swipe-add-set" component={SwipeAddSet}/>
      <Stack.Screen  name="classroom-main" component={ClassroomMain}/>
      <Stack.Screen  name="classroom-create" component={ClassroomCreate}/>
      <Stack.Screen  name="classroom-join" component={ClassroomJoin}/>
      <Stack.Screen  name="classroom-details" component={ClassroomDetails}/>
      <Stack.Screen  name="assign-type-select" component={AssignTypeSelect}/>
      <Stack.Screen  name="assign-custom" component={AssignCustom}/>
      <Stack.Screen  name="assign-set" component={AssignSet}/>
      <Stack.Screen  name="add-set-class" component={AddSetClass}/>
      <Stack.Screen  name="swipe-add-set-class" component={SwipeAddSetClass}/>
      <Stack.Screen  name="grading-stud-list" component={GradingStudList}/>
      <Stack.Screen  name="class-select-custom" component={ClassSelectCustom}/>
      <Stack.Screen  name="leave-feedback" component={LeaveFeedback}/>
<Stack.Screen  name="view-feedback" component={ViewFeedback}/>*/}
      
        
    </Stack.Navigator>
</NavigationContainer>;
  var screen = <Home setRid={setRid} setQInfo={setQInfo } setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder} setNoDB={setCourseGoals}/>
  if (currScreen==1 ){
    screen = <AddSet rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==2){
    screen = <Login setScreen = {setScreenHandler} nav={nav}/>
  }
  if (currScreen==3){
    screen = <SignUp setScreen = {setScreenHandler}/>
  }
  if (currScreen==4){
    screen = <TypeSelect setQInfo={setQInfo} setScreen = {setScreen} setRid={setRid}/>
  }
  if (currScreen==5){
    screen = <Settings setScreen={setScreenHandler}/>
  }
  if (currScreen==6){
    screen = <AddCustomPrompts qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==7){
    screen = <SelectCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==8){
    screen = <SwipeAddSet rid={rid} qList={courseGoals} setQList={setGoalsHanlder} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==9){
    screen = <ClassroomMain setClassName={setClassName} setClassDetails={setClassDetails} classes={classes} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==10){
    screen = <ClassroomCreate classes={classes}setClasses={setClasses} setClassDetails={setClassDetails}setClassName={setClassName}setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==11){
    screen = <ClassroomJoin  classes={classes}setClasses={setClasses}setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==12){
    screen = <ClassroomDetails link={link} setLink={setLink} setFInfo={setFInfo} setRid={setRid} name ={className}classDetails={classDetails} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==13){
    screen = <AssignTypeSelect setQInfo={setQInfo} setScreen = {setScreen} setRid={setRid}/>
  }
  if (currScreen==14){
    screen = <AssignCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==15){
    screen = <AssignSet setLink={setLink} className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} classDetails ={classDetails} setClassDetails={setClassDetails}/>
  }
  if (currScreen==16){
    screen = <AddSetClass classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==17){
    screen = <SwipeAddSetClass classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==18){
    screen = <GradingStudList link={link} setLink={setLink} setFInfo={setFInfo}setStudent={setStudent} rid={rid}classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==19){
    screen = <ClassSelectCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==20){
    screen = <LeaveFeedback fInfo={fInfo} student={student} classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==21){
    screen = <ViewFeedback fInfo={fInfo} student={student} classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==22){
    screen = <LinkLoading/>
  }
  //const navigation = useNavigation();
  //navigation.setParams({setScreen:setScreenHandler});
  //console.log('meme.exe '+navigation.params)
 
  // const l = StackNavigator({
  //   login: {screen: (props)=> <Login {...props} setScreen = {setScreenHandler}/>
  //   },
  //   navigationOptions: ({navigation}) => ({
  //     title: 'Login',
  // })
  // });
  
 //navigationRef.params={a:'a'};
 //console.log(navigationRef.params);



  //screen =<AddCustomSet setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  const {height} = Dimensions.get("screen");
  var space = 0;
  if(Platform.OS=='web'){
    space = (64+50+30)*(height/1080);
  }
  else{
    space=64+50;
  }
  return (
    <View style={{height:height-space+64}}>
      { <View style={{height:height-space}}>
        {screen}
      </View> }
      {navCon}
    <View style={{justifyContent:'flex-end'}}>
      <MenuBar goClassroom={goClassroomHandler} setScreen ={setScreenHandler} screen ={currScreen} colorList={colorList}></MenuBar>
    </View>
    </View>
  );


}
