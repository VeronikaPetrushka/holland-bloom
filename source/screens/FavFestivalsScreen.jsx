import { View } from "react-native"
import FavFestivals from "../components/FavFestivals";

const FavFestivalsScreen = () => {
    return (
        <View style={styles.container}>
            <FavFestivals />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FavFestivalsScreen;