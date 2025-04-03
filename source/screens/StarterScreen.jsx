import { View } from "react-native"
import Starter from "../components/Starter";

const StarterScreen = () => {
    return (
        <View style={styles.container}>
            <Starter />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default StarterScreen;