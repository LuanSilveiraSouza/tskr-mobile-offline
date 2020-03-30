import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Swipable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles';

export default props => {

  const doneOrNotStyle = props.doneAt !== null ?
    {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formattedDate = moment(date)
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  function getCheckView(doneAt) {
    if (doneAt !== null) {
      return (
        <View style={styles.done}>
          <Icon name="check"
            size={20}
            color="#fff"/>
        </View>
      );
    } else {
      return (
        <View style={styles.pending}/>
      );
    }
  }

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}>
        <Icon name="trash" size={30} color="#fff"/>
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon}/>
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.description, doneOrNotStyle]}>{props.description}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </Swipable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  excludeText: {
    fontFamily: globalStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
