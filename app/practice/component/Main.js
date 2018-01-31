import React, { Component } from 'react';
import {
	StyleSheet,
	FlatList,
	TextInput,
	Text,
	View,
	Image
} from 'react-native';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: ''
		};
		this.searchMovies = this.searchMovies.bind(this);
	}

	searchMovies = debounce( (text) => {
		this.setState({data: text});
		fetch('http://www.omdbapi.com/?apikey=950f6b90&s=' + text)
			.then((response) => response.json())
			.then((responseData) => {
				if ('Search' in responseData) {
					console.warn(responseData.Search);
				}
			})
			.catch((err) => {
				console.warn(err);
			})
	},500);

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
					// onChangeText={ (text) => this.setState({ data: text })}
					onChangeText={this.searchMovies}
					placeholder="Enter search keyword"
				/>
				
				<FlatList
					style={styles.welcome}
					data={[{key: this.state.data}]}
					renderItem={({item}) => <Text>{item.key}</Text>}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		// fontSize: 20,
		// textAlign: 'center',
		margin: 10,
	}
});
