import React from "react";
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  icon: string;
  placeholder: string;
  secure?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  readOnly?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function InputField({
  icon,
  placeholder,
  secure = false,
  value,
  onChangeText,
  onFocus,
  readOnly = false,
  keyboardType = "default",
  multiline = false,
  autoCapitalize = "none",
}: Props) {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={25} tint="dark" style={styles.blur}>
        <View style={[styles.inner, multiline && { alignItems: "flex-start" }]}>
          <Icon name={icon} size={20} color="#00b4d8" style={styles.icon} />
          <TextInput
            style={[
              styles.input,
              readOnly && styles.readOnlyInput,
              multiline && { height: 80, textAlignVertical: "top" },
            ]}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry={secure}
            value={value}
            onChangeText={readOnly ? undefined : onChangeText}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize}
            editable={!readOnly}
            keyboardType={keyboardType}
            multiline={multiline}
          />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  blur: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  readOnlyInput: {
    opacity: 0.8,
  },
});
