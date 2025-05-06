import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './HollandAppIcons';

const HollandAppNavigation = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('FloralMapScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.button, styles.bottomLeft]} 
                onPress={() => handleNavigate('MarketsScreen')}>
                <Icons type={'1'} active={activeButton === 'MarketsScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.left]} 
                onPress={() => handleNavigate('FloralGuideScreen')}>
                <Icons type={'2'} active={activeButton === 'FloralGuideScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.center]} 
                onPress={() => handleNavigate('FloralMapScreen')}>
                <Icons type={'3'} active={activeButton === 'FloralMapScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.right]} 
                onPress={() => handleNavigate('FestivalScreen')}>
                <Icons type={'4'} active={activeButton === 'FestivalScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.bottomRight, {paddingLeft: 18, paddingRight: 12}]} 
                onPress={() => handleNavigate('FloralQuizScreen')}>
                <Icons type={'5'} active={activeButton === 'FloralQuizScreen'}/>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 30
    },

    button: {
        width: 60,
        height: 60,
        padding: 15,
        backgroundColor: '#ebb400',
        borderRadius: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    center: {
        top: 0,
        left: '59.5%',
        marginLeft: -30,
    },

    left: {
        top: 15,
        left: '37%',
        marginLeft: -30,
    },

    right: {
        top: 15,
        right: '27%',
        marginLeft: -30,
    },

    bottomLeft: {
        top: 40,
        left: '18%',
        marginLeft: -30,
    },

    bottomRight: {
        top: 40,
        right: '8%',
        marginLeft: -30,
    },
});

export default HollandAppNavigation;
