import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function HealthProgress() {
    return (
        <View style = {styles.weatherInfo}>
            {/* Current Day */}
            <Text style = {styles.textSecondary}>MHealth App</Text>

            {/* Circular Progress Bar  */}
            <AnimatedCircularProgress
            size={120}
            width={15}
            fill={62}
            tintColor={PRIMARY_COLOR}
            rotation={0}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#e0ebeb" >
            {fill => <Text style={styles.points}>62%</Text>}
            </AnimatedCircularProgress>

            <Text style = {styles.textSecondary}>Daily target : 5 Km</Text>

            {/* Muscle Activity Progress  */}
            <Progress.Bar style={styles.linProgress} progress={0.71} width={200} color={PRIMARY_COLOR} />
            <Text style = {styles.textSecondary}>EMG Index : 7.1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
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
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 30
    },
    points: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 28,
        fontWeight: '100',
    },
    linProgress: {
        marginTop : 20
    }
})