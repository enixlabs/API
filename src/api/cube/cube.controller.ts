import { Controller, Get, Post } from '@nestjs/common';
import { CubeService } from './cube.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../api/auth/interfaces/auth.interface';

@ApiTags('BaaS: MetaCube API')
@Controller('cube')
export class CubeController {
  constructor(private readonly cubeService: CubeService) {}

  @Public()
  @Get('healthCheck')
  @ApiOperation({ summary: 'Check if servers are online' })
  async serverHealthCheck(): Promise<string> {
    return this.cubeService.serverHealthCheck();
  }

  @Public()
  @Get('blockStatus')
  @ApiOperation({ summary: 'Shows all transactions' })
  async blocksStatus(): Promise<string> {
    return this.cubeService.blockStatus();
  }

  @Get('transactionStatus')
  @ApiOperation({ summary: 'Shows account transactions' })
  async transactionsStatus(): Promise<string> {
    return this.cubeService.transactionsStatus();
  }

  @Get('wallet')
  @ApiOperation({ summary: 'Account wallet, token protected' })
  async getWallet(): Promise<string> {
    return this.cubeService.getWallet();
  }

  // @Post('transaction')
  // async createTransaction(): Promise<string> {
  //   return this.cubeService.createTransaction();
  // }

  // @Post('newWallet')
  // async createWallet(@Body() user: User): Promise<string> {
  //   return this.cubeService.createWallet(user);
  // }

  @Post('mine')
  @ApiOperation({ summary: 'Build a new Cube, using simple interaction' })
  async mineBlock(): Promise<string> {
    return this.cubeService.mineBlock();
  }
}
