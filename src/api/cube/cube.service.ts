import { Injectable } from '@nestjs/common';
import { MetaChain } from './chain/metaChain';
import { WalletPool } from './pool/walletPool';
import { CubeWallet } from './wallet/cubeWallet';
import { TransactionPool } from './pool/transactionPool';

@Injectable()
export class CubeService {
  metaChain = new MetaChain();
  transactionPool = new TransactionPool([]);
  walletPool = new WalletPool([]);

  constructor() {}

  async serverHealthCheck(): Promise<string> {
    if (this.metaChain) {
      return 'server running ok';
    } else {
      return 'server not running';
    }
  }

  async blockStatus(): Promise<string> {
    return JSON.stringify(this.metaChain.chain);
  }

  async transactionsStatus(): Promise<string> {
    return JSON.stringify(this.transactionPool.transactions);
  }

  async createTransaction(): Promise<string> {
    const wallet = this.walletPool.wallets[0]; // to remove
    const transaction = wallet.createTransaction(
      'to',
      1,
      'type',
      this.metaChain,
      this.transactionPool,
    );
    return JSON.stringify(transaction);
  }

  async getWallet(): Promise<string> {
    const wallet = this.walletPool.wallets[0]; // to remove
    return JSON.stringify(wallet);
  }

  async getWalletsPool(): Promise<string> {
    return JSON.stringify(this.walletPool.wallets);
  }

  async mineBlock(): Promise<string> {
    const block = this.metaChain.mineBlock(this.transactionPool.transactions);
    this.transactionPool.clear();
    return JSON.stringify(block);
  }

  async createWallet(user: CubeWallet) {
    const cubeWallet = new CubeWallet(user);
    this.walletPool.addWallet(cubeWallet);
    return cubeWallet;
  }
}
