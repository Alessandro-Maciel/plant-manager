import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import * as Notification from 'expo-notifications';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts(
    {
      Jost_400Regular,
      Jost_600SemiBold,
    }
  );

  useEffect(() => {
    //const subScription = Notification.addNotificationReceivedListener(
    //  async notification => {
    //
    //   const data = notification.request.content.data
    //
    //  console.log(data);
    //  }
    // )
    //
    //  return () => subScription.remove();


    async function notifications() {
      const data = await Notification.getAllScheduledNotificationsAsync()
      console.log('############### Noficações agendadas ######################');
      console.log(data);
    }


    notifications()

  }, [])

  if (!fontsLoaded)
    return <AppLoading />


  return (
    <Routes />
  )
}

