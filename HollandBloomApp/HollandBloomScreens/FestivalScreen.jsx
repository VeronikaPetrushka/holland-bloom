import Festival from "../HollandBloomComp/HollandFestival";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FestivalScreen = () => {
    return (
        <HollandAppLayout screen={<Festival />} hollandNav={true} black={true} />
    )
};

export default FestivalScreen;