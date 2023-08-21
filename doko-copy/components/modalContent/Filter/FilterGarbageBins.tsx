import axios from "axios";
import { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { MapsContext, ModalContext, UserContext } from "../../../contexts";
import Checkbox from "expo-checkbox";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";

enum GARBAGE_TYPE {
  RECYCLABLE = "RECYCLABLE",
  COMBUSTIBLE = "COMBUSTIBLE",
  INCOMBUSTIBLE = "INCOMBUSTIBLE",
}

const FilterGarbageBins = () => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { setGarbageBins }: any = useContext(MapsContext);
  const { setIsFilterModalOpen }: any = useContext(ModalContext);

  const [isRecyclable, setIsRecyclable] = useState(false);
  const [isCombustible, setIsCombustible] = useState(false);
  const [isIncombustible, setIncombustible] = useState(false);

  const handleApplyFilter = async () => {
    try {
      const garbageBins: any[] = await getGarbageBin();

      if (isRecyclable || isCombustible || isIncombustible) {
        const filteredGarbageBins = garbageBins?.filter((bin: any) => {
          // GET ALL GARBAGETYPES OF GARBAGE BIN
          const garbageTypeNames = bin?.garbageTypes?.map((type: any) => {
            return type?.name?.toUpperCase();
          });

          //   CHECK IF GARBAGETYPE IS INCLUDED IN FILTERS
          if (
            isRecyclable &&
            garbageTypeNames?.find(
              (name: string) => name === GARBAGE_TYPE.RECYCLABLE
            )
          ) {
            return true;
          } else if (
            isCombustible &&
            garbageTypeNames?.find(
              (name: string) => name === GARBAGE_TYPE.COMBUSTIBLE
            )
          ) {
            return true;
          } else if (
            isIncombustible &&
            garbageTypeNames?.find(
              (name: string) => name === GARBAGE_TYPE.INCOMBUSTIBLE
            )
          ) {
            return true;
          }
        });

        setGarbageBins(filteredGarbageBins);
      } else {
        setGarbageBins(garbageBins);
      }

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const getGarbageBin = async () => {
    try {
      const response = await axios.get(
        "https://doko-api.onrender.com/api/garbage-bins"
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
          onPress={() => setIsRecyclable(!isRecyclable)}
        >
          <Checkbox value={isRecyclable} />
          <Text className="text-lg ml-2">{GARBAGE_TYPE.RECYCLABLE}</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex flex-row items-center"
          onPress={() => setIsCombustible(!isCombustible)}
        >
          <Checkbox value={isCombustible} />
          <Text className="text-lg ml-2">{GARBAGE_TYPE.COMBUSTIBLE}</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex flex-row items-center mb-3"
          onPress={() => setIncombustible(!isIncombustible)}
        >
          <Checkbox value={isIncombustible} />
          <Text className="text-lg ml-2">{GARBAGE_TYPE.INCOMBUSTIBLE}</Text>
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

export default FilterGarbageBins;
