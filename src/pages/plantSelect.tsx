import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Header } from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';

interface enviromentsProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<enviromentsProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [plantsFilltered, setplantsFilltered] = useState<PlantProps[]>([]);
    const [enviromentsSelect, setEnviromentsSelect] = useState('all');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const [page, setPage] = useState(1);
    const [loadingMore, seltLoadingMore] = useState(false);


    function handleFecthMore(distant: number) {
        if (distant < 1)
            return
        seltLoadingMore(true);
        setPage(oldValue => oldValue + 1)
        fetchplants();

    }

    function handlerButton(enviroment: string) {
        setEnviromentsSelect(enviroment);

        if (enviroment == 'all')
            return setplantsFilltered(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setplantsFilltered(filtered);

    }

    useEffect(() => {
        async function fetchEviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchEviroment();

    }, []);

    async function fetchplants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);
        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setplantsFilltered(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setplantsFilltered(data);
        }
        setLoading(false);
        seltLoadingMore(false);
    }

    useEffect(() => {

        fetchplants();

    }, []);


    function handlePlantSave(plant: PlantProps) {
        navigation.navigate('plantSave', { plant });
    }

    if (loading)
        return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key == enviromentsSelect}
                            onPress={() => handlerButton(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                >
                </FlatList>
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={plantsFilltered}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSave(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceEndMore }: any) =>
                        handleFecthMore(distanceEndMore)
                    }
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                >
                </FlatList>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subTitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading
    },
    header: {
        paddingHorizontal: 30
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
        marginLeft: 32,
        paddingRight: 32

    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },

})