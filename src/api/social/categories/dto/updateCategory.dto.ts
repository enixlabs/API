import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export default UpdateCategoryDto;
