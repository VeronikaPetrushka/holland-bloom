import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HollandAppLoader from './HollandBloomApp/HollandAppHelpers/HollandAppLoader';

import StarterScreen from './HollandBloomApp/HollandBloomScreens/StarterScreen';
import FloralMapScreen from './HollandBloomApp/HollandBloomScreens/FloralMapScreen';
import FestivalScreen from './HollandBloomApp/HollandBloomScreens/FestivalScreen';
import ReadFestivalScreen from './HollandBloomApp/HollandBloomScreens/ReadFestivalScreen';
import FavFestivalsScreen from './HollandBloomApp/HollandBloomScreens/FavFestivalsScreen';
import FloralGuideScreen from './HollandBloomApp/HollandBloomScreens/FloralGuideScreen';
import ReadGuideScreen from './HollandBloomApp/HollandBloomScreens/ReadGuideScreen';
import MarketsScreen from './HollandBloomApp/HollandBloomScreens/MarketsScreen';
import MarketInfoScreen from './HollandBloomApp/HollandBloomScreens/MarketInfoScreen';
import FavMarketsScreen from './HollandBloomApp/HollandBloomScreens/FavMarketsScreen';
import FloralQuizScreen from './HollandBloomApp/HollandBloomScreens/FloralQuizScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"HollandAppLoader" }>    
                <Stack.Screen 
                      name="HollandAppLoader" 
                      component={HollandAppLoader} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="StarterScreen" 
                      component={StarterScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FloralMapScreen" 
                      component={FloralMapScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FestivalScreen" 
                      component={FestivalScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="ReadFestivalScreen" 
                      component={ReadFestivalScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FavFestivalsScreen" 
                      component={FavFestivalsScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FloralGuideScreen" 
                      component={FloralGuideScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="ReadGuideScreen" 
                      component={ReadGuideScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="MarketsScreen" 
                      component={MarketsScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="MarketInfoScreen" 
                      component={MarketInfoScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FavMarketsScreen" 
                      component={FavMarketsScreen} 
                      options={{ headerShown: false }} 
                />
                <Stack.Screen 
                      name="FloralQuizScreen" 
                      component={FloralQuizScreen} 
                      options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
