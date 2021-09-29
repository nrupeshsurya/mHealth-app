import React, { useState, useEffect } from 'react'
import {StyleSheet, View, SafeAreaView , Button, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import {colors} from '../utils/index';
import  WeekBarChart  from '../components/WeekBarChart';
const { PRIMARY_COLOR, SECONDARY_COLOR, DISABLED_BUTTON_COLOR } = colors;
import moment from "moment";


export default function weekly() {
    const [distanceEmgSetter, setDistanceEmgSetter] = useState(true);
    const [date, setDate] = useState(moment().format('MMMM Do, YYYY'));
    const [startDate, setStartDate] = useState(moment().startOf('isoWeek').format('MMMM Do'));
    const [endDate, setEndDate] = useState(moment().endOf('isoWeek').format('MMMM Do'));
    const [disableDate, setDisableDate] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [distanceData, setDistanceData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [3.1, 2.2, 3.9, 5.4, 4.2, 4.9, 5.1]
          }
        ]
    });  
    const [emgData, setEmgData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [6.1, 7.2, 8.9, 8.4, 8.2, 8.9, 8.6]
          }
        ]
    });  

    useEffect(() => {
      if (moment().format('MMMM Do, YYYY') === date) {
          setDisableDate(true);
      }
      else {
          setDisableDate(false);
      }
      setStartDate(moment(date,'MMMM Do, YYYY').startOf('isoWeek').format('MMMM Do'));
      setEndDate(moment(date,'MMMM Do, YYYY').endOf('isoWeek').format('MMMM Do'));
      load();
    }, [date]);


    async function load() {
      const emgVal = [];
      const distanceVal = [];
      if(moment().format('MMMM Do, YYYY') === date) {
        const daysPassed = (moment().diff(moment().startOf('isoWeek'),'days')+1);
        for(let i=0; i<daysPassed; i++) {
          emgVal.push(Math.round((Math.random() * (9 - 0) + 0)*10)/10);
          distanceVal.push(Math.round((Math.random() * (5 - 0) + 0)*10)/10);
        }
        for(let i=daysPassed; i<7; i++) {
          emgVal.push(0);
          distanceVal.push(0);
        }
      }
      else {
        for (let i=0; i<7; i++) {
          emgVal.push(Math.round((Math.random() * (9 - 0) + 0)*10)/10);
          distanceVal.push(Math.round((Math.random() * (5 - 0) + 0)*10)/10);
        }
      }
      setDistanceData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: distanceVal
          }
        ]
      });
      setEmgData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: emgVal
          }
        ]
      });
    };
    return (
        <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={load}
            />
          }
        >
          <View style = {styles.main}>
            <View style={styles.row}>
              <TouchableOpacity 
                  style={[styles.triangle,{transform: [{ rotate: "-90deg" }]}]}
                  onPress={() => {
                      setDate(moment(date,'MMMM Do, YYYY').subtract(7,'days').format('MMMM Do, YYYY'));
                  }
              }
              />
              <Text style = {styles.textSecondary}>{startDate} - {endDate}</Text>
              <TouchableOpacity
                  style={[styles.triangle,{transform: [{ rotate: "90deg" }]}, {borderBottomColor: disableDate? DISABLED_BUTTON_COLOR : PRIMARY_COLOR}]}
                  disabled={disableDate}
                  activeOpacity={disableDate? 1:0.2}
                  onPress={() => {
                      setDate(moment(date,'MMMM Do, YYYY').add(7,'days').format('MMMM Do, YYYY'));
                  }
              }
              />
            </View>
          </View>
          {distanceEmgSetter && <Text style={styles.container}>Distance</Text>}
          {!distanceEmgSetter && <Text style={styles.container} >EMG Index</Text>}
          {distanceEmgSetter && <WeekBarChart  data={distanceData} color = {PRIMARY_COLOR}  suffix={"km"} />}
          {!distanceEmgSetter && <WeekBarChart  data={emgData} color = {SECONDARY_COLOR}  suffix={""} />}
          {/* <Pressable
          onPress={() => setDistanceEmgSetter(true)}
          style={styles.button}
          >
              <Text>Distance</Text>
          </Pressable>
          <Pressable
          onPress={() => setDistanceEmgSetter(false)}
          style={styles.button}
          >
              <Text>EMG</Text>
          </Pressable> */}
          <SafeAreaView style={styles.container}>
              <View style={styles.fixToText}>
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
              </View>
          </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        // marginLeft: 13,
        marginTop: 10,
    },
    textSecondary : {
      fontSize: 20,
      color: '#494850',
      fontWeight: '500',
      marginTop: 10,
      marginBottom: 30,
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderBottomWidth: 25,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: PRIMARY_COLOR,
      marginHorizontal: 20,
      marginTop: 10
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        color: PRIMARY_COLOR
      },
    container: {
        // flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 100,
        marginVertical: 10
    },
    main : {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
})
