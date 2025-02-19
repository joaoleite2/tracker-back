import { IsInt, IsString } from "class-validator";

export class CreateTrackerTypeDto {
  @IsString()
  name:string;

  @IsInt()
  folderId:number;
}
