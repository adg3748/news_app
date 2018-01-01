import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';
import ReactDOM from 'react-dom';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = { movies: [] };
    this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this); // イベントハンドラの設定をする場合、bindしないとthisの内容が変わってしまい、setStateがundefiedだとエラーが出る
     this._console = this._console.bind(this);
    }
  getMoviesFromApiAsync() { // 文頭にfunctionがついてないのは、関数ではなくイベントハンドラの定義であるため
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
        this.setState({movies :responseJson.movies});
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
  _console() { console.log(this.state.movies); }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.getMoviesFromApiAsync} title="tap me!" />
        <Button onPress={this._console} title="tap me!" />
        { /* Reactではbindしないとイベントハンドラ使えないらしいが、ReactNativeでは使用できた */}
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


