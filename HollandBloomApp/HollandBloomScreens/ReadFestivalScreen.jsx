import ReadFestival from "../HollandBloomComp/HollandReadBloomFestival";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const ReadFestivalScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <HollandAppLayout screen={<ReadFestival item={item} />} hollandNav={false} black={true} />
    )
};

export default ReadFestivalScreen;