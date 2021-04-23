import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';


import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';


interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const route = useRoute();
    const { plant } = route.params as Params;
    const [selectDateTime, setSelectDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const navigation = useNavigation();

    function handleOpenDatetimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function handleChangeTime(Event: Event, datetime: Date | undefined) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (datetime && isBefore(datetime, new Date())) {
            setSelectDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }
        if (datetime)
            setSelectDateTime(datetime);
    }

    async function HandleConfirm() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'myPlant'
            });

        } catch (error) {
            Alert.alert('Não foi possível salvar. 😢')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} width={150} height={150} />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>{plant.about}</Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image source={waterDrop} style={styles.tipImage} />
                        <Text style={styles.tipText}>{plant.water_tips}</Text>
                    </View>
                    <Text style={styles.alertLabel}> Escolha o melhor horário para ser lembrado </Text>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectDateTime}
                            mode='time'
                            display='spinner'
                            onChange={handleChangeTime}
                        />)
                    }

                    {Platform.OS == 'android' && (
                        <TouchableOpacity onPress={handleOpenDatetimePickerForAndroid} style={styles.datimeButton}>
                            <Text style={styles.dateTime}>
                                {`Mudar ${format(selectDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                    }

                    <Button title="Cadastrar planta" onPress={HandleConfirm} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 50,
        paddingBottom: 5,
    },
    plantName: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.heading,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 16,
        marginTop: 5
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 15,
        borderRadius: 20,
        position: 'relative',
        bottom: 70
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 15,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
    },
    dateTime: {
        color: colors.heading,
        fontSize: 22,
        fontFamily: fonts.text
    },
    datimeButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 25,
    }
});
