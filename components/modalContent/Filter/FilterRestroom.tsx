import axios from "axios";
import { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { MapsContext, ModalContext, UserContext } from "../../../contexts";
import Checkbox from "expo-checkbox";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";

enum RESTROOM_TYPE {
  WITHBIDET = "WITH BIDET",
  WITHOUTBIDET = "WITHOUT BIDET",
  GENDERNEUTRAL = "GENDERNEUTRAL",
}

const FilterRestrooms = () => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { setRestrooms }: any = useContext(MapsContext);
  const { setIsFilterModalOpen }: any = useContext(ModalContext);

  const [isWithBidet, setIsWithBidet] = useState(false);
  const [isWithoutBidet, setIsWithoutBidet] = useState(false);
  const [isGenderNeutral, setIsGenderNeutral] = useState(false);

  const handleApplyFilter = async () => {
    try {
      const restrooms: any[] = await getRestrooms();

      //   Check if a filter is active
      if (isWithBidet || isWithoutBidet || isGenderNeutral) {
        const filteredRestrooms = restrooms?.filter((restroom: any) => {
          //   CHECK IF RESTROOM TYPE MATCHES FILTER
          if (
            isWithBidet &&
            restroom?.type?.toUpperCase() === RESTROOM_TYPE.WITHBIDET
          ) {
            return true;
          } else if (
            isWithoutBidet &&
            restroom?.type?.toUpperCase() === RESTROOM_TYPE.WITHOUTBIDET
          ) {
            return true;
          } else if (
            isGenderNeutral &&
            restroom?.type?.toUpperCase() === RESTROOM_TYPE.GENDERNEUTRAL
          ) {
            return true;
          }
        });

        setRestrooms(filteredRestrooms);
      } else {
        setRestrooms(restrooms);
      }

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const getType = () => {
    if (isWithBidet) {
      return RESTROOM_TYPE.WITHBIDET;
    } else if (isGenderNeutral) {
      return RESTROOM_TYPE.GENDERNEUTRAL;
    } else {
      return RESTROOM_TYPE.WITHOUTBIDET;
    }
  };

  const getRestrooms = async () => {
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
          onPress={() => setIsWithBidet(!isWithBidet)}
        >
          <Checkbox value={isWithBidet} />
          <Text className="text-lg ml-2">{RESTROOM_TYPE.WITHBIDET}</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex flex-row items-center mb-3"
          onPress={() => setIsWithoutBidet(!isWithoutBidet)}
        >
          <Checkbox value={isWithoutBidet} />
          <Text className="text-lg ml-2">{RESTROOM_TYPE.WITHOUTBIDET}</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          className="flex flex-row items-center mb-3"
          onPress={() => setIsGenderNeutral(!isGenderNeutral)}
        >
          <Checkbox value={isGenderNeutral} />
          <Text className="text-lg ml-2">{RESTROOM_TYPE.GENDERNEUTRAL}</Text>
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

export default FilterRestrooms;
