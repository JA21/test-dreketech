import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';


import { createProductDto, updateProductDto } from './dto';
import { IProduct } from './interface/product.interface'


@Injectable()
export class ProductService {
    constructor(@InjectModel('Product')
    private readonly productModel: Model<IProduct>,
    ) { }

    public async CreateProduc(create: createProductDto) {
    
        try {
         
            const product = new this.productModel({
                _id: new Types.ObjectId,
                name: create.name,
                brand: create.brand,
                amount: create.amount,
                price: create.price,
                description: create.description,
                image:create.image
            });
            return await product.save();
            
            console.log(product, "producto1");
        } catch (exp) {
            return {
                error: 'PRODUCT_CREATED_FAIL',
                message: 'el producto no se ha podido crear'
            }
        }
    }
    public async updateProduct(id: number, update: updateProductDto) {
        const find: any = await this.productModel.findOne({ _id: id }).exec();
        console.log(find);
        if (find) {
            const update_product: any = await this.productModel.updateOne({ _id: id }, {
                name: update.name,
                brand: update.brand,
                amount: update.amount,
                price: update.price,
                description: update.description,
                image:update.image
            })
            return update_product;
        } else {
            return {
                error: 'PRODUCT_NOT_FOUND',
                message: 'producto no encontrado'
            }
        }
    }
    public async deleteProduct(id: number) {
        const find: any = await this.productModel.findOne({ _id: id }).exec();
        if (find) {
            const delete_product: any = await this.productModel.deleteOne({ _id: id })
            return delete_product;
        } else {
            return {
                error: 'PRODUCT_NOT_FOUND',
                message: 'producto no encontrado'
            }
        }
    }

    public async getProduct() {

        const find = await this.productModel.find({ }).exec();
        if (find) {
            return find;
        } else {
            return {
                error: 'PRODUCTS_NOT_FOUND',
                message: 'No se han encontrado productos'
            }
        }
    }
    public async getProductName(namep: String) {

        const find = await this.productModel.findOne({name:namep }).exec();
        if (find) {
            return find;
        } else {
            return {
                error: 'PRODUCT_NOT_FOUND',
                message: 'producto no encontrado'
            }
        }
    }

}