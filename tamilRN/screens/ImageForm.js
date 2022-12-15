import React, { useState } from 'react';
import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const ImageForm = () => {
    const [image, setImage] = useState("");
    var pickImage = async () => {
        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!response.canceled) {
            setImage(response.assets.uri);
        }
    }
    var uploadImageToServer = async () => {
        const resp = await fetch(image);
        const blob = await resp.blob();
        var reader = new FileReader();
        reader.onload = () => {
            var InsertAPI = "url";
            var Data = { title: "testFrom", imgage_url: reader.result };
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application.json'
            }
            fetch(InsertAPI, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        reader.readAsDataURL(blob);
    }
    return (
        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 40 }}>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.ImageContainer}>
                    {
                        image == '' ? <Text>Select a Photo</Text> :
                            <Image style={styles.ImageContainer} source={{ uri: image }} />
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={uploadImageToServer}
                activeOpacity={0.6}
                style={styles.button} >
                <Text style={styles.TextStyle}>
                    Upload
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    ImageContainer: {
        borderRadius: 8,
        width: 250,
        height: 250,
        borderColor: 'black',
        backgroundColor: 'lightblue',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 250,
        backgroundColor: 'lightblue',
        borderRadius: 8,
        marginTop: 20
    },
    TextStyle: {
        color: 'black',
        textAlign: 'center',
        padding: 10
    }
});

export default ImageForm;