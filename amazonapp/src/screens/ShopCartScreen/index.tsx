import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartProductItem from '../../components/CartProductItem';
import QuantitySelector from '../../components/quantitySelector';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { DataStore, Auth } from 'aws-amplify';
import { CartProduct, Product } from '../../models';

const ShopingCartScreen = () => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  
    const navigation = useNavigation();
  
    const fetchCartProducts = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      // TODO query only my cart items
      DataStore.query(CartProduct, cp =>
        cp.userSub('eq', userData.attributes.sub),
      ).then(setCartProducts);
    };
  
    useEffect(() => {
      fetchCartProducts();
    }, []);
  
    useEffect(() => {
      if (cartProducts.filter(cp => !cp.product).length === 0) {
        return;
      }
  
      const fetchProducts = async () => {
        // query all products that are used in cart
        const products = await Promise.all(
          cartProducts.map(cartProduct =>
            DataStore.query(Product, cartProduct.productID),
          ),
        );
  
        // assign the products to the cart items
        setCartProducts(currentCartProducts =>
          currentCartProducts.map(cartProduct => ({
            ...cartProduct,
            product: products.find(p => p.id === cartProduct.productID),
          })),
        );
      };
  
      fetchProducts();
    }, [cartProducts]);
  
    useEffect(() => {
      const subscription = DataStore.observe(CartProduct).subscribe(msg =>
        fetchCartProducts(),
      );
      return subscription.unsubscribe;
    }, []);
  
    useEffect(() => {
      const subscriptions = cartProducts.map(cp =>
        DataStore.observe(CartProduct, cp.id).subscribe(msg => {
          if (msg.opType === 'UPDATE') {
            setCartProducts(curCartProducts =>
              curCartProducts.map(cp => {
                if (cp.id !== msg.element.id) {
                  console.log('differnt id');
                  return cp;
                }
                return {
                  ...cp,
                  ...msg.element,
                };
              }),
            );
          }
        }),
      );
  
      return () => {
        subscriptions.forEach(sub => sub.unsubscribe());
      };
    }, [cartProducts]);

  
    const totalPrice = cartProducts.reduce(
      (summedPrice, product) =>
        summedPrice + (product?.product?.price || 0) * product.quantity,
      0,
    );
  
    const onCheckout = () => {
      navigation.navigate('Address', {totalPrice});
    };
  
    if (cartProducts.filter(cp => !cp.product).length !== 0) {
      return <ActivityIndicator />;
    }
  
    return (
      <View style={{padding: 10}}>
        {/* Render Product Componet */}
        <FlatList
          data={cartProducts}
          renderItem={({item}) => <CartProductItem cartItem={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <Text style={{fontSize: 18}}>
                Subtotal ({cartProducts.length} items):{' '}
                <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                  ${totalPrice.toFixed(2)}
                </Text>
              </Text>
              <Button
                text="Proceed to checkout"
                onPress={onCheckout}
                containerStyles={{
                  backgroundColor: '#f7e300',
                  borderColor: '#c7b702',
                }}
              />
            </View>
          )}
        />
      </View>
    );
  };
  
  export default ShopingCartScreen;

// const ShopCartScreen = () => {
//     const [cartproduct, setCartProduct] = useState<CartProduct[]>([]);

//     const navigation = useNavigation();
//     const onCheckout = () => {
//         navigation.navigate("Address");
//     }

//     const totalPrice = 
//     cartproduct.reduce(
//         (summedPrice, product) =>
//           summedPrice + (product?.product?.price || 0) * product.quantity,
//         0,
//       );


//     useEffect(() => {
        
//         const fetchCartProduct =async () => {
//             const userData = await Auth.currentAuthenticatedUser();
//             console.log(userData.attributes.sub);
//             DataStore.query(CartProduct, cp => cp.userSub('ne', userData.attributes.sub)).then(setCartProduct);
//         }
//         fetchCartProduct();
//     }, []);

//     useEffect(() => {
//         if (cartproduct.filter(cp => !cp.product).length === 0) {
//             return;
//         }
      
//         const fetchProduct =async () => {
//             const products = await Promise.all(
//                 cartproduct.map(cartProduct => DataStore.query(Product, cartProduct.productID)),
//             )
//             console.log(products);
            
//             setCartProduct(currentCartProducts => (
//                 currentCartProducts.map(cartProduct => ({
//                     ...cartProduct, 
//                     product : products.find(p => p.id === cartProduct.productID),
//                 }))))
//         }
        
//         fetchProduct();
//         console.log(cartproduct);
//     }, []);
    
    
//     if (cartproduct.filter(cp => !cp.product).length !== 0) {
//         return <ActivityIndicator />;
//     }

//     return (
//     <View style = {styles.page}>
//         <View>
//             <Text style = {{fontSize : 20, fontWeight : "bold"}}>
//                 Subtotal of {cartproduct.length} Items :  
//                 <Text style = {{color : "#e47911"}}> ${totalPrice.toFixed(2)}</Text>
//             </Text>
//         </View>

//         <Button text='Proceed to Checkout' 
//                 onPress={onCheckout}
//                 containerStyle = {{backgroundColor : "#f7e300"}}/>

//       {/*render products*/}
//       <FlatList 
//             data={cartproduct} 
//             renderItem = {({item}) => (
//                 <CartProductItem cartItem={item}/>
//                 )} 
//             showsHorizontalScrollIndicator={false}
//         />

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     page: {
//         padding : 10,
//     },
    
// });

// export default ShopCartScreen;