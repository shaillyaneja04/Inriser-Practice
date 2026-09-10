import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';

export default function HeroBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.subtitle}>HUNGRY?</Text>
          <Text style={styles.title}>Discover the best{"\n"}food near you</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🚀 Free delivery on first order</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: BorderRadius.xl,
  },
  overlay: {
    padding: Spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: BorderRadius.xl,
    height: '100%',
    justifyContent: 'flex-end',
  },
  subtitle: {
    color: Colors.secondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  title: {
    color: '#FFFFFF',
    fontSize: FontSize.xxl,
    fontWeight: '800',
    lineHeight: 28,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
