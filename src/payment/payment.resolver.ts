import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { CreateSessionResponseDto } from './dto/createSession.response';
import { CreateSessionInput } from './dto/createSession.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreateSessionResponseDto)
  createCheckoutSession(
    @Args({ name: 'items', type: () => [CreateSessionInput] })
    createPaymentInput: CreateSessionInput[],
  ) {
    return this.paymentService.createCheckoutSession(createPaymentInput);
  }
}
