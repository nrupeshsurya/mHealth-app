import React, { useState, useEffect, memo } from 'react';
import {StyleSheet, View, Modal, Pressable, Text, SafeAreaView, Button, ScrollView} from 'react-native';
import { colors, calculateMiddleColor, awsURL } from '../utils';
import {Calendar} from 'react-native-calendars';
import moment from "moment";
import HealthActivities from '../components/HealthActivities';
const {PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_COLOR, SECONDARY_LIGHT_COLOR} = colors;

export default function monthly() {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-01'));
    const [data, setData] = useState({});
    const [distanceEmgSetter, setDistanceEmgSetter] = useState(false);


    const [avData, setAvData] = useState({
      distance : 3.1,
      averagePace : 5.6,
      laying : '7 Hr 23 Min',
      walking : '1 Hr 20 Min',
      standing : '3 Hr 12 Min',
      emgIndex : 7.1,
      dailyTarget : 5,
    });

    useEffect(() => {
      load()
    }, [date, distanceEmgSetter]);      

    async function load () {
      const month = moment(date,'YYYY-MM-DD').format('MM');
      const year = moment(date,'YYYY-MM-DD').format('YYYY');
      if(moment(date,'YYYY-MM-DD').year()<=moment().year() && moment(date,'YYYY-MM-DD').month()<=moment().month()) {
        const daysOfMonth = month===moment().format('MM') ? parseInt(moment().format('DD')) : moment(date,'YYYY-MM-DD').daysInMonth();
        const newData = {};
        const keyList = []
        for(let i=0; i<daysOfMonth; i++) {
          const day = i<9 ? `0${i+1}`:`${i+1}`;
          keyList.push({"date" : `${year}-${month}-${day}`})
          // newData[`${year}-${month}-${day}`] = {
          //   customStyles: {
          //     container: {
          //       backgroundColor: `#${calculateMiddleColor({color1: distanceEmgSetter?PRIMARY_COLOR:SECONDARY_COLOR, color2: distanceEmgSetter?PRIMARY_LIGHT_COLOR:SECONDARY_LIGHT_COLOR, ratio: Math.random()})}`
          //     }
          //   }
          // };
        }
        const response = await fetch(`${awsURL}/items`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'keys' : keyList
          })
        });
        const result = await response.json();
        // console.log(result);
        result['Responses']['processed-data-india'].sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        var avgStand = 0;
        var avgWalk = 0;
        var avgSleep = 0;
        var avgEmgIndex = 0;
        for (const x of result['Responses']['processed-data-india']) {
          // emgVal.push(x['emgIndex']);
          // distanceVal.push(x['distance']);
          avgWalk+=parseInt(x['walking']);
          avgStand+=parseInt(x['standing']);
          avgSleep+=parseInt(x['sleeping']);
          avgEmgIndex+=parseInt(x['emgIndex']);
          newData[x['date']] = {
            customStyles: {
              container: {
                backgroundColor: `#${calculateMiddleColor({color1: distanceEmgSetter?PRIMARY_COLOR:SECONDARY_COLOR, color2: distanceEmgSetter?PRIMARY_LIGHT_COLOR:SECONDARY_LIGHT_COLOR, ratio: distanceEmgSetter?x['distance']/5:x['emgIndex']/10})}`
              }
            }
          };
        }
        // console.log(result['Responses']['processed-data-india'].length);
        avgWalk = avgWalk/result['Responses']['processed-data-india'].length;
        avgSleep = avgSleep/result['Responses']['processed-data-india'].length;
        avgStand = avgStand/result['Responses']['processed-data-india'].length;
        avgEmgIndex = avgEmgIndex/result['Responses']['processed-data-india'].length;
        setData(newData);
        setAvData({
          distance: 5,
          averagePace: 5.5,
          laying: `${Math.floor(avgSleep/3600)} Hr ${Math.floor(avgSleep % 3600 / 60)} Min`,
          walking: `${Math.floor(avgWalk/3600)} Hr ${Math.floor(avgWalk % 3600 / 60)} Min`,
          standing: `${Math.floor(avgStand/3600)} Hr ${Math.floor(avgStand % 3600 / 60)} Min`,
          emgIndex: avgEmgIndex,
          dailyTarget: 5,
          showEmg: true
        });
      }
      else {
        setData({});
        setAvData({
          distance: 5,
          averagePace: 5.5,
          laying: `${Math.floor(0/3600)} Hr ${Math.floor(0 % 3600 / 60)} Min`,
          walking: `${Math.floor(0/3600)} Hr ${Math.floor(0 % 3600 / 60)} Min`,
          standing: `${Math.floor(0/3600)} Hr ${Math.floor(0 % 3600 / 60)} Min`,
          emgIndex: 0,
          dailyTarget: 5,
          showEmg: true
        })
      }
    }
    
    return (
      <ScrollView>
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
            {distanceEmgSetter && <Text style={styles.container}>Distance</Text>}
            {!distanceEmgSetter && <Text style={styles.container} >Muscle Activity Score</Text>}
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
            {/* <SafeAreaView style={styles.container}> */}
              {/* <View style={styles.fixToText}>
                  <Button
                  title="Distance"
                  onPress={() => setDistanceEmgSetter(true)}
                  color={PRIMARY_COLOR}
                  />
                  <Button
                  title="EMG"
                  onPress={() => setDistanceEmgSetter(false)}
                  color={SECONDARY_COLOR}
                  />
              </View> */}
          {/* </SafeAreaView> */}
          <Text style={styles.container}>Average Monthly Stats</Text>
          <HealthActivities data={avData} />
        </View>
      </ScrollView>
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
        // flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 100,
        marginVertical: 10,
        paddingTop: 20,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
})
