import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class createProductDto{


    @IsNotEmpty()
    @IsString()
    public readonly name:String;

    @IsNotEmpty()
    @IsString()
    public readonly brand:String;

    
    @IsNotEmpty()
    @IsNumber()
    public readonly amount:Number;

    @IsNotEmpty()
    @IsNumber()
    public readonly price:Number;

    @IsOptional()
    @IsString()
    public readonly description:String;
    
    @IsOptional()
    @IsString()
    public readonly image:String;
}