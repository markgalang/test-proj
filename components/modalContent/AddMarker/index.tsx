import { useContext } from "react";
import ScreenTypes from "../../../constants/ScreenTypes";
import { UserContext } from "../../../contexts";
import AddGarbageBin from "./AddGarbageBin";
import AddRestroom from "./AddRestroom";
import AddSmokingRoom from "./AddSmokingRoom";

type Props = {
  setIsAddPinClicked: (bool: boolean) => void;
  newMarkerCoordinates: [any, any];
};

const AddMarkerModalContent = (props: Props) => {
  const { selectedScreen }: any = useContext(UserContext);

  const renderContent = () => {
    if (selectedScreen === ScreenTypes.GARBAGE_BINS) {
      return (
        <AddGarbageBin
          setIsAddPinClicked={props.setIsAddPinClicked}
          newMarkerCoordinates={props.newMarkerCoordinates}
        />
      );
    } else if (selectedScreen === ScreenTypes.RESTROOMS) {
      return (
        <AddRestroom
          setIsAddPinClicked={props.setIsAddPinClicked}
          newMarkerCoordinates={props.newMarkerCoordinates}
        />
      );
    } else if (selectedScreen === ScreenTypes.SMOKING_ROOMS) {
      return (
        <AddSmokingRoom
          setIsAddPinClicked={props.setIsAddPinClicked}
          newMarkerCoordinates={props.newMarkerCoordinates}
        />
      );
    }
  };

  return renderContent();
};

export default AddMarkerModalContent;
