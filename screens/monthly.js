import React, { useState, useEffect, memo } from 'react';
import {StyleSheet, View, Modal, Pressable, Text} from 'react-native';
import { colors, calculateMiddleColor } from '../utils';
import {Calendar} from 'react-native-calendars';
import moment from "moment";
const {PRIMARY_COLOR, PRIMARY_LIGHT_COLOR} = colors;

export default function monthly() {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-01'));
    const [data, setData] = useState({});

    useEffect(() => {
      const month = moment(date,'YYYY-MM-DD').format('MM');
      const year = moment(date,'YYYY-MM-DD').format('YYYY');
      if(moment(date,'YYYY-MM-DD').year()<=moment().year() && moment(date,'YYYY-MM-DD').month()<=moment().month()) {
        const daysOfMonth = month===moment().format('MM') ? parseInt(moment().format('DD')) : moment(date,'YYYY-MM-DD').daysInMonth();
        const newData = {};
        for(let i=0; i<daysOfMonth; i++) {
          const day = i<9 ? `0${i+1}`:`${i+1}`;
          newData[`${year}-${month}-${day}`] = {
            customStyles: {
              container: {
                backgroundColor: `#${calculateMiddleColor({color1: PRIMARY_LIGHT_COLOR, color2: PRIMARY_COLOR, ratio: Math.random()})}`
              }
            }
          };
        }
        setData(newData);
      }
      else {
        setData({});
      }
    }, [date]);
    
    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Distance Travelled : 5.03Km</Text>
                    <Text style={styles.modalText}>EMG Index : 7.8</Text>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Hide</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <Calendar
            onDayPress={() => setModalVisible(!modalVisible)}
            onMonthChange={(month) => {
              setDate(month.dateString);
            }}
            style={styles.calendar}
            minDate={'2021-01-01'}
            markingType={'custom'}
            markedDates={data}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        color: PRIMARY_COLOR,
      },
      buttonOpen: {
        backgroundColor: PRIMARY_COLOR,
      },
      buttonClose: {
        backgroundColor: PRIMARY_COLOR,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
    calendar: {
        marginBottom: 10
      },
    container: {
        padding: 24
    }
})
