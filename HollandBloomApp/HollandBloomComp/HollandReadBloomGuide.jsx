import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height, width } = Dimensions.get('window');

const ReadGuide = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} white />
            </TouchableOpacity>

            <Text style={[styles.title, {marginBottom: height * 0.07}]}>Florist's Guide</Text>

            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 12}}>
                <View style={styles.guideStep}>
                    <Text style={styles.stepText}>{item.step}</Text>
                </View>
                <Text style={[styles.title, {width: '80%', textAlign: 'left', fontSize: 15}]} numberOfLines={2}>{item.topic}</Text>
            </View>

            <Image source={item.image[1]} style={styles.image} />

            <ScrollView style={{width: '100%'}}>
                {
                    item.list.map((d, i) => (
                        <View key={i} style={{width: '100%'}}>
                        {
                            d.title && (<Text style={[styles.text, {fontWeight: '600', fontSize: 15, marginTop: 10}]}>{d.title}</Text>)
                        }
                        {
                            d.content.map((c, idx) => (
                                <Text key={idx} style={styles.text}>   {'\u2022'} {c}</Text>
                            ))
                        }
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
        alignItems: 'center'
    },

    back: {
        width: 26,
        height: 26,
        position: 'absolute',
        left: 0,
        top: 0
    },

    guideStep: {
        width: 40,
        height: 40,
        backgroundColor: '#ebb400',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    
    stepText: {
        fontSize: 17,
        fontWeight: '900',
        color: '#000'
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        textAlign: 'right',
    },

    image: {
        width: 336,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 14
    },

    text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#fff',
        marginBottom: 10
    }

});

export default ReadGuide;