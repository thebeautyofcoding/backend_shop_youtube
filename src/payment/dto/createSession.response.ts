import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateSessionResponseDto {
  @Field()
  url: string;
}
