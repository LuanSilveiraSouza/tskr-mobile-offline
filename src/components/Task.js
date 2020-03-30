import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
        <View style={styles.pending}>
        </View>
      );
    }
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    paddingVertical: 10,
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
});
