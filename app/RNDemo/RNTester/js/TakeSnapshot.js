import React, { Component } from 'react';
var ReactNative = require('react-native');
import { AppRegistry, Text, View, Dimensions, Image } from 'react-native';
var {height, width} = Dimensions.get('window');
export default class pictureDemo extends Component {
  constructor(props){
    super(props);
    this.state = {uri: 'null'}
  }

  takeToImage() {
    ReactNative.takeSnapshot(this.refs.location, {format: 'png', quality: 1}).then(
        (uri) => this.setState({uri:uri})
    ).catch(
        (error) => alert(error)
    );
  }

  render(){
      console.log(this.state.uri);
      return (
        <View>
            <View ref='location' style={{backgroundColor: 'green', padding: 12, margin: 20}}>
                <Text>this is a girl</Text>
                <Text>this is a friend</Text>
                <Text>o</Text>
                <Text>this is a girl friend</Text>
            </View>
            <Text onPress={()=>this.takeToImage()}>生成图片</Text>
            <Image style={{borderWidth: 1, height: 100, width: width, marginTop: 10}} source={{uri: this.state.uri}} />
        </View>
      );
    }
}