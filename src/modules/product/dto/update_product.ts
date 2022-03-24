import {   IsNumber, IsOptional, IsString } from "class-validator";


export class updateProductDto{


    @IsOptional()
    @IsString()
    public readonly name:String;

    @IsOptional()
    @IsString()
    public readonly brand:String;

    
    @IsOptional()
    @IsNumber()
    public readonly amount:Number;

    @IsOptional()
    @IsNumber()
    public readonly price:Number;

    @IsOptional()
    @IsString()
    public readonly description:String;

    @IsOptional()
    @IsString()
    public readonly image:String;
}