import { useRef } from "react";
import { Camera, CameraType } from "react-native-camera-kit";

const CameraTesla = () => {
  let camera: any = useRef<Camera>();
  return (
    <Camera
      ref={(ref: any) => (camera = ref)}
      cameraType={CameraType.Back} // front/back(default)
      flashMode="auto"
    />
  );
};

export default CameraTesla;
