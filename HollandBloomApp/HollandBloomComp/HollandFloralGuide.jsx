import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ImageBackground } from "react-native"
import { useNavigation } from '@react-navigation/native';
import guide from "../HollandBloomConst/guide";

const { height, width } = Dimensions.get('window');

const FloralGuide = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Florist's Guide</Text>

            <View style={{width: '100%', marginTop: 40, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                {
                    guide.map((item, index) => (
                       <TouchableOpacity 
                            key={index} 
                            onPress={() => navigation.navigate('ReadGuideScreen', { item: item })}
                            style={styles.guideCard}
                            >
                                <View style={styles.guideStep}>
                                    <Text style={styles.stepText}>{item.step}</Text>
                                </View>
                                <ImageBackground source={item.image[0]} style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}}>
                                    <View style={styles.guideTextContainer}>
                                        <Text style={styles.guideText}>{item.topic}</Text>
                                    </View>
                                </ImageBackground>
                       </TouchableOpacity>
                    ))
                }
            </View>

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
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
    },

    guideCard: {
        width: 145,
        height: 204,
        marginBottom: 30,
    },

    guideTextContainer: {
        position: 'absolute',
        width: 123,
        padding: 9,
        backgroundColor: '#fff',
        borderRadius: 10,
        bottom: 17,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    guideText: {
        fontSize: 10,
        fontWeight: '800',
        lineHeight: 14,
        color: '#000'
    },

    guideStep: {
        width: 40,
        height: 40,
        backgroundColor: '#ebb400',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -15,
        left: -15,
        zIndex: 10
    },
    
    stepText: {
        fontSize: 17,
        fontWeight: '900',
        color: '#000'
    }

});

export default FloralGuide;