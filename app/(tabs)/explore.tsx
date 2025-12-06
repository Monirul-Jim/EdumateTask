import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { memo, useCallback, useMemo } from "react";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/feature/authSlice";
import { Redirect } from "expo-router";
import { broadcastLogout } from "@/redux/feature/authSync";

const THEME_TABS = ["Dark", "Light", "Device"];

export default function ProfileScreen() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const isLargeScreen = useMemo(() => width >= 768, [width]);

  const tabIndex = useSharedValue(
    colorScheme === "dark" ? 0 : colorScheme === "light" ? 1 : 2
  );

  if (!token) return <Redirect href="/(auth)/login" />;
  if (!user) return null;

  const inst = user?.institute;

  const handleTheme = useCallback(
    (mode: "dark" | "light" | "system", index: number) => {
      Haptics.selectionAsync();
      setColorScheme(mode);
      tabIndex.value = withTiming(index, { duration: 250 });
    },
    []
  );

  const sliderStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: tabIndex.value * 100 }],
    }),
    []
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: isLargeScreen ? width * 0.2 : 24,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >

        <View className="mt-4 mb-6">
          <View
            className={`flex-row relative rounded-2xl p-1 ${isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
          >
            <Animated.View
              style={[sliderStyle]}
              className="absolute w-[100px] h-full rounded-2xl bg-blue-500"
            />

            {THEME_TABS.map((t, index) => (
              <TouchableOpacity
                key={t}
                onPress={() =>
                  handleTheme(
                    index === 0 ? "dark" : index === 1 ? "light" : "system",
                    index
                  )
                }
                className="w-[100px] h-10 justify-center items-center"
              >
                <Text
                  className={`font-semibold ${isDark ? "text-white" : "text-gray-800"
                    }`}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        <Animated.View
          entering={FadeInDown.duration(600)}
          className={`${isDark ? "bg-gray-800" : "bg-gray-100"
            } rounded-3xl p-6 shadow-md mb-6`}
        >
          <Text
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"
              } mb-3`}
          >
            Admin Info
          </Text>

          <Info label="Name" value={user?.name} isDark={isDark} />
          <Info label="Email" value={user?.email} isDark={isDark} />
          <Info label="Mobile" value={user?.mobile} isDark={isDark} />
          <Info label="Status" value={user?.status} isDark={isDark} />
        </Animated.View>


        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          className={`${isDark ? "bg-blue-900/30" : "bg-blue-50"
            } rounded-3xl p-6 shadow-md mb-10`}
        >
          <Text
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"
              } mb-4`}
          >
            Institute Details
          </Text>

          <View className="items-center mb-4">
            <Image
              source={{ uri: inst?.logo }}
              className="w-24 h-24 rounded-full bg-white"
            />
          </View>

          <Info label="Name" value={inst?.institute_name} isDark={isDark} />
          <Info label="Address" value={inst?.institute_address} isDark={isDark} />
          <Info label="EIN" value={inst?.institute_ein} isDark={isDark} />
          <Info label="Email" value={inst?.institute_email} isDark={isDark} />
          <Info label="Contact" value={inst?.institute_contact} isDark={isDark} />
          <Info label="Category" value={inst?.institute_category} isDark={isDark} />
          <Info label="Type" value={inst?.institute_type} isDark={isDark} />
          <Info label="Board" value={inst?.institute_board} isDark={isDark} />
          <Info label="Gateway" value={inst?.institute_gateway} isDark={isDark} />
        </Animated.View>

        <TouchableOpacity
          // onPress={() => dispatch(logout())}
          onPress={() => {
            dispatch(logout());
            broadcastLogout();
          }}
          className="bg-red-600 py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Info = memo(
  ({ label, value, isDark }: { label: string; value: any; isDark: boolean }) => (
    <View className="mb-3">
      <Text className={isDark ? "text-gray-400" : "text-gray-600"}>{label}</Text>
      <Text
        className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"
          }`}
      >
        {value}
      </Text>
    </View>
  )
);
