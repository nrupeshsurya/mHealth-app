import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import moment from "moment";
import daily from '../screens/daily';


const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function HealthProgress({data}) {
    // const [date, setDate] = useState(moment().format('MMMM Do, YYYY'));
    const {dailyTarget, emgIndex, distance} = data;
    // console.log(dailyTarget);
    // console.log(emgIndex);
    // console.log(distance);
    const fillVal = Math.floor(distance/dailyTarget*100);
    return (
        <View style = {styles.progress}>
            {/* Circular Progress Bar  */}
            <AnimatedCircularProgress
            size={120}
            width={15}
            fill={fillVal}
            tintColor={PRIMARY_COLOR}
            rotation={0}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#e0ebeb" >
            {fill => <Text style={styles.points}>{fillVal}%</Text>}
            </AnimatedCircularProgress>

            <Text style = {styles.textSecondary}>Daily target : {dailyTarget} Km</Text>

            {/* Muscle Activity Progress  */}
            <Progress.Bar style={styles.linProgress} progress={emgIndex/10} width={200} color={SECONDARY_COLOR} />
            <Text style = {styles.textSecondary}>EMG Index : {emgIndex}</Text>
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