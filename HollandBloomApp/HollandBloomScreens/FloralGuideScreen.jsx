import FloralGuide from "../HollandBloomComp/HollandFloralGuide";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FloralGuideScreen = () => {
    return (
        <HollandAppLayout screen={<FloralGuide />} hollandNav={true} black={true} />
    )
};

export default FloralGuideScreen;