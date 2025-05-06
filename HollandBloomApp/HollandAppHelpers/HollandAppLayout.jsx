import HollandAppNavigation from "./HollandAppNavigation";
import { View, Dimensions, ImageBackground } from "react-native";

const { height } = Dimensions.get('window');

const HollandAppLayout = ({ screen, hollandNav, black }) => {
    return (
        <ImageBackground source={require('../HollandBloomAssets/hollandBloomAppBackground.png')} style={{flex: 1}}>
            <View style={{ flex: 1 }}>

                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: black ? '#000' : 'transparent',
                    paddingHorizontal: 26,
                    paddingTop: height * 0.08
                }}>
                    {screen}
                </View>

                {
                    hollandNav && (
                        <View style={{
                            width: '100%',
                            position: 'absolute',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: 10
                        }}>
                            <HollandAppNavigation />
                        </View>
                    )
                }

            </View>
        </ImageBackground>
    )
};

export default HollandAppLayout;