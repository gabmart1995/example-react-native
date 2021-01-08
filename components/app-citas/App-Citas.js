import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Citas } from './Citas';
import { Formulario } from './Formulario';
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
    },
    content: {
      flex: 1,
      marginHorizontal: '2.5%'
    },
    list: {
      flex: 1
    },
    btnShow: {
      padding: 10,
      backgroundColor: '#C4C4C4',
      marginVertical: 10
    },
    textShow: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });

export const AppCitas = () => {
  
  // state
  const [ showForm, setShowForm ] = useState( false );
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

  const anadirPaciente = ( paciente ) => {
    setCitas( ( citasActuales ) => {
      return citasActuales.concat([{
        ...paciente,
        id: ( citasActuales.length + 1 ).toString()
      }]);
    });
  }

  return (
    <View style={ stylesCss.container }>
      <Text style={ stylesCss.title }>Administrador de citas</Text>
      <TouchableHighlight style={ stylesCss.btnShow } onPress={ () => setShowForm( !showForm ) }>
        <Text style={ stylesCss.textShow }>{ showForm ? 'Cancelar crear cita' : 'Crear nueva cita' }</Text>
      </TouchableHighlight>
      <View style={ stylesCss.content }>
        { showForm ? ( 
            <>
              <Text style={ stylesCss.title }>Crea una cita</Text>
              <Formulario 
                showForm={ () => setShowForm( false ) } 
                anadirPaciente={ anadirPaciente } 
              /> 
            </>
          ) : 
          (
            <>
              <Text style={ stylesCss.title }>{ citas.length > 0 ? 'Administra tus citas' : 'No hay citas disponibles' }</Text>
                <FlatList 
                  data={ citas }
                  renderItem={ ({ item }) => <Citas eliminarPaciente={ eliminarPaciente } cita={ item } /> }
                  keyExtractor={ cita => cita.id }
                  style={ stylesCss.list }
                /> 
            </>
          ) 
        }
      </View> 
    </View>
  );
}