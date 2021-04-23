import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notification from 'expo-notifications';

export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    },
    hour: string;
    dateTimeNotification: Date;

}


export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
        NotificationId: string;
    }
}

export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        const nexTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const { times, repeat_every } = plant.frequency;

        if (repeat_every == 'week') {
            const intval = Math.trunc(7 / times);
            nexTime.setDate(now.getDate() + intval);
        }
        //else {
        //   nexTime.setDate(nexTime.getDate() + 1)
        //}

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nexTime.getTime()) / 1000);

        const NotificationId = await Notification.scheduleNotificationAsync({
            content: {
                title: 'Heeey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notification.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                //seconds: seconds < 60 ? 60 : seconds,
                seconds: 20,
                repeats: true
            }

        })

        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                NotificationId
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            }
            )
        )

    } catch (error) {
        throw new Error(error);
    }
}


export async function loadPlant(): Promise<PlantProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 100 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
                )
            )

        return plantsSorted;

    } catch (error) {
        throw new Error(error);
    }
}

export async function removePlant(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data)) as StoragePlantProps : {};

    await Notification.cancelScheduledNotificationAsync(plants[id].NotificationId);

    delete plants[id];

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
}