import axios from "axios";
import { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { MapsContext, ModalContext, UserContext } from "../../../contexts";
import Checkbox from "expo-checkbox";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";

type Props = {
  setIsAddPinClicked: (bool: boolean) => void;
  newMarkerCoordinates: [any, any];
};

enum GARBAGE_TYPE {
  RECYCLABLE = "RECYCLABLE",
  COMBUSTIBLE = "COMBUSTIBLE",
  INCOMBUSTIBLE = "INCOMBUSTIBLE",
}

const GARBAGE_TYPE_INFO = {
  RECYCLABLE: {
    id: "b99470c0-409c-4549-9617-2127ec8595e7",
    name: "Recyclable",
  },
  COMBUSTIBLE: {
    id: "606cd25f-2aaa-4fbe-97b3-bb3ff87fe84d",
    name: "Combustible",
  },
  INCOMBUSTIBLE: {
    id: "b49d8168-cc4e-4fe4-a2c0-dd52318ed4ba",
    name: "Incombustible",
  },
};

const AddGarbageBin = (props: Props) => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { getGarbageBins }: any = useContext(MapsContext);
  const { setIsMarkerModalOpen }: any = useContext(ModalContext);
  const { setIsAddPinClicked, newMarkerCoordinates } = props;
  const [page, setPage] = useState(1);
  const [isRecyclable, setIsRecyclable] = useState(false);
  const [isCombustible, setIsCombustible] = useState(false);
  const [isIncombustible, setIncombustible] = useState(false);

  const handleConfirmPin = () => {
    setPage(2);
  };

  const handleClose = () => {
    setIsAddPinClicked(false);
    setIsMarkerModalOpen(false);
    setShowTabBar(true);
  };

  const handleSubmitNewGarbageBin = async () => {
    try {
      const BODY_DATA = {
        longitude: newMarkerCoordinates[0],
        latitude: newMarkerCoordinates[1],
        description: `description - ${newMarkerCoordinates[0]}`,
        imageAddress: `image - ${newMarkerCoordinates[1]}`,
        garbageTypes: getGarbageTypes(),
      };

      const API_URL = "https://doko-api.onrender.com/api/garbage-bins";

      await axios.post(API_URL, BODY_DATA);

      handleClose();
      await getGarbageBins();
    } catch (err) {
      console.log(err);
    }
  };

  const getGarbageTypes = () => {
    let selectedGarbageTypesInfo = [];

    if (isRecyclable) {
      selectedGarbageTypesInfo.push(GARBAGE_TYPE_INFO.RECYCLABLE);
    }

    if (isCombustible) {
      selectedGarbageTypesInfo.push(GARBAGE_TYPE_INFO.COMBUSTIBLE);
    }

    if (isIncombustible) {
      selectedGarbageTypesInfo.push(GARBAGE_TYPE_INFO.INCOMBUSTIBLE);
    }

    return selectedGarbageTypesInfo;
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

          <Button
            color={Colors.gomiDanger}
            title={`CANCEL`}
            onPress={handleClose}
          ></Button>
        </View>
      );
    } else if (page === 2) {
      return (
        <View>
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
            CHOOSE GARBAGE TYPE
          </Text>
          <TouchableWithoutFeedback
            className="flex flex-row items-center"
            onPress={() => setIsRecyclable(!isRecyclable)}
          >
            <Checkbox value={isRecyclable} />
            <Text className="text-lg ml-2">{GARBAGE_TYPE.RECYCLABLE}</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            className="flex flex-row item-center"
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
              title={`SUBMIT`}
              color="white"
              onPress={handleSubmitNewGarbageBin}
            ></Button>
          </View>

          <Button title={`GO BACK`} onPress={() => setPage(2)}></Button>
        </View>
      );
    }
  };

  return renderModalContent();
};

export default AddGarbageBin;
