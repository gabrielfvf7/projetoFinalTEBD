import React, { Component } from 'react';
import Router from './Router';
import { AppState } from 'react-native';

export default class App extends Component<AppState> {
	public render() {
		return <Router />;
	}
}
