import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TabNavigationProps {
  activeTab: 'safe' | 'dangerous';
  onTabChange: (tab: 'safe' | 'dangerous') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <View className="flex-row bg-white border-b border-gray-200">
      <TouchableOpacity
        className={`flex-1 py-4 px-6 ${activeTab === 'safe' ? 'border-b-2 border-blue-500' : ''}`}
        onPress={() => onTabChange('safe')}
      >
        <Text className={`text-center font-medium ${activeTab === 'safe' ? 'text-blue-500' : 'text-gray-600'}`}>
          Safe
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 py-4 px-6 ${activeTab === 'dangerous' ? 'border-b-2 border-red-500' : ''}`}
        onPress={() => onTabChange('dangerous')}
      >
        <Text className={`text-center font-medium ${activeTab === 'dangerous' ? 'text-red-500' : 'text-gray-600'}`}>
          Dangerous
        </Text>
      </TouchableOpacity>
    </View>
  );
};
