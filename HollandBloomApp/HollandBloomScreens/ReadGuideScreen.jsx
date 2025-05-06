import ReadGuide from "../HollandBloomComp/HollandReadBloomGuide";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const ReadGuideScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <HollandAppLayout screen={<ReadGuide item={item} />} hollandNav={false} black={true} />
    )
};

export default ReadGuideScreen;