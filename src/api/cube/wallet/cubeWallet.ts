import { INITIAL_BALANCE } from '../config/wallet';
import { ChainUtil } from '../chain/chainUtils';
import { Transaction } from './transaction';

const EDDSA = require('elliptic').eddsa;

export interface CubeWalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;
  secret: any;
  toString(): string;
  sign(arg: any): any;
  createTransaction(
    to: string,
    amount: number,
    type: any,
    blockchain: any,
    transactionPool: any,
  ): any;
}

export class CubeWallet implements CubeWalletInterface {
  balance: number;
  keyPair: any;
  publicKey: string;
  privateKey: string;
  secret: any;

  constructor(secret: any) {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic('hex');
    this.privateKey = this.keyPair.getSecret('hex');
    this.secret = secret;
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}`;
  }

  sign(dataHash: any) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(
    to: string,
    amount: number,
    type: any,
    blockchain: any,
    transactionPool: any,
  ) {
    const transaction = Transaction.newTransaction(this, to, amount, type);
    transactionPool.addTransaction(transaction);
    return transaction;
  }
}
