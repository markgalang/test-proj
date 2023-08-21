import { View, Button, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useContext } from "react";
import { UserContext } from "../../contexts";
import ScreenTypes from "../../constants/ScreenTypes";

enum RESTROOM_TYPE {
  WITHBIDET = "WITH BIDET",
  WITHOUTBIDET = "WITHOUT BIDET",
  GENDERNEUTRAL = "GENDERNEUTRAL",
}

type Props = {
  destinationDetails: any;
  getRouteToDestination: () => void;
  handleCloseModal: () => void;
};

const Navigation = (props: Props) => {
  const { selectedScreen }: any = useContext(UserContext);
  const { destinationDetails, getRouteToDestination, handleCloseModal } = props;

  const { imageAddress, description, type, garbageTypes } =
    destinationDetails || {};

  const renderTitle = () => {
    if (selectedScreen === ScreenTypes.GARBAGE_BINS) {
      return "Garbage Types";
    } else if (selectedScreen === ScreenTypes.RESTROOMS) {
      return "Restroom Type";
    } else if (selectedScreen === ScreenTypes.SMOKING_ROOMS) {
      return "Smoking Room Type";
    }
  };

  const renderTypes = () => {
    if (type) {
      let formattedText: string = "";

      if (type === RESTROOM_TYPE.WITHBIDET) {
        formattedText = "With Bidet";
      } else if (type === RESTROOM_TYPE.GENDERNEUTRAL) {
        formattedText = "Gender Neutral";
      } else {
        formattedText = "Without Bidet";
      }

      return <Text className="text-lg text-gomiGray">{formattedText}</Text>;
    } else if (garbageTypes) {
      return garbageTypes?.map((type: any, index: number) => (
        <Text className="text-lg text-gomiGray" key={index}>
          {type?.name}
        </Text>
      ));
    }
  };

  return (
    <View style={{ borderRadius: 10 }}>
      <Text className="bg-black h-44">{imageAddress}</Text>

      <View className="p-5">
        <Text className="text-3xl text-gomiBlue pb-2">{renderTitle()}</Text>
        {/* <Text>{description}</Text> */}

        {renderTypes()}
        {/* <Text className="text-lg text-gomiGray">{type}</Text> */}
        {/* <Text className="text-lg text-gomiGray">Gender Neutral</Text> */}
        <View className="flex flex-row gap-x-2 justify-end pt-5">
          <View className="bg-red-500 flex flex-row items-center py-1 px-5">
            <Ionicons name="information-circle" size={25} color="white" />
            <Button title={"Report"} color="white"></Button>
          </View>

          <View className="bg-gomiBlue flex flex-row  items-center w-fit py-1 px-5">
            <Ionicons name="navigate" size={25} color="white" />
            <Button
              title={"Navigate"}
              onPress={() => getRouteToDestination()}
              color="white"
            ></Button>
          </View>
        </View>
      </View>

      <View className="absolute top-0 right-0 pr-3 pt-2">
        <Ionicons
          onPress={() => handleCloseModal()}
          name="close"
          size={25}
          color={Colors.gomiGray}
        />
      </View>
    </View>
  );
};

export default Navigation;
