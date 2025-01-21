import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      // Cleanup function to cancel any ongoing asynchronous operations.
      setIsLoading(false);
    };
  }, []);

  const takePicture = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call or other long-running task
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (isLoading) {
        console.log('Picture taken'); // This line won't reach if unmounted
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View />; // While asking for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end' }} onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>TAKE PICTURE</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;