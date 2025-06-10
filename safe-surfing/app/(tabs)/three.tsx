import React from 'react';
import { View, ScrollView } from 'react-native';
import { SettingsForm } from '../../components/SettingsForm';
import { PolicyLinks } from '../../components/PolicyLinks';

export const SettingPage: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-6">
          <SettingsForm />
          <PolicyLinks />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingPage;
