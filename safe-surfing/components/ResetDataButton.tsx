import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ResetDataButtonProps {
  onPress?: () => void;
}

export const ResetDataButton: React.FC<ResetDataButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="py-4 px-6 bg-white border-b border-gray-100"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-red-600 text-base font-medium">
        Reset Data
      </Text>
    </TouchableOpacity>
  );
};
