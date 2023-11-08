import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const FavoritePanel = ({ favoritePlayers }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favoritePlayers.length > 0 && (
        <View>
          <Text style={[styles.title, { textAlign: 'center', color: 'white' }]}>favoritos⭐</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {favoritePlayers.map((player) => (
              <View key={player.idPlayer} style={styles.card}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: player.strThumb }}
                />
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: 'white' }]}>{player.strPlayer}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  cardBody: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FavoritePanel;
