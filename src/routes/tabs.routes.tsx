import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/plantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlant } from '../pages/myPlant';
import { Platform } from 'react-native';

const AppTabs = createBottomTabNavigator();


const AuthRoutes = () => {
    return (
        <AppTabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <AppTabs.Screen
                name="Nova Planta"
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTabs.Screen
                name="Minhas Plantas"
                component={MyPlant}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

        </AppTabs.Navigator>
    )
}


export default AuthRoutes;