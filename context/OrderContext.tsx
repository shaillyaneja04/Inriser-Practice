import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  grandTotal: number;
  date: string;
  status: 'Confirmed' | 'Preparing' | 'On the way' | 'Delivered';
  orderNumber: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], totalAmount: number, deliveryFee: number) => Order;
  getOrderCount: () => number;
  getLatestOrder: () => Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], totalAmount: number, deliveryFee: number): Order => {
    const order: Order = {
      id: Date.now().toString(),
      items: [...items],
      totalAmount,
      deliveryFee,
      grandTotal: totalAmount + deliveryFee,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Confirmed',
      orderNumber: `#${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrderCount = () => orders.length;

  const getLatestOrder = () => (orders.length > 0 ? orders[0] : null);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderCount, getLatestOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
