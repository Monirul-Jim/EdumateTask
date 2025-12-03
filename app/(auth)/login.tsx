import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { router, Stack } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/feature/authSlice";
import { Platform } from "react-native";
type LoginForm = {
    username: string;
    password: string;
};

const Login = () => {
    const { control, handleSubmit } = useForm<LoginForm>({defaultValues: {
        username: "demo001",
        password: "12345678",
    }});
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const getErrorMessage = () => {
        if (error && "data" in error) {
            const errorData = error.data as any;
            if (errorData?.errors?.system_error?.[0]) {
                return errorData.errors.system_error[0]?.message || "An error occurred";
            }
            return errorData?.message || "Login failed";
        }
        return null;
    };

    const errorMessage = getErrorMessage();
    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await loginUser(data).unwrap();
            const apiData = res.payload.data;

            dispatch(
                setUser({
                    user: {
                        name: apiData.admin.name,
                        email: apiData.admin.email,
                        mobile: apiData.admin.mobile,
                        status: apiData.admin.status,
                        institute: apiData.admin.institute_details,

                    },
                    token: apiData.authorization.access_token,
                })
            );
            router.replace("/(tabs)");
        } catch (err) {
            console.log("Login Error:", err);
        }
    };

    return (
      <>
      <Stack.Screen
        options={{
          title: "Login",
          headerShown: true,
          headerTitleAlign: "left",
        }}
      />

      <View
        className="flex-1 items-center justify-center bg-white px-6"
      >
        {/* RESPONSIVE BOX */}
        <View
          style={{
            width: "100%",
            maxWidth: Platform.OS === "web" ? 420 : "100%", // RESPONSIVE
          }}
        >
          <Text className="text-3xl font-bold text-center mb-10">
            Login
          </Text>

          {/* Username */}
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-2xl px-4 py-3 mb-4"
                placeholder="Username"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <View className="relative mb-4">
                <TextInput
                  className="border border-gray-300 rounded-2xl px-4 py-3 pr-12"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  value={value}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
                >
                  <Text className="text-2xl">
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-600 py-4 rounded-2xl items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
    );
};

export default Login;
