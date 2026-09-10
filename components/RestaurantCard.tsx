import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/theme';
import { Restaurant } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(restaurant.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/restaurant/${restaurant.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      {restaurant.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(restaurant.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={22}
          color={liked ? Colors.error : '#FFF'}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={Colors.star} />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.priceRange}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="bicycle-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{restaurant.deliveryFee}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{restaurant.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  featuredText: {
    color: '#FFF',
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.35)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  rating: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 3,
  },
  cuisine: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});
