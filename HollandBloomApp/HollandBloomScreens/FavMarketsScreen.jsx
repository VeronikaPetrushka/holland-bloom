import FavMarkets from "../HollandBloomComp/HollandFavMarkets";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FavMarketsScreen = () => {
    return (
        <HollandAppLayout screen={<FavMarkets />} hollandNav={false} black={true} />
    )
};

export default FavMarketsScreen;