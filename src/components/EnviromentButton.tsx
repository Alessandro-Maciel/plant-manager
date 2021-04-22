import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButton extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({ title, active = false, ...rest }: EnviromentButton) {
    return (
        <RectButton {...rest} style={[style.container, active && style.containerActive]}>
            <Text style={[style.text, active && style.textActive]}>{title}</Text>
        </RectButton>
    )
}


const style = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
});