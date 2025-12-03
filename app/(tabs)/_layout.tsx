import { Redirect, router, Tabs } from "expo-router";
import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";

// -------------------------
// Memoized NavButton
// -------------------------
const NavButton = React.memo(function NavButton({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
    >
      <Ionicons name={icon} size={22} color="#000" />
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { width } = useWindowDimensions();

  // -------------------------
  // Memoize screen size check
  // -------------------------
  const isLargeScreen = useMemo(() => width >= 768, [width]);

  if (!user) return <Redirect href="/login" />;

  // -------------------------
  // Memoize navigation handlers
  // -------------------------
  const goHome = useCallback(() => router.push("/(tabs)"), []);
  const goPost = useCallback(() => router.push("/createpost"), []);
  const goProfile = useCallback(() => router.push("/explore"), []);

  // -------------------------
  // Memoized TabBar Icons
  // -------------------------
  const homeIcon = useCallback(
   ({ color }: { color: string }) => <Ionicons name="home-outline" size={24} color={color} />,
    []
  );

  const postIcon = useCallback(
   ({ color }: { color: string }) => (
      <Ionicons name="add-circle-outline" size={24} color={color} />
    ),
    []
  );

  const exploreIcon = useCallback(
   ({ color }: { color: string }) => (
      <Ionicons name="person-circle-outline" size={26} color={color} />
    ),
    []
  );

  // -------------------------
  // WEB / LARGE SCREEN NAVBAR
  // -------------------------
  if (isLargeScreen) {
    return (
      <View style={{ flex: 1 }}>
        {/* TOP NAVBAR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 15,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <NavButton title="Home" icon="home-outline" onPress={goHome} />
          <NavButton title="Post" icon="add-circle-outline" onPress={goPost} />
          <NavButton
            title="Explore"
            icon="person-circle-outline"
            onPress={goProfile}
          />
        </View>

        <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
          <Tabs.Screen name="index" />
          <Tabs.Screen name="createpost" />
          <Tabs.Screen name="explore" />
        </Tabs>
      </View>
    );
  }

  // -------------------------
  // MOBILE → BOTTOM TABS
  // -------------------------
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: homeIcon,
        }}
      />

      <Tabs.Screen
        name="createpost"
        options={{
          title: "Post",
          tabBarIcon: postIcon,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: exploreIcon,
        }}
      />
    </Tabs>
  );
}
