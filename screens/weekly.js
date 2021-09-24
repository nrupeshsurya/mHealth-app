import React, { useState } from 'react'
import {StyleSheet, View, Button } from 'react-native'
import {colors} from '../utils/index';
import  WeekBarChart  from '../components/WeekBarChart';
const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function weekly() {
    const [distanceEmgSetter, setDistanceEmgSetter] = useState(true);
    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        fillShadowGradient: PRIMARY_COLOR,
        fillShadowGradientOpacity: 0.9,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };
    const graphStyle = {
        marginVertical: 10,
        ...chartConfig.style
    }
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [3.1, 2.2, 3.9, 5.4, 4.2, 4.9]
          }
        ]
    };  
    const data1 = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [6.1, 7.2, 8.9, 8.4, 8.2, 8.9]
          }
        ]
    };  
    return (
        <View>
            {distanceEmgSetter && <WeekBarChart graphStyle={graphStyle} data={data} chartConfig={chartConfig} suffix={"km"} />}
            {!distanceEmgSetter && <WeekBarChart graphStyle={graphStyle} data={data1} chartConfig={chartConfig} suffix={""} />}
            <Button
            title="Distance"
            color="#f194ff"
            onPress={() => setDistanceEmgSetter(true)}
            />
            <Button
            title="EMG Index"
            color="#f194ff"
            onPress={() => setDistanceEmgSetter(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})
