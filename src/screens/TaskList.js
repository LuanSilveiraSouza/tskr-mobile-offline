import React, {useState} from 'react';
import {View,
        Text,
        ImageBackground,
        StyleSheet,
        FlatList,} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import Task from '../components/Task';

import globalStyles from '../globalStyles';
import imgToday from '../../assets/imgs/today.jpg';

export default function TaskList() {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      description: 'Ir ao cinema',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.random(),
      description: 'Ir ao shopping',
      estimateAt: new Date(),
      doneAt: null,
    },
    {
      id: Math.random(),
      description: 'Ler Livro',
      estimateAt: new Date(),
      doneAt: null,
    },
    {
      id: Math.random(),
      description: 'Fazer Bolo',
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);

  function toggleTask (taskId) {
    const newTasks = [...tasks];
    newTasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgToday}
        style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList data={tasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task toggleTask={toggleTask} {...item}/>}/>
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
  },
  title: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 50,
    color: globalStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 20,
    color: globalStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 30,
  },
});
