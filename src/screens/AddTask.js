import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

import globalStyles from '../globalStyles';

export default props => {

  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);

  const [description, setDescription] = useState('');

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
      value={date}
      onChange={(_, newDate) => {setDate(newDate); setShowDate(false);}}
      mode="date"/>
    );
    const dateString = moment(date).format('ddd, D [de] MMMM [de] YYYY');
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setShowDate(true)}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {showDate && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  const save = () => {
    const newTask = {
      description,
      date,
    };

    props.onSave && props.onSave(newTask);
    setDate(new Date());
    setShowDate(false);
    setDescription('');
  };

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="fade">

      <TouchableWithoutFeedback
        onPress={props.onCancel}>
        <View style={styles.background}/>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <TextInput style={styles.input}
          placeholder="Informe a Descrição"
          value={description}
          onChangeText={e => setDescription(e)}/>
        {getDatePicker()}
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={props.onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={props.onCancel}>
        <View style={styles.background}/>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: globalStyles.fontFamily,
    backgroundColor: globalStyles.colors.today,
    color: globalStyles.colors.secundary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: globalStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: globalStyles.colors.today,
  },
  date: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
