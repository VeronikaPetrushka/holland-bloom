import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import festivals from '../constants/festivals';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Festival = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Festivals and events</Text>

            <TouchableOpacity style={styles.typeBtn} onPress={() => navigation.navigate('FavFestivalsScreen')}>
                <Icons type={'save'} />
            </TouchableOpacity>

            <ScrollView style={{width: '100%', marginTop: 40}}>
                {
                    festivals.map((item, index) => (
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

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        padding: 26,
        paddingTop: height * 0.08,
        backgroundColor: '#000'
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
    },

    typeBtn: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 11,
        paddingBlock: 7,
        paddingTop: 13,
        justifyContent: 'center',
        position: 'absolute',
        right: 24,
        top: height * 0.07
    },

    card: {
        width: '100%',
        height: 143,
        borderRadius: 10,
        borderWidth: 2,
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

export default Festival;