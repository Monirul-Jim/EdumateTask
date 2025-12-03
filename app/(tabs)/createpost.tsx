import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useMemo } from "react";
import { useCreatePostMutation } from "@/redux/api/userApi/usersApi";
import { useColorScheme } from "nativewind";
import React from "react";

type PostForm = {
  title: string;
  body: string;
};

export default function CreatePost() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const { control, handleSubmit, reset } = useForm<PostForm>();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [createdPosts, setCreatedPosts] = useState<any[]>([]);
  const onSubmit = useCallback(
    async (data: PostForm) => {
      try {
        setSuccess("");
        setErrorMsg("");

        const payload = { ...data, userId: 1 };
        await createPost(payload).unwrap();

        setCreatedPosts((prev) => [
          { id: Date.now(), ...payload },
          ...prev,
        ]);

        setSuccess("Post created successfully!");
        reset();
      } catch {
        setErrorMsg("Failed to create post");
      }
    },
    [createPost, reset]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <PostItem item={item} isDark={isDark} />,
    [isDark]
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const emptyList = useMemo(
    () => (
      <Text
        className={`text-center mt-5 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        No posts created yet
      </Text>
    ),
    [isDark]
  );

  return (
    <SafeAreaView
      className={`flex-1 items-center p-5 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <View className="w-full max-w-2xl">
        <Text
          className={`text-2xl font-bold mb-5 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Create Post
        </Text>

        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Post title"
                placeholderTextColor={isDark ? "#aaa" : "#666"}
                value={value}
                onChangeText={onChange}
                className={`p-3 rounded-xl w-full border ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-100 text-black border-gray-300"
                }`}
              />
              {error && (
                <Text className="text-red-500 text-sm">{error.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="body"
          rules={{ required: "Body is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Post details..."
                placeholderTextColor={isDark ? "#aaa" : "#666"}
                value={value}
                multiline
                onChangeText={onChange}
                className={`p-3 rounded-xl min-h-[120px] w-full border ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-100 text-black border-gray-300"
                }`}
              />
              {error && (
                <Text className="text-red-500 text-sm">{error.message}</Text>
              )}
            </View>
          )}
        />

      
        {errorMsg && <Text className="text-red-500 mb-3">{errorMsg}</Text>}
        {success && <Text className="text-green-500 mb-3">{success}</Text>}

    
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={`py-4 rounded-xl w-full ${
            isLoading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white font-semibold text-lg">
              Create Post
            </Text>
          )}
        </TouchableOpacity>


        <Text
          className={`text-xl font-bold mt-6 mb-3 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Your Created Posts
        </Text>

        <FlatList
          data={createdPosts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={emptyList}
        />
      </View>
    </SafeAreaView>
  );
}

const PostItem = React.memo(
  ({ item, isDark }: { item: any; isDark: boolean }) => {
    return (
      <View
        className={`p-4 rounded-xl mb-3 border ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-200 border-gray-300"
        }`}
      >
        <Text
          className={`font-semibold text-lg ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {item.title}
        </Text>

        <Text className={isDark ? "text-gray-300" : "text-gray-700"}>
          {item.body}
        </Text>
      </View>
    );
  }
);
