import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useWindowDimensions } from "react-native";
import CameraPreview from '../components/CameraPreview';
import { CameraContext } from '../context/Context';

const CameraApp = () => {
    const { hasCameraPermission, setHasCameraPermission, image, setImage } = useContext(CameraContext);
    // , __startCamera, startCamera, setStartCamera, image, setImage, previewVisible, setPreviewVisible
    const [startCamera, setStartCamera] = React.useState(false)

    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    // const [image, setImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false)


    const { width } = useWindowDimensions();
    const height = Math.round((width * 16) / 9);


    const __startCamera = async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        if (cameraStatus.status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }



    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            console.log(Date.now())
            console.log(data)
            setPreviewVisible(true)
            setImage(data.uri);
        }
    }




    // if (hasCameraPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }

    return (
        <View style={{ flex: 1 }}>
            {startCamera ? (
                image && previewVisible ? (
                    <CameraPreview photo={image} setImage={setImage} />
                ) : (
                    <Camera
                        ref={ref => setCamera(ref)}
                        ratio="16:9"
                        style={{
                            height: height,
                            width: "100%",
                        }}
                        type={type}>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                padding: 20,
                                justifyContent: 'space-between'
                            }}
                        >
                            <View
                                style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={takePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        backgroundColor: 'white'
                                    }}
                                />
                            </View>
                        </View>
                    </Camera>
                )
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={__startCamera}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* end of camera take */}





        </View>
    );
}
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        // width: "100%"
        // flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        // aspectRatio: 1
    }
})

export default CameraApp


{/* <Camera
                ref={ref => setCamera(ref)}
                ratio="16:9"
                style={{
                    height: height,
                    width: "100%",
                }}
                type={type} /> */}

{/* <Button
                title="Flip Image"
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
            </Button>
            <Button title="Take Picture" onPress={() => takePicture()} /> */}
{/* {image && <Image source={{ uri: image }} style={{ flex: 1 }} />} */ }