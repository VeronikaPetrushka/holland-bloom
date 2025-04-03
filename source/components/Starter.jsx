import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Starter = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Image source={require('../assets/decor/logo.png')} style={styles.logo} />

                <Image source={require('../assets/decor/boy.png')} style={styles.boy} />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FloralMapScreen')}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 26,
        paddingTop: height * 0.16,
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