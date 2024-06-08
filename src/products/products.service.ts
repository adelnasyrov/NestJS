import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {

  }

  async createProduct(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    await this.productRepository.save(product);
    return product;
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async deleteProductById(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async decreaseProductQuantity(id: number, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    product.quantity -= quantity;
    await this.productRepository.save(product);
    return product;
  }

  async increaseProductQuantity(id: number, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    product.quantity += quantity;
    await this.productRepository.save(product);
    return product;
  }
}
