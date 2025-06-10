import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TabNavigation } from './TabNavigation';
import { URLListItem } from './URLListItem';

interface URLItem {
  id: string;
  url: string;
  isSelected: boolean;
  category: 'safe' | 'dangerous';
}

interface URLListSectionProps {
  urlList: URLItem[];
  loading?: boolean;
  onToggleSelect?: (id: string) => void;
  onRecheck?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const URLListSection: React.FC<URLListSectionProps> = ({
  urlList,
  loading = false,
  onToggleSelect,
  onRecheck,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = React.useState<'safe' | 'dangerous'>('safe');

  const filteredItems = urlList.filter(item => item.category === activeTab);

  return (
    <View className="flex-1 bg-white">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView className="flex-1">
        {loading ? (
          <View className="items-center py-8">
            <Text>로딩 중...</Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View className="items-center py-8">
            <Text>URL이 없습니다.</Text>
          </View>
        ) : (
          filteredItems.map(item => (
            <URLListItem
              key={item.id}
              url={item.url}
              isSelected={item.isSelected}
              category={item.category} // 이 부분 추가!
              onToggleSelect={() => onToggleSelect?.(item.id)}
              onRecheck={() => onRecheck?.(item.id)}
              onDelete={() => onDelete?.(item.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
