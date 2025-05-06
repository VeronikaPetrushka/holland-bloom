import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height } = Dimensions.get('window');

const FavFestivals = () => {
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

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} white />
            </TouchableOpacity>

            <Text style={styles.title}>Favorite</Text>

            {
                favFestivals.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            favFestivals.map((item, index) => (
                                <View key={index} style={{width: '100%'}}>
                                    <Text style={styles.date}>{item.date}</Text>
                                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ReadFestivalScreen', { item: item })}>
                                        <Image source={item.image} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.name}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </ScrollView>    
                ) : (
                    <Text style={{fontSize: 20, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', marginTop: height * 0.2}}>Empty</Text>
                )
            }

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
        color: '#fff',
        textAlign: 'right',
        marginBottom: 50
    },

    card: {
        width: '100%',
        height: 143,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#ebb400',
        marginBottom: 30,
        overflow: 'hidden'
    },

    date: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
        lineHeight: 21,
        textAlign: 'right'
    },

    nameContainer: {
        position: 'absolute',
        width: '100%',
        padding: 2,
        backgroundColor: '#ebb400',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    name: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 21,
        color: '#000'
    }

});

export default FavFestivals;