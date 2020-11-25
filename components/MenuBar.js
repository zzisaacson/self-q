import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text} from 'react-native';
import Tab from './Tab';
import TabN from './TabN';
import TabG from './TabG';
import TabS from './TabS';

const MenuBar = props =>{
    
    return  (
      
        <View style={{flexDirection:'row'}}>
            <Tab setScreen = {props.setScreen} currScreen ={props.screen} screen={0} colorList={props.colorList}></Tab>
            <TabN setScreen = {props.setScreen} currScreen ={props.screen} screen={1} colorList={props.colorList}></TabN>
            <TabG goClassroom={props.goClassroom} setScreen = {props.setScreen} currScreen ={props.screen} screen={2} colorList={props.colorList}></TabG>
            <TabS setScreen = {props.setScreen} currScreen ={props.screen} screen={3} colorList={props.colorList}></TabS>
      </View>
    );
}



export default MenuBar;