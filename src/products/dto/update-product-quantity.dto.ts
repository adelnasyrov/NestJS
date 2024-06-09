import { IsNumber, Min } from "class-validator";

export class UpdateProductQuantityDto {
  @IsNumber()
  @Min(1, {message: "The value of quantity needs to be changed"})
  readonly quantity: number;
}