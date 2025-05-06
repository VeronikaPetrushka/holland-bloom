import MarketInfo from "../HollandBloomComp/HollandMarketInfo";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const MarketInfoScreen = ({ route }) => {
    const { market } = route.params;

    return (
        <HollandAppLayout screen={<MarketInfo market={market} />} hollandNav={false} black={true} />
    )
}; 

export default MarketInfoScreen;