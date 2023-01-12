import React, {useRef} from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import Swipeable  from 'react-native-gesture-handler/Swipeable'

const LeftAction = () => {
    return (
      <View style={styles.wrapperLeftAction}>
        <View style={styles.leftAction}>
          <Image
            style={styles.leftActionImg}
            source={require('../assets/img/delete.png')}
          />
        </View>
      </View>
    );
  };

export default function UserRecord(props) {
const {user, position, setUsers, id} = props;
const swipeRef = useRef();  
 
const closeSwipable = () => {
    swipeRef?.current?.close();
  };

  const deleteUser = () => {
    Alert.alert(
      'Confirmar',
      `¿Desea eliminar a ${user.nombre_persona} ${user.apellido_paterno_persona}?`,
      [
        {text: 'Cancelar', onPress: closeSwipable},
        {
          text: 'SI',
          onPress: () => {
            closeSwipable();
            setUsers(prevState => {
              const newState = prevState.filter(state => state.id != id);
              return [...newState];
            });
          },
        },
      ],
    );
  };


  return (
    <Swipeable
    ref={swipeRef}
    onSwipeableWillOpen={deleteUser}
    containerStyle={styles.swipeable}
    friction={2}
    rightThreshold={20}
    overshootFriction={4}
    overshootLeft={false}
    // onSwipeableWillOpen={}
    renderRightActions={LeftAction}>
    <View style={styles.recordUser}>
      <Text style={styles.text}>{position + 1}</Text>
      <View style={styles.wrapperTextName}>
        <Text style={styles.text}>
          {user.nombre_persona} {user.apellido_paterno_persona}{' '}
          {user.apellido_materno_persona}
        </Text>
      </View>
      <Text style={styles.text}>ID: {user.nro_tarjeta}</Text>
      <View style={styles.wrapperImgUsr}>
        <Image
          style={styles.imgUsr}
          source={require('../assets/img/userImg.png')}
        />
      </View>
    </View>
  </Swipeable>
  )
}

const styles = StyleSheet.create({
    recordUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
      },
      imgUsr: {
        width: 40,
        height: 40,
        borderWidth: 1,
      },
      wrapperImgUsr: {
        width: 50,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#d8d8d8',
      },
      wrapperTextName: {
        width: 150,
        textAlign: 'left',
      },
      text: {
        color: '#000',
      },
      wrapperLeftAction: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      leftAction: {
        paddingVertical: 13,
        paddingHorizontal: 7,
        backgroundColor: '#f00',
        flex: 1,
        minWidth: 30,
        flexDirection: 'row',
      },
      leftActionImg: {
        width: 30,
        height: 30,
        tintColor: '#fff',
      },
      swipeable: {
        borderWidth: 1,
        padding: 0,
        marginVertical: 10,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 3,
      },
});