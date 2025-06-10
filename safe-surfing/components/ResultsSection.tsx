import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface InspectionResult {
  description?: string | object;
  is_dangerous?: boolean;
  url?: string | { url: string };
  checked_at?: string;
}

interface ResultsSectionProps {
  result: InspectionResult | null;
  loading?: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <View className="bg-white p-6 m-4 rounded-lg shadow-sm border border-gray-200 items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!result) {
    return (
      <View className="bg-white p-6 m-4 rounded-lg shadow-sm border border-gray-200 items-center">
        <Text>결과를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const isSafe = result.is_dangerous === false;

  return (
    <View className="bg-white p-6 m-4 rounded-lg shadow-sm border border-gray-200">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          검사 결과
        </Text>

        <View className={isSafe
          ? "bg-green-50 p-3 rounded border border-green-200 mb-3"
          : "bg-red-50 p-3 rounded border border-red-200 mb-3"}>
          <Text className={isSafe
            ? "text-green-700 font-medium text-base"
            : "text-red-700 font-medium text-base"}>
            {isSafe ? "안전 URL" : "위험 URL"}
          </Text>
        </View>

        {typeof result.description === 'string' && (
          <View className="mb-2">
            <Text className="text-gray-700">{result.description}</Text>
          </View>
        )}

        {typeof result.description === 'object' && result.description && (
          <View className="mb-2">
            <Text className="text-gray-700">
              {Object.entries(result.description)
                .map(([key, value]) => `${key}: ${String(value)}`)
                .join('\n')}
            </Text>
          </View>
        )}

        {result.url && (
          <View className="mb-3">
            <Text className="text-blue-600 text-base underline">
              {typeof result.url === 'string'
                ? result.url
                : (result.url && typeof result.url === 'object' && 'url' in result.url
                    ? String(result.url.url)
                    : '')}
            </Text>
          </View>
        )}

        {result.checked_at && (
          <View>
            <Text className="text-gray-500 text-sm">
              {result.checked_at}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
