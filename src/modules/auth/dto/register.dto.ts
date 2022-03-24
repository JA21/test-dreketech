import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class registerDto{


    @IsNotEmpty()
    @IsString()
    public readonly userName:String;

    @IsNotEmpty()
    @IsString()
    public readonly password:String;

    
    @IsNotEmpty()
    @IsEmail()
    public readonly email:String;
}