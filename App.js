import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  AsyncStorage,
  Button,
  StatusBar,
  TouchableOpacity
} from 'react-native';

class Archive extends Component {
  constructor(props){
    super(props);
    this.state = { data: '' };
  }
  getData(){
    AsyncStorage.getAllkeys((err,keys) => {
      if(err){
        console.error(err);
        return false;
      }else{
        AsyncStorage.multiGet(keys, (err,data) => {
          this.setState({data: data});
          return true;
        })
      }
    })
  }
  render() {
    const{ width, height, scale } = Dimensions.get('window'); // Dimensionsは、デバイスの画面幅を取得するためのAPI
    return (
      <View style={{flex:1}}>
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
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


class Main extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '新着記事',
    headerTintColor: 'white',
    headerBackTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: "#00aced" },
    headerRight:
      <TouchableOpacity
        style={{paddingRight:8}}
        onPress={() => {navigation.navigate('Archive')}}>
        <Image
          source={require('./assets/menu.png')}
          style={{height:25, width:25}}/>
      </TouchableOpacity>
  })
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

export default class App extends Component {
  // 画面を管理するだけの機能に限定
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle="light-content"/>
        { /* 画面上部の時間など表示するバーを装飾する */ }
        <AppNavigation/>
        { /* 画面上部に50pxほどの高さのナビバーを表示し、Mainのrenderも行う*/ }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
})

const AppNavigation = StackNavigator({
  Main: { screen: Main },
  Archive: { screen: Archive }
})

