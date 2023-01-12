import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


export default function PersonScreen({record}) {
  return (
    <View style={styles.wrapperPerson}>
      <View>
        <Text style={styles.textLabel}>Nombre:</Text>
        <Text style={styles.textPerson}>
          {record.nombre_persona} {record.apellido_paterno_persona}{' '}
          {record.apellido_materno_persona}
        </Text>
      </View>
      <View style={styles.wrapperSecond}>
        <View>
          <Text style={styles.textLabel}>RUT:</Text>
          <Text style={styles.textPerson}>
            {record.rut_persona}-{record.dv_persona}
          </Text>
        </View>

        <View>
          <Text style={styles.textLabel}>Nro Tarjeta:</Text>

          <Text style={styles.textPerson}>{record.nro_tarjeta}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapperPerson: {
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
      textPerson: {
        color: '#000',
        fontSize: 16,
      },
      textLabel: {
        fontSize: 16,
        color: '#a5a5a5',
      },
      wrapperSecond: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // borderWidth: 1,
      },
})