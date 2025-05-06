import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Linking, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import floralQuiz from "../HollandBloomConst/floralQuiz";
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height } = Dimensions.get('window');

const FloralQuiz = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [lastQuiz, setLastQuiz] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadLastQuiz();
        }, [])
    );

    useEffect(() => {
        loadLastQuiz();
    }, [isStarted, isFinished]);

    useEffect(() => {
        if (isFinished) {
            const performance = `${correctAnswers} / ${floralQuiz.length}`;
            const storePerformance = async () => {
                try {
                    await AsyncStorage.setItem('lastQuiz', performance);
                    setLastQuiz(performance);
                } catch (error) {
                    console.error("Error saving quiz result:", error);
                }
            };
            storePerformance();
        }
    }, [isFinished]);

    const loadLastQuiz = async () => {
        try {
            const storedResult = await AsyncStorage.getItem('lastQuiz');
            if (storedResult) {
                setLastQuiz(storedResult);
            }
        } catch (error) {
            console.error("Error loading last quiz result:", error);
        }
    };

    const handleNextQuestion = (variant) => {
        const isCorrect = variant === floralQuiz[currentQuestionIndex].answer;
    
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
        }
    
        const isLastQuestion = currentQuestionIndex === floralQuiz.length - 1;
    
        if (isLastQuestion) {
            setIsFinished(true);
            saveLastQuiz();
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };    

    const handleRestart = () => {
        setIsStarted(false);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setIsFinished(false);
    };

    const saveLastQuiz = async () => {
        if (isFinished) {
            const performance = `${correctAnswers} / ${floralQuiz.length}`;
            try {
                await AsyncStorage.setItem('lastQuiz', performance);
                setLastQuiz(performance);
            } catch (error) {
                console.error("Error saving last quiz result:", error);
            }
        }
    };
    
    const openPlantCareGuide = () => {
        Linking.openURL('https://www.wikihow.com/Take-Care-of-Plants')
          .catch(() => {
            Alert.alert('Error', 'Unable to open the link');
          });
      };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>A quiz called “Flower Connoisseur”</Text>

            {
                isStarted ? (
                    <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                        {
                            isFinished ? (
                                <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                                    <Text style={[styles.lastText, {fontStyle: 'italic', marginBottom: 10}]}>Flower Connoisseur 🌺</Text>
                                    <Text style={[styles.lastText, {fontStyle: 'italic'}]}>You're well-versed in the floral world, but there's room to grow</Text>
                                    <Text style={[styles.lastText, {fontSize: 40}]}>{correctAnswers} / {floralQuiz.length}</Text>
                                    <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
                                        <Icons type={'restart'} />
                                    </TouchableOpacity>
                                    <Image source={require('../HollandBloomAssets/decor/boy.png')} style={[styles.startBoy, {height: height * 0.33, bottom: height * 0.22, right: -50}]} />
                                    <View style={{width: '100%', position: 'absolute', bottom: height * 0.18}}>
                                        <TouchableOpacity style={[styles.startBtn, {marginBottom: 11}]} onPress={openPlantCareGuide}>
                                            <Text style={styles.startBtnText}>All about flowers</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.startBtn} onPress={handleRestart}>
                                            <Text style={styles.startBtnText}>Go back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                                    <Text style={[styles.lastText, {fontStyle: 'italic'}]}>{floralQuiz[currentQuestionIndex].question}</Text>
                                    {
                                        floralQuiz[currentQuestionIndex].variants.map((variant, index) => (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={[styles.startBtn, {marginBottom: height * 0.03}]}
                                                onPress={() => handleNextQuestion(variant)}
                                                >
                                                <Text style={styles.startBtnText}>{variant}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    <Image 
                                        source={require('../HollandBloomAssets/decor/quiz-boy.png')} 
                                        style={[styles.startBoy, {height: height * 0.29, width: height * 0.29, bottom: 0, right: -100}]} 
                                        />
                                </View>
                            )
                        }
                    
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                        {
                            lastQuiz && (
                                <>
                                    <Text style={styles.lastText}>Your past performance</Text>
                                    <Text style={[styles.lastText, {fontStyle: 'italic'}]}>You - Flower Expert! </Text>
                                    <Text style={[styles.lastText, {fontSize: 40}]}>{lastQuiz}</Text>
                                </>
                            )
                        }
                        <Image source={require('../HollandBloomAssets/decor/quiz-boy.png')} style={styles.startBoy} />
                        <TouchableOpacity style={[styles.startBtn, {position: 'absolute', bottom: height * 0.18}]} onPress={() => setIsStarted(true)}>
                            <Text style={styles.startBtnText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: height * 0.06
    },

    startBtn: {
        width: '100%',
        padding: 14,
        backgroundColor: '#ebb400',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 10
    },

    startBtnText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        lineHeight: 23
    },

    lastText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.04,
        zIndex: 10
    },

    startBoy: {
        width: height * 0.38,
        height: height * 0.38,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: height * 0.2
    },

    restartBtn: {
        width: 57,
        height: 57,
        padding: 14,
        borderRadius: 100,
        backgroundColor: '#ebb400',
        zIndex: 10
    }

});

export default FloralQuiz;