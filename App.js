import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';

import firebase from 'firebase'
import FirebaseKeys from './config';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys);
} else {
  firebase.app(); // if already initialized, use that one
}

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(

      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='home-outline' color={tintColor} size={24} />

          }
        },
        // Message: {
        //   screen: HomeScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => <Icon name='chatbubbles-outline' color={tintColor} size={24} />
        //   }
        // },
        Post: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='add-circle-outline'
              // color={'#329e19'}
              color={tintColor}
              size={24}
            // style={{
            //   shadowColor: '#E9446A',
            //   shadowOffset: {
            //     width: 0,
            //     height: 0,
            //     shadowRadius: 10,
            //     shadowOpacity: 0.3
            //   }
            // }} 
            />

          }
        },

        Notification: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='notifications-outline' color={tintColor} size={24} />
          }
        },

        Profile: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='person-outline' color={tintColor} size={24} />
          }
        }
      },

      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler}) => {
            if(navigation.state.key === 'Post'){
              navigation.navigate('postModal')
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#3f882c',
          showLabel: false,
          inactiveTintColor: '#B8BBC4'
        },
        initialRouteName: 'Home'
      }

    ),

    postModal: {
      screen: PostScreen

    }

  },

  {
    mode: 'modal',
    headerMode: 'none',
    // initialRouteName: 'postModal'

  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen

})

export default createAppContainer(
  createSwitchNavigator(
    {

      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack

    },
    {
      initialRouteName: 'Loading'
    }

  )

)