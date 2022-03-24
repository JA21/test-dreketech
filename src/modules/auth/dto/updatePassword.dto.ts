import { IsNotEmpty, IsString } from "class-validator";


export class updatePasswordDto{

    @IsNotEmpty()
    @IsString()
    public readonly userName:String;

    @IsNotEmpty()
    @IsString()
    public readonly password:String;
}