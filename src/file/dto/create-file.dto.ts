import { IsInt, IsString } from "class-validator";

export class CreateFileDto {
  @IsString()
  name:string;

  @IsInt()
  folderId:number;
}
