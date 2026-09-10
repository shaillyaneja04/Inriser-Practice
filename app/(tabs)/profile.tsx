import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { useOrders, Order } from '../../context/OrderContext';
import { useFavorites } from '../../context/FavoritesContext';
import { restaurants } from '../../data/mockData';

type ModalType =
  | 'orders'
  | 'favorites'
  | 'addresses'
  | 'payments'
  | 'notifications'
  | 'help'
  | 'editProfile'
  | null;

const savedAddresses = [
  { id: '1', label: 'Home', address: '123 Main Street, Apt 4B, New York, NY 10001', icon: 'home-outline' },
  { id: '2', label: 'Office', address: '456 Business Ave, Floor 12, New York, NY 10018', icon: 'business-outline' },
];

const paymentMethods = [
  { id: '1', label: 'Cash on Delivery', icon: 'cash-outline', selected: true },
  { id: '2', label: 'Credit Card •••• 4242', icon: 'card-outline', selected: false },
  { id: '3', label: 'Apple Pay', icon: 'logo-apple', selected: false },
];

const notifications = [
  { id: '1', title: '🚀 Free delivery this weekend!', body: 'Order from any restaurant and enjoy free delivery all weekend long.', time: '2h ago' },
  { id: '2', title: '⭐ Rate your last order', body: 'How was your order from The Italian Kitchen? Leave a review!', time: '1d ago' },
  { id: '3', title: '🎉 New restaurant alert', body: 'Sweet Treats Bakery just joined! Check out their amazing desserts.', time: '2d ago' },
  { id: '4', title: '🍕 50% off Pizza!', body: 'Get 50% off on all pizzas from The Italian Kitchen. Limited time!', time: '3d ago' },
  { id: '5', title: '📦 Order delivered', body: 'Your order #482913 has been delivered. Enjoy your meal!', time: '5d ago' },
];

const helpItems = [
  { id: '1', q: 'How do I place an order?', a: 'Browse restaurants, add items to your cart, and tap "Place Order" to checkout.' },
  { id: '2', q: 'How can I track my order?', a: 'After placing an order, you can see the order timeline on the confirmation screen.' },
  { id: '3', q: 'Can I cancel my order?', a: 'You can cancel within 2 minutes of placing the order. Go to Order History and tap Cancel.' },
  { id: '4', q: 'How do I add a delivery address?', a: 'Go to Profile → Delivery Addresses and tap Add New Address.' },
  { id: '5', q: 'What payment methods are accepted?', a: 'We accept Cash on Delivery, Credit/Debit Cards, and Apple Pay.' },
];

