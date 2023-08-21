import { View, Button, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Mapbox, {
  Annotation,
  Callout,
  Camera as CameraView,
  LineLayer,
  MarkerView,
  PointAnnotation,
} from "@rnmapbox/maps";
import { useContext, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import {
  useLocation,
  MapsContext,
  UserContext,
  ModalContext,
} from "../contexts";
import { Fab } from "./Fab";
import ScreenTypes from "../constants/ScreenTypes";
import CustomModal from "./CustomModal";
import { TouchableOpacity } from "react-native-gesture-handler";
// import CameraComponent from "./CameraComponent";
import NavigationModalContent from "./modalContent/Navigation";
import AddMarkerModalContent from "./modalContent/AddMarker";
import FilterModalContent from "./modalContent/Filter";

Mapbox.setAccessToken(
  "pk.eyJ1Ijoiem9tZXJ1IiwiYSI6ImNrdGhmaWVzMzByZTMyb211Y3lvbnF2ZTQifQ.A5YG2Acn1ZDUrYQ8ZK9G5A"
);

export function Map() {
  const { userLocation } = useLocation();
  const {
    garbageBins,
    smokingRooms,
    restrooms,
    destinationDetails,
    setDestinationDetails,
    activeRoute,
    setActiveRoute,
  }: any = useContext(MapsContext);
  const { selectedScreen, setShowTabBar, showTabBar }: any =
    useContext(UserContext);

  const {
    isMarkerModalOpen,
    setIsMarkerModalOpen,
    isNavigationModalOpen,
    setIsNavigationModalOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
  }: any = useContext(ModalContext);

  const cameraRef = useRef<CameraView>(null);
  const [markers, setMarkers] = useState([]);
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [route, setRoute] = useState([]);
  const [isAddPinClicked, setIsAddPinClicked] = useState(false);
  const [newMarkerCoordinates, setNewMarkerCoordinates] = useState([0, 0]);

  useEffect(() => {
    if (selectedScreen === ScreenTypes.GARBAGE_BINS) {
      mapMarkers(garbageBins);
    } else if (selectedScreen === ScreenTypes.SMOKING_ROOMS) {
      mapMarkers(smokingRooms);
    } else if (selectedScreen === ScreenTypes.RESTROOMS) {
      mapMarkers(restrooms);
    }

    setRoute([]);
  }, [selectedScreen, garbageBins, smokingRooms, restrooms]);

  useEffect(() => {
    if (activeRoute.type === selectedScreen) {
      setRoute(activeRoute.route);
    }
  }, [selectedScreen, activeRoute]);

  const handleCentering = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: [userLocation.longitude, userLocation.latitude],
      zoomLevel: 17,
    });
  };

  const MAPBOX_URL = "https://api.mapbox.com/directions/v5/mapbox/driving";

  const getRouteToDestination = async (origin: any, destination: any) => {
    try {
      if (destination.location === 0 && destination.longitude === 0) {
        return null;
      }

      const response = await fetch(
        `${MAPBOX_URL}/${userLocation.longitude},${userLocation.latitude};${destination.longitude},${destination.latitude}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoiem9tZXJ1IiwiYSI6ImNrdGhmaWVzMzByZTMyb211Y3lvbnF2ZTQifQ.A5YG2Acn1ZDUrYQ8ZK9G5A`
      );
      const data = await response.json();
      // console.log("data", data);
      if (data.code === "Ok") {
        const route = data.routes[0].geometry.coordinates;
        // console.log("route", route);
        setRoute(route);
        setActiveRoute({ type: selectedScreen, route });
        setIsNavigationModalOpen(false);
        setShowTabBar(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleMarkerSelect = (markerCoordinates: any) => {
    setIsNavigationModalOpen(true);
    setShowTabBar(false);

    setDestination({
      latitude: markerCoordinates[1],
      longitude: markerCoordinates[0],
    });

    if (selectedScreen === ScreenTypes.GARBAGE_BINS) {
      getSelectedMarkerDetails(garbageBins, markerCoordinates);
    } else if (selectedScreen === ScreenTypes.SMOKING_ROOMS) {
      getSelectedMarkerDetails(smokingRooms, markerCoordinates);
    } else if (selectedScreen === ScreenTypes.RESTROOMS) {
      getSelectedMarkerDetails(restrooms, markerCoordinates);
    }
  };

  const getSelectedMarkerDetails = (
    listOfMarkers: any,
    selectedMarker: any
  ) => {
    const selectedDestinationDetails = listOfMarkers.find((marker: any) => {
      return (
        marker.latitude === selectedMarker[1] &&
        marker.longitude === selectedMarker[0]
      );
    });

    setDestinationDetails(selectedDestinationDetails);
  };

  const renderMarkers = (markerCoordinates: any[]) => {
    const markers = markerCoordinates?.map((coordinates, index) => {
      return (
        <PointAnnotation
          key={`${index}`}
          id={`${index}`}
          coordinate={coordinates}
          onSelected={() => handleMarkerSelect(coordinates)}
        >
          <View
            style={{
              height: 30,
              width: 30,
            }}
          >
            <Ionicons name="location-sharp" size={30} color={Colors.gomiBlue} />
          </View>
        </PointAnnotation>
      );
    });

    return markers;
  };

  const mapMarkers = (addresses: any) => {
    const coordinates = addresses?.map(({ latitude, longitude }) => [
      longitude,
      latitude,
    ]);
    setMarkers(coordinates);
  };

  const handleCloseModal = () => {
    setIsNavigationModalOpen(false);
    setShowTabBar(true);
  };

  return (
    <View className="flex-1 items-center justify-center relative">
      <View className="w-full h-full">
        <Mapbox.MapView
          className="flex-1"
          logoEnabled={false}
          attributionEnabled={false}
        >
          <CameraView
            ref={cameraRef}
            defaultSettings={{
              centerCoordinate: [userLocation.longitude, userLocation.latitude],
              zoomLevel: 12,
            }}
            animationMode="flyTo"
            animationDuration={1000}
          />
          <Mapbox.ShapeSource
            id={"routeSource"}
            lineMetrics={true}
            shape={{
              properties: {},
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: route,
              },
            }}
          >
            <LineLayer
              id="exampleLineLayer"
              style={{
                lineColor: Colors.gomiBlue,
                lineCap: "round",
                lineJoin: "round",
                lineWidth: 3,
              }}
            />
          </Mapbox.ShapeSource>

          {/* USER LOCATION INDICATOR */}
          <MarkerView
            style={{
              backgroundColor: "transparent",
            }}
            coordinate={[userLocation.longitude, userLocation.latitude]}
          >
            <Image
              className="w-[50px] h-[50px] bg-transparent"
              source={{
                uri: "https://uploads-ssl.webflow.com/62c5e0898dea0b799c5f2210/62e8212acc540f291431bad2_location-icon.png",
              }}
            />
          </MarkerView>

          {/* ADD MARKER/ANNOTATION - Only Show if ADD icon is clicked */}
          {isAddPinClicked && (
            <PointAnnotation
              key="addMarkerLocation"
              id="addMarkerLocation"
              coordinate={[userLocation.longitude, userLocation.latitude]}
              onDragEnd={({ geometry }) =>
                setNewMarkerCoordinates([
                  geometry?.coordinates[0],
                  geometry?.coordinates[1],
                ])
              }
              draggable={true}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                }}
              >
                <Ionicons name="pin" size={50} color={Colors.gomiDanger} />
              </View>
            </PointAnnotation>
          )}

          {renderMarkers(markers)}
        </Mapbox.MapView>
      </View>

      {showTabBar && (
        <Fab
          handleCentering={handleCentering}
          handleAddPin={() => {
            setIsAddPinClicked(true);
            handleCentering();
            setNewMarkerCoordinates([
              userLocation.longitude,
              userLocation.latitude,
            ]);
          }}
        />
      )}

      {/* NAVIGATION MODAL */}
      <CustomModal visible={isNavigationModalOpen} onClose={handleCloseModal}>
        <NavigationModalContent
          destinationDetails={destinationDetails}
          getRouteToDestination={() =>
            getRouteToDestination(userLocation, destination)
          }
          handleCloseModal={handleCloseModal}
        />
      </CustomModal>

      {/* FILTER  MODAL */}
      <CustomModal visible={isFilterModalOpen} onClose={handleCloseModal}>
        <FilterModalContent />
      </CustomModal>

      {/* ADD MARKER MODAL */}
      <CustomModal visible={isMarkerModalOpen} onClose={handleCloseModal}>
        <AddMarkerModalContent
          setIsAddPinClicked={setIsAddPinClicked}
          newMarkerCoordinates={newMarkerCoordinates}
        />
      </CustomModal>
    </View>
  );
}
