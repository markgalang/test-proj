import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  frameRateIncluded,
  useCameraDevices,
} from "react-native-vision-camera";

const CameraVision = () => {
  const camera: any = useRef<Camera>();
  const devices = useCameraDevices();
  const device: any = devices.back;

  const getPermision = async () => {
    // const cameraPermission = await Camera.getCameraPermissionStatus();
    // const cameraPermission = await Camera.getCameraPermissionStatus();
    // const newCameraPermission = await Camera.requestCameraPermission();
    // console.log({ newCameraPermission });
    console.log("HELLO WORLD", camera);
  };

  useEffect(() => {
    getPermision();
  }, []);

  if (device == null) {
    return null;
  }

  return null;
  // <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
};

export default CameraVision;
