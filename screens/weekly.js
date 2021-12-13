import React, { useState, useEffect } from 'react'
import {StyleSheet, View, SafeAreaView , Button, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import {colors, awsURL} from '../utils/index';
import  WeekBarChart  from '../components/WeekBarChart';
import HealthActivities from '../components/HealthActivities';
const { PRIMARY_COLOR, SECONDARY_COLOR, DISABLED_BUTTON_COLOR } = colors;
import moment from "moment";


export default function weekly() {
    const [distanceEmgSetter, setDistanceEmgSetter] = useState(false);
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

    const [data, setData] = useState({
      distance : 3.1,
      averagePace : 5.6,
      laying : '7 Hr 23 Min',
      walking : '1 Hr 20 Min',
      standing : '3 Hr 12 Min',
      emgIndex : 7.1,
      dailyTarget : 5,
      showEmg : true
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
      var s = moment(date,'MMMM Do, YYYY').startOf('isoWeek');
      var e = moment().isSame(moment(date,'MMMM Do, YYYY'),'week')?moment():moment(date,'MMMM Do, YYYY').endOf('isoWeek');
      const keyList = []
      for (var m = moment(s); m.isBefore(e); m.add(1, 'days')) {
        keyList.push({"date" : m.format('YYYY-MM-DD')})
      }
      // console.log(keyList)
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
      var avgWalk = 0;
      var avgStand = 0;
      var avgSleep = 0;
      var avgEmgIndex = 0;
      result['Responses']['processed-data-india'].sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
      for (const x of result['Responses']['processed-data-india']) {
        emgVal.push(x['emgIndex']);
        avgWalk+=parseInt(x['walking']);
        avgStand+=parseInt(x['standing']);
        avgSleep+=parseInt(x['sleeping']);
        avgEmgIndex+=parseInt(x['emgIndex']);
        distanceVal.push(x['distance']);
      }
      // console.log(emgVal.length)
      avgWalk = avgWalk/emgVal.length;
      // console.log(avgWalk);
      avgSleep = avgSleep/emgVal.length;
      avgStand = avgStand/emgVal.length;
      avgEmgIndex = avgEmgIndex/emgVal.length;
      for(var i = emgVal.length; i<7; i++) {
        emgVal.push(0);
        distanceVal.push(0);
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
      setData({
        distance: 5,
        averagePace: 5.5,
        laying: `${Math.floor(avgSleep/3600)} Hr ${Math.floor(avgSleep % 3600 / 60)} Min`,
        walking: `${Math.floor(avgWalk/3600)} Hr ${Math.floor(avgSleep % 3600 / 60)} Min`,
        standing: `${Math.floor(avgStand/3600)} Hr ${Math.floor(avgStand % 3600 / 60)} Min`,
        emgIndex: avgEmgIndex,
        dailyTarget: 5,
        showEmg: true
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
          {!distanceEmgSetter && <Text style={styles.container} >Muscle Activity Score</Text>}
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
          <Text style={styles.container}>Average Weekly Stats</Text>
          <HealthActivities data={data}/>
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
        marginVertical: 10,
        paddingTop: 20,
    },
    main : {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
})
