import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface PolicyLinkProps {
  title: string;
  onPress?: () => void;
}

const PolicyLink: React.FC<PolicyLinkProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="py-4 px-6 bg-white border-b border-gray-100"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-gray-800 text-base">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const PolicyLinks: React.FC = () => {
  return (
    <View className="mt-6 bg-white">
      <PolicyLink
        title="Privacy Policy"
        onPress={() => {}}
      />
      <PolicyLink
        title="Terms & Conditions"
        onPress={() => {}}
      />
      <PolicyLink
        title="Contact Information"
        onPress={() => {}}
      />
    </View>
  );
};
