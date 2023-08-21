import { useContext } from "react";
import ScreenTypes from "../../../constants/ScreenTypes";
import { UserContext } from "../../../contexts";
import FilterGarbageBins from "./FilterGarbageBins";
import FilterRestrooms from "./FilterRestroom";
import FiltersmokingRooms from "./FilterSmokingRooms";

const Filter = () => {
  const { selectedScreen }: any = useContext(UserContext);

  const renderContent = () => {
    if (selectedScreen === ScreenTypes.GARBAGE_BINS) {
      return <FilterGarbageBins />;
    } else if (selectedScreen === ScreenTypes.RESTROOMS) {
      return <FilterRestrooms />;
    } else if (selectedScreen === ScreenTypes.SMOKING_ROOMS) {
      return <FiltersmokingRooms />;
    }
  };

  return renderContent();
};

export default Filter;
