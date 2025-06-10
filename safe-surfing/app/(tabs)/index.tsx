import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { InputSection } from '../../components/InputSection';
import { ResultsSection } from '../../components/ResultsSection';

const HomeScreen: React.FC = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <InputSection
          onInspectStart={() => setLoading(true)}
          onInspectResult={(res) => { setResult(res); setLoading(false); }}
        />
        <ResultsSection result={result} loading={loading} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
