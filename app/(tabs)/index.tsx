import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { useGetUsersQuery } from "@/redux/api/userApi/usersApi";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import Animated, {
  FadeInDown,
  FadeIn,
  Layout,
} from "react-native-reanimated";
export default function UserList() {
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const isWeb = width >= 700; // breakpoint for large screens
  const contentWidth = isWeb ? width * 0.5 : width * 0.92;

  const { data, isLoading, isError, refetch } = useGetUsersQuery({});
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);
  return (
    <SafeAreaView
      className={`flex-1 items-center ${isDark ? "bg-gray-900" : "bg-white"
        } p-4 mb-10`}
    >
      {/* Animated Wrapper */}
      <Animated.View
        entering={FadeIn.duration(400)}
        style={{ width: contentWidth }}
      >
        {/* Search Bar */}
        <Animated.View entering={FadeInDown.duration(400)}>
          <TextInput
            placeholder="Search user..."
            placeholderTextColor={isDark ? "#aaa" : "#666"}
            className={`p-3 rounded-xl mb-4 ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              }`}
            value={search}
            onChangeText={setSearch}
          />
        </Animated.View>

        {isLoading && (
          <View className="flex-1 items-center justify-center mt-10">
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            ListEmptyComponent={() => (
              <Text
                className={`text-center mt-10 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                No users found
              </Text>
            )}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInDown.delay(index * 80).springify()}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                  onPress={() => router.push(`/users/${item.id}`)}
                  className={`p-4 rounded-2xl mb-3 shadow-sm ${isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                >
                  <Text
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"
                      }`}
                  >
                    {item.name}
                  </Text>

                  <Text className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {item.email}
                  </Text>

                  <Text className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {item.address.city}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}
