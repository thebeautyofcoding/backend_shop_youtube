import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_PRIVATE'), {
      apiVersion: '2022-08-01',
    });
  }
  async createCheckoutSession(items: { id: number; quantity: number }[]) {
    const storedItems = await Promise.all(
      items.map(async (item) => {
        const storedItem = await this.prisma.product.findUnique({
          where: { id: item.id },
        });
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storedItem.name,
            },
            unit_amount: storedItem.price * 100,
          },
          quantity: item.quantity,
        };
      }),
    );
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: storedItems,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return { url: session.url };
  }
}
