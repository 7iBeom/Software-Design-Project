import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { SearchSection } from '../../components/SearchSection';
import { URLListSection } from '../../components/URLListSection';
import { InputSection } from '../../components/InputSection';

const API_BASE = "http://10.0.2.2:8000/api";

// URL 아이템 타입 정의
interface URLItem {
  id: string;
  url: string;
  isSelected: boolean;
  category: 'safe' | 'dangerous';
}

const URLManagementPage: React.FC = () => {
  const [activeBottomTab, setActiveBottomTab] = useState('manage');
  const [urlList, setUrlList] = useState<URLItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (activeBottomTab === 'manage') {
      fetchUrlList();
    }
  }, [activeBottomTab, refreshTrigger]);

  // URL 목록 불러오기
  const fetchUrlList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/urls/`);
      const data = await response.json();
      const mapped = data.map((item: any) => ({
        id: String(item.id),
        url: item.url,
        isSelected: false,
        category: item.is_dangerous ? 'dangerous' : 'safe',
      }));
      setUrlList(mapped);
    } catch (error) {
      console.error('URL 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // URL 등록 함수 예시 (InputSection 등에서 호출)
  const handleUrlAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // 선택 토글
  const handleToggleSelect = (id: string) => {
    setUrlList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // 개별 재검사
  const handleRecheck = async (id?: string, inspectionId?: string) => {
    if (id) {
      // 1. 기존 정보 삭제
      try {
        const urlToRecheck = urlList.find(item => item.id === id)?.url;
        if (!urlToRecheck) return;

        // 기존 정보 삭제 (id 기반)
        await fetch(`${API_BASE}/urls/${id}/`, {
          method: 'DELETE',
        });

        // 2. 다시 검사
        await fetch(`${API_BASE}/urls/${id}/reinspect/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inspection_id: inspectionId }),
        });
        const response = await fetch(`${API_BASE}/inspect/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlToRecheck }),
        });
        const data = await response.json();
        if (response.ok) {
          if (data.is_dangerous === true) {
            alert('위험한 URL입니다.');
          } else if (data.is_dangerous === false) {
            // 안전한 경우는 알림 없이 패스
          } else {
            alert('결과를 확인할 수 없습니다.');
          }
          // 재검사 후 상태 초기화 및 새로고침
          setUrlList(prev =>
            prev.map(item =>
              item.id === id ? { ...item, isSelected: false } : item
            )
          );
          fetchUrlList();
        } else {
          alert('재검사 실패');
        }
      } catch (error) {
        alert('네트워크 오류');
      }
    } else {
      // 선택된 전체 재검사: 위험한 URL만 한 번에 알림
      const selected = urlList.filter(item => item.isSelected);
      const dangerousUrls: string[] = [];
      for (const item of selected) {
        try {
          // 1. 기존 정보 삭제
          await fetch(`${API_BASE}/urls/${item.id}/`, {
            method: 'DELETE',
          });

          // 2. 다시 검사
          const response = await fetch(`${API_BASE}/inspect/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: item.url }),
          });
          const data = await response.json();
          if (response.ok && data.is_dangerous === true) {
            dangerousUrls.push(item.url);
          }
          // 각 URL 재검사 후 선택 해제
          setUrlList(prev =>
            prev.map(i =>
              i.id === item.id ? { ...i, isSelected: false } : i
            )
          );
        } catch (error) {
          // 네트워크 오류는 무시
        }
      }
      if (dangerousUrls.length > 0) {
        alert(`위험한 URL:\n${dangerousUrls.join('\n')}`);
      }
      fetchUrlList();
    }
  };

  // 개별 삭제
  const handleDelete = async (id?: string) => {
    if (id) {
      // 개별 삭제 API 호출 (id 기반)
      try {
        const response = await fetch(`${API_BASE}/urls/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUrlList(); // 삭제 후 새로고침
        } else {
          alert('삭제 실패');
        }
      } catch (error) {
        alert('네트워크 오류');
      }
    } else {
      // 선택된 전체 삭제
      const selected = urlList.filter(item => item.isSelected);
      for (const item of selected) {
        await handleDelete(item.id);
      }
    }
  };

  const handleBottomTabChange = (tab: string) => {
    setActiveBottomTab(tab);
    // Handle navigation logic here
    console.log('Navigate to:', tab);
  };

  // 새로고침 버튼 핸들러
  const handleRefresh = () => {
    fetchUrlList();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="flex-1">
          <SearchSection urlList={urlList} />
          <URLListSection
            urlList={urlList}
            loading={loading}
            onToggleSelect={handleToggleSelect}
            onRecheck={handleRecheck}
            onDelete={handleDelete}
          />
          <View className="flex-row justify-around py-4 bg-white border-t border-gray-200">
            <TouchableOpacity
              className="flex-row items-center px-6 py-3 bg-blue-500 rounded-lg"
              onPress={() => handleRecheck()}
            >
              <Text className="text-white font-medium">재검사</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center px-6 py-3 bg-gray-400 rounded-lg"
              onPress={handleRefresh}
            >
              <Text className="text-white font-medium">새로고침</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center px-6 py-3 bg-red-500 rounded-lg"
              onPress={() => handleDelete()}
            >
              <Text className="text-white font-medium">삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default URLManagementPage;
