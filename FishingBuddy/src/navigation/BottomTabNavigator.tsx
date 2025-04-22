import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeDashboardScreen from "../screens/Dashboard";
// import LicenseScreen from "../screens/LicenseScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { SCREENS } from "../constants/screens";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0077b6",
      }}
    >
      <Tab.Screen
        name={SCREENS.Home}
        component={HomeDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      {/* TODO: Implement License Screen */}
      {/* <Tab.Screen
        name={SCREENS.License}
        component={LicenseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={SCREENS.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
