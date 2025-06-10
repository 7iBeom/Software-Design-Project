import React from 'react';
import { View, Text } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 0, paddingHorizontal: 0 }}>
      <Text
        className="text-black-700 text-2xl font-bold"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ textAlign: 'left', width: '100%' }}
      >
        SafeSurfing
      </Text>
    </View>
  );
};

export default Header;
