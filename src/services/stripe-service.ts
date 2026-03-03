
'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27-acacia' as any,
});

/**
 * Creates a Stripe Checkout Session for a startup investment reservation.
 * @param startupName The name of the startup being funded.
 * @param amount The reservation fee amount in USD.
 */
export async function createInvestmentCheckout(startupName: string, amount: number = 500) {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here') {
    throw new Error("Stripe is not configured. Please add STRIPE_SECRET_KEY to .env");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Investment Reservation: ${startupName}`,
              description: `Due diligence reservation fee for EchelonAI investment pool.`,
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${appUrl}/?status=cancelled`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error("Stripe Session Error:", error);
    throw new Error(error.message || "Failed to initiate transaction.");
  }
}
