// seccion layouts
import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    banner: {
      height: 250,
      flex: 1
    },
    title: {
      fontSize: 24,
      marginVertical: 20,
      fontWeight: "bold"
    },
    container: {
      marginHorizontal: 10
    },
    city: {
      width: 250,
      height: 300,
      marginRight: 10
    },
    mejores: {
      width: '100%',
      height: 200,
      marginVertical: 5
    },
    listado: {
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: 'space-around'
    }, 
    listdoItem: {
      flexBasis: '49%'
    }
});

const Layouts2 = () => {
    return ( 
      <>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <Image 
              style={ styles.banner } 
              source={ require('./../assets/img/bg.jpg') } 
            />
          </View>
          <View style={ styles.container }>
            <Text style={ styles.title }>Que hacer en París</Text>
          </View>
          <ScrollView horizontal>
            <View>
              <Image 
                style={ styles.city } 
                source={ require('./../assets/img/actividad1.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.city } 
                source={ require('./../assets/img/actividad2.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.city } 
                source={ require('./../assets/img/actividad3.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.city } 
                source={ require('./../assets/img/actividad4.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.city } 
                source={ require('./../assets/img/actividad5.jpg') } 
              />
            </View>
          </ScrollView>
          <Text style={ styles.title }>Los mejores alojamientos</Text>
          <View>
            <View>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/mejores1.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/mejores2.jpg') } 
              />
            </View>
            <View>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/mejores3.jpg') } 
              />
            </View>
          </View>
          <Text style={ styles.title }>Hospedajes en LA</Text>
          <View style={ styles.listado }>
            <View style={ styles.listdoItem }>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/hospedaje1.jpg') } 
              />
            </View>
            <View style={ styles.listdoItem }>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/hospedaje2.jpg') } 
              />
            </View>
            <View style={ styles.listdoItem }>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/hospedaje3.jpg') } 
              />
            </View>
            <View style={ styles.listdoItem }>
              <Image 
                style={ styles.mejores } 
                source={ require('./../assets/img/hospedaje4.jpg') } 
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
}

export {
  Layouts2
};