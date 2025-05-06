import Markets from "../HollandBloomComp/HollandBloomMarkets";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const MarketsScreen = () => {
    return (
        <HollandAppLayout screen={<Markets />} hollandNav={true} black={true} />
    )
};

export default MarketsScreen;