import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/welcome';
import { UserIdenfication } from '../pages/userIdentification';
import { Confirmation } from '../pages/confirmation';
import { PlantSelect } from '../pages/plantSelect';
import { PlantSave } from '../pages/plantSave';
import { MyPlant } from '../pages/myPlant';
import AuthRoutes from './tabs.routes';


const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }
        }
    >

        <stackRoutes.Screen
            name='Welcome'
            component={Welcome}
        />

        <stackRoutes.Screen
            name='UserIdentification'
            component={UserIdenfication}
        />

        <stackRoutes.Screen
            name='Confirmation'
            component={Confirmation}
        />

        <stackRoutes.Screen
            name='plantSelect'
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name='plantSave'
            component={PlantSave}
        />

        <stackRoutes.Screen
            name='myPlant'
            component={AuthRoutes}
        />

    </stackRoutes.Navigator>
)


export default AppRoutes;