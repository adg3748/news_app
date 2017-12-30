import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Greeting extends React.Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

export default class LotsOfGreeting extends React.Component {
  render(){
    return(
      <View style={styles.container}>
  <Greeting name='aaa' />
  <Greeting name='bbb' />
  <Greeting name='ccc' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
