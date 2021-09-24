import React, { useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Touchable } from 'react-native'
import {colors} from '../utils/index';
import  WeekBarChart  from '../components/WeekBarChart';
const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function weekly() {
    const [distanceEmgSetter, setDistanceEmgSetter] = useState(true);
    
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [3.1, 2.2, 3.9, 5.4, 4.2, 4.9, 5.1]
          }
        ]
    };  
    const data1 = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [6.1, 7.2, 8.9, 8.4, 8.2, 8.9, 8.6]
          }
        ]
    };  
    return (
        <View>
            {distanceEmgSetter && <WeekBarChart  data={data} color = {PRIMARY_COLOR}  suffix={"km"} />}
            {!distanceEmgSetter && <WeekBarChart  data={data1} color = {SECONDARY_COLOR}  suffix={""} />}
            <TouchableOpacity
            onPress={() => setDistanceEmgSetter(true)}
            style={styles.button}
            >
                <Text>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setDistanceEmgSetter(false)}
            style={styles.button}
            >
                <Text>EMG</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
      },
    container: {
        padding: 24
    }
})
