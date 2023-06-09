import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route, navigation}: Props) => {
  const {name = '', id = ''} = route.params;

  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductsContext);

  const {
    _id,
    categorieId,
    name: productName,
    img,
    form,
    onChange,
    setFormValue,
  } = useForm({
    _id: id,
    categorieId: '',
    name,
    img: '',
  });
  const {categories} = useCategories();

  useEffect(() => {
    navigation.setOptions({
      title: productName ? productName : 'Nombre del Producto',
    });
  }, [productName]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categorieId: product.categoria._id,
      img: product.img || '',
      name,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categorieId, productName, id);
    } else {
      const tempCategoryId = categorieId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, productName);
      onChange(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del Producto:</Text>
        <TextInput
          placeholder="Producto"
          value={productName}
          onChangeText={value => onChange(value, 'name')}
          style={styles.textInput}
        />
        <Text style={styles.label}>Categoría:</Text>

        <Picker
          selectedValue={categorieId}
          onValueChange={itemValue => onChange(itemValue, 'categorieId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button title="Guardar" onPress={saveOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button
              title="Cámara"
              onPress={() => console.log('hey')}
              color="#5856D6"
            />
            <View style={{width: 10}} />
            <Button
              title="Galería"
              onPress={() => console.log('hey')}
              color="#5856D6"
            />
          </View>
        )}

        {img.length > 0 && (
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    marginTop: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 40,
    marginBottom: 15,
  },
});
