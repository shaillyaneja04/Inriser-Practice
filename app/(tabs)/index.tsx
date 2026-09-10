import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { restaurants, categories, menuItems } from '../../data/mockData';
import HeroBanner from '../../components/HeroBanner';
import SearchBar from '../../components/SearchBar';
import CategoryChip from '../../components/CategoryChip';
import RestaurantCard from '../../components/RestaurantCard';

const categoryToCuisineMap: Record<string, string[]> = {
  'Pizza': ['Italian'],
  'Burger': ['American'],
  'Sushi': ['Japanese'],
  'Indian': ['Indian'],
  'Chinese': ['Chinese'],
  'Dessert': ['Dessert'],
  'Drinks': [],
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('1');

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name || 'All';

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    // Filter by category
    if (activeCategoryName !== 'All') {
      const cuisines = categoryToCuisineMap[activeCategoryName] || [];

      // Match restaurants whose cuisine matches OR that have menu items in this category
      result = result.filter((r) => {
        const cuisineMatch = cuisines.some(
          (c) => r.cuisine.toLowerCase() === c.toLowerCase()
        );
        const menuMatch = menuItems.some(
          (m) =>
            m.restaurantId === r.id &&
            m.category.toLowerCase() === activeCategoryName.toLowerCase()
        );
        return cuisineMatch || menuMatch;
      });
    }

    // Filter by search text
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, activeCategoryName, search]);

  const featuredRestaurants = filteredRestaurants.filter((r) => r.featured);
  const allRestaurants = filteredRestaurants;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good afternoon 👋</Text>
          <Text style={styles.title}>What would you like to eat?</Text>
        </View>

        <SearchBar value={search} onChangeText={setSearch} />

        <HeroBanner />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryChip
                name={item.name}
                icon={item.icon}
                isActive={activeCategory === item.id}
                onPress={() => setActiveCategory(item.id)}
              />
            )}
          />
        </View>

        {featuredRestaurants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Restaurants</Text>
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeCategoryName === 'All' ? 'All Restaurants' : `${activeCategoryName} Restaurants`}
          </Text>
          {allRestaurants.length > 0 ? (
            allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🍽️</Text>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try a different category or search term</Text>
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
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
  greeting: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  categoryList: {
    paddingHorizontal: Spacing.lg,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
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
});
