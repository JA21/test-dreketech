import { IsNotEmpty, IsString } from "class-validator";


export class loginDto{

    @IsNotEmpty()
    @IsString()
    public readonly userName:string;

    @IsNotEmpty()
    @IsString()
    public readonly password:string;
}