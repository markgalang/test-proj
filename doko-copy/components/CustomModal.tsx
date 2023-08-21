import React, {
  useRef,
  useEffect,
  useState,
  Children,
  PropsWithChildren,
} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CustomModal = ({
  children,
  visible,
  onClose,
}: {
  children: any;
  visible: boolean;
  onClose: any;
}) => {
  const [open, setOpen] = useState(false);
  const offset = useSharedValue(0);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    offset.value = open ? 0 : -25;
    setOpen(visible);
  };

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value * 1, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      className={`absolute mx-3 bottom-0 left-0 right-0 w-max bg-white   ${
        open ? "block" : "hidden"
      }`}
      style={[customSpringStyles, { borderRadius: 10 }]}
    >
      {children}
    </Animated.View>
  );
};

export default CustomModal;
