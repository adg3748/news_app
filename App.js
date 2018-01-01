import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = { threads: '' };
    function _fetch(_this) {
      fetch('https://www.reddit.com/r/newsokur/hot.json') // 返値はPromise型。resolveならthen、rejectならcatchを実行する
        .then((response) => response.json())
        .then((responseJson) => {
          let threads = responseJson.data.children; // 配列の中にオブジェクトがたくさん
          threads = threads.map( i => {
            i.key = i.data.url // keyがないと警告が出る
            console.log(i.data.url);
            return i
          });
          _this.setState({threads: threads});
        })
        .catch((error) => {
        });
    }
    _fetch(this);
  }
  render() {
    console.log(this.state.threads.length);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.threads}
          extraData={this.state.threads}
          renderItem={(thread) => // アロー関数っぽく見えるが、ロケットの右側に{}を書いてしまうと表示できない
            <Text>{thread.item.data.title}</Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
})


