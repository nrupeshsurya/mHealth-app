import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/index';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function HealthActivites() {
    return (
        <View style = {styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="walking" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>Time Spent :</Text> */}
                            <Text style={styles.textSecondary}>1 Hr 20 Min</Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="chair-rolling" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>Feels like :</Text> */}
                            <Text style={styles.textSecondary}>3 Hr 12 Min</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="bed" size={20} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>humidity :</Text> */}
                            <Text style={styles.textSecondary}>7 Hr 23 Min</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{...styles.weatherDetailsRow, borderTopWidth: 1 , borderTopColor: BORDER_COLOR}}>
                <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="map-marker-multiple" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Total Distance :</Text>
                            <Text style={styles.textSecondary}>3.1 Km</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Average Pace: </Text>
                            <Text style={styles.textSecondary}>5.6 Km/Hr</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails : {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailsRow : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7
    }
})