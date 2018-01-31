/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @providesModule ClipboardExample
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Clipboard,
  View,
  Text,
} = ReactNative;

class ClipboardExample extends React.Component<{}, $FlowFixMeState> {
  state = {
    content: 'Content will appear here'
  };

  _setClipboardContent = async () => {
    Clipboard.setString('Hello World');
    try {
      var content = await Clipboard.getString();
      this.setState({content});
    } catch (e) {
      this.setState({content:e.message});
    }
  };

  _selectableEvent = () => {
    Clipboard.setString(' World Hello');
    var content =  Clipboard.getString();
    this.setState({content});
  }

  render() {
    return (  
      <View>
        <Text onPress={this._setClipboardContent} selectable={this._selectableEvent}  style={{color: 'blue', marginTop: 30}}>
          Tap to put "Hello World" in the clipboard
        </Text>
        <Text style={{color: 'red', marginTop: 20}}>
          {this.state.content}
        </Text>
      </View>
    );
  }
}

export default ClipboardExample;

// exports.title = 'Clipboard';
// exports.description = 'Show Clipboard contents.';
// exports.examples = [
//   {
//     title: 'Clipboard.setString() and getString()',
//     render() {
//       return <ClipboardExample/>;
//     }
//   }
// ];
