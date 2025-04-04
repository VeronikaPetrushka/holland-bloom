import { View } from "react-native"
import FloralGuide from "../components/FloralGuide";
import Nav from '../components/Nav';

const FloralGuideScreen = () => {
    return (
        <View style={styles.container}>
            <FloralGuide />
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

export default FloralGuideScreen;