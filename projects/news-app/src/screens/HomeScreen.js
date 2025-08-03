import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { fetchTopHeadlines } from '../api/news';
import { themes } from '../theme/themes';

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTopHeadlines();
      setArticles(data);
    } catch (e) {
      setError(e.message || 'Failed to load news');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themes.cyberpunk.background }}>
      {loading && <ActivityIndicator animating color={themes.cyberpunk.primary} style={{ marginTop: 32 }} />}
      {error ? (
        <Text style={{ color: 'red', margin: 16 }}>{error}</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={item => item.url}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadNews} />}
          renderItem={({ item }) => (
            <Card style={{ margin: 12, backgroundColor: themes.cyberpunk.surface }}>
              {item.urlToImage ? (
                <Card.Cover source={{ uri: item.urlToImage }} />
              ) : null}
              <Card.Title title={item.title} subtitle={item.source?.name} titleNumberOfLines={2} />
              <Card.Content>
                <Text numberOfLines={3} style={{ color: themes.cyberpunk.text }}>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
} 