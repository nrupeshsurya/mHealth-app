import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Modal, Pressable, Text} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import { chartConfig } from '../utils';
import { colors } from '../utils';
import {Calendar} from 'react-native-calendars';
const {PRIMARY_COLOR} = colors;

export default function monthly() {
    const [modalVisible, setModalVisible] = useState(false);
    const screenWidth = Dimensions.get('window').width * 1
    const commitsData = [
        { date: "2021-09-02", count: 1 },
        { date: "2021-01-03", count: 2 },
        { date: "2021-09-04", count: 3 },
        { date: "2021-09-05", count: 4 },
        { date: "2021-09-06", count: 5 },
        { date: "2021-09-30", count: 2 },
        // { date: "2021-09-31", count: 3 },
        // { date: "2021-09-01", count: 2 },
        // { date: "2021-09-02", count: 4 },
        // { date: "2021-09-05", count: 2 },
        // { date: "2021-09-30", count: 4 }
      ];
    const INITIAL_DATE = '2021-09-01';
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
            {/* <ContributionGraph
            values={commitsData}
            endDate={new Date("2021-09-30")}
            numDays={30}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            /> */}
            <Calendar
            onDayPress={() => setModalVisible(!modalVisible)}
            style={styles.calendar}
            disableAllTouchEventsForInactiveDays
            current={INITIAL_DATE}
            minDate={'2021-05-01'}
            markedDates={{
                '2021-09-10': {
                inactive: false
                },
                '2021-09-11': {
                inactive: false
                }
            }}
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
