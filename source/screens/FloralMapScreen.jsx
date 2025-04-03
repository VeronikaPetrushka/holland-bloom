import { View } from "react-native"
import FloralMap from "../components/FloralMap";
import Nav from '../components/Nav';

const FloralMapScreen = () => {
    return (
        <View style={styles.container}>
            <FloralMap />
            <View style={styles.nav}>
                <Nav />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },

    nav: {
        width: '100%',
        position: 'absolute',
        bottom: 20
    }
}

export default FloralMapScreen;