import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, TextInput, Button, Card, ActivityIndicator } from 'react-native-paper';
import { searchYouTubeVideos } from '../api/youtube';
import { themes } from '../theme/themes';

export default function VideoScreen() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await searchYouTubeVideos(query);
      setVideos(data);
    } catch (e) {
      setError(e.message || 'Failed to search videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themes.cyberpunk.background, padding: 12 }}>
      <TextInput
        label="Search YouTube"
        value={query}
        onChangeText={setQuery}
        style={{ marginBottom: 8 }}
        mode="outlined"
        theme={{ colors: { primary: themes.cyberpunk.primary } }}
      />
      <Button mode="contained" onPress={handleSearch} style={{ marginBottom: 16 }}>
        Search
      </Button>
      {loading && <ActivityIndicator animating color={themes.cyberpunk.primary} style={{ marginTop: 32 }} />}
      {error ? (
        <Text style={{ color: 'red', margin: 16 }}>{error}</Text>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12, backgroundColor: themes.cyberpunk.surface }}>
              {item.snippet?.thumbnails?.high?.url ? (
                <Card.Cover source={{ uri: item.snippet.thumbnails.high.url }} />
              ) : null}
              <Card.Title title={item.snippet?.title} subtitle={item.snippet?.channelTitle} titleNumberOfLines={2} />
              <Card.Content>
                <Text numberOfLines={2} style={{ color: themes.cyberpunk.text }}>{item.snippet?.description}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
} 