import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;
  @Field()
  description: string;
  @Field()
  price: number;
  @Field(() => Int, { defaultValue: 0 })
  quantity?: number;

  @Field()
  name: string;

  @Field()
  image: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
