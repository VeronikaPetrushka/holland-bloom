import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Modal, TextInput, ScrollView } from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import floralFields from "../HollandBloomConst/floralFields";
import Icons from "../HollandAppHelpers/HollandAppIcons";

const { height } = Dimensions.get('window');

const FloralMap = () => {
    const [type, setType] = useState('map');
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [fieldModalVisible, setFieldModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [visited, setVisited] = useState([]);
    const [fields, setFields] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [fieldName, setFieldName] = useState(null);
    const [description, setDescription] = useState(null);

    const fetchFields = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem('fields');
            if (stored) {
                setFields(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error fetching fields:', error);
        }
    }, []);

    const loadVisited = useCallback(async () => {
        try {
            const storedData = await AsyncStorage.getItem('visited');
            if (storedData) {
                setVisited(JSON.parse(storedData));
            } else {
                setVisited([]);
            }
        } catch (error) {
            console.error("Error loading visited locations:", error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadVisited();
            fetchFields();
        }, [])
    );

    useEffect(() => {
        loadVisited();
    }, [visited]);

    useEffect(() => {
        fetchFields();
    }, [fields]);

    const handleInfo = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
        setModalVisible(false);
    };

    const addVisited = async () => {
        if (selectedItem && !visited.some(item => item.name === selectedItem.name)) {
            try {
                const updatedVisited = [...visited, selectedItem];
                setVisited(updatedVisited);
                await AsyncStorage.setItem('visited', JSON.stringify(updatedVisited));
            } catch (error) {
                console.error("Error saving visited location:", error);
            }
        }
    };    

    const removeVisited = async () => {
        if (selectedItem) {
            try {
                const updatedVisited = visited.filter(item => item.name !== selectedItem.name);
                setVisited(updatedVisited);
                await AsyncStorage.setItem('visited', JSON.stringify(updatedVisited));
            } catch (error) {
                console.error("Error removing visited location:", error);
            }
        }
    };    

    const isVisited = visited.some(item => item.name === selectedItem?.name);

    const uploadFieldImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
            if (!result.didCancel && result.assets && result.assets.length > 0) {
                setUploadedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error selecting image:", error);
        }
    };

    const addField = async () => {
        if (!fieldName || !description || !uploadedImage) {
            return;
        }

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
        
        const newField = {
            id: Date.now(),
            name: fieldName,
            about: description,
            image: uploadedImage,
            date: formattedDate
        };
    
        try {
            const updatedFields = [...fields, newField];
            setFields(updatedFields);
            await AsyncStorage.setItem('fields', JSON.stringify(updatedFields));
    
            setUploadedImage(null);
            setFieldName(null);
            setDescription(null);
            setAddModalVisible(false);

        } catch (error) {
            console.error("Error saving new field:", error);
        }
    };

    const handleFieldModal = (item) => {
        if(selectedField) {
            setSelectedField(null);
            setFieldModalVisible(false);    
        } else {
            setSelectedField(item);
            setFieldModalVisible(true);    
        }
    };
    
    const deleteField = async () => {
        try {
            const updatedFields = fields.filter(field => field.id !== selectedField.id);
            setFields(updatedFields);
            await AsyncStorage.setItem('fields', JSON.stringify(updatedFields));

            setFieldModalVisible(false);
        } catch (error) {
            console.error("Error deleting field:", error);
        }
    };

    return (
        <View style={styles.container}>

            {
                type === 'map' ? (
                    <>
                        <Text style={styles.title}>Floral Fields Map</Text>
                        <TouchableOpacity style={styles.typeBtn} onPress={() => setType('gallery')}>
                            <Icons type={'photo'} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={styles.back} onPress={() => setType('map')}>
                            <Icons type={'back'} white />
                        </TouchableOpacity>
                        <Text style={styles.title}>Gallery</Text>
                        <TouchableOpacity style={styles.typeBtn} onPress={() => setAddModalVisible(true)}>
                            <Icons type={'plus'} />
                        </TouchableOpacity>
                    </>
                )
            }

            {
                type === 'map' ? (
                    <View style={{width: '100%', height: height * 0.5, marginTop: height * 0.1}}>
                        <Image source={require('../HollandBloomAssets/decor/floralMap.png')} style={styles.map} />
                        {
                            floralFields.map((item, index) => (
                                <View 
                                    key={index} 
                                    style={[ {position: 'absolute'},
                                        index === 0 && {bottom: height * 0.52, left: 20},
                                        index === 1 && {bottom: height * 0.46, right: 0},
                                        index === 2 && {bottom: height * 0.24, left: 100},
                                        index === 3 && {bottom: height * 0.2, right: 0},
                                        index === 4 && {bottom: height * 0.1, left: 0},
                                        index === 5 && {bottom: height * 0.05, right: 90},
                                    ]}
                                    >
                                        <View style={{ alignItems: 'flex-start' }}>
                                            {visited.some(i => i.name === item.name) && (
                                                <Text style={styles.visited}>Was here</Text>
                                            )}
                                            <TouchableOpacity style={styles.itemBtn} onPress={() => handleInfo(item)}>
                                                <Text style={styles.itemName}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            ))
                        }
                    </View>    
                ) : (
                    <View style={{width: '100%', flexGrow: 1, alignItems: 'center', marginTop: 50}}>
                        {
                            fields.length > 0 ? (
                                <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
                                    {
                                        fields.map((field, index) => (
                                            <TouchableOpacity key={index} style={styles.fieldCard} onPress={() => handleFieldModal(field)}>
                                                <Image source={{uri: field.image}} style={styles.fieldImage} />
                                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: 15, paddingHorizontal: 20}}>
                                                    <Text style={styles.fieldDate}>{field.date}</Text>
                                                    <Text style={styles.fieldName} ellipsizeMode='tail'>{field.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    <View style={{height: 200}} />
                                </ScrollView>
                            ) : (
                                <Text style={{fontSize: 20, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', marginTop: height * 0.2}}>Empty</Text>
                            )
                        }
                    </View>
                )
            }

            <Modal 
                visible={modalVisible} 
                transparent={true}
                animationType="fade"
                onRequestClose={handleModalClose}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={[styles.back, {top: 23, left: 16}]} onPress={handleModalClose}>
                            <Icons type={'back'} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
                        <Image source={selectedItem?.image} style={styles.modalImage} />
                        <Text style={styles.modalText}>{selectedItem?.about}</Text>
                        <Text style={[styles.modalText, {fontSize: 13}]}>Have you been here ?</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity 
                                style={[styles.modalButton, {marginRight: 20}, isVisited && {backgroundColor: '#fff'}]} 
                                onPress={addVisited}
                                >
                                <Text style={[styles.modalButtonText, isVisited && {color: '#000'}]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={removeVisited}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal 
                visible={addModalVisible} 
                transparent={true}
                animationType="fade"
                onRequestClose={() => setAddModalVisible(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={[styles.back, {top: 23, left: 16}]} onPress={() => setAddModalVisible(false)}>
                            <Icons type={'back'} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Add floral field</Text>
                        <TouchableOpacity style={styles.imageContainer} onPress={uploadFieldImage}>
                            {
                                uploadedImage ? (
                                    <Image source={{uri: uploadedImage}} style={[styles.modalImage, {width: '100%', height: '100%', marginBottom: 0}]} />
                                ) : (
                                    <View style={{width: 30, height: 30}}>
                                        <Icons type={'photo'} white />
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            value={fieldName}
                            onChangeText={setFieldName}
                            placeholder='Field name'
                            placeholderTextColor={'rgba(42, 29, 65, 0.4)'}
                        />
                        <TextInput
                            style={[styles.input, {height: 200}]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder='Tell about this field...'
                            placeholderTextColor={'rgba(42, 29, 65, 0.4)'}
                            multiline
                        />
                        <TouchableOpacity style={[styles.modalButton, {paddingHorizontal: 50, paddingVertical: 7, borderRadius: 30}]} onPress={addField}>
                            <Text style={[styles.modalButtonText, {fontSize: 16, lineHeight: 18}]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal 
                visible={fieldModalVisible} 
                transparent={true}
                animationType="fade"
                onRequestClose={handleFieldModal}
                >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, {maxHeight: '70%'}]}>
                        <TouchableOpacity style={[styles.back, {top: 23, left: 16}]} onPress={handleFieldModal}>
                            <Icons type={'back'} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedField?.name}</Text>
                        <Image source={{ uri: selectedField?.image }} style={styles.modalImage} />
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.modalText}>{selectedField?.about}</Text>
                        </ScrollView>
                        <Text style={[styles.modalText, {fontSize: 13}]}>Delete this record ?</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity 
                                style={[styles.modalButton, {marginRight: 20}]} 
                                onPress={deleteField}
                                >
                                <Text style={[styles.modalButtonText, isVisited && {color: '#000'}]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleFieldModal}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
    },

    back: {
        width: 26,
        height: 26,
        position: 'absolute',
        left: 0,
        top: 0
    },

    typeBtn: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 11,
        position: 'absolute',
        right: 0,
        top: 0
    },

    map: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    visited: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 10
    },

    itemBtn: {
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    itemName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000', 
    },

    modalContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },

    modalContent: {
        width: 321,
        backgroundColor: '#ebb400',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16
    },

    modalTitle: { 
        color: '#000', 
        fontSize: 20, 
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },

    imageContainer: {
        borderRadius: 15,
        marginBottom: 21,
        borderWidth: 2,
        borderColor: '#fff',
        width: 254,
        height: 143,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalImage: {
        width: 254,
        height: 143,
        resizeMode: 'cover',
        borderRadius: 15,
        marginBottom: 21
    },
    
    modalText: { 
        color: '#000', 
        fontSize: 14, 
        fontWeight: '600',
        lineHeight: 18,
        marginBottom: 16
    },

    modalButton: {
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#000',
    },

    modalButtonText: {
        color: '#fff', 
        fontSize: 11, 
        fontWeight: '600',
        lineHeight: 15,
    },

    input: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 16
    },

    fieldCard: {
        width: 300,
        height: 170,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#ebb400',
        marginBottom: 24,
        overflow: 'hidden'
    },

    fieldImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    fieldDate: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '300'
    },

    fieldName: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        maxWidth: '50%',
        textAlign: 'right'
    }

});

export default FloralMap;