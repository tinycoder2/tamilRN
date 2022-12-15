import { createContext, useState, useEffect } from "react";
export const CameraContext = createContext()

const Context = ({ children }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    // const [startCamera, setStartCamera] = React.useState(false)

    const [image, setImage] = useState(null);
    // const [previewVisible, setPreviewVisible] = useState(false)

    // const __startCamera = async () => {
    //     const cameraStatus = await Camera.requestCameraPermissionsAsync();
    //     setHasCameraPermission(cameraStatus.status === 'granted');
    //     if (cameraStatus.status === 'granted') {
    //         // start the camera
    //         setStartCamera(true)
    //     } else {
    //         Alert.alert('Access denied')
    //     }
    // }


    return (
        <CameraContext.Provider value={{ hasCameraPermission, setHasCameraPermission, image, setImage }}>
            {children}
        </CameraContext.Provider>
    )
}

export default Context;