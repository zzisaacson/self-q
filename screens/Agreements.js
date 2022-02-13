import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';


const Agreements= props =>{


    return   (
    <ScrollView>
        <View style={styles.container}>
            <View style ={styles.header}>
                <Image 
                source={require('../assets/self-q.png')}
                style={styles.logo}
                resizeMode={"stretch"}/>
            </View>
            <View style ={styles.footer}>
            <View style={{width:'25%'}}>
                <Button title="Go Back" onPress ={()=>props.setScreen(3)}/>
               </View> 
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style = {styles.text}>{`[January, 2022]

SELf-Q LLC respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect and safeguard your information when you visit our mobile application (the “Application”).   Please read this Privacy Policy carefully.  IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION. 

We reserve the right to make changes to this Privacy Policy at any time and for any reason.  We will alert you about any changes by updating the “Last updated” date of this Privacy Policy.  You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.  

This privacy policy was created using Termly.
COLLECTION OF YOUR INFORMATION
We may collect information about you in a variety of ways.  The information we may collect via the Application depends on the content and materials you use, and includes:  

Personal Data 
Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as responding to SELf-Questions.  If you choose to share data about yourself via your profile, online chat, or other interactive areas of the Application, please be advised that all data you choose to disclose is public.

Derivative Data  
Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including responses to SELf-Questions, will not be shared.  

Financial Data 
Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application. We do not store only any financial information. All financial information is stored by our payment processor,  [Apple App store and Google Play store], and you are encouraged to review their privacy policy and contact them directly for responses to your questions.

Facebook Permissions  
The Application will not by default access your Facebook basic account information.

Data from Social Networks  
User information will not be shared with social networking sites.

Geo-Location Information 
We will not request access or permission to and track location-based information from your mobile device.

Mobile Device Access 
We will not request access or permission to certain features from your mobile device, including your mobile device’s [bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. 

Mobile Device Data 
We will not collect device information such as your mobile device ID number, model, and manufacturer, version of your operating system, phone number, country or location.

Push Notifications 
We will not request to send you push notifications regarding your account or the Application. 

Third-Party Data 
We will not share your information with any third parties.

USE OF YOUR INFORMATION
Having accurate information (name and email) about you permits us to provide you with a smooth, efficient, and customized experience.  Specifically, we may use information collected about you via the Application to: 

Assist law enforcement and respond to subpoena.
Compile anonymous statistical data and analysis for use internally. 
Create and manage your account.
Email you regarding your account or order.
Fulfill and manage purchases, orders, payments, and other transactions related to the Application.
Increase the efficiency and operation of the Application.
Monitor and analyze usage and trends to improve your experience with the Application.
Notify you of updates to the Application.
Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.
Process payments and refunds.
Request feedback and contact you about your use of the Application. 
Resolve disputes and troubleshoot problems.
Respond to product and customer service requests.
Send you a newsletter.
Solicit support for the Application.

DISCLOSURE OF YOUR INFORMATION
We may share information we have collected about you in certain situations. Your information may be disclosed as follows: 

By Law or to Protect Rights 
If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.  This includes exchanging information with other entities for fraud protection and credit risk reduction.

Third-Party Service Providers 
We may share your information with third parties that perform services for us or on our behalf, including and limited to payment processing, data analysis, and email delivery.


Other Third Parties
We may share your information with investors for the purpose of conducting general business analysis. 

Sale or Bankruptcy 
If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity.  If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party.  You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy. 
TRACKING TECHNOLOGIES
Cookies and Web Beacons
We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Application to help customize the Application and improve your experience. When you access the Application, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Application. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser’s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis.
SECURITY OF YOUR INFORMATION
We use administrative, technical, and physical security measures to help protect your personal information.  While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.  Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.  Therefore, we cannot guarantee complete security if you provide personal information.
POLICY FOR CHILDREN
We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below. 
CONTROLS FOR DO-NOT-TRACK FEATURES  
Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.  No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.  If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.  
OPTIONS REGARDING YOUR INFORMATION
[Account Information
You may at any time review or change the information in your account:
Logging into your account settings and updating your account
Contacting us using the contact information provided below
Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.]

Emails and Communications
If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
Noting your preferences at the time you register your account with the Application
Logging into your account settings and updating your preferences.
Contacting us using the contact information provided below
CALIFORNIA PRIVACY RIGHTS
California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.

If you are under 18 years of age, reside in California, and have a registered account with the Application, you have the right to request removal of unwanted data that you publicly post on the Application. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California.  We will make sure the data is not publicly displayed on the Application, but please be aware that the data may not be completely or comprehensively removed from our systems.
CONTACT US
If you have questions or comments about this Privacy Policy, please contact us at:

SELf-Q LLC
7145 A1A S.
Unit 13
Saint Augustine, FL 32080
732.618.7426
rick@selfq.org

`}
</Text>
                <Text style={styles.title}>Parent Agreement</Text>
                <Text style = {styles.text}>{`SELf-Q LLC respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and / or mobile application SELf-Q.   Please read this User Agreement and our linked Privacy Policy carefully.  IF YOU DO NOT AGREE WITH THE TERMS OF THIS USER AGREEMENT and PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION. 





SELf-Q will ensure data collected (users email, password and user access restricted encrypted responses to SELf-Questions) by users is not identifiable by not including names and birthdates. If parent users choose to enroll their children of any age in a “class”, parent users will ensure that the children they enroll do not include any personally identifiable information by creating a list of unique usernames or IDs. SELf-Q LLC will not utilize any of the data stored for users to be able to return to their own answers for reflection or future use. Self-Q will not sell your data.
Security protocols: Access to the data stored is restricted to SELf-Q LLC members only. Access to the participant database is further protected through restriction of use to only SELf-Q staff members whose jobs require management of the website and app only. Individuals using this database receive additional usernames and passwords not given to other SELf-Q members. 
As described by the U.S. Department of Education’s Privacy Technical Assistance Center, it is imperative that any computer-based product establish and maintain rigorous security processes to protect privacy and confidentiality. Since all users are older than 18 years of age and agree to the user agreement terms, the software is FERPA-, COPPA-, and HIPAA-compliant and meet the strictest data security standards, including compliance with Title 21 Code of Federal Regulations Part 11. No protected information will be stored on local devices; all data will be housed on an internet database. 


RESPONSIBILITIES OF THE USER

The USER is older than 18 years of age and agrees to adhere to data confidentiality protocols, such as rostering children with non-identifiable usernames. 
`}
</Text>
                
               
            </View>
        </View>
    </ScrollView>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14*3;

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
        flex: 12,
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
        color: 'black',
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
       
  });
  

export default Agreements;