import React from 'react'
import { View, Dimensions } from 'react-native'
import {BarChart} from 'react-native-chart-kit';


export default function WeekBarChart({graphStyle, data, chartConfig, suffix}) {
    const width = Dimensions.get('window').width * 0.97
    const height = 300
    return (
        <View>
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
