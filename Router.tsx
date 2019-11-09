import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import welcomeScene from './src/scenes/welcomeScene';
import avatarScene from './src/scenes/avatarScene';

const AppRouter = () => (
        <Router>
            <Stack key="root">
                <Scene key="welcome" component={welcomeScene} initial={true} hideNavBar={true} />
                <Scene key="avatar" component={avatarScene} hideNavBar={true} />
            </Stack>
        </Router>
)

export default AppRouter;