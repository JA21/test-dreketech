import {
    Controller,
    Post,
    HttpStatus,
    Body,
    Put,
    Get,
    Param,
    Delete,
} from '@nestjs/common';
import { ok } from 'assert';

import { ProductService } from './product.service';
import { createProductDto, updateProductDto } from './dto';


@Controller('product')
export class ProductController {
    constructor(
        private readonly service: ProductService,

    ) { }

    @Get('')
    public async GetProducts() {
        const res = await this.service.getProduct();
        if (res) {
            return res;
        } else {
            return { status: HttpStatus.UNAUTHORIZED }
        }

    }
    @Get('/:name')
    public async GetProductsName(@Param('name') name: String) {
        const res = await this.service.getProductName(name);
        if (res) {
            return res;
        } else {
            return { status: HttpStatus.UNAUTHORIZED }
        }

    }

    @Post('create')
    public async CreateProduct(@Body() create: createProductDto) {
        const create_product = await this.service.CreateProduc(create);
        return create_product;
    }

    @Put('/:id/update')
    public async UpdateProduct(@Param('id') id: number, @Body() update: updateProductDto) {
        console.log(id)
        const update_product = await this.service.updateProduct(id, update);
       /*  if (update_product) {
            return {
                detail: 'PRODUCT_UPDATE',
                message: 'producto actualizado'
            }
        } else {
            return { status: HttpStatus.UNAUTHORIZED }
        } */

        return update_product;
    }

    @Delete('delete/:id')
    public async DeleteProduct(@Param('id') id: number) {
        const delete_product = await this.service.deleteProduct(id);
        if (delete_product) {
            return {
                detail: 'PRODUCT_ELIMINATED',
                message: 'producto eliminado'
            }
        } else {
            return { status: HttpStatus.UNAUTHORIZED }
        }
    }
}
