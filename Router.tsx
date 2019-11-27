import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import welcomeScene from './src/scenes/welcomeScene';
import avatarScene from './src/scenes/avatarScene';
import privacyScene from './src/scenes/privacyScene';
import privacyOutro from './src/scenes/privacyOutro';
import maisDados from './src/scenes/maisDados';

const AppRouter = () => (
	<Router>
		<Stack key="root">
			<Scene
				key="welcome"
				component={welcomeScene}
				initial={true}
				hideNavBar={true}
			/>
			<Scene key="avatar" component={avatarScene} hideNavBar={true} />
			<Scene key="privacy" component={privacyScene} hideNavBar={true} />
			<Scene
				key="privacyOutro"
				component={privacyOutro}
				hideNavBar={true}
			/>
			<Scene key="maisDados" component={maisDados} hideNavBar={true} />
		</Stack>
	</Router>
);

export default AppRouter;
