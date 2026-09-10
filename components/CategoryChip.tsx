import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/theme';

interface CategoryChipProps {
  name: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({ name, icon, isActive, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={isActive ? '#FFF' : Colors.text}
        style={styles.icon}
      />
      <Text style={[styles.text, isActive && styles.textActive]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  textActive: {
    color: '#FFFFFF',
  },
});
