import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/index';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function HealthActivites({data}) {
    const {laying, walking, sitting, averagePace, distance } = data;
    return (
        <View style = {styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="walking" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>Time Spent :</Text> */}
                            <Text style={styles.textSecondary}>{walking}</Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="chair-rolling" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>Feels like :</Text> */}
                            <Text style={styles.textSecondary}>{sitting}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="bed" size={20} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            {/* <Text>humidity :</Text> */}
                            <Text style={styles.textSecondary}>{laying}</Text>
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
                            <Text style={styles.textSecondary}>{Math.round(distance*10)/10} Km</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Average Pace: </Text>
                            <Text style={styles.textSecondary}>{Math.round(averagePace*10)/10} Km/Hr</Text>
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
        color: '#494850',
        fontWeight: '700',
        margin: 7
    }
})
