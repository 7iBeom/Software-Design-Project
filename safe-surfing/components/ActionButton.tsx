import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface ActionButtonProps {
  imageSource: ImageSourcePropType;
  label: string;
  onPress?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  imageSource,
  label,
  onPress
}) => {
  return (
    <TouchableOpacity
      className="flex-1 items-center py-3 mx-2 bg-gray-100 rounded-lg"
      onPress={onPress}
    >
      <Image
        source={imageSource}
        className="w-8 h-8 mb-2"
        resizeMode="contain"
      />
      <Text className="text-gray-700 text-sm font-medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
