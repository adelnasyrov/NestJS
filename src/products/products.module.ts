import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";

@Module({
  providers: [ProductsService, UsersService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, User])],
})
export class ProductsModule {
}