import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('RNCallKeepBackgroundMessage', () => ({ name, callUUID, handle }) => {
    // Make your call here

    return Promise.resolve();
});