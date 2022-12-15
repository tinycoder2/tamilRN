import React, { useState, useContext } from 'react';
import axios from "axios";
import { StyleSheet, Text, Button, View, ImageBackground } from 'react-native';
import { CameraContext } from '../context/Context';
import * as FileSystem from 'expo-file-system';


// const { __startCamera, setImage, setPreviewVisible } = useContext(CameraContext);
// const { image, setImage } = useContext(CameraContext);
// const { setImage } = useContext(CameraContext);

const CameraPreview = ({ photo, setImage }) => {

    const __retakePicture = (setImage) => {

        setImage(null)
        // setPreviewVisible(false)
        // __startCamera()
    }

    // FORMS
    const baseUrl = "http://192.168.0.173:8000/testApp/reports/";
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitFormHandler = async (event) => {
        console.log(photo)
        if (!photo) {
            alert("data is invalid");
            return;
        }
        setIsLoading(true);

        console.log("base64 conv\n\n")
        const conv_photo = await FileSystem.readAsStringAsync(photo, { encoding: 'base64' });
        // const blob_photo = await photo.blob();
        // console.log(conv_photo)

        try {
            console.log("inside post")

            const response = await axios.post(baseUrl, {
                "title": "test",
                "image_url": conv_photo,

            });
            if (response.status === 201) {
                alert(` You have created: ${JSON.stringify(response.data.title)}`);
                console.log(response.data)
                setIsLoading(false);
                setImage(null);
            } else {
                throw new Error("An error has occurred");
            }
        } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
        }
    };

    // const onSubmitFormHandler = async (event) => {

    //     const formData = new FormData();
    //     formData.append('title', "photo");
    //     formData.append('image_url', photo);

    //     console.log(formData)

    //     let res = await fetch(baseUrl, {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data;charset=utf-8',
    //         },
    //     });
    //     let responseJson = await res.json();
    //     if (responseJson.status == 1) {
    //         alert('Upload Successful');
    //     } else {
    //         //if no file selected the show alert
    //         alert('error');
    //     }
    // };

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ImageBackground
                source={{ uri: photo }}
                style={{
                    flex: 1
                }}
            />
            <Button
                title="Take Another"
                onPress={() => __retakePicture(setImage)}
            />

            <Button
                title="Submit"
                onPress={onSubmitFormHandler}
                disabled={isLoading}
            />
        </View>
    )
}

export default CameraPreview