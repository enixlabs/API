import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './interfaces/auth.interface';
import RequestWithUser from './interfaces/requestWithUser.interface';

@ApiTags('Authentication & Verification')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginData: LoginDto, @Req() request: RequestWithUser) {
    const { token, user } = await this.authService.login(loginData);
    request.res.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(token),
    );
    return user;
  }

  @Public()
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }

  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
