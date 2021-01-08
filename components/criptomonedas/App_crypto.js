import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { Header } from './header';
import { Formulario } from './formulario';
import { Cotizacion } from './cotizacion';

import axios from 'axios';

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  cargando: {
    marginTop: 15
  }
})

export const App_crypto = () => {
  
  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, saveCriptomoneda ] = useState('');
  const [ consultarAPI, saveConsultarAPI ] = useState( false );
  const [ resultado, guardarresultado ] = useState({});
  const [ cargando, setCargando ] = useState( false )

  const propsFormulario = {
    moneda,
    criptomoneda,
    setMoneda,
    saveCriptomoneda,
    saveConsultarAPI
  };

  useEffect(() => {

    const cotizar = async () => {
      
      if ( consultarAPI ) {
  
        try {
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;
          const resultado = await axios.get( url );
          
          setCargando( true );

          setTimeout(() => {
            guardarresultado( resultado.data.DISPLAY[ criptomoneda ][ moneda ] );
            saveConsultarAPI( false );
            setCargando( false );
          }, 3000)

        } catch( error ) {
          console.log( error );
        }
      }
    }

    cotizar();

  }, [ consultarAPI ])

  const componente = cargando ? 
    ( <ActivityIndicator color="#5e49e2" size="large" animating={ true } /> ) : 
    ( <Cotizacion resultado={ resultado } /> ); 

  return (
    <>
      <ScrollView>
        <Header/>
        <Image 
          style={ styles.imagen } 
          source={ require('../../assets/img/cryptomonedas.png') } 
        />
        <View style={ styles.contenido }>
          <Formulario { ...propsFormulario } />
        </View>
        <View style={ styles.cargando }>
          { componente }
        </View>
      </ScrollView>
    </>
  );
}