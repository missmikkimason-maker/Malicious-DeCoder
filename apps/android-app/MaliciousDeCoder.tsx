import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

const PATTERNS = [
  { name: 'Hex string', regex: /\b(?:[0-9A-Fa-f]{2}:){5,}[0-9A-Fa-f]{2}\b/g },
  { name: 'Base64 blob', regex: /(?:[A-Za-z0-9+/]{4}){8,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?/g },
  { name: 'IP address', regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
  { name: 'URL', regex: /https?:\/\/[^\s\"<>]+/g },
  { name: 'Email', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
];

function analyze(text: string) {
  const findings = PATTERNS.map((pattern) => ({
    name: pattern.name,
    matches: Array.from(text.matchAll(pattern.regex)).map((match) => match[0]),
  })).filter((finding) => finding.matches.length > 0);

  const entropy = calculateEntropy(text);

  return { findings, entropy };
}

function calculateEntropy(text: string) {
  if (!text) return 0;
  const frequencies = new Map<string, number>();
  for (const char of text) {
    frequencies.set(char, (frequencies.get(char) ?? 0) + 1);
  }
  return Array.from(frequencies.values()).reduce((sum, count) => {
    const probability = count / text.length;
    return sum - probability * Math.log2(probability);
  }, 0);
}

export default function MaliciousDeCoder() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof analyze> | null>(null);

  const handleAnalyze = () => {
    setResult(analyze(input));
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#111827' : '#F9FAFB' },
  ];
  const cardStyle = [styles.card, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }];
  const textStyle = [styles.text, { color: isDark ? '#F3F4F6' : '#111827' }];
  const secondaryStyle = [styles.secondary, { color: isDark ? '#9CA3AF' : '#6B7280' }];

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#F3F4F6' : '#111827' }]}>
          Malicious DeCoder
        </Text>
        <Text style={secondaryStyle}>
          Paste suspicious text, logs, or encoded snippets below to identify patterns.
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#374151' : '#FFFFFF',
              color: isDark ? '#F3F4F6' : '#111827',
              borderColor: isDark ? '#4B5563' : '#D1D5DB',
            },
          ]}
          multiline
          numberOfLines={6}
          placeholder="Paste text to analyze..."
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          value={input}
          onChangeText={setInput}
          textAlignVertical="top"
          accessibilityLabel="Text to analyze"
        />

        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="Analyze" onPress={handleAnalyze} />
          </View>
          <View style={styles.button}>
            <Button title="Clear" onPress={handleClear} color="#EF4444" />
          </View>
        </View>

        {result && (
          <View style={cardStyle}>
            <Text style={textStyle}>Entropy: {result.entropy.toFixed(2)} bits/char</Text>
            {result.findings.length === 0 ? (
              <Text style={secondaryStyle}>No recognizable patterns found.</Text>
            ) : (
              result.findings.map((finding) => (
                <View key={finding.name} style={styles.finding}>
                  <Text style={styles.findingName}>{finding.name}</Text>
                  {finding.matches.map((match, index) => (
                    <Text key={`${finding.name}-${index}`} style={styles.match}>
                      • {match}
                    </Text>
                  ))}
                </View>
              ))
            )}
          </View>
        )}
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  secondary: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    minHeight: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  finding: {
    gap: 4,
  },
  findingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  match: {
    fontSize: 14,
    color: '#6B7280',
  },
});
