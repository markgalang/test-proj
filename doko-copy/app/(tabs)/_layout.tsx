import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";

import Colors from "../../constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";
import ScreenTypes from "../../constants/ScreenTypes";
import { TouchableWithoutFeedback } from "react-native";

export default function TabLayout() {
  const { setSelectedScreen, showTabBar, selectedScreen }: any =
    useContext(UserContext);

  const getActiveColor = (screenType: string) => {
    return selectedScreen === screenType ? Colors.gomiBlue : Colors.gomiGray;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          paddingBottom: 3,
        },
        tabBarStyle: {
          display: showTabBar ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Garbage Bin",
          tabBarLabelStyle: {
            color: getActiveColor(ScreenTypes.GARBAGE_BINS),
          },
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="trash-bin-sharp"
              color={getActiveColor(ScreenTypes.GARBAGE_BINS)}
              size={20}
            />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => setSelectedScreen(ScreenTypes.GARBAGE_BINS)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="smokingarea"
        options={{
          title: "Smoking Rooms",

          tabBarLabelStyle: {
            color: getActiveColor(ScreenTypes.SMOKING_ROOMS),
          },
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="cigar"
              color={getActiveColor(ScreenTypes.SMOKING_ROOMS)}
              size={20}
            />
          ),
          tabBarButton: (props) => {
            return (
              <View>
                <TouchableOpacity
                  {...props}
                  onPress={() => setSelectedScreen(ScreenTypes.SMOKING_ROOMS)}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="restroom"
        options={{
          title: "Restroom",
          tabBarLabelStyle: {
            color: getActiveColor(ScreenTypes.RESTROOMS),
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="restroom"
              color={getActiveColor(ScreenTypes.RESTROOMS)}
              size={20}
            />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => setSelectedScreen(ScreenTypes.RESTROOMS)}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
