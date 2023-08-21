import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import { Drawer } from "../components";
import Colors from "../constants/Colors";
import {
  LocationProvider,
  UserProvider,
  MapsProvider,
  ModalProvider,
} from "../contexts";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  return (
    <Auth0Provider
      domain="dev-0jrv348lgrj1zthn.jp.auth0.com"
      clientId="9KTmlBSUrmHsKnUNOqyyJ5JLa4YAoPbO"
    >
      <UserProvider>
        <MapsProvider>
          <LocationProvider>
            <ModalProvider>
              <Drawer
                screenOptions={(props) => ({
                  headerShown: true,
                  headerTitle: "",
                  headerTransparent: true,
                  headerShadowVisible: false,
                  headerLeftContainerStyle: {
                    marginLeft: 10,
                  },
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => {
                        const { navigation } = props;
                        navigation.openDrawer();
                      }}
                    >
                      <Ionicons name="menu" size={35} color={Colors.gomiBlue} />
                    </TouchableOpacity>
                  ),
                })}
              >
                <Drawer.Screen
                  name="(tabs)"
                  options={{
                    title: "Maps",
                  }}
                />
                <Drawer.Screen
                  name="modal"
                  options={{
                    drawerItemStyle: {
                      display: "none",
                    },
                  }}
                />
                <Drawer.Screen
                  name="[...missing]"
                  options={{
                    drawerItemStyle: {
                      display: "none",
                    },
                  }}
                />
              </Drawer>
            </ModalProvider>
          </LocationProvider>
        </MapsProvider>
      </UserProvider>
    </Auth0Provider>
  );
}
