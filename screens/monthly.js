import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import { chartConfig } from '../utils';
import { colors } from '../utils';
import {Calendar} from 'react-native-calendars';
// const {PRIMARY_COLOR} = colors;

export default function monthly() {
    const screenWidth = Dimensions.get('window').width * 1
    const commitsData = [
        { date: "2021-09-02", count: 1 },
        { date: "2021-01-03", count: 2 },
        { date: "2021-09-04", count: 3 },
        { date: "2021-09-05", count: 4 },
        { date: "2021-09-06", count: 5 },
        { date: "2021-09-30", count: 2 },
        // { date: "2021-09-31", count: 3 },
        // { date: "2021-09-01", count: 2 },
        // { date: "2021-09-02", count: 4 },
        // { date: "2021-09-05", count: 2 },
        // { date: "2021-09-30", count: 4 }
      ];
    const INITIAL_DATE = '2021-09-01';
    return (
        <View >
            {/* <ContributionGraph
            values={commitsData}
            endDate={new Date("2021-09-30")}
            numDays={30}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            /> */}
            <Calendar
            style={styles.calendar}
            disableAllTouchEventsForInactiveDays
            current={INITIAL_DATE}
            minDate={'2021-05-01'}
            markedDates={{
                '2021-09-10': {
                inactive: false
                },
                '2021-09-11': {
                inactive: false
                }
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
      },
    container: {
        padding: 24
    }
})
