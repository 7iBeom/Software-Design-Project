import React from 'react';
import { View, Text, Switch } from 'react-native';

interface SettingToggleProps {
  label: string;
  isEnabled?: boolean;
  onToggle?: (value: boolean) => void;
}

export const SettingToggle: React.FC<SettingToggleProps> = ({
  label,
  isEnabled = false,
  onToggle
}) => {
  return (
    <View className="flex-row items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
      <Text className="text-gray-800 text-base font-medium flex-1">
        {label}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
      />
    </View>
  );
};
