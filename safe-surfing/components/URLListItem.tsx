import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface URLListItemProps {
  url: string;
  isSelected: boolean;
  category?: 'safe' | 'dangerous';
  onToggleSelect: () => void;
  onRecheck: () => void;
  onDelete: () => void;
}

export const URLListItem: React.FC<URLListItemProps> = ({
  url,
  isSelected,
  category,
  onToggleSelect,
  onRecheck,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggleSelect}
      activeOpacity={0.8}
      className={`flex-row items-center py-3 px-4 border-b border-gray-100 ${
        isSelected ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <Image
        source={{
          uri: isSelected
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/1c3d18eac7920b24a0d9056c95d9529857c69f85?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81"
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/3819170bcf33009777a646f546728ff8ac7ac958?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81"
        }}
        className="w-6 h-6 mr-3"
      />

      <View className="flex-1 mr-3">
        <Text className="text-gray-800 text-base">{url}</Text>
        <Text className={category === 'dangerous' ? 'text-red-500' : 'text-green-500'}>
          {category === 'dangerous' ? '위험' : '안전'}
        </Text>
      </View>

      {isSelected && (
        <Text className="text-blue-600 font-bold mr-2">선택됨</Text>
      )}

      <TouchableOpacity onPress={e => { e.stopPropagation(); onRecheck(); }} className="mr-3">
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/bda07aef4c5cea6be116e744a4108c89ddbfd9bf?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          className="w-6 h-6"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={e => { e.stopPropagation(); onDelete(); }}>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/996c8b4ab172a52c5464cc09b4d2b4e13a7c2a53?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          className="w-6 h-6"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
