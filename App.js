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
    function sample() {
      fetch('https://www.reddit.com/r/newsokur/hot.json') // 返値はPromise型。resolveならthen、rejectならcatchを実行する
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    sample();
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


