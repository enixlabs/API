import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class CreateUpdateDto extends PartialType(CreateUserDto) {}
