import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuscarScreen from './BuscarScreen'
import RegistroVehiculoEntrada from './RegistroVehiculoEntrada';
import RegistroVehiculoSalida from './RegistroVehiculoSalida';
import CuentaScreen from './CuentaScreen';
import  Icon  from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {

    


    
  return (
    <Tab.Navigator 
    screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#c6000e',
        tabBarInactiveBackgroundColor: 'black',
       tabBarIcon: ({focused, color, size}) => {
        let IconName = '';
        switch (route.name) {
            case 'BUSCAR':
                IconName = focused ? 'search-outline' : 'search-circle-outline';
                color = '#fff';
            break;
            case 'ENTRADA':
                IconName = focused ? 'enter' : 'car-sport';
                color = '#fff';
            break;
            case 'SALIDA':
                IconName = focused ? 'exit' : 'car-sharp';
                color = '#fff';
            break;
            case 'CUENTA':
                IconName = focused ? 'person-circle' : 'person';
                color = '#fff';
            break;

        }

        return <Icon name={IconName} size={size} color= {color} />
       }
    })}
    >
        <Tab.Screen 
            name="BUSCAR" 
            component={BuscarScreen}  
            options={{
                title: 'BUSCAR',
                headerStyle: {backgroundColor: '#000'},
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }} 
        />
        <Tab.Screen 
            name="ENTRADA" 
            component={RegistroVehiculoEntrada}
            options={{
                title: 'ENTRADA',
                headerStyle: {backgroundColor: '#000'},
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
        />
        <Tab.Screen 
            name="SALIDA" 
            component={RegistroVehiculoSalida}
            options={{
                title: 'SALIDA',
                headerStyle: {backgroundColor: '#000'},
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }} 
        />
        <Tab.Screen 
            name="CUENTA" 
            component={CuentaScreen}
            options={{
                title: 'CUENTA',
                headerStyle: {backgroundColor: '#000'},
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }} 
        />
        
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: 'black',
    }
})