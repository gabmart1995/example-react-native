import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Platform, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 5
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle:  'solid',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
    marginVertical: 10,
    borderRadius: 5
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: 'green',
    marginVertical: 30,
    borderRadius: 5
  },
  textSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
// componente de clase
export class Formulario extends Component {
  
  constructor( props ) {
    super(props);

    // todo se almacena en un unico estado
    this.state = {
      isPickerVisible: false,
      isTimerVisible: false,
      form: {
        date: '',
        hour: '',
        paciente: '',
        propietario: '',
        phone: '',
        sintomas: ''
      }
    };

    // binding
    this.handleConfirm = this.handleConfirm.bind( this );
    this.handleConfirmTime = this.handleConfirmTime.bind( this );
  }

  showDatePicker() {
    return this.setState( ( state ) => state.isPickerVisible = true );
  }

  hideDatePicker() {
    return this.setState( ( state ) => state.isPickerVisible = false );
  }

  showDatePickerTime() {
    return this.setState( ( state ) => state.isTimerVisible = true  );
  }

  hideDatePickerTime() {
    return this.setState( ( state ) => state.isTimerVisible = false  );
  }

  handleConfirm( date ) {

    // utilizar moment para parsear las fechas
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    this.setState( ( state ) => {
      return {
        ...state,
        form: {
          ...state.form,
          date: date.toLocaleDateString('es-ES', options )
        }
      };
    });
  
    return this.hideDatePicker();
  }

  handleConfirmTime( hour ) {
    
    this.setState(( state ) => {
      return {
        ...state,
        form: {
          ...state.form,
          hour: hour.toLocaleTimeString()
        }
      }
    });

    this.hideDatePicker();
  }

  handleChange( property, value ) {
    this.setState(( state ) => {
      return {
        ...state,
        form: {
          ...state.form,
          [property]: value
        }
      }
    });
  }

  handleSubmit() {
    
    const { paciente, phone, dueno, date, hour, sintomas } = this.state.form;
    const { anadirPaciente, showForm } = this.props;

    if (  
      paciente.trim().length === 0 ||
      phone.trim().length === 0 ||
      dueno.trim().length === 0 ||
      date.trim().length === 0 ||
      hour.trim().length === 0 || 
      sintomas.trim().length === 0
    ) {
      return this.showAlert( 'Error', 'Todos los campos son obligatorios' );
    }

    anadirPaciente( this.state.form );
    return showForm();
  }

  showAlert( action = 'Error', message = '' ) {
    // muestra la alerta si falla la validacion
    Alert.alert(
      action, //title
      message,
      [{
        text: 'OK'
      }]
    )
  }

  render() {

    const { isPickerVisible, isTimerVisible, form } = this.state;

    return (
      <>
        <ScrollView style={ styles.form }>
          <View>
            <Text style={ styles.label }>Paciente:</Text>
            <TextInput 
              style={ styles.input }
              onChangeText={ ( text ) => this.handleChange( 'paciente', text ) }
            />
          </View>
          <View>
            <Text style={ styles.label }>Dueño:</Text>
            <TextInput 
              style={ styles.input }
              onChangeText={ ( text ) => this.handleChange( 'propietario', text ) }
            />
          </View>
          <View>
            <Text style={ styles.label }>Teléfono Contacto:</Text>
            <TextInput 
              style={ styles.input }
              onChangeText={ ( text ) => this.handleChange( 'phone', text ) }
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={ styles.label }>Fecha:</Text>
            <Button title="Seleccionar fecha" onPress={ () => this.showDatePicker() } />
            <DateTimePickerModal 
              isVisible={ isPickerVisible }
              mode="date"
              onCancel={ () => this.hideDatePicker() }
              onConfirm={ this.handleConfirm }
              locale="es_ES"
              headerTextIOS="Elige una fecha"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
            <Text style={{ marginTop: 10 }}>{ form.date }</Text>
          </View>
          <View>
            <Text style={ styles.label }>Hora:</Text>
            <Button title="Seleccionar hora" onPress={ () => this.showDatePickerTime() } />
            <DateTimePickerModal 
              isVisible={ isTimerVisible }
              mode="time"
              onCancel={ () => this.hideDatePickerTime() }
              onConfirm={ this.handleConfirmTime }
              locale="es_ES"
              headerTextIOS="Elige una hora"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              is24Hour
            />
            <Text style={{ marginTop: 10 }}>{ form.hour }</Text>
          </View>
          <View>
            <Text style={ styles.label }>Sintomas:</Text>
            <TextInput 
              style={ styles.input }
              onChangeText={ ( text ) => this.handleChange('sintomas', text ) }
              multiline
            />
          </View>
          <TouchableHighlight style={ styles.btnSubmit } onPress={ () => this.handleSubmit() }>
            <Text style={ styles.textSubmit }>Enviar datos</Text>
          </TouchableHighlight>
        </ScrollView>
      </>
    );
  }
}