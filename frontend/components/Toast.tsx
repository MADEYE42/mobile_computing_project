import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onHide: () => void;
};

export const Toast = ({ message, type, onHide }: ToastProps) => {
  const translateY = new Animated.Value(-100);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();

    const timer = setTimeout(() => {
      Animated.spring(translateY, {
        toValue: -100,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start(() => onHide());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'error' ? styles.errorContainer : styles.successContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 12,
    borderRadius: 8,
    minWidth: width * 0.4,
    maxWidth: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  errorContainer: {
    backgroundColor: '#ff3333',
  },
  successContainer: {
    backgroundColor: '#4CAF50',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 