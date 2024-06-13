import { Request, Response } from 'express';
import Payment from '../models/payment';
import OrderService from './orderService';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
// const constants = require('gocardless-nodejs/constants');
// const GoCardlessClient = require('gocardless-nodejs');

// Initialize the GoCardless client once
const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
   process.env.GC_ACCESS_TOKEN || 'live_4tx1Mkbe9-2-_O4GECZpQPTcS8K9ycBvevkaboVF',
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

class PaymentService {
  
  async processPayment(paymentData: { userId: string, bookId: string, amount: number }) {
    
    try {
      const { userId, bookId, amount } = paymentData;
      const listResponse = await client.customers.list();
      const customers = listResponse.customers;
      console.log(customers);

      // Create a customer
      const customer = await client.customers.create({
        email: "user@example.com", 
        given_name: "Frank", 
        family_name: "Osborne", 
        address_line1: "27 Acer Road", 
        address_line2: "Apt 2", 
        city: "London", 
        postal_code: "E8 3GX", 
        country_code: "GB",
        metadata: {
          salesforce_id: uuidv4()
        }
      });

      // Create a customer bank account
      const customerBankAccount = await client.customerBankAccounts.create({
        account_number: "55779911", 
        branch_code: "200000", 
        account_holder_name: "Frank Osborne", 
        country_code: "GB",
        links: {
          customer: customer.id 
        }
      });

      // Create a mandate
      const mandate = await client.mandates.create({
        scheme: "bacs",
        metadata: {
          contract: uuidv4()
        },
        links: {
          customer_bank_account: customerBankAccount.id, 
          creditor: "CR123" 
        }
      });

      // Create a payment using GoCardless client
      const payment = await client.payments.create({
        amount: amount * 100, 
        currency: "GBP",
        charge_date: new Date().toISOString().split('T')[0], 
        reference: "BOOKSTORE_PAYMENT", 
        metadata: {
          order_dispatch_date: new Date().toISOString().split('T')[0] 
        },
        links: {
          mandate: mandate.id 
        }
      });


      const paymentRecord = await Payment.create({
        userId,
        bookId,
        amount,
        status: payment.status,
      });

      // Create an order if payment is successful
      if (payment.status === 'pending_submission' || payment.status === 'submitted') {
        await OrderService.createOrder({
          userId,
          bookId,
          amount,
          status: 'completed',
        });
      }

      return paymentRecord;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Payment processing failed');
    }
  }

  async listPayments() {
    try {
      // List payments using GoCardless client
      const payments = await client.payments.list({
        limit: 3,
        created_at: {
          gt: '2020-01-01T17:01:06.000Z',
        },
      });

      return payments;
    } catch (error) {
      console.error('Error listing payments:', error);
      throw new Error('Failed to list payments');
    }
  }

  async getPayment(paymentId: string) {
    try {
      // Get payment details using GoCardless client
      const payment = await client.payments.find(paymentId);
      return payment;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw new Error('Failed to fetch payment');
    }
  }

  async updatePayment(paymentId: string, updateData: { amount: number }) {
    try {
      // Update payment using GoCardless client
      const updatedPayment = await client.payments.update(paymentId, updateData);
      return updatedPayment;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw new Error('Failed to update payment');
    }
  }

  async cancelPayment(paymentId: string) {
    try {
      // Cancel payment using GoCardless client
      await client.payments.cancel(paymentId);
      return 'Payment cancelled successfully';
    } catch (error) {
      console.error('Error cancelling payment:', error);
      throw new Error('Failed to cancel payment');
    }
  }
}

export default new PaymentService();
