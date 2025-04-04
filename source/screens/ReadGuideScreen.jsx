import { View } from "react-native"
import ReadGuide from "../components/ReadGuide";

const ReadGuideScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ReadGuide item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ReadGuideScreen;