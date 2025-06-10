import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingToggle } from './SettingToggle';
import { ResetDataButton } from './ResetDataButton';

const API_BASE = "http://10.0.2.2:8000/api";

export const SettingsForm: React.FC = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // 상태 불러오기
  useEffect(() => {
    AsyncStorage.getItem('notificationEnabled').then(val => {
      if (val !== null) setNotificationEnabled(val === 'true');
    });
    AsyncStorage.getItem('autoSaveEnabled').then(val => {
      if (val !== null) setAutoSaveEnabled(val === 'true');
    });
  }, []);

  // 상태 저장
  const handleNotificationToggle = (value: boolean) => {
    setNotificationEnabled(value);
    AsyncStorage.setItem('notificationEnabled', value.toString());
  };
  const handleAutoSaveToggle = (value: boolean) => {
    setAutoSaveEnabled(value);
    AsyncStorage.setItem('autoSaveEnabled', value.toString());
  };

  // 모든 데이터 삭제
  const handleResetData = () => {
    Alert.alert(
      "데이터 초기화",
      "정말 모든 데이터를 삭제하시겠습니까?",
      [
        { text: "아니요", style: "cancel" },
        {
          text: "예",
          style: "destructive",
          onPress: () => {
            (async () => {
              try {
                const response = await fetch(`${API_BASE}/urls/all/`, {
                  method: 'DELETE',
                });
                if (response.status === 204 || response.status === 200) {
                  Alert.alert("완료", "모든 데이터가 삭제되었습니다.");
                } else {
                  Alert.alert("오류", `데이터 삭제에 실패했습니다. (코드: ${response.status})`);
                }
              } catch (error) {
                Alert.alert("오류", "서버와 통신할 수 없습니다.");
              }
            })();
          }
        }
      ]
    );
  };

  return (
    <View className="bg-gray-50">
      <View className="px-6 py-4 bg-gray-100" />
      <View className="bg-white">
        <SettingToggle
          label="Receive Notification"
          isEnabled={notificationEnabled}
          onToggle={handleNotificationToggle}
        />
        <SettingToggle
          label="URL Auto Save"
          isEnabled={autoSaveEnabled}
          onToggle={handleAutoSaveToggle}
        />
        <ResetDataButton onPress={handleResetData} />
      </View>
    </View>
  );
};
