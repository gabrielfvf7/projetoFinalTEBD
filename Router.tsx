import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import welcomeScene from './src/scenes/welcomeScene';
import avatarScene from './src/scenes/avatarScene';
import privacyScene from './src/scenes/privacyScene';
import privacyOutro from './src/scenes/privacyOutro';
import maisDados from './src/scenes/maisDados';
import graphScene from './src/scenes/graphScene';
import graphOtherScene from './src/scenes/graphOtherScene';

const AppRouter = () => (
	<Router>
		<Stack key="root">
			<Scene
				key="welcome"
				component={welcomeScene}
				//initial
				hideNavBar
			/>
			<Scene key="avatar" component={avatarScene} hideNavBar />
			<Scene key="privacy" component={privacyScene} hideNavBar />
			<Scene key="privacyOutro" component={privacyOutro} hideNavBar />
			<Scene key="maisDados" component={maisDados} hideNavBar />
			<Scene key="graph" initial component={graphScene} hideNavBar />
			<Scene key="graphOther" component={graphOtherScene} hideNavBar />
		</Stack>
	</Router>
);

export default AppRouter;
