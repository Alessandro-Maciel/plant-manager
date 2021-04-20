import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions, View } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import { Feather } from '@expo/vector-icons'
import fonts from '../styles/fonts';

export function Welcome() {
    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>
                <Image source={wateringImg} style={style.image} resizeMode={'contain'} />
                <Text style={style.subTitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembra você sempre que precisar.
                </Text>
                <TouchableOpacity
                    style={style.button}
                    activeOpacity={0.7}
                >
                    <Text style={style.buttonText}>
                        <Feather name='chevron-right' style={style.buttonIcon} />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
})