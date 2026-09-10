import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/theme';
import { CartItem as CartItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.menuItem.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.menuItem.name}</Text>
        <Text style={styles.price}>${(item.menuItem.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
        >
          <Ionicons name={item.quantity === 1 ? 'trash-outline' : 'remove'} size={16} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  price: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  controlButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
  },
  quantity: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: Spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },
});
