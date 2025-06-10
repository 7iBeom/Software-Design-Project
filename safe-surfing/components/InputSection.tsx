import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { ActionButton } from './ActionButton';

const API_BASE = "http://10.0.2.2:8000/api"; // 실제 환경에 맞게 수정

export const InputSection: React.FC<{
  onInspectStart?: () => void,
  onInspectResult?: (result: any) => void,
  onUrlAdded?: () => void // ← 이 부분 추가
}> = ({ onInspectStart, onInspectResult, onUrlAdded }) => {
  const [url, setUrl] = useState('');

  // URL 형식 검증 함수
  const isValidUrl = (u: string) => /^https?:\/\/.+/.test(u);

  const handleInspect = async () => {
    onInspectStart?.();
    if (!url) {
      // Alert.alert('URL을 입력하세요.');
      return;
    }
    if (!isValidUrl(url)) {
      // Alert.alert('올바른 URL 형식을 입력하세요.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/inspect/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      onInspectResult?.(data);
      setUrl(''); // 입력 후 초기화
    } catch (error) {
      // Alert.alert('네트워크 오류', '서버와 통신할 수 없습니다.');
      onInspectResult?.(null);
    }
  };

  const handleRegister = async () => {
    if (!url) return;
    if (!isValidUrl(url)) return;
    try {
      const response = await fetch(`${API_BASE}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setUrl(''); // 입력 후 초기화
      // 등록 성공 시 콜백 호출
      if (response.ok) {
        onUrlAdded?.();
      }
    } catch (error) {
      // 네트워크 오류 등 처리
    }
  };

  return (
    <View className="bg-white p-6 m-4 rounded-lg shadow-sm border border-gray-200">
      <View className="mb-4">
        <TextInput
          className="bg-gray-50 p-3 rounded border border-gray-300 text-gray-600 text-base"
          placeholder="http://www.example.com"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
      </View>

      <View className="flex-row justify-between">
        <ActionButton
          imageSource={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/37e5050d3776bf24652a8877537b335f316344fc?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          label="Inspect"
          onPress={handleInspect}
        />
        <ActionButton
          imageSource={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b3c47396cdcd1fd060fc2805ca3462d853c39b1?placeholderIfAbsent=true&apiKey=4d3c3a9db2044bd49ba55e242b5dea81" }}
          label="Register"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};
