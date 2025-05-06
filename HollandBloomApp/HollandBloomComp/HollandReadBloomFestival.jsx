import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height, width } = Dimensions.get('window');

const ReadFestival = ({ item }) => {
    const navigation = useNavigation();
    const [favFestivals, setFavFestivals] = useState([]);

    const fetchFavorites = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem('favFestivals');
            if (stored) {
                setFavFestivals(JSON.parse(stored));
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

    const toggleFestival = async () => {
        try {
            const isSaved = favFestivals.some(fest => fest.name === item.name);
            let updatedFavs;

            if (isSaved) {
                updatedFavs = favFestivals.filter(fest => fest.name !== item.name);
            } else {
                updatedFavs = [...favFestivals, item];
            }

            setFavFestivals(updatedFavs);
            await AsyncStorage.setItem('favFestivals', JSON.stringify(updatedFavs));
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} white />
            </TouchableOpacity>

            <Text style={styles.title}>{item.name}</Text>

            <TouchableOpacity style={styles.saveBtn} onPress={toggleFestival}>
                <Icons type={favFestivals.some(fest => fest?.name === item.name) ? 'saved' : 'save'} />
            </TouchableOpacity>

            <Image source={item.image} style={styles.image} />

            <ScrollView style={{width: '100%'}}>
                {
                    item.description.map((d, i) => (
                        <Text key={i} style={styles.text}>{d}</Text>
                    ))
                }
            </ScrollView>

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
        left: -26,
        top: 0
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        textAlign: 'right',
        marginBottom: 13
    },

    saveBtn: {
        width: 36,
        height: 45,
        position: 'absolute',
        top: height > 700 ? height * 0.07 : height * 0.13,
        right: 0,
        zIndex: 10
    },

    image: {
        width: width,
        height: 282,
        resizeMode: 'cover',
        marginBottom: 13
    },

    text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#fff',
        marginBottom: 10
    }

});

export default ReadFestival;