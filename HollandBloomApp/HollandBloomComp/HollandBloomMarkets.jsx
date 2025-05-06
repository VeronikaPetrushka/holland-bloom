import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import markets from '../HollandBloomConst/markets';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height } = Dimensions.get('window');

const Markets = () => {
    const navigation = useNavigation();
    const [type, setType] = useState('markets');

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Fresh flower stores and markets</Text>

            <TouchableOpacity style={[styles.typeBtn, {right: 46, paddingHorizontal: 9, paddingVertical: 10}]} onPress={() => navigation.navigate('FavMarketsScreen')}>
                <Icons type={'favorite'} />
            </TouchableOpacity>

            {
                type === 'map' ? (
                    <TouchableOpacity style={styles.typeBtn} onPress={() => setType('markets')}>
                        <Icons type={'menu'} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.typeBtn} onPress={() => setType('map')}>
                        <Icons type={'map'} />
                    </TouchableOpacity>
                )
            }

            {
                type === 'map' ? (
                    <View style={{width: '100%', height: height * 0.45, marginTop: height * 0.1}}>
                        <Image source={require('../HollandBloomAssets/decor/marketsMap.png')} style={styles.map} />
                        {
                            markets.map((item, index) => (
                                <View 
                                    key={index} 
                                    style={[ {position: 'absolute'},
                                        index === 0 && {bottom: height * 0.41, left: 0},
                                        index === 1 && {bottom: height * 0.46, right: 0},
                                        index === 2 && {bottom: height * 0.33, right: 0},
                                        index === 3 && {bottom: height * 0.17, left: 0},
                                        index === 4 && {bottom: height * 0.07, left: 60},
                                    ]}
                                    >
                                    <View style={styles.itemBtn}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>    
                ) : (
                    <ScrollView contentContainerStyle={{width: 330, alignItems: 'center'}}>
                        {
                            markets.map((market, index) => (
                                <TouchableOpacity key={index} style={styles.marketCard} onPress={() => navigation.navigate('MarketInfoScreen', { market: market })}>
                                    <Image source={market.images[0]} style={styles.marketImage} />
                                    <Text style={styles.marketName}>{market.name}</Text>
                                    <View style={{width: 330, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: -10, alignSelf: 'center', padding: 14, borderRadius: 10, backgroundColor: '#ebb400'}}>
                                        <Text style={styles.marketAddress}>{market.address}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        <View style={{height: 200}} />
                    </ScrollView>
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

    title: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginBottom: 50
    },

    typeBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 7,
        position: 'absolute',
        right: 0,
        top: 0
    },

    map: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    itemBtn: {
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    itemName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000', 
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

export default Markets;