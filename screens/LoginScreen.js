import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, Animated, StatusBar, TouchableWithoutFeedback, Alert, Keyboard, } from 'react-native'
import { Input } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../assets/AuthContext';
import Http from '../assets/Http';



export default function LoginScreen() {
    const ctx = useContext(AuthContext);
    const [usuario, setUsuario] = useState({ username: "", password: "" });
   
    
  
    const [animationBoton] = useState(new Animated.Value(1));
  
    const ocultarTeclado = () => {
      Keyboard.dismiss();
    };
  
    const animacionEntradada = () => {
      Animated.spring(animationBoton, {
        toValue: 0.9,
        useNativeDriver: true
      }).start();
    };
  
    const animacionSalida = () => {
      Animated.spring(animationBoton, {
        toValue: 1,
        friction: 6,
        tension: 20,
        useNativeDriver: true
      }).start();
    };
  
    const estiloAnimacion = {
      transform: [{ scale: animationBoton }]
    };
  
    const handleUsuario = (prop, value) => {
      setUsuario({
        ...usuario,
        [prop]: value
      });
    };
  
    const guardarInfoStorage = async (key, value) => {
      const string = JSON.stringify(value);
      try {
        await AsyncStorage.setItem(key, string);
      } catch (error) {
        console.log(error);
      }
    };
  
    const IngresoSistema = async () => {
  
      if (usuario.username.trim() == "" || usuario.password.trim() == "") {
  
        Alert.alert(
          "Datos incompletos",
          "Usuario y contraseña son obligatorios",
          [{ text: "OK" }]
        );
        return;
  
      } else {
        ctx.loading(true);
        const url = `https://api/api_control_acceso/Auth.php?user=${usuario.username}&password=${usuario.password}`;
  
        try {
          const res = await Http.instance.get(url);
          
          if (res.status) {
            if (res.status == "aborted") {
              ctx.loading(false);
              Alert.alert(
                "Error",
                "Se agoto el tiempo de espera, verifique su conexion a internet y su conexion VPN",
                [{ text: "OK" }]
              );
              return;
            } else if (res.status == "error") {
              ctx.loading(false);
              Alert.alert("Aviso", res.result, [{ text: "OK" }]);
            } else if (res.status == "ok") {
  
              guardarInfoStorage("infoUser", {
                configurador: res.result.configurador,
                id_usuarios: res.result.id_usuarios,
                id_persona: res.result.id_persona,
                username: usuario.username,
                password: usuario.password
              });
              guardarInfoStorage("infoCompleta", res.result);
              if (res.result.puntos) {
                guardarInfoStorage("puntos", res.result.puntos);
              }
              guardarInfoStorage("excusas", res.result.excusas);
              guardarInfoStorage("puntosPorEnviar", []);
  
              //Ejemplo Usuario:{user:12344}
              console.log(res.result.token);
  
             // await SecureStore.setItemAsync("user" + res.result.id_usuarios, res.result.token);
              ctx.login();
            }
          } else {
  
            ctx.loading(false);
            Alert.alert("Aviso", "Lo sentimos, ocurrio un error inesperado", [
              { text: "OK" }
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      }
  
    }
  
  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
    <View style={styles.contenedorLogin}>
      <View style={styles.contenedorImg}>
        <Image source={require("../assets/img/logo.png")} />
      </View>
      <StatusBar barStyle="light-content" />
      <View style={styles.contenedorInput}>
        <Input
          containerStyle={styles.input}
          
          keyboardType="number-pad"
          placeholder="USUARIO"
          value={usuario.user}
          onChangeText={(text) => handleUsuario("username", text)}
          placeholderTextColor="#000"
        />
        <Input
          containerStyle={styles.input}
          placeholder="CONTRASEÑA"
          secureTextEntry={true}
         
          value={usuario.password}
          onChangeText={(text) => handleUsuario("password", text.toLowerCase())}
          placeholderTextColor="#000"
        />

        <TouchableWithoutFeedback
          onPressIn={() => animacionEntradada()}
          onPressOut={() => animacionSalida()}
          onPress={() => IngresoSistema()}
        >
          <Animated.View style={[styles.btnInput, estiloAnimacion]}>
            <Text style={styles.textBtnInput}>INGRESAR</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>CONTROL ACCESO</Text>
      </View>

    </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    contenedorLogin: {
        flex: 1,
        backgroundColor: "#282325"
      },
      contenedorImg: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "26%"
      },
      input: {
        height: 55,
        color: '#fff',
        width: '100%',
        marginBottom: 25,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 3,
        borderColor: '#c6000e',
        marginTop: 17,
        fontWeight: "bold"
    
      },
      contenedorInput: {
        paddingHorizontal: 30,
        marginVertical: 30
      },
      btnInput: {
        backgroundColor: "#c6000e",
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
      },
      textBtnInput: {
        fontSize: 24,
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold"
      },
      icon: {
        color: "#c6000e"
      },
      footer: {
        marginTop: 150,
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 60
      },
      footerText: {
        fontWeight: 'bold',
        color: "white"
      }


})