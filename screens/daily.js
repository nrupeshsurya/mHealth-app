import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import HealthActivites from '../components/HealthActivities';
import HealthProgress from '../components/HealthProgress';
import moment from "moment";
import { colors } from '../utils';

const {PRIMARY_COLOR, DISABLED_BUTTON_COLOR} = colors;

export default function daily() {
    const [disableDate, setDisableDate] = useState(false);
    const [date, setDate] = useState(moment().format('MMMM Do, YYYY'));
    const [data, setData] = useState({
        distance : 3.1,
        averagePace : 5.6,
        laying : '7 Hr 23 Min',
        walking : '1 Hr 20 Min',
        sitting : '3 Hr 12 Min',
        emgIndex : 7.1,
        dailyTarget : 5,
    });
    // percentage
    // emg index 
    // daily target 

    // distance
    // average pace
    // laying
    // walking
    // sitting
    useEffect(() => {
        if (moment().format('MMMM Do, YYYY') === date) {
            setDisableDate(true);
        }
        else {
            setDisableDate(false);
        }
        setData({
            distance: Math.random() * (6 - 3) + 3,
            averagePace: Math.random() * (7 - 3) + 3,
            laying: `${Math.floor(Math.random() * (8 - 6) + 6)} Hr ${Math.floor(Math.random() * (59 - 0) + 0)} Min`,
            walking: `${Math.floor(Math.random() * (2 - 1) + 1)} Hr ${Math.floor(Math.random() * (59 - 0) + 0)} Min`,
            sitting: `${Math.floor(Math.random() * (3 - 2) + 2)} Hr ${Math.floor(Math.random() * (59 - 0) + 0)} Min`,
            emgIndex: Math.round((Math.random() * (9 - 6) + 6)*10)/10,
            dailyTarget: 5,
        });
    }, [date])
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style = {styles.main}>
                <View style={styles.row}>
                    <TouchableOpacity 
                        style={[styles.triangle,{transform: [{ rotate: "-90deg" }]}]}
                        onPress={() => {
                            setDate(moment(date,'MMMM Do, YYYY').subtract(1,'days').format('MMMM Do, YYYY'));
                        }
                    }
                    />
                    <Text style = {styles.textSecondary}>{date}</Text>
                    <TouchableOpacity
                        style={[styles.triangle,{transform: [{ rotate: "90deg" }]}, {borderBottomColor: disableDate? DISABLED_BUTTON_COLOR : PRIMARY_COLOR}]}
                        disabled={disableDate}
                        activeOpacity={disableDate? 1:0.2}
                        onPress={() => {
                            setDate(moment(date,'MMMM Do, YYYY').add(1,'days').format('MMMM Do, YYYY'));
                        }
                    }
                    />
                </View>
                <HealthProgress  data = {data}/>
            </View>
            <HealthActivites data={data} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main : {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    row: {
        flexDirection: "row",
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
    textSecondary : {
        fontSize: 20,
        color: '#494850',
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 30,
    },
});
  
