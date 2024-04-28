import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Header from '../../Header'
import Button from '../../Button';

export default function FoodDetail({ navigation, route }) {
  const { item } = route.params;
  return (
    <Card style={{ padding: 10 }}>
      <Card.Cover source={{ uri: item.image.uri }} />
      <Header>{item.name}</Header>
      <Paragraph>Origin: {item.origin}</Paragraph>
      <Paragraph>{item.description}</Paragraph>
      <Paragraph>Price: {item.price}</Paragraph>
      <Button icon="cart" mode="outlined" onPress={() => console.log("Add To Cart Click")}>
        Add To Cart
      </Button>
    </Card>
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
