import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Characters from '../screens/Characters';
import CharacterDetail from '../screens/CharacterDetail';

import Comics from '../screens/Comics';
import ComicDetail from '../screens/ComicDetail';
import { Dimensions } from 'react-native';
import { nowTheme } from '../constants';
import { Icon } from '../components';


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const cardStyle = { backgroundColor: "#FFFFFF" }
function HomeStack(props) {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: nowTheme.COLORS.ACTIVE,
      }}
      mode="card" headerMode="screen">
      <BottomTab.Screen
        name="Characters"
        component={Characters}
        options={{
          title: 'Karakterler',
          cardStyle,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='planet2x'
              family='NowExtra'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Comics"
        component={Comics}
        options={{
          title: 'Çizgi Romanlar',
          cardStyle,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='paper'
              family='NowExtra'
              size={size}
              color={color}
            />)
        }}
      />
    </BottomTab.Navigator>
  );
}
export default function AppStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        options={{
          header: () => null,
          cardStyle,
          headerTransparent: true
        }}
        name="Home" component={HomeStack} />
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true
        }}
        name="CharacterDetail" component={CharacterDetail} />
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true
        }}
        name="ComicDetail" component={ComicDetail} />
    </Stack.Navigator>
  );
}


