import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import HealthActivites from '../components/HealthActivities';
import HealthProgress from '../components/HealthProgress';

export default function daily() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style = {styles.main}>
                <HealthProgress  />
            </View>
            <HealthActivites  />
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
        flex: 1,
    }
});
  
