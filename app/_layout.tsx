import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { OrderProvider } from '../context/OrderContext';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <OrderProvider>
      <FavoritesProvider>
        <CartProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: '700' },
              headerShadowVisible: false,
              contentStyle: { backgroundColor: Colors.background },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="restaurant/[id]"
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#FFF',
              }}
            />
            <Stack.Screen
              name="menu-item/[id]"
              options={{
                presentation: 'modal',
                headerTitle: 'Item Details',
              }}
            />
            <Stack.Screen
              name="order-confirmation"
              options={{
                headerTitle: 'Order Confirmed',
                headerBackVisible: false,
                gestureEnabled: false,
              }}
            />
          </Stack>
        </CartProvider>
      </FavoritesProvider>
    </OrderProvider>
  );
}
