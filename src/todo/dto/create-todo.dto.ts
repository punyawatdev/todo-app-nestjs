import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, example: '2 liters, Whole milk' })
  @IsOptional()
  @IsString()
  description?: string;
}
