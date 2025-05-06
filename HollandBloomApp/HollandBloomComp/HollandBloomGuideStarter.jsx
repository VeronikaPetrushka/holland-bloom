import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Starter = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Image source={require('../HollandBloomAssets/decor/logo.png')} style={styles.logo} />

            <Image source={require('../HollandBloomAssets/decor/boy.png')} style={styles.boy} />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FloralMapScreen')}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: height * 0.08,
        paddingBottom: height * 0.08
    },

    logo: {
        width: 233,
        height: 233,
        resizeMode: 'contain'
    },

    boy: {
        width: '100%',
        height: height * 0.33,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 100,
        right: 0
    },

    button: {
        width: '100%',
        padding: 12,
        backgroundColor: '#ebb400',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        zIndex: 10
    },

    buttonText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000'
    }

});

export default Starter;