import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

interface SearchSectionProps {
  urlList?: { url: string; category: 'safe' | 'dangerous' }[];
  onSearch?: (keyword: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ urlList = [], onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (text: string) => {
    setKeyword(text);
  };

  const handleSearch = () => {
    onSearch?.(keyword);

    if (!keyword.trim()) {
      Alert.alert('알림', '검색어를 입력하세요.');
      setKeyword('');
      return;
    }

    const found = urlList.find(item => item.url === keyword.trim());
    if (found) {
      Alert.alert(
        '검색 결과',
        found.category === 'dangerous' ? '위험한 URL입니다.' : '안전한 URL입니다.'
      );
    } else {
      Alert.alert('검색 결과', '해당 URL이 목록에 없습니다.');
    }
    setKeyword('');
  };

  return (
    <View className="px-4 py-3 bg-gray-50">
      <View className="bg-white rounded-lg p-3 border border-gray-200 flex-row items-center">
        <TextInput
          className="flex-1 text-gray-600 text-base"
          placeholder="URL 검색"
          value={keyword}
          onChangeText={handleChange}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          className="ml-2 px-4 py-2 bg-blue-500 rounded"
          onPress={handleSearch}
        >
          <Text className="text-white font-medium">검색</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
