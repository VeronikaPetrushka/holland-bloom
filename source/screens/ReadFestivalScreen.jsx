import { View } from "react-native"
import ReadFestival from "../components/ReadFestival";

const ReadFestivalScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ReadFestival item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadFestivalScreen;