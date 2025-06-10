import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ActionButtonsProps {
  onRecheck?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onRecheck, onDelete }) => {
  return (
    <View className="flex-row justify-around py-4 bg-white border-t border-gray-200">
      <TouchableOpacity
        className="flex-row items-center px-6 py-3 bg-blue-500 rounded-lg"
        onPress={onRecheck}
        disabled={!onRecheck}
      >
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6166aa68b6ceb9e57998f318b94a3d93512cba5a?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-white font-medium">재검사</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center px-6 py-3 bg-red-500 rounded-lg"
        onPress={onDelete}
        disabled={!onDelete}
      >
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5cbace82bcc2f7b5fad3540bd4c04a2889136520?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-white font-medium">삭제</Text>
      </TouchableOpacity>
    </View>
  );
};
