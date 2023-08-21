import axios from "axios";
import { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { MapsContext, ModalContext, UserContext } from "../../../contexts";
import Checkbox from "expo-checkbox";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";

enum SMOKINGROOM_TYPE {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
}

const FiltersmokingRooms = () => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { setSmokingRooms }: any = useContext(MapsContext);
  const { setIsFilterModalOpen }: any = useContext(ModalContext);

  const [isIndoor, setIsIndoor] = useState(false);
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleApplyFilter = async () => {
    try {
      const smokingRooms: any[] = await getSmokingRooms();

      //   Check if a filter is active
      if (isIndoor || isOutdoor) {
        const filteredSmokingRooms = smokingRooms?.filter((room: any) => {
          //   CHECK IF RESTROOM TYPE MATCHES FILTER
          if (
            isIndoor &&
            room?.type?.toUpperCase() === SMOKINGROOM_TYPE.INDOOR
          ) {
            return true;
          } else if (
            isOutdoor &&
            room?.type?.toUpperCase() === SMOKINGROOM_TYPE.OUTDOOR
          ) {
            return true;
          }
        });

        setSmokingRooms(filteredSmokingRooms);
      } else {
        setSmokingRooms(smokingRooms);
      }

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const getSmokingRooms = async () => {
    try {
      const response = await axios.get(
        "https://doko-api.onrender.com/api/restrooms"
      );

      return response?.data?.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setShowTabBar(true);
    setIsFilterModalOpen(false);
  };

  const renderModalContent = () => {
    return (
      <View className="p-5 gap-y-3">
        <TouchableWithoutFeedback
          className="flex flex-row items-center"
          onPress={() => setIsIndoor(!isIndoor)}
        >
          <Checkbox value={isIndoor} />
          <Text>{SMOKINGROOM_TYPE.INDOOR}</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex flex-row items-center mb-3"
          onPress={() => setIsOutdoor(!isOutdoor)}
        >
          <Checkbox value={isOutdoor} />
          <Text>{SMOKINGROOM_TYPE.OUTDOOR}</Text>
        </TouchableWithoutFeedback>

        <View className="bg-gomiBlue rounded-md py-2 mb-1">
          <Button
            color="white"
            title={`APPLY FILTER`}
            onPress={handleApplyFilter}
          ></Button>
        </View>

        <Button
          color={Colors.gomiDanger}
          title={`CLOSE`}
          onPress={handleClose}
        ></Button>
      </View>
    );
  };

  return renderModalContent();
};

export default FiltersmokingRooms;
