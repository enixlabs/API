import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}

export default UpdatePostDto;
