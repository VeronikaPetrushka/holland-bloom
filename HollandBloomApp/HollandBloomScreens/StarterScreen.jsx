import Starter from "../HollandBloomComp/HollandBloomGuideStarter";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const StarterScreen = () => {
    return (
        <HollandAppLayout screen={<Starter />} hollandNav={false} />
    )
};

export default StarterScreen;