import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height, width } = Dimensions.get('window');

const MarketInfo = ({ market }) => {
    const navigation = useNavigation();
    const [favMarkets, setFavMarkets] = useState([]);

    const fetchFavorites = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem('favMarkets');
            if (stored) {
                setFavMarkets(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load favorite festivals:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [fetchFavorites])
    );

    const toggleMarkets = async () => {
        try {
            const isSaved = favMarkets.some(m => m.name === market.name);
            let updatedFavs;

            if (isSaved) {
                updatedFavs = favMarkets.filter(m => m.name !== market.name);
            } else {
                updatedFavs = [...favMarkets, market];
            }

            setFavMarkets(updatedFavs);
            await AsyncStorage.setItem('favMarkets', JSON.stringify(updatedFavs));
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} white />
            </TouchableOpacity>

            <Text style={styles.title}>{market.name}</Text>

            <TouchableOpacity style={styles.saveBtn} onPress={toggleMarkets}>
                <Icons type={favMarkets.some(fest => fest.name === market.name) ? 'isFavorite' : 'favorite'} />
            </TouchableOpacity>

            <Image source={market.images[1]} style={styles.image} />
            
            <Text style={styles.text}>Address: {market.address}</Text>
            <Text style={styles.text}>Work schedule: {market.hours}</Text>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%',
        alignItems: 'center'
    },

    back: {
        width: 26,
        height: 26,
        position: 'absolute',
        left: 0,
        top: 0
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#ebb400',
        marginBottom: 20
    },

    saveBtn: {
        width: 33,
        height: 30,
        position: 'absolute',
        top: height * 0.08,
        right: 24,
        zIndex: 10
    },

    image: {
        width: 338,
        height: 286,
        resizeMode: 'contain',
        marginBottom: 20
    },

    text: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        color: '#fff',
        marginBottom: 15
    }

});

export default MarketInfo;