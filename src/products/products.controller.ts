import { Body, Controller, Get, Post, Headers, Delete, Param, Patch, BadRequestException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { UpdateProductQuantityDto } from "./dto/update-product-quantity.dto";

@Controller("products")
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @Post()
  async create(@Body() productDto: CreateProductDto, @Headers('user') userId: number) {
    if (!userId) {
      throw new BadRequestException('User ID is required in the header');
    }
    return this.productsService.createProduct(productDto, userId);
  }


  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.deleteProductById(id);
  }

  @Patch('decrease/:id')
  decreaseQuantity(@Param('id') id: number, @Body() updateProductQuantityDto: UpdateProductQuantityDto) {
    return this.productsService.decreaseProductQuantity(id, updateProductQuantityDto.quantity);
  }

  @Patch('increase/:id')
  increaseQuantity(@Param('id') id: number, @Body() updateProductQuantityDto: UpdateProductQuantityDto) {
    return this.productsService.increaseProductQuantity(id, updateProductQuantityDto.quantity);
  }

}
