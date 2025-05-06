import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height } = Dimensions.get('window');

const FavMarkets = () => {
    const navigation = useNavigation();
    const [favMarkets, setFavMarkets] = useState([]);

    const fetchFavorites = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem('favMarkets');
            if (stored) {
                setFavMarkets(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load favorite markets:', error);
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
                favMarkets.length > 0 ? (
                    <ScrollView contentContainerStyle={{width: 330, alignItems: 'center'}}>
                        {
                            favMarkets.map((market, index) => (
                                <TouchableOpacity key={index} style={styles.marketCard} onPress={() => navigation.navigate('MarketInfoScreen', { market: market })}>
                                    <Image source={market.images[0]} style={styles.marketImage} />
                                    <Text style={styles.marketName}>{market.name}</Text>
                                    <View style={{width: 330, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: -10, alignSelf: 'center', padding: 14, borderRadius: 10, backgroundColor: '#ebb400'}}>
                                        <Text style={styles.marketAddress}>{market.address}</Text>
                                    </View>
                                </TouchableOpacity>
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

    marketCard: {
        width: 314,
        height: 152,
        borderRadius: 10,
        borderWidth: 4,
        marginBottom: 21,
    },

    marketImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    marketAddress: {
        color: '#000',
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center'
    },

    marketName: {
        color: '#ebb400',
        fontSize: 15,
        fontWeight: '700',
        position: 'absolute',
        top: 10,
        left: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 4
    }

});

export default FavMarkets;