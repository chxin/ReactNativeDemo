/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from 'react-native';

class AlertG extends Component {
    render() {
        return (

            <View style={{flex: 1}}>
                <Text
                    style={styles.text}
                    onPress={()=> this.showOneAlert()}>One</Text>
                <Text
                    style={styles.text}
                    onPress={()=> this.showTwoAlert()}>Two</Text>
                <Text
                    style={styles.text}
                    onPress={()=> this.showThreeAlert()}>Three</Text>
            </View>

        )
    }

    showOneAlert() {
        Alert.alert(
            'Alert 标题',
            '只有一个按钮',
            [
                /**
                 *  注意参数名字一定不能错
                 */
                {text: '确定', onPress: ()=> console.warn('点击确定')}
            ]);
    }

    showTwoAlert() {
        Alert.alert(
            'Alert 标题',
            '两个按钮',
            [
                {text: '确定', onPress: ()=> console.warn('点击确定'),style:'cancel'},
                {text: '取消', onPress: ()=> console.warn('点击取消')}
            ]
        );
    }

    showThreeAlert() {
        Alert.alert(
            'Alert 标题',
            '三个按钮',
            [
                //第一个和第二个按钮的位置会颠倒
                {text: '取消', onPress: ()=> console.warn('点击取消')},
                {text: '确定', onPress: ()=> console.warn('点击确定')},
                {text: '稍后', onPress: ()=> console.warn('点击稍后')},
            ]
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28
    }
})

module.exports = AlertG;
