import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { useContext, useState } from "react";
import { ModalContext, UserContext } from "../contexts";

interface Props {
  handleCentering: () => void;
  handleAddPin: () => void;
}

export function Fab(props: Props) {
  const [open, setOpen] = useState(false);
  const { setIsFilterModalOpen, setIsMarkerModalOpen }: any =
    useContext(ModalContext);
  const { setShowTabBar }: any = useContext(UserContext);

  const animation = new Animated.Value(0);
  const offset = useSharedValue(0);
  const toggleMenu = () => {
    offset.value = open ? 0 : 1;
    setOpen(() => !open);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
    setShowTabBar(false);
  };

  const handlePinClick = () => {
    props.handleAddPin();
    setIsMarkerModalOpen(true);
    setShowTabBar(false);
  };

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value * -10, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const addStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const filterStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  const centerStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -200],
        }),
      },
    ],
  };

  return (
    <View className="absolute w-max h-max right-5 bottom-5">
      <Animated.View
        className={`grid grid-col gap-y-2 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={customSpringStyles}
      >
        <TouchableOpacity onPress={() => props.handleCentering()}>
          <Animated.View
            className="bg-gomiBlue p-4 rounded-full items-center justify-center"

            // style={centerStyle}
          >
            <Feather name="target" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFilterClick}>
          <Animated.View
            className="bg-gomiBlue p-4 rounded-full items-center justify-center"
            // style={filterStyle}
          >
            <Ionicons name="filter" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePinClick}>
          <Animated.View
            className="bg-gomiBlue p-4 rounded-full items-center justify-center"
            // style={addStyle}
          >
            <AntDesign name="plus" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={toggleMenu}>
        <Animated.View
          className={`${
            open ? "bg-white" : "bg-gomiBlue"
          } p-4 rounded-full  items-center justify-center w-100`}
        >
          {open ? (
            <Ionicons name="close" size={30} color="black" />
          ) : (
            <Ionicons name="menu" size={30} color="white" />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
