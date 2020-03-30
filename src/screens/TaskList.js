import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles';
import imgToday from '../../assets/imgs/today.jpg';

export default function TaskList() {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgToday}
        style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <Text>TaskList</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 50,
    color: globalStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 20,
  },
});
