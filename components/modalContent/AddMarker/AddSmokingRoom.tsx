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

enum SMOKINGROOM_TYPE {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
}

const AddSmokingRoom = (props: Props) => {
  const { setShowTabBar }: any = useContext(UserContext);
  const { getSmokingRooms }: any = useContext(MapsContext);
  const { setIsMarkerModalOpen }: any = useContext(ModalContext);
  const { setIsAddPinClicked, newMarkerCoordinates } = props;
  const [page, setPage] = useState(1);
  const [isIndoor, setIsIndoor] = useState(false);
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleConfirmPin = () => {
    setPage(2);
  };

  const handleClose = () => {
    setIsAddPinClicked(false);
    setIsMarkerModalOpen(false);
    setShowTabBar(true);
  };

  const handleSubmitNewSmokingRoom = async () => {
    try {
      const BODY_DATA = {
        longitude: newMarkerCoordinates[0],
        latitude: newMarkerCoordinates[1],
        description: `description - ${newMarkerCoordinates[0]}`,
        imageAddress: `image - ${newMarkerCoordinates[1]}`,
        type: isIndoor ? SMOKINGROOM_TYPE.INDOOR : SMOKINGROOM_TYPE.OUTDOOR,
      };

      const API_URL = "https://doko-api.onrender.com/api/smoking-areas";

      // await axios.post(API_URL, BODY_DATA);

      handleClose();
      await getSmokingRooms();
    } catch (err) {
      console.log(err);
    }
  };

  const renderModalContent = () => {
    if (page === 1) {
      return (
        <View
          style={{
            backgroundColor: "red",
          }}
        >
          <Button title={`CONFIRM PIN`} onPress={handleConfirmPin}></Button>

          <Button title={`CLOSE MODAL`} onPress={handleClose}></Button>
        </View>
      );
    } else if (page === 2) {
      return (
        <View
          style={{
            backgroundColor: "red",
          }}
        >
          <Button
            title={`HANDLE CAMERA CONFIRMATION`}
            onPress={() => setPage(3)}
          ></Button>

          <Button title={`GO BACK`} onPress={() => setPage(1)}></Button>
        </View>
      );
    } else if (page === 3) {
      return (
        <View
          style={{
            backgroundColor: "red",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setIsIndoor(!isIndoor)}>
            <Checkbox value={isIndoor} />
            <Text>{SMOKINGROOM_TYPE.INDOOR}</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setIsOutdoor(!isOutdoor)}>
            <Checkbox value={isOutdoor} />
            <Text>{SMOKINGROOM_TYPE.OUTDOOR}</Text>
          </TouchableWithoutFeedback>

          <Button
            title={`SUBMIT NEW SMOKING ROOM`}
            onPress={handleSubmitNewSmokingRoom}
          ></Button>

          <Button title={`GO BACK`} onPress={() => setPage(2)}></Button>
        </View>
      );
    }
  };

  return renderModalContent();
};

export default AddSmokingRoom;
