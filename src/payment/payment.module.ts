import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  providers: [PaymentResolver, PaymentService, ConfigService, PrismaService],
})
export class PaymentModule {}
