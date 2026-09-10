import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { restaurants, menuItems } from '../../data/mockData';
import SearchBar from '../../components/SearchBar';
import RestaurantCard from '../../components/RestaurantCard';
import { useCart } from '../../context/CartContext';

type TabType = 'restaurants' | 'dishes';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('restaurants');
  const router = useRouter();
  const { addToCart } = useCart();

  const filteredRestaurants = useMemo(() => {
    if (!search.trim()) return restaurants;
    const q = search.toLowerCase();
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q)
    );
  }, [search]);

  const filteredDishes = useMemo(() => {
    if (!search.trim()) return menuItems;
    const q = search.toLowerCase();
    return menuItems.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [search]);

  const getRestaurantName = (restaurantId: string) => {
    return restaurants.find((r) => r.id === restaurantId)?.name || '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.tabActive]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Ionicons
            name="restaurant-outline"
            size={16}
            color={activeTab === 'restaurants' ? '#FFF' : Colors.text}
          />
          <Text style={[styles.tabText, activeTab === 'restaurants' && styles.tabTextActive]}>
            Restaurants ({filteredRestaurants.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dishes' && styles.tabActive]}
          onPress={() => setActiveTab('dishes')}
        >
          <Ionicons
            name="fast-food-outline"
            size={16}
            color={activeTab === 'dishes' ? '#FFF' : Colors.text}
          />
          <Text style={[styles.tabText, activeTab === 'dishes' && styles.tabTextActive]}>
            Dishes ({filteredDishes.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'restaurants' ? (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={filteredRestaurants.length === 0 ? styles.emptyContainer : undefined}
        />
      ) : (
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dishCard}
              onPress={() => router.push(`/menu-item/${item.id}`)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.dishImage} />
              <View style={styles.dishInfo}>
                <View style={styles.dishBadges}>
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                  {item.vegetarian && (
                    <View style={styles.vegBadge}>
                      <Text style={styles.vegText}>Veg</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.dishName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.dishRestaurant} numberOfLines={1}>
                  {getRestaurantName(item.restaurantId)}
                </Text>
                <View style={styles.dishBottom}>
                  <Text style={styles.dishPrice}>${item.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(item)}
                  >
                    <Ionicons name="add" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🍽️</Text>
              <Text style={styles.emptyText}>No dishes found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.dishList,
            filteredDishes.length === 0 ? styles.emptyContainer : undefined,
          ]}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  tabTextActive: {
    color: '#FFF',
  },
  dishList: {
    paddingHorizontal: Spacing.lg,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dishImage: {
    width: 100,
    height: 100,
  },
  dishInfo: {
    flex: 1,
    padding: Spacing.md,
  },
  dishBadges: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  popularBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  popularText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: '#D97706',
  },
  vegBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  vegText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: '#059669',
  },
  dishName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  dishRestaurant: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  dishBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  dishPrice: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  emptySubtext: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  emptyContainer: {
    flexGrow: 1,
  },
});
