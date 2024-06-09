import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({message: "The product needs to have a title"})
  readonly title: string;
  @IsNotEmpty({message: "The product needs to have a description"})
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0, {message: "The product needs to have a minimum number of products"})
  readonly quantity: number;
  @IsNotEmpty({message: "The product needs to have a unit of measure"})
  readonly unit: string;
  readonly user?: number;
}