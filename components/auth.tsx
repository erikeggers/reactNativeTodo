import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IAuth} from '../types';
import {COLORS} from '../assets/colors';

export const Auth = ({onAuthenticate}: IAuth) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeWrapper}>
        <Text style={styles.title}>Your Todos App</Text>
        <TouchableOpacity
          onPress={onAuthenticate}
          style={styles.authenticateButton}
          testID="authenticateButton">
          <Text style={styles.authenticateButtonText}>Authenticate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Auth styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  welcomeWrapper: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: COLORS.secondary,
    fontSize: 24,
    fontWeight: '800',
  },
  authenticateButton: {
    backgroundColor: COLORS.secondary,
    marginTop: 24,
    padding: 12,
    borderRadius: 20,
  },
  authenticateButtonText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
