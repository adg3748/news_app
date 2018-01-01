import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native'

export default class App extends Component {

  constructor(props){
    super(props)
    function getMoviesFromApiAsync() {
      return fetch('https://facebook.github.io/react-native/movies.json')
        /*
          {
            "title": "The Basics - Networking",
            "description": "Your app fetched this from a remote endpoint!",
            "movies": [
              { "title": "Star Wars", "releaseYear": "1977"},
              { "title": "Back to the Future", "releaseYear": "1985"},
              { "title": "The Matrix", "releaseYear": "1999"},
              { "title": "Inception", "releaseYear": "2010"},
              { "title": "Interstellar", "releaseYear": "2014"}
            ]
          }
        */
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.movies);
          /*
            [exp] Array [
            [exp]   Object {
            [exp]     "releaseYear": "1977",
            [exp]     "title": "Star Wars",
            [exp]   },
            [exp]   Object {
            [exp]     "releaseYear": "1985",
            [exp]     "title": "Back to the Future",
            [exp]   },
            [exp]   Object {
            [exp]     "releaseYear": "1999",
            [exp]     "title": "The Matrix",
            [exp]   },
            [exp]   Object {
            [exp]     "releaseYear": "2010",
            [exp]     "title": "Inception",
            [exp]   },
            [exp]   Object {
            [exp]     "releaseYear": "2014",
            [exp]     "title": "Interstellar",
            [exp]   },
            [exp] ]
            */
        })
        .catch((error) => {
          console.error(error);
        });
    }
  getMoviesFromApiAsync();
  }
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
})


