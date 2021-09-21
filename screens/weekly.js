import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default function weekly() {
    return (
        <View style = {styles.container}>
            <Text>Weekly Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})
