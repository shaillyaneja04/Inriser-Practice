import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { menuItems, restaurants } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export default function MenuItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  const item = menuItems.find((m) => m.id === id);
  if (!item) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Item not found</Text>
      </View>
    );
  }

  const restaurant = restaurants.find((r) => r.id === item.restaurantId);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.badges}>
            {item.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>⭐ Popular</Text>
              </View>
            )}
            {item.vegetarian && (
              <View style={styles.vegBadge}>
                <Text style={styles.vegText}>🌱 Vegetarian</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{item.name}</Text>
          {restaurant && (
            <Text style={styles.restaurant}>from {restaurant.name}</Text>
          )}
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addToCart(item);
            router.back();
          }}
        >
          <Ionicons name="cart" size={22} color="#FFF" />
          <Text style={styles.addButtonText}>Add to Cart • ${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: Spacing.xl,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  popularBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  popularText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#D97706',
  },
  vegBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  vegText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: '#059669',
  },
  name: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
  },
  restaurant: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  description: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginTop: Spacing.lg,
  },
  price: {
    fontSize: FontSize.hero,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: Spacing.xl,
  },
  footer: {
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: FontSize.xl,
    color: Colors.textSecondary,
  },
});
