import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  AsyncStorage,
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
  save(data) {
    AsyncStorage.setItem(data['title'], JSON.stringify(data), (err) => {
      if(err){
        console.log(err);
        return false;
      }else{
        console.log(data);
        return true;
      }
    })
  }
  render() {
    console.log(this.state.threads.length);
    const{ width, height, scale } = Dimensions.get('window'); // Dimensionsは、デバイスの画面幅を取得するためのAPI
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.threads}
          extraData={this.state.threads}
          renderItem={(thread) => // アロー関数っぽく見えるが、ロケットの右側に{}を書いてしまうと表示できない
            <View style={{flex:1, flexDirection:'row',width:"100%",borderBottomWidth:2,borderColor:"#f5f5f5"}}>
              <Image style={{ width:50, height:50}}
                source={{uri: thread.item.data.thumbnail}} />
              <View style={{width:width - 50}}>
                <View style={{flex:1,flexDirection:'column'}}>
                  <Text style={{width: width - 50}}>{thread.item.data.title}</Text>
                  <Text style={{color:"#ababab", fontSize:10}}>{thread.item.data.domain}</Text>
                  <Button onPress={() => {this.save(thread.item.data)}} title="ストック" />
                </View>
              </View>
              { /* width: width - 50で、取得した横幅から画像の幅である50pxを引くことでテキストが画面内に収まるように */ }
            </View>
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


