import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import FavoritePanel from '../components/FavoritePanel';
import CardAthlete from '../components/CardAthlete';

export default function Search() {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [playersPerPage] = useState(3);
  const [playersList, setPlayersList] = useState([]);

  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query && searched) {
      handleSearch();
    }
  }, [query, searched]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`
      );
      const basketballPlayers = response.data.player.filter(
        (player) => player.strSport === 'Basketball'
      );

      setPlayersList(basketballPlayers);
      setPlayers(basketballPlayers.slice(0, playersPerPage));
      setPage(1);
    } catch (error) {
      console.error('erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePlayers = () => {
    const startIndex = page * playersPerPage;
    const nextPlayers = playersList.slice(startIndex, startIndex + playersPerPage);
    setPlayers(nextPlayers);
    setPage(page + 1);
  };

  const addToFavorites = (player) => {
    if (!favoritePlayers.some((favPlayer) => favPlayer.idPlayer === player.idPlayer)) {
      setFavoritePlayers([...favoritePlayers, player]);
      player.isFavorite = true; // Add a property to mark as favorite
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: 'white' }]}>basketball units 🏀</Text>
      <Text style={[styles.subtitle, { color: 'white' }]}>pesquise um jogador</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="nome do jogador"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setSearched(true);
            }
          }}
          style={[styles.input, { color: 'white' }]}
        />
      </View>
      <Button
        title="BUSCAR"
        onPress={() => setSearched(true)}
        style={styles.button}
        color="orange"
      />
      {isLoading ? (
        <Text style={{ color: 'white' }}>carregando...</Text>
      ) : players.length > 0 ? (
        <View style={styles.searchResults}>
          {players.map((player) => (
            <View key={player.idPlayer} style={styles.playerCard}>
              <CardAthlete player={player} addToFavorites={addToFavorites} />
            </View>
          ))}
        </View>
      ) : (
        searched && <Text style={{ color: 'white' }}>nenhum jogador encontrado.</Text>
      )}
      {players.length > 0 && !isLoading && (
        <Button title="Procurar Mais" onPress={loadMorePlayers} style={styles.button} />
      )}
      <FavoritePanel favoritePlayers={favoritePlayers} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    padding: 8,
    borderRadius: 18,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  searchResults: {
    width: '30%',
    paddingTop: 16,
  },
  playerCard: {
    marginBottom: 16,
    width: '100%',
  },
});
