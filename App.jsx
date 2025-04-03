import React, { useEffect } from 'react';
import { ImageBackground, View, Image, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, runOnJS } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StarterScreen from './source/screens/StarterScreen';
import FloralMapScreen from './source/screens/FloralMapScreen';
import FestivalScreen from './source/screens/FestivalScreen';
import ReadFestivalScreen from './source/screens/ReadFestivalScreen';
import FavFestivalsScreen from './source/screens/FavFestivalsScreen';

enableScreens();

const Stack = createStackNavigator();

const { height } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Loader = ({ navigation }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(
      1,
      { duration: 4000, easing: Easing.linear },
      () => {
        runOnJS(navigation.replace)('StarterScreen');
      }
    );
  }, []);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: 100 - progress.value * 100, 
    }));

  return (
        <ImageBackground source={require('./source/assets/back.png')} style={{flex: 1}}>
          <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', paddingTop: height * 0.16, paddingBottom: height * 0.08}}>

            <Image source={require('./source/assets/decor/logo.png')} style={{ width: 233, height: 233, resizeMode: 'contain'}} />

            <Svg width={70} height={70} viewBox="0 0 60 60">
                    <Circle
                        cx="30"
                        cy="30"
                        r="25"
                        stroke="rgba(235, 180, 0, 0.2)"
                        strokeWidth="6"
                        fill="none"
                    />
                    <AnimatedCircle
                        cx="30"
                        cy="30"
                        r="25"
                        stroke="#ebb400"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="100"
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                        transform="rotate(-90,30,30)"
                    />
                </Svg>

          </View>
        </ImageBackground>
  );
};

const App = () => {

  return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Loader" }>    
                <Stack.Screen 
                      name="Loader" 
                      component={Loader} 
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
