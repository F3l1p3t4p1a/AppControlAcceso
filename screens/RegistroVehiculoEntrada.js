import React, {useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image,TouchableHighlight,TextInput,  Keyboard, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UserRecord from './UserRecord';
import ModalAddUser from './ModalAddUser';
import ModalUsersRut from './ModalUsersRut';

export default function RegistroVehiculoEntrada({navigation}) {


  const [users, setUsers] = useState([]);
  const [patente, setPatente] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalRut, setMostrarModalRut] = useState(false);
  const [swipeableRef, setSwipeableRef] = useState([]);

  const _scrollView = useRef();
  const helperPatente = text => {
    let cleanText = text.trim();
    setPatente(cleanText);
  };
  
  const sendData = async () => {
    const date = new Date();
    const month = date.getMonth() <  9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    const fecha = `${date.getFullYear()}-${month}-${day}`;
    const hora = `${date.getHours()}:${date.getMinutes()}`;
    
    const entrada = 1;
    const salida = 0;
    
    const obj = {
      patente,
      fecha,
      hora,
      entrada,
      salida,
      personas: users,
    };

     
    try {
      const data = await fetch(`https://api/api_control_acceso/IngresoVehiculo.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      const dataJson = await data.json();
      if (dataJson.status == 'ok') {
        Alert.alert('ENTRADA ENVIADA', 'La entrada de la tripulacion se guardo exitosamente', [
          {
            text: 'ok',
            onPress: () => {
              setPatente('');
              setUsers([]);
            },
          },
        ]);
      }
    } catch (error) {
     console.log(error);
    }
    
  };

  const validateSendData = () => {
    if (patente.length < 6) {
      Alert.alert('Error', 'La patente no cuenta con los digitos correctos.', [
        {text: 'ok'},
      ]);

      return;
    } else if (users.length == 0) {
      Alert.alert('Aviso', 'Debe registrar al menos un tripulante', [
        {text: 'ok'},
      ]);
    } else {
      sendData();
    }
  };

  useEffect(() => {
    _scrollView.current.scrollToEnd();
  }, [mostrarModal]);

  useEffect(() => {
    _scrollView.current.scrollToEnd();
  }, [mostrarModalRut]);


  return (
    <GestureHandlerRootView style={styles.contenedor}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapperGeneral}>
        <View style={styles.wrapperPatente}>
          <Text style={styles.title}>Registrar tripulación Entrada</Text>
          <TextInput
            placeholder="PATENTE"
            placeholderTextColor="#c6c6c6"
            style={styles.inputPatente}
            value={patente}
            maxLength={6}
            onChangeText={text => helperPatente(text)}
          />
          <View style={styles.wrapperBtnAdd}>
            <TouchableHighlight
              onPress={() => setMostrarModal(true)}
              style={styles.btnAdd}>
              <Image
                style={styles.imgAdd}
                source={require('../assets/img/add.png')}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.wrapperBtnAdd}>
            <TouchableHighlight
              onPress={() => setMostrarModalRut(true)}
              style={styles.btnAddRut}>
              <Image
                style={styles.imgAdd}
                source={require('../assets/img/add.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={styles.wrapperScrollView}
          onStartShouldSetResponder={() => true}>
          <ScrollView
            ref={_scrollView}
            decelerationRate={0.9}
            onStartShouldSetResponder={() => true}
            style={styles.scrollView}>
            {users.length ? (
              <View style={styles.wrapperRegisters}>
                {users.map((user, i) => (
                  <UserRecord
                    setUsers={setUsers}
                    position={i}
                    key={i}
                    user={user}
                    id={user.id}
                    swipeableRef={swipeableRef}
                    setSwipeableRef={setSwipeableRef}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.wrapperImg}>
                <Text style={styles.textHome}>
                  Agregue una persona en el boton de MAS (+)
                </Text>
                <Image
                  style={styles.img}
                  source={require('../assets/img/homeSearch.png')}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.wrapperBtnEnd}>
          <TouchableHighlight
            onPress={validateSendData}
            style={styles.btnEnd}>
            <Text style={styles.textBtnEnd}>FINALIZAR</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
    <ModalAddUser
      setUsers={setUsers}
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
    />
    <ModalUsersRut 
      setUsers={setUsers}
      mostrarModalRut={mostrarModalRut}
      setMostrarModalRut={setMostrarModalRut}
    />
  </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    flex: 1,
    backgroundColor: '#fce8e8'
  },
  wrapperPatente: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    marginVertical: 7,
  },
  scrollView: {
    flex: 1,
  },
  inputPatente: {
    borderWidth: 1,
    width: '70%',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 5,
    //textTransform: 'uppercase',
  },
  wrapperBtnAdd: {
    width: 50,
    height: 50,
  },
  btnAdd: {
    width: '100%',
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#c6000e',
  },
  btnAddRut: {
    width: '100%',
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#000',
  },
  imgAdd: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  wrapperGeneral: {
    flex: 1,
  },
  wrapperScrollView: {
    flex: 1,
    padding: 10,
  },
  wrapperBtnEnd: {
    height: 50,
    alignItems: 'center',
  },
  btnEnd: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    backgroundColor: '#c6000e',
    borderRadius: 50,
    marginTop: -30,
  },
  textBtnEnd: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: "bold"
  },
  wrapperImg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 250,
    height: 250,
  },
  textHome: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#000',
    marginVertical: 10,
  },
  
})