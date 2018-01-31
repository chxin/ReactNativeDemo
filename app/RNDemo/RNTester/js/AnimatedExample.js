import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RNTesterButton from './RNTesterButton.js';

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
    };
  }
  componentDidMount() {
    Animated.timing(                            // 随时间变化而执行的动画类型
      this.state.fadeAnim,                      // 动画中的变量值
      {
        toValue: 1,                             // 透明度最终变为1，即完全不透明
        duration: 8000,
      }
    ).start();                                  // 开始执行动画
  }
  render() {
    return (
      <Animated.View                            // 可动画化的视图组件
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class FadeInExample extends React.Component<$FlowFixMeProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      opacity: 1,
      anim: new Animated.Value(1), 
      anims: [1,2,3].map( () => new Animated.Value(1) ),      
    };
  }
  render() {
    return (
      <View>
        <FadeInView style={{ height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
        </FadeInView>

        <RNTesterButton onPress={() => {
            this.setState((state) => (
              {show: !state.show,opacity: state.opacity?0:1}
            ));
          }}>
          Press to {this.state.show ?
            'Hide' : 'Show'}
        </RNTesterButton>
        <View style={{height: 50,backgroundColor: 'black',opacity: this.state.opacity}} />
        <RNTesterButton onPress={() => {
          Animated.spring(this.state.anim, {
            toValue: 0,   // Returns to the start
            velocity: 3,  // Velocity makes it move
            tension: -10, // Slow
            friction: 1,  // Oscillate a lot
          }).start(); }}>
          Press to Fly in
        </RNTesterButton>
        <Animated.View
          style={[styles.content, {
            transform: [   
              {scale: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 4],
              })},
              {translateX: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 500],
              })},
              {rotate: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })},
            ]}
          ]}>
          <Text>Transforms!</Text>
        </Animated.View>
        <RNTesterButton onPress={() => {
          var timing = Animated.timing;
          Animated.sequence([ // One after the other
            timing(this.state.anims[0], {
              toValue: 200,
              easing: Easing.linear,
            }),
            Animated.delay(400), // Use with sequence
            timing(this.state.anims[0], {
              toValue: 0,
              easing: Easing.elastic(2), // Springy
            }),
            Animated.delay(400),
            Animated.stagger(200,
              this.state.anims.map((animate) => timing(
                animate, {toValue: 200}
              )).concat(
              this.state.anims.map((animate) => timing(
                animate, {toValue: 0}
              ))),
            ),
            Animated.delay(400),
            Animated.parallel([
              Easing.inOut(Easing.quad), // Symmetric
              Easing.back(1.5),  // Goes backwards first
              Easing.ease        // Default bezier
            ].map((easing, ii) => (
              timing(this.state.anims[ii], {
                toValue: 320, easing, duration: 3000,
              })
            ))),
            Animated.delay(400),
            Animated.stagger(200,
              this.state.anims.map((animante) => timing(animante, {
                toValue: 0,
                easing: Easing.bounce, // Like a ball
                duration: 2000,
              })),
            ),
          ]).start(); }}>
          Press to Animate
        </RNTesterButton>
        {['Composite', 'Easing', 'Animations!'].map(
          (text, ii) => (
            <Animated.View
              key={text}
              style={[styles.content, {
                left: this.state.anims[ii]
              }]}>
              <Text>{text}</Text>
            </Animated.View>
          )
        )}
      </View>
    );
  }
}


export default FadeInExample;


var styles = StyleSheet.create({
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

