import React, { useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, runOnJS } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import HollandAppLayout from './HollandAppLayout';

const { height } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Loader = () => {
  const navigation = useNavigation();
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
      <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', paddingTop: height * 0.16, paddingBottom: height * 0.08}}>

          <Image source={require('../HollandBloomAssets/decor/logo.png')} style={{ width: 233, height: 233, resizeMode: 'contain'}} />

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
    );
};

const HollandAppLoader = () => {
    return (
        <HollandAppLayout screen={<Loader />} hollandNav={false} />
    )
}

export default HollandAppLoader;