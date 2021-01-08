import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
      backgroundColor: '#5e49e2',
      padding: 10,
      marginTop: 20
    },
    textCotizar: {
      color: '#fff',
      fontFamily: 'Lato-Black',
      fontSize: 18,
      textTransform: 'uppercase',
      textAlign: 'center'
    }
});

export const Formulario = ( props ) => {

  const { moneda, criptomoneda, setMoneda, saveCriptomoneda, saveConsultarAPI } = props;
  const [ criptomonedas, saveCriptomonedas ] = useState([]);

  // funciones
  useEffect(() => {
    const consultarAPI = async () => {
      
      try {
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
        const resultado = await axios.get( url );
        
        saveCriptomonedas( resultado.data.Data );
        console.log( criptomonedas );
        
      } catch ( error ) {
        console.log( error );
      }
    }

    consultarAPI();

  }, [])

  const obtenerMoneda = ( value ) => setMoneda( value );
  const obtenerCriptomoneda = ( value ) => saveCriptomoneda( value );

  const cotizarPrecio = () => {
    
    if (
      moneda.trim().length === 0 ||
      criptomoneda.trim().length === 0 
    ) {
      return Alert.alert(
        'Error', 
        'Todos los campos son requeridos', 
        [{ text: 'OK' }]
      )
    }

    // consulta al API
    saveConsultarAPI( true );
  }

  return (
    <View>
      <Text style={ styles.label }>Monedas</Text>
      <Picker 
        selectedValue={ moneda } 
        onValueChange={ obtenerMoneda }>
        <Picker.Item label="Seleccione" value=""></Picker.Item>
        <Picker.Item label="Dolar USD" value="USD"></Picker.Item>
        <Picker.Item label="Peso Mexicano" value="MXN"></Picker.Item>
        <Picker.Item label="Euro" value="EUR"></Picker.Item>
        <Picker.Item label="Libra Esterlina" value="GBP"></Picker.Item>
      </Picker>
      <Text style={ styles.label }>Criptomonedas</Text>
      <Picker 
        selectedValue={ criptomoneda }
        onValueChange={ obtenerCriptomoneda }
        itemStyle={{ height: 120 }}  
      >
        <Picker.Item label="Seleccione" value=""></Picker.Item>
        { criptomonedas.map( ( cripto ) => (
            <Picker.Item 
              label={ cripto.CoinInfo.FullName } 
              value={ cripto.CoinInfo.Name }
              key={ cripto.CoinInfo.Id }
            ></Picker.Item>
          )) 
        }
      </Picker>
      <TouchableHighlight onPress={ cotizarPrecio } style={ styles.btnCotizar }>
        <Text style={ styles.textCotizar }>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
}

