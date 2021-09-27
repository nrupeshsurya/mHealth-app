import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import {BarChart} from 'react-native-chart-kit';


export default function WeekBarChart({ data, color, suffix}) {
    const width = Dimensions.get('window').width * 0.96;
    const height = 300;
    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        fillShadowGradient: color,
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
    return (
        <View style={styles.barChart}>
            <BarChart
            style={graphStyle}
            data={data}
            width={width}
            height={height}
            yAxisLabel=""
            yAxisSuffix={suffix}
            chartConfig={chartConfig}
            showBarTops={true}
            fromZero={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    barChart: {
        alignItems: 'center',
      },
});
