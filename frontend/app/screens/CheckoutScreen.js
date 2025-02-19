import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CheckoutScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const steps = [
    { id: 1, title: 'Shipping' },
    { id: 2, title: 'Payment' },
    { id: 3, title: 'Review' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle order placement
      handlePlaceOrder();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic
    navigation.navigate('OrderConfirmation');
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <View style={[
            styles.stepCircle,
            currentStep >= step.id && styles.activeStep
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step.id && styles.activeStepNumber
            ]}>
              {step.id}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              currentStep > step.id && styles.activeStepLine
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderShippingForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Shipping Information</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChangeText={(text) => setShippingInfo({...shippingInfo, fullName: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
          />
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({...shippingInfo, state: text})}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={shippingInfo.zipCode}
            onChangeText={(text) => setShippingInfo({...shippingInfo, zipCode: text})}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );

  const renderPaymentForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'card' && styles.selectedPayment
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <Ionicons name="card-outline" size={24} color={paymentMethod === 'card' ? '#6200ee' : '#666'} />
          <Text style={[
            styles.paymentText,
            paymentMethod === 'card' && styles.selectedPaymentText
          ]}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'paypal' && styles.selectedPayment
          ]}
          onPress={() => setPaymentMethod('paypal')}
        >
          <Ionicons name="logo-paypal" size={24} color={paymentMethod === 'paypal' ? '#6200ee' : '#666'} />
          <Text style={[
            styles.paymentText,
            paymentMethod === 'paypal' && styles.selectedPaymentText
          ]}>PayPal</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'card' && (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardInfo.number}
              onChangeText={(text) => setCardInfo({...cardInfo, number: text})}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChangeText={(text) => setCardInfo({...cardInfo, expiry: text})}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cardInfo.cvv}
                onChangeText={(text) => setCardInfo({...cardInfo, cvv: text})}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Name on Card"
              value={cardInfo.name}
              onChangeText={(text) => setCardInfo({...cardInfo, name: text})}
            />
          </View>
        </>
      )}
    </View>
  );

  const renderOrderReview = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>$399.98</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>$10.00</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Tax</Text>
        <Text style={styles.summaryValue}>$39.99</Text>
      </View>
      <View style={[styles.summaryItem, styles.totalItem]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>$449.97</Text>
      </View>

      <View style={styles.shippingPreview}>
        <Text style={styles.previewTitle}>Shipping to:</Text>
        <Text style={styles.previewText}>{shippingInfo.fullName}</Text>
        <Text style={styles.previewText}>{shippingInfo.address}</Text>
        <Text style={styles.previewText}>
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
        </Text>
      </View>

      <View style={styles.paymentPreview}>
        <Text style={styles.previewTitle}>Payment method:</Text>
        <View style={styles.paymentPreviewContent}>
          <Ionicons 
            name={paymentMethod === 'card' ? 'card-outline' : 'logo-paypal'} 
            size={24} 
            color="#666" 
          />
          <Text style={styles.previewText}>
            {paymentMethod === 'card' ? 
              `Card ending in ${cardInfo.number.slice(-4)}` : 
              'PayPal'
            }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content}>
        {currentStep === 1 && renderShippingForm()}
        {currentStep === 2 && renderPaymentForm()}
        {currentStep === 3 && renderOrderReview()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <LinearGradient
            colors={['#6200ee', '#9747FF']}
            style={styles.gradient}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? 'Place Order' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeStep: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  stepNumber: {
    color: '#666',
    fontWeight: '600',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  activeStepLine: {
    backgroundColor: '#6200ee',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedPayment: {
    borderColor: '#6200ee',
    backgroundColor: '#f8f4ff',
  },
  paymentText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  selectedPaymentText: {
    color: '#6200ee',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#666',
    fontSize: 16,
  },
  summaryValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  totalItem: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  shippingPreview: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  paymentPreview: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  paymentPreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 