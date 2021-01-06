import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Citas } from './components/Citas';

// css
const stylesCss = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#404040'    
  },
  container: {
    backgroundColor: '#dfe0ec',
    flex: 1
  }
});

const App = () => {
  
  // state
  const [ citas, setCitas ] = useState([
    {
      id: '1', 
      paciente: 'hook',
      propietario: 'Juan',
      sintomas: 'No come' 
    },
    {
      id: '2', 
      paciente: 'redux',
      propietario: 'Itzel',
      sintomas: 'No come' 
    },
    {
      id: '3', 
      paciente: 'native',
      propietario: 'Josue',
      sintomas: 'No come' 
    }
  ]);

  const eliminarPaciente = ( id ) => {
    setCitas( ( citasActuales ) => {
      return citasActuales.filter( ( cita ) => cita.id !== id )
    });
  }

  return (
    <View style={ stylesCss.container }>
      <Text style={ stylesCss.title }>Administrador de citas</Text>
      <Text style={ stylesCss.title }>{ citas.length > 0 ? 'Administra tus citas' : 'No hay citas disponibles' }</Text>
      <FlatList 
        data={ citas }
        renderItem={ ({ item }) => <Citas eliminarPaciente={ eliminarPaciente } cita={ item } /> }
        keyExtractor={ cita => cita.id }
      />      
    </View>
  );
};

export default App;
