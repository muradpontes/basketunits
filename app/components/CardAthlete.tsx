import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

function CardAthlete({ player, addToFavorites }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: player.strThumb }} style={styles.image} />
      <Text style={[styles.cardTitle, { color: 'white' }]}>{player.strPlayer}</Text>
      <Text style={[styles.cardText, { color: 'white' }]}>Nacionalidade: {player.strNationality}</Text>
      <Text style={[styles.cardText, { color: 'white' }]}>Time: {player.strTeam}</Text>
      <Button
        title={player.isFavorite ? 'Adicionado aos favoritos⭐' : 'Adicionar aos favoritos⭐'}
        onPress={() => addToFavorites(player)}
        color={player.isFavorite ? 'gray' : 'orange'}
        disabled={player.isFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
  },
});

export default CardAthlete;