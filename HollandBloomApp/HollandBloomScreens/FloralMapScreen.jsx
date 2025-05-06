import FloralMap from "../HollandBloomComp/HollandFloralMap";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FloralMapScreen = () => {
    return (
        <HollandAppLayout screen={<FloralMap />} hollandNav={true} black={true} />
    )
};

export default FloralMapScreen