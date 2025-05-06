import FavFestivals from "../HollandBloomComp/HollandFavFestivals";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FavFestivalsScreen = () => {
    return (
        <HollandAppLayout screen={<FavFestivals />} hollandNav={false} black={true} />
    )
};

export default FavFestivalsScreen;