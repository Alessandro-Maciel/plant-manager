import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';


export function Confirmation() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('plantSelect');
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😁
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subTitle}>
                    Agora vamos começar a cuidar das suas
                    plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button title="Começar" onPress={handleStart} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 40
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        marginTop: 10,
        paddingHorizontal: 20,
        color: colors.heading
    },
    emoji: {
        fontSize: 78
    },
    footer: {
        width: '100%',
        paddingHorizontal: 60,
        marginTop: 35
    }

});