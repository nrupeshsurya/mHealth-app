import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import HealthActivites from '../components/HealthActivities';
import HealthProgress from '../components/HealthProgress';
import moment from "moment";
import { colors, awsURL } from '../utils';

const {PRIMARY_COLOR, DISABLED_BUTTON_COLOR} = colors;

export default function daily() {
    const [disableDate, setDisableDate] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState(moment().format('MMMM Do, YYYY'));
    const [data, setData] = useState({
        distance : 3.1,
        averagePace : 5.6,
        laying : '7 Hr 23 Min',
        walking : '1 Hr 20 Min',
        standing : '3 Hr 12 Min',
        emgIndex : 7.1,
        dailyTarget : 5,
    });
    
    useEffect(() => {
        if (moment().format('MMMM Do, YYYY') === date) {
            setDisableDate(true);
        }
        else {
            setDisableDate(false);
        }
        load();
    }, [date]);
    
    async function load() {
        // setRefresh(true);
        const dataUrl = `${awsURL}/items/${moment(date,'MMMM Do, YYYY').format('YYYY-MM-DD')}`;
        // console.log(dataUrl);
        const response = await fetch(dataUrl);
        const result = await response.json();
        // console.log(result['Item']);
        setData({
            distance: result['Item'].distance,
            averagePace: result['Item'].averagePace,
            laying: `${Math.floor(result['Item'].sleeping/3600)} Hr ${Math.floor(result['Item'].sleeping % 3600 / 60)} Min`,
            walking: `${Math.floor(result['Item'].walking/3600)} Hr ${Math.floor(result['Item'].walking % 3600 / 60)} Min`,
            standing: `${Math.floor(result['Item'].standing/3600)} Hr ${Math.floor(result['Item'].standing % 3600 / 60)} Min`,
            emgIndex: result['Item'].emgIndex,
            dailyTarget: 5,
        });
    };
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={load}
                />
            }
        >
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 50
    },
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
  
