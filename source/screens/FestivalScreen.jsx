import { View } from "react-native"
import Festival from "../components/Festival";
import Nav from '../components/Nav';

const FestivalScreen = () => {
    return (
        <View style={styles.container}>
            <Festival />
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

export default FestivalScreen;