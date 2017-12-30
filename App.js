import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Blink extends React.Component {
  constructor(props){ // Componentのマウント前に一度だけ呼ばれる
    super(props); // ES6の記法ではコンストラクタで明示する必要あり
    this.state = {showText: true}; // stateの初期化

    setInterval(()=>{
      this.setState(previousState => { // previousStateにはBlinkクラスのstateが入っている
        return {showText: !previousState.showText} // stateのshowTextキーに対する値がtrueならfalseに、falseならtrueに反転させてBlinkクラスのstateのshowTextの値に代入
      });
    }, 1000); // 1つ目の引数に取った関数を2つ目の引数のスパンで実行する
  }

  render() {
    let display = this.state.showText ? this.props.text :' '; // BlinkクラスのstateのshowTextキーに対する値がtrueならthis.props.textをに渡された引数をdisplayに代入、falseなら半角スペースを代入する
    return(
      <Text>
        {display} { /* displayに渡された値を表示 */ }
      </Text>
    );
  }
}

export default class BlinkApp extends React.Component {
  render(){
    return(
      <View style={styles.container}>
      { /*  Viewクラスのstyle変数に対してstylesオブジェクトのcontainer変数の値を渡してレンダリング*/ }
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
        { /* Blinkクラスのtext変数に対し、それぞれの文字列を引渡してレンダリング */}
      </View>
    );
  }
}
const styles = StyleSheet.create({ // constは定数、及び、Functionalコンポーネントの定義に用いることができる
  // var, const, let いずれにせよオブジェクトを作成するための関数
  container: {
    flex: 1, // flexboxをflexDirectionに指定した向きに、いくつ作るかを指定
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center', //flexDirectionに指定した方向と垂直の方向に対する要素の並べ方を指定
    justifyContent: 'center', // flexDirectionで指定した方向への要素の並び方を指定
  },
});
