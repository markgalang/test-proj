import axios from "axios";
import { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { MapsContext, ModalContext, UserContext } from "../../../contexts";
import Checkbox from "expo-checkbox";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
type Props = {
  setIsAddPinClicked: (bool: boolean) => void;
  newMarkerCoordinates: [any, any];
};

enum RESTROOM_TYPE {
  WITHBIDET = "WITH BIDET",
  WITHOUTBIDET = "WITHOUT BIDET",
  GENDERNEUTRAL = "GENDERNEUTRAL",
}

const AddRestroom = (props: Props) => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { getRestrooms }: any = useContext(MapsContext);
  const { setIsMarkerModalOpen }: any = useContext(ModalContext);
  const { setIsAddPinClicked, newMarkerCoordinates } = props;
  const [page, setPage] = useState(1);
  const [isWithBidet, setIsWithBidet] = useState(false);
  const [isWithoutBidet, setIsWithoutBidet] = useState(false);
  const [isGenderNeutral, setIsGenderNeutral] = useState(false);

  const handleConfirmPin = () => {
    setPage(2);
  };

  const handleClose = () => {
    setIsAddPinClicked(false);
    setIsMarkerModalOpen(false);
    setShowTabBar(true);
  };

  const handleSubmitNewRestroom = async () => {
    try {
      const BODY_DATA = {
        longitude: newMarkerCoordinates[0],
        latitude: newMarkerCoordinates[1],
        description: `description - ${newMarkerCoordinates[0]}`,
        imageAddress: `image - ${newMarkerCoordinates[1]}`,
        type: getType(),
      };

      const API_URL = "https://doko-api.onrender.com/api/restrooms";

      await axios.post(API_URL, BODY_DATA);

      handleClose();
      await getRestrooms();
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

  const renderModalContent = () => {
    if (page === 1) {
      return (
        <View className="p-5">
          <View className="bg-gomiBlue rounded-md py-2 mb-1">
            <Button
              color="white"
              title={`CONFIRM PIN`}
              onPress={handleConfirmPin}
            ></Button>
          </View>

          <Button title={`CANCEL`} onPress={handleClose}></Button>
        </View>
      );
    } else if (page === 2) {
      return (
        <View className="p-5">
          <Button
            title={`HANDLE CAMERA CONFIRMATION`}
            onPress={() => setPage(3)}
          ></Button>

          <Button title={`GO BACK`} onPress={() => setPage(1)}></Button>
        </View>
      );
    } else if (page === 3) {
      return (
        <View className="p-5 gap-y-3">
          <Text className="text-gomiGray text-xl mb-2">
            CHOOSE RESTROOM TYPE
          </Text>
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
              title={`SUBMIT`}
              onPress={handleSubmitNewRestroom}
            ></Button>
          </View>

          <Button title={`GO BACK`} onPress={() => setPage(2)}></Button>
        </View>
      );
    }
  };

  return renderModalContent();
};

export default AddRestroom;
