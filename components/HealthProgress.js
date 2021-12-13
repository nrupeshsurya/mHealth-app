import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, calculateMiddleColor } from '../utils/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

const { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_LIGHT_COLOR } = colors;

export default function HealthProgress({data}) {
    const {dailyTarget, emgIndex, distance} = data;
    const fillVal = Math.floor(distance/dailyTarget*100);
    const tintColor = `#${calculateMiddleColor({ratio: fillVal/100})}`;
    const linColor = `#${calculateMiddleColor({ratio: emgIndex/10, color1: SECONDARY_LIGHT_COLOR , color2: SECONDARY_COLOR})}`;
    // console.log(tintColor);
    return (
        <View style = {styles.progress}>
            {/* Circular Progress Bar  */}

            <Text style = {styles.textSecondary}>Muscle Activity Score</Text>

            <AnimatedCircularProgress
            size={120}
            width={15}
            fill={emgIndex*10}
            tintColor={tintColor}
            rotation={0}
            backgroundColor="#e0ebeb" >
            {fill => <Text style={styles.points}>{emgIndex}</Text>}
            </AnimatedCircularProgress>

            <Text style = {styles.textSecondary}>Target Muscle Activity Score : 8</Text>


            {/* Muscle Activity Progress  */}
            {/* <Progress.Bar style={styles.linProgress} progress={emgIndex/10} width={200} color={linColor} /> */}
            {/* <Text style = {styles.textSecondary}>EMG Index : {emgIndex}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    progress: {
        alignItems: 'center',
    },
    weatherIcon : {
        width: 100,
        height: 100
    },
    weatherDescription : {
        textTransform: 'capitalize'
    },
    textPrimary : {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary : {
        fontSize: 20,
        color: '#494850',
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 30,
    },
    points: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 28,
        fontWeight: '100',
    },
    linProgress: {
        marginTop : 20
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
})