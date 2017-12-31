import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class Blink extends React.Component {
}

export default class BlinkApp extends React.Component {
  constructor(props){ // Componentのマウント前に一度だけ呼ばれる
    super(props); // ES6の記法ではコンストラクタで明示する必要あり
    this.state = {text:''};
  }
  render(){
    return(
      <View style={styles.container}>
        { /* Viewのstyleに渡すのはキーバーリュー形式のオブジェクトである必要がある、よって{{}}の形式をとる */ }
        <TextInput
          style = {{height:40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})} // なぜsetState(text)でなく、setState({text})なのか？
          // onChangeTextは、フィールドに入力されたテキストが変更される度に、引数にとる関数を実行する
        />
        <Text style={{ padding:10, fontSize: 40}}>
          {this.state.text.split(' ').map((word) => word && 'aaaaaa').join(' ')}
          { /*
          splitの返値は、stringオブジェクトを引数で区切った配列
          mapの返値は、配列を一つずつ取り出して、引数に取った処理を施した、新たな配列
          ∩を表す&&を使うことで、wordがtrueならば、配列の各要素を'aaaaaa'に置換する処理を行う
          joinの返値は、配列を引数にとったstringオブジェクトで接着したstringオブジェクト
          */ }
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({ // constは定数、及び、Functionalコンポーネントの定義に用いることができる
  // var, const, let いずれにせよオブジェクトを作成するための関数
  container: {
    padding: 10
  },
});
