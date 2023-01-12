import React, {useContext} from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import AuthContext from '../assets/AuthContext';

export default function CuentaScreen() {

  const ctx = useContext(AuthContext);


  return (
    <View style={styles.contBtnCerrarSesion}>
      <Pressable 
       style={styles.btnCerrarSesion}
       onPress={() => ctx.logout()}
      >
        <Text style={styles.textBtnCerrarSesion}>Cerrar Session</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

  btnCerrarSesion: {
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "#c6000e",
    borderRadius: 4,
    elevation: 4,
    
  },
  contBtnCerrarSesion: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300
  },
  textBtnCerrarSesion: {
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff"
  },
})