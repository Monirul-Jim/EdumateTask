import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

import {
  useGetUserPostsQuery,
  useGetUsersQuery,
} from "@/redux/api/userApi/usersApi";

// ⭐ Reanimated
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

// ------------------------- INFO COMPONENT -------------------------

const Info = React.memo(
  ({ label, value, isDark }: { label: string; value: any; isDark: boolean }) => (
    <View className="mb-2">
      <Text className={isDark ? "text-gray-400" : "text-gray-600"}>{label}</Text>
      <Text
        className={
          isDark
            ? "text-white text-lg font-semibold"
            : "text-black text-lg font-semibold"
        }
      >
        {value}
      </Text>
    </View>
  )
);
Info.displayName = "Info";

// ------------------------- POST ITEM -------------------------

const PostItem = React.memo(
  ({ item, isDark }: { item: any; isDark: boolean }) => (
    <Animated.View
      entering={FadeInUp.duration(350)}
      className={`${
        isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
      } p-4 rounded-lg mb-3 border`}
    >
      <Text
        className={
          isDark
            ? "text-white text-lg font-semibold"
            : "text-gray-900 text-lg font-semibold"
        }
      >
        {item.title}
      </Text>
      <Text className={isDark ? "text-gray-400 mt-2" : "text-gray-700 mt-2"}>
        {item.body}
      </Text>
    </Animated.View>
  )
);
PostItem.displayName = "PostItem";

// ------------------------- MAIN SCREEN -------------------------

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const userId = Number(id);

  const { width } = useWindowDimensions();
  const isLarge = width >= 768;

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const { data: users } = useGetUsersQuery({});
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
  } = useGetUserPostsQuery(userId, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const user = useMemo(
    () => users?.find((u: any) => u.id === userId),
    [users, userId]
  );
  const postsList = useMemo(() => posts ?? [], [posts]);

  if (!user) {
    return (
      <View className="p-4">
        <Text className="text-center text-red-500">User not found</Text>
      </View>
    );
  }

  const keyExtractor = useCallback((item: any) => String(item.id), []);
  const renderItem = useCallback(
    ({ item }: { item: any }) => <PostItem item={item} isDark={isDark} />,
    [isDark]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: isLarge ? 120 : 92,
      offset: (isLarge ? 120 : 92) * index,
      index,
    }),
    [isLarge]
  );

  return (
    <SafeAreaView
      className={`${isDark ? "bg-gray-900" : "bg-white"} flex-1`}
      style={{
        paddingHorizontal: isLarge ? 40 : 16,
        paddingTop: 12,
        maxWidth: isLarge ? 900 : "100%",
        alignSelf: "center",
      }}
    >
      <Stack.Screen options={{ title: user.name ?? "Info" }} />

      <Text
        className={`${isDark ? "text-white" : "text-black"} text-xl font-bold mb-3`}
      >
        Posts
      </Text>

      {isLoading && (
        <View className="items-center mt-6">
          <ActivityIndicator size="large" />
        </View>
      )}

      {isError && (
        <Text className="text-red-500 text-center my-4">
          Failed to load posts.
        </Text>
      )}

      {!isLoading && (
        <FlatList
          data={postsList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={() => (
            <Text
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-center mt-8`}
            >
              No posts found
            </Text>
          )}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
        />
      )}

      {isFetching && !isLoading && (
        <Text className="text-center text-gray-500 my-4">Refreshing…</Text>
      )}

      {/* ⭐ USER INFO CARD WITH ANIMATION */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        className={`${isDark ? "bg-gray-800" : "bg-gray-200"} rounded-2xl p-5 mb-4`}
      >
        <Text
          className={`${isDark ? "text-white" : "text-black"} text-2xl font-bold mb-3`}
        >
          User Details
        </Text>

        <Info label="Name" value={user.name} isDark={isDark} />
        <Info label="Email" value={user.email} isDark={isDark} />
        <Info label="Phone" value={user.phone} isDark={isDark} />
        <Info label="City" value={user.address?.city} isDark={isDark} />
        <Info label="Company" value={user.company?.name} isDark={isDark} />
      </Animated.View>
    </SafeAreaView>
  );
}
