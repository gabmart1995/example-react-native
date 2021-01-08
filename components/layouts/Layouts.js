// seccion layouts
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'cornflowerblue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  caja1: {
    padding: 20,
    backgroundColor: 'navy',
  }, 
  caja2: {
    padding: 20,
    backgroundColor: 'yellow'
  },
  caja3: {
    padding: 20,
    backgroundColor: 'green',
  },
  caja4: {
    padding: 20,
    backgroundColor: 'teal'
  }, 
});

const Layouts = () => {
    return ( 
      <View style={ styles.contenedor }>
        <View style={ styles.caja1 }></View>
        <View style={ styles.caja2 }></View>
        <View style={ styles.caja3 }></View>
        <View style={ styles.caja4 }></View>
      </View>
    );
}

export {
  Layouts
};