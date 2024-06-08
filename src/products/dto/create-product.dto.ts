export class CreateProductDto {
  readonly title: string;
  readonly description: string;
  readonly quantity: number;
  readonly unit: string;
  readonly user?: number;
}