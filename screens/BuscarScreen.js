import React, {useState, useMemo, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable, Alert, ScrollView,Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import RecordDate from './RecordDate';
import Http from "../assets/Http";
import { TextInput } from 'react-native-gesture-handler';

export default function BuscarScreen({navigation}) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [records, setRecords] = useState([]);
  const [searching, setSearching] = useState(false);
  const [patente, setPatente] = useState('');
  const [url, setUrl] = useState('');
  const maximumDate = useMemo(() => {
    return new Date();
  });

  const helperPatente = text => {
    let cleanText = text.trim();
    setPatente(cleanText);
    setShow(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const queryForDate = date => {
    setDate(date);
    setShow(false);
  };

  const buscarInfo = () => {
    setSearching(true);
    setShow(false);
    
  }

  let controller = new AbortController();
  let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  let year = date.getFullYear();
  
  const askToServ = async () => {
    
    setTimeout(() => {
      controller.abort();
    }, 5000);

    if (patente === '' ){
      setUrl(`https://api/api_control_acceso/DetalleFecha.php?fecha=${year}-${month}-${day}`);
    }

    if (patente !== ''){
      setUrl(`https://api/api_control_acceso/DetalleFecha.php?fecha=${year}-${month}-${day}&patente=${patente}`);
    }
    
    

    try {
      const res = await Http.instance.get(url);
      
      if (res.result.length > 0) {

      if (res.status == "aborted") {
        Alert.alert(
          'Aviso',
          'No se encontraron resultados para la fecha indicada.',
          [{text: 'ok'}],
        );
      } else if (res.status == "error") {
        Alert.alert(
          'Error',
          'Ocurrio algo inesperado, por favor contacta al area TI.',
          [{text: 'ok'}],
        );
      } else if (res.status = "ok") {
        setRecords(res.result);
      }


     
    }else{
       Alert.alert(
          'Aviso',
          'No se encontraron resultados para la fecha indicada.',
          [{text: 'ok'}],
        );
    }
    } catch (error) {
      console.log(error);
      setSearching(false);
    }
    
  }; 

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (searching) {
        controller.abort();
        
      }
    });
  }, []);

  

  useEffect(() => {
    if (searching) {
      askToServ();
    }

    return function clean() {
      //setSearching(false);
    };
  }, [searching]);


  return (
    <>
    <View style={styles.wrapperScreen}>
      <View style={styles.wrapperDate}>
        <Pressable
          style={styles.btnDate}
          onPress={() => showMode('date')}>
          <Text style={styles.textBtnDate}>Elegir fecha</Text>
        </Pressable>
        {show && (
          <DateTimePicker 
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              
              
          />)}
      </View>
      <View style={styles.wrapperBtnDate}>
        <Text style={styles.dateText}>
          {day}-{month}-{year}
        </Text>
        <TextInput 
        placeholder="PATENTE"
        placeholderTextColor="#c6c6c6"
        style = {styles.inputPatente}
        value={patente}
        maxLength={6}
        onChangeText={text => helperPatente(text)}
        />

        
        <Pressable
          onPress={() => buscarInfo()}
          style={styles.btnDateSearch}>
          <Text style={styles.textSearch}>Buscar</Text>
        </Pressable>
      </View>
     
      <View style={styles.wrapperContent}>
        
        {records.length ? (
          
          <ScrollView style={styles.wrapperRecords}>
            {records.map((x, i) => (
              <RecordDate x={x} key={i} />
            ))}
          </ScrollView>
        ) : searching ? (
          <View style={styles.wrapperImg}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View style={styles.wrapperImg}>
            <Text style={styles.textHome}>
              Seleccione una fecha y presione buscar.
            </Text>
            <Image
              style={styles.img}
              source={require('../assets/img/homeSearch.png')}
            />
          </View>
        )}
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  wrapperScreen: {
    flex: 1,
  },
  wrapperDate: {
    width: '100%',
    alignItems: 'center',
  },
  btnDate: {
    borderWidth: 1,
    width: '80%',
    backgroundColor: '#c6000e',
    marginVertical: 15,
    borderRadius: 5,
  },
  textBtnDate: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  wrapperBtnDate: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 30,
  },
  btnDateSearch: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#c6000e',
    marginBottom: 10,
    borderRadius: 5,
  },
  textSearch: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  dateText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000"
  },
  wrapperImg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 300,
  },
  textHome: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#000',
    marginVertical: 10,
    fontWeight: "bold"
  },
  wrapperContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperRecords: {
    padding: 15,
    width: '100%',
    flex: 1,
  },
  inputPatente: {
    borderWidth: 1,
    width: '30%',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 10
    
  },
})