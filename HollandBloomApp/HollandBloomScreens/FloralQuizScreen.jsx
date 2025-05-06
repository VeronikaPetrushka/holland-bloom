import FloralQuiz from "../HollandBloomComp/HollandFloralQuiz";
import HollandAppLayout from "../HollandAppHelpers/HollandAppLayout";

const FloralQuizScreen = () => {
    return (
        <HollandAppLayout screen={<FloralQuiz />} hollandNav={true} black={true} />
    )
};

export default FloralQuizScreen;