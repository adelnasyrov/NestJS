import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, private readonly usersService: UsersService) {

  }

  async createProduct(dto: CreateProductDto, userId: number): Promise<Product> {
    const userExists = await this.usersService.userExists(userId);
    if (!userExists) {
      throw new UnauthorizedException("User not verified");
    }
    const product = this.productRepository.create({ ...dto, user: userId });
    await this.productRepository.save(product);
    return product;
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async deleteProductById(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    } else {
      await this.productRepository.delete(id);
    }
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
