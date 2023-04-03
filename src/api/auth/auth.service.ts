import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../services/mail.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PGErrorCode } from './error/PGErrorCode.enum';
import TokenPayload from './interfaces/tokenPayload.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private token = new Map<string, string>();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private nodeMailer: MailService,
    private configService: ConfigService,
  ) {}

  // ######################################
  // User Registration
  // ######################################
  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PGErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(login: LoginDto) {
    const user = await this.getAuthenticatedUser(login.email, login.password);
    const token = this.jwtService.sign({ id: user.id });
    this.token.set(user.id, token);
    return {
      token,
      user,
    };
  }

  // ######################################
  // JWT Token
  // ######################################
  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  // ######################################
  // JWT Logout
  // ######################################
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  // ######################################
  // Authenticated User
  // ######################################
  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ######################################
  // Password Verification
  // ######################################
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
