import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ReadQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [resultData,setResultData] = useState('vazio')

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   
   
    setResultData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-end',
        
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camRead}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false);setResultData('vazio')}} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
   camRead: {
      width:250,
      height:300,
      marginBottom:10
      

   },
  
})