export default function ProfileScreen() {
  const { orders, getOrderCount } = useOrders();
  const { favorites, getFavoriteCount } = useFavorites();
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [userName, setUserName] = useState('Shailly Aneja');
  const [userEmail, setUserEmail] = useState('shailly@example.com');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));

  const menuItemsList = [
    { icon: 'receipt-outline', label: 'Order History', badge: getOrderCount() > 0 ? String(getOrderCount()) : null, modal: 'orders' as ModalType },
    { icon: 'heart-outline', label: 'Favourites', badge: getFavoriteCount() > 0 ? String(getFavoriteCount()) : null, modal: 'favorites' as ModalType },
    { icon: 'location-outline', label: 'Delivery Addresses', badge: null, modal: 'addresses' as ModalType },
    { icon: 'card-outline', label: 'Payment Methods', badge: null, modal: 'payments' as ModalType },
    { icon: 'notifications-outline', label: 'Notifications', badge: String(notifications.length), modal: 'notifications' as ModalType },
    { icon: 'help-circle-outline', label: 'Help & Support', badge: null, modal: 'help' as ModalType },
  ];

  const openEditProfile = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setActiveModal('editProfile');
  };

  const saveProfile = () => {
    if (editName.trim()) setUserName(editName.trim());
    if (editEmail.trim()) setUserEmail(editEmail.trim());
    setActiveModal(null);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => Alert.alert('Logged Out', 'You have been logged out.') },
    ]);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed': return Colors.primary;
      case 'Preparing': return '#F59E0B';
      case 'On the way': return '#3B82F6';
      case 'Delivered': return Colors.success;
      default: return Colors.textSecondary;
    }
  };

  const renderModalHeader = (title: string) => (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>{title}</Text>
      <TouchableOpacity onPress={() => setActiveModal(null)} style={styles.modalClose}>
        <Ionicons name="close" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditProfile}>
            <Ionicons name="pencil" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getOrderCount()}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getFavoriteCount()}</Text>
            <Text style={styles.statLabel}>Favourites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{savedAddresses.length}</Text>
            <Text style={styles.statLabel}>Addresses</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItemsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => setActiveModal(item.modal)}
            >
              <Ionicons name={item.icon as any} size={22} color={Colors.text} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Order History Modal */}
      <Modal visible={activeModal === 'orders'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Order History')}
          {orders.length === 0 ? (
            <View style={styles.modalEmpty}>
              <Text style={styles.modalEmptyIcon}>📦</Text>
              <Text style={styles.modalEmptyText}>No orders yet</Text>
              <Text style={styles.modalEmptySubtext}>Your order history will appear here</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.modalList}
              renderItem={({ item }) => (
                <View style={styles.orderCard}>
                  <View style={styles.orderCardHeader}>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.orderDate}>{item.date}</Text>
                  {item.items.map((ci) => (
                    <Text key={ci.menuItem.id} style={styles.orderItemText}>
                      {ci.quantity}x {ci.menuItem.name}
                    </Text>
                  ))}
                  <View style={styles.orderTotal}>
                    <Text style={styles.orderTotalLabel}>Total</Text>
                    <Text style={styles.orderTotalValue}>${item.grandTotal.toFixed(2)}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </Modal>

      {/* Favorites Modal */}
      <Modal visible={activeModal === 'favorites'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Favourites')}
          {favoriteRestaurants.length === 0 ? (
            <View style={styles.modalEmpty}>
              <Text style={styles.modalEmptyIcon}>❤️</Text>
              <Text style={styles.modalEmptyText}>No favourites yet</Text>
              <Text style={styles.modalEmptySubtext}>Tap the heart icon on restaurants to save them</Text>
            </View>
          ) : (
            <FlatList
              data={favoriteRestaurants}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.modalList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.favCard}
                  onPress={() => {
                    setActiveModal(null);
                    router.push(`/restaurant/${item.id}`);
                  }}
                >
                  <View style={styles.favInfo}>
                    <Text style={styles.favName}>{item.name}</Text>
                    <Text style={styles.favCuisine}>{item.cuisine} • {item.priceRange}</Text>
                    <View style={styles.favMeta}>
                      <Ionicons name="star" size={14} color={Colors.star} />
                      <Text style={styles.favRating}>{item.rating}</Text>
                      <Text style={styles.favDot}>•</Text>
                      <Text style={styles.favDelivery}>{item.deliveryTime}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Modal>

      {/* Addresses Modal */}
      <Modal visible={activeModal === 'addresses'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Delivery Addresses')}
          <FlatList
            data={savedAddresses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.modalList}
            renderItem={({ item }) => (
              <View style={styles.addressCard}>
                <View style={styles.addressIcon}>
                  <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressLabel}>{item.label}</Text>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.addNewButton}>
                <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
                <Text style={styles.addNewText}>Add New Address</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </Modal>

      {/* Payment Methods Modal */}
      <Modal visible={activeModal === 'payments'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Payment Methods')}
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.modalList}
            renderItem={({ item }) => (
              <View style={[styles.paymentCard, item.selected && styles.paymentCardSelected]}>
                <Ionicons name={item.icon as any} size={24} color={item.selected ? Colors.primary : Colors.text} />
                <Text style={[styles.paymentLabel, item.selected && styles.paymentLabelSelected]}>{item.label}</Text>
                {item.selected && <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />}
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.addNewButton}>
                <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
                <Text style={styles.addNewText}>Add Payment Method</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal visible={activeModal === 'notifications'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Notifications')}
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.modalList}
            renderItem={({ item }) => (
              <View style={styles.notifCard}>
                <View style={styles.notifContent}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifBody}>{item.body}</Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal visible={activeModal === 'help'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Help & Support')}
          <ScrollView contentContainerStyle={styles.modalList}>
            <Text style={styles.helpSectionTitle}>Frequently Asked Questions</Text>
            {helpItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.faqItem}
                onPress={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{item.q}</Text>
                  <Ionicons
                    name={expandedFaq === item.id ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.textLight}
                  />
                </View>
                {expandedFaq === item.id && (
                  <Text style={styles.faqAnswer}>{item.a}</Text>
                )}
              </TouchableOpacity>
            ))}
            <View style={styles.contactSection}>
              <Text style={styles.helpSectionTitle}>Need more help?</Text>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubbles-outline" size={20} color="#FFF" />
                <Text style={styles.contactButtonText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal visible={activeModal === 'editProfile'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {renderModalHeader('Edit Profile')}
          <View style={styles.modalList}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter your name"
              placeholderTextColor={Colors.textLight}
            />
            <Text style={[styles.inputLabel, { marginTop: Spacing.lg }]}>Email</Text>
            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Enter your email"
              placeholderTextColor={Colors.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  email: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  editButton: {
    padding: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  menuSection: {
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: Spacing.lg,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  menuBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  menuBadgeText: {
    color: '#FFF',
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.error,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  modalClose: {
    padding: Spacing.xs,
  },
  modalList: {
    padding: Spacing.lg,
  },
  modalEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  modalEmptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  modalEmptyText: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  modalEmptySubtext: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  // Order cards
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  orderNumber: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  orderDate: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  orderItemText: {
    fontSize: FontSize.md,
    color: Colors.text,
    paddingVertical: 2,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  orderTotalLabel: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  orderTotalValue: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  // Favorites
  favCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  favInfo: {
    flex: 1,
  },
  favName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  favCuisine: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  favMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 4,
  },
  favRating: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  favDot: {
    color: Colors.textLight,
    fontSize: FontSize.sm,
  },
  favDelivery: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  // Addresses
  addressCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  addressText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    borderStyle: 'dashed',
  },
  addNewText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  // Payments
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  paymentCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  paymentLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  paymentLabelSelected: {
    color: Colors.primary,
  },
  // Notifications
  notifCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notifContent: {},
  notifTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  notifBody: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 18,
  },
  notifTime: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: Spacing.sm,
  },
  // Help
  helpSectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  faqItem: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  faqAnswer: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    lineHeight: 20,
  },
  contactSection: {
    marginTop: Spacing.xl,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  // Edit Profile
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});
