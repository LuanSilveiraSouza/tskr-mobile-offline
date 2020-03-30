import React, {useState, useEffect} from 'react';
import {View,
        Text,
        ImageBackground,
        StyleSheet,
        FlatList,
        TouchableOpacity,
        Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  const [visibleTasks, setVisibleTasks] = useState([]);

  const [showDoneTasks, setShowDoneTasks] = useState(false);

  function toggleTask (taskId) {
    const newTasks = [...tasks];
    newTasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    setTasks(newTasks);
  }

  function toggleFilter () {
    setShowDoneTasks(!showDoneTasks);
  }

  useEffect(() => {
    const filterTasks = () => {
      let newTasks = null;
      if (showDoneTasks) {
        newTasks = [...tasks];
      } else {
        const pending = task => task.doneAt === null;
        newTasks = tasks.filter(pending);
      }
      setVisibleTasks(newTasks);
    };
    filterTasks();
  }, [showDoneTasks, tasks]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgToday}
        style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={30}
              color={globalStyles.colors.secundary}/>
          </TouchableOpacity>
        </View>

        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList data={visibleTasks}
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
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 10,
  },
});
