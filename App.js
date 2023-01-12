import 'react-native-gesture-handler';
import React, { useReducer, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

// SCREENS 
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen';
import reducer from './assets/Reducer';
import AuthContext from './assets/AuthContext';

const inicial = {
  loading: true,
  login: false,
  logout: false,
  userInfo: null
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, inicial);
  const [ejecutarEffect, setEjecutarEffect] = useState(false);

  useEffect(() => {
    let mounted = true;
    const verificarSession = async () => {
      let userInfo = null;
      try {
        userInfo = await AsyncStorage.getItem("infoUser");
      } catch (error) {
        console.log(error);
      }
      if (mounted) {
        dispatch({ type: "LOGIN", userInfo: userInfo });
      }
    };
    verificarSession();
    return function clearImmediate() {
      mounted = false;
    };
  }, [ejecutarEffect]);
  
  const authContext = useMemo(() => ({
    login: () => {
      dispatch({ type: "LOGIN" });
      setEjecutarEffect(true);
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
    loading: (bool) => {
      dispatch({ type: "LOADING", payload: bool });
      setEjecutarEffect(false);
    }
  }));

  if (state.loading) {
    return <LoadingScreen />;
  }  




  return (

    <>
    {state.userInfo ? (
      <NavigationContainer>
         <AuthContext.Provider value={authContext}>
        <HomeScreen />
      </AuthContext.Provider>
      </NavigationContainer>
       
      
      
    ) : (
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
        <LoginScreen/>
      </AuthContext.Provider>
      </NavigationContainer>
      
    )}
  </>

    
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})