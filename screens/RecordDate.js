import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image,  Pressable, Modal, TouchableOpacity, ActivityIndicator, ScrollView,} from 'react-native';
import PersonScreen from './PersonScreen';

export default function RecordDate({x}) {
    console.log("valor x : ", x)
  const [showModal, setShowModal] = useState(false);
  const [recordsId, setRecordsId] = useState([]);
  const [getPersons, setGetPersons] = useState(false);

  const getPersonsToServ = async () => {
    const data = await fetch(
      `https://api/api_control_acceso/DetalleId.php?id=${x.id}`,
    );
    const dataJson = await data.json();
    console.log(dataJson);
    setRecordsId(dataJson.result);
  };

  useEffect(() => {
    console.log(getPersons);
    if (getPersons) {
      getPersonsToServ();
    }
  }, [getPersons]);

  return (
    <>
    <Pressable
      onPress={() => {
        setShowModal(true);
        setGetPersons(true);
      }}
      style={styles.record}>
      <View style={styles.wrapperImgFolder}>
        <Image
          style={styles.imgFolder}
          source={require('../assets/img/folder.png')}
        />
      </View>
      <View style={styles.wrapperTextRecord}>
        <Text style={styles.textRecord}>Patente:</Text>
        <Text style={styles.textRecord}>{x.patente}</Text>
      </View>
      <View style={styles.wrapperTextRecord}>
        <Text style={styles.textRecord}>Entrada:</Text>
        <Text style={styles.textRecord}>{x.hora}</Text>
      </View>
      <View style={styles.wrapperTextRecord}>
        <Text style={styles.textRecord}>Salida:</Text>
        <Text style={styles.textRecord}>{x.hora_salida}</Text>
      </View>
    </Pressable>
    <Modal visible={showModal} transparent animationType="fade">
      <View style={styles.wrapperModal}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.btnClose}>
            <Image
              style={styles.imageClose}
              source={require('../assets/img/closeModal.png')}
            />
          </TouchableOpacity>
          {recordsId.length ? (
            <ScrollView style={styles.wrapperPersons}>
              {recordsId.map((record, i) => (
                <PersonScreen record={record} key={i} />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.wrapperAct}>
              <Text style={styles.textRecord}>Buscando personas</Text>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </View>
      </View>
    </Modal>
  </>
  )
}

const styles = StyleSheet.create({
    record: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginVertical: 10,
        elevation: 5,
      },
      wrapperImgFolder: {
        width: 40,
        height: 40,
      },
      imgFolder: {
        width: 40,
        height: 40,
      },
      textRecord: {
        color: '#000',
        fontSize: 16,
      },
      wrapperTextRecord: {
        flex: 1,
        alignItems: 'center',
      },
      wrapperModal: {
        flex: 1,
        backgroundColor: 'rgba(22,29,47,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modal: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 5,
      },
      btnClose: {
        position: 'absolute',
        right: 2,
        top: 2,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        zIndex: 10,
        backgroundColor: '#fff',
      },
      imageClose: {
        width: 60,
        height: 60,
        tintColor: '#e96b62',
      },
      wrapperAct: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      wrapperPersons: {
        padding: 15,
        width: '100%',
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
      },
})