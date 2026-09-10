import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, SectionList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { restaurants, menuItems } from '../../data/mockData';
import MenuItemCard from '../../components/MenuItemCard';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
      </View>
    );
  }

  const items = menuItems.filter((m) => m.restaurantId === id);
  const categoryGroups = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const sections = Object.entries(categoryGroups).map(([title, data]) => ({
    title,
    data,
  }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <>
          <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color={Colors.star} />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
                <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{restaurant.cuisine}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{restaurant.priceRange}</Text>
            </View>
            <Text style={styles.description}>{restaurant.description}</Text>
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryItem}>
                <Ionicons name="time-outline" size={18} color={Colors.primary} />
                <Text style={styles.deliveryText}>{restaurant.deliveryTime}</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Ionicons name="bicycle-outline" size={18} color={Colors.primary} />
                <Text style={styles.deliveryText}>{restaurant.deliveryFee}</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Ionicons name="location-outline" size={18} color={Colors.primary} />
                <Text style={styles.deliveryText}>{restaurant.distance}</Text>
              </View>
            </View>
          </View>
        </>
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.menuItemWrapper}>
          <MenuItemCard
            item={item}
            onPress={() => router.push(`/menu-item/${item.id}`)}
          />
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  metaDot: {
    marginHorizontal: Spacing.sm,
    color: Colors.textLight,
  },
  metaText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: Spacing.md,
  },
  deliveryRow: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    gap: Spacing.xl,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  deliveryText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  sectionHeader: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  menuItemWrapper: {
    paddingHorizontal: Spacing.lg,
  },
  listContent: {
    paddingBottom: Spacing.xxxl,
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
