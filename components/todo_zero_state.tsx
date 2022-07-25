import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../assets/colors';

// Zero state component that shows when there are no todos
export const TodoZeroState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.zeroStateText}>No Todos</Text>
      <Text style={styles.zeroStateText}>Add a todo to get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    margin: 8,
  },
});
