import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Blink extends React.Component {
  constructor(props){ // Componentのマウント前に一度だけ呼ばれる
    super(props); // ES6の記法ではコンストラクタで明示する必要あり
  }
}

export default class BlinkApp extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:1, backgroundColor: 'powderblue'}} />
        <View style={{flex:2, backgroundColor: 'skyblue'}} />
        <View style={{flex:3, backgroundColor: 'steelblue'}} />
        { /* Viewのstyleに渡すのはキーバーリュー形式のオブジェクトである必要がある、よって{{}}の形式をとる */ }
      </View>
    );
  }
}
const styles = StyleSheet.create({ // constは定数、及び、Functionalコンポーネントの定義に用いることができる
  // var, const, let いずれにせよオブジェクトを作成するための関数
  container: {
    flex: 1, // flexを0にすると、親要素が画面に占める割合が0になるため、子要素のViewも表示されなくなる
  },
});
