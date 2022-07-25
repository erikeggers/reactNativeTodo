import React, {useState} from 'react';
import {AuthScreen} from './screens/auth_screen';
import {Linking, Platform} from 'react-native';
import {Alert} from 'react-native';
import {TodoListScreen} from './screens/todo_list_screen';
import {TodoContextProvider} from './context/todo_context';
import * as LocalAuthentication from 'expo-local-authentication';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const onAuthenticate = async () => {
    const auth = LocalAuthentication?.authenticateAsync({
      promptMessage: 'Authenticate to access your todos',
    });
    auth
      .then(result => {
        if (result.success) {
          setIsAuthenticated(true);
        } else if (Platform.OS === 'android') {
          Alert.alert('Authentication', 'Please set a passcode to continue', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Set',
              onPress: () => {
                Linking.sendIntent('android.settings.SECURITY_SETTINGS');
              },
            },
          ]);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'You must authenticate to access your todos');
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <TodoContextProvider>
          <TodoListScreen />
        </TodoContextProvider>
      ) : (
        <AuthScreen onAuthenticate={onAuthenticate} />
      )}
    </>
  );
};

export default App;
