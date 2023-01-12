import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, ActivityIndicator, Alert,Pressable } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Http from '../assets/Http';

export default function ModalUsersRut({setMostrarModalRut, mostrarModalRut, setUsers}) {

const [rut, setRut] = useState('');
const [respUsers, setRespUsers] = useState(false);
const [user, setUser ] = useState({
    nombre_persona: '',
    apellido_paterno_persona: '',
    apellido_materno_persona: '',
    nro_tarjeta: '',
});
 
const helperCloseModalRut = () => {
    setMostrarModalRut(false);
    setRespUsers(false);
};

const helperRut = text => {
    let cleanText = text.trim();
    setRut(cleanText);
        
};

const getDataRut = async () => {
                   
try {
                 
    const res = await Http.instance.get(`https://api/api_control_acceso/buscaRut.php?rut=${rut}`);
       
    if (res.status === 'ok') {
  
    const nombre_persona = res.result.nombre_persona;
    const apellido_paterno_persona = res.result.apellido_paterno_persona;
    const apellido_materno_persona = res.result.apellido_materno_persona;
    const nro_tarjeta = res.result.nro_tarjeta;
    const id_persona = res.result.id_persona;
  
    setUser({
            nombre_persona,
            apellido_paterno_persona,
            apellido_materno_persona,
            nro_tarjeta,
            id: id_persona,
          });
          
    setRespUsers(true);
          
    } else if (res.result == 'null') {
        Alert.alert(
            'Error',
            'el codigo de tarjeta no pertenece a ninguna persona registrada.',
            [{text: 'ok'}],
          );
        helperCloseModalRut();
        }
      } catch (error) {
       console.log(error);
       helperCloseModalRut();
      }
    };

    const addUserToRecords = () => {
      setUsers(prevState => [...prevState, {...user}]);
      helperCloseModalRut();
     setRut('');
    };
  

  return (
    <Modal visible={mostrarModalRut} transparent animationType="fade">
    <View style={styles.wrapperModal}>
        <View style={styles.modal}>
            <TouchableOpacity onPress={helperCloseModalRut} style={styles.btnClose}>
                 <Image
                    style={styles.imageClose}
                    source={require('../assets/img/closeModal.png')}
                 />
            </TouchableOpacity>
            <View style={styles.contenedorBuscador}>
            <TextInput 
                placeholder="RUT USUARIO"
                keyboardType="number-pad"
                placeholderTextColor="#c6c6c6"
                style = {styles.inputRut}
                value={rut}
                maxLength={8}
                onChangeText={text => helperRut(text)}
            />
            <Pressable
                onPress={() => getDataRut()}
                style={styles.btnDateSearch}>
                <Text style={styles.textSearch}>Buscar</Text>
            </Pressable>
            </View>
            {respUsers ? (
        <View style={styles.wrapperUsrData}>
          <Text style={styles.text}>
            {user.nombre_persona} {user.apellido_paterno_persona}{' '}
            {user.apellido_materno_persona}
          </Text>
          <Text style={styles.text}>NFC: {user.nro_tarjeta}</Text>
          <View style={styles.wrapperImgUsr}>
            <Image
              style={styles.imageUsr}
              source={require('../assets/img/avatar-user.jpg')}
            />
          </View>

          <TouchableOpacity
            onPress={addUserToRecords}
            style={styles.btnAddUser}>
            <Text style={styles.textBtnAddUser}>REGISTRAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.textInfo}>
            <Text style={styles.textoRut}>Ingresar RUT sin dígito verificador ni guion</Text>
        </View>
      )}
           
        </View>
    </View>
</Modal>
  )
}

const styles = StyleSheet.create({
    wrapperModal: {
        height: '110%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(22,29,47,0.5)',
        marginTop: -40
      },
      modal: {
        width: '90%',
        height: '70%',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
      },
      btnClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      imageClose: {
        width: 60,
        height: 60,
        tintColor: '#e96b62',
      },
      inputRut: {
        borderWidth: 2,
        width: '50%',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 20
        
      },
      contenedorBuscador:{
        width: '100%',
        marginTop: 80
      },
      btnDateSearch: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#c6000e',
        marginBottom: 10,
        borderRadius: 5,
        width: '30%',
        marginLeft: 220,
        marginTop: -55
      },
      textSearch: {
        color: '#FFFFFF',
        fontSize: 24,
      },
      textInfo: {
        marginTop: 80,
        textAlign: 'center',
        alignItems: 'center'
      },
      textoRut:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase'
      },
      wrapperUsrData: {
        alignItems: 'center',
        marginVertical: 5,
        marginTop: 10
      },
      imageUsr: {
        width: 200,
        height: 210,
      },
      text: {
        fontSize: 24,
        color: '#000',
        margin: 10,
        textAlign: 'center',
      },
      btnAddUser: {
        borderWidth: 1,
        width: '60%',
        backgroundColor: '#c6000e',
        marginVertical: 15,
        borderRadius: 5,
      },
      textBtnAddUser: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
      }
})