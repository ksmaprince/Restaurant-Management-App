import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function FoodDetail({ navigation, route }) {
    const { item } = route.params;
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: 200 }}>
          <Image
            source={{ uri: item.image.uri }}
            style={{ width: '100%', height: '100%', marginBottom: 20 }}
          />
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
            {item.name}
          </Text>
        </View>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Origin: {item.origin}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Price: ${item.price}</Text>
        
        <Text style={{ fontSize: 15, marginBottom: 10 }}>{item.description}</Text>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Available from {item.date}
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      padding: 10,
    },
  });
  