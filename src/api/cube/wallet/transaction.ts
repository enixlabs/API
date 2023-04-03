import { TRANSACTION_FEE } from '../config/wallet';
import { ChainUtil } from '../chain/chainUtils';

export class Transaction {
  id: number;
  type: any;
  input: any;
  output: any;

  constructor() {
    this.id = ChainUtil.id();
    this.type = null;
    this.input = null;
    this.output = null;
  }

  static newTransaction(
    senderWallet: any,
    to: string,
    amount: number,
    type: any,
  ) {
    if (amount + TRANSACTION_FEE > senderWallet.balance) {
      console.log('Not enough balance');
      return;
    }

    return Transaction.generateTransaction(senderWallet, to, amount, type);
  }

  static generateTransaction(
    senderWallet: any,
    to: string,
    amount: number,
    type: any,
  ) {
    const transaction = new this();

    transaction.type = type;
    transaction.output = {
      to: to,
      amount: amount - TRANSACTION_FEE,
      fee: TRANSACTION_FEE,
    };

    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction: any, senderWallet: any) {
    transaction.input = {
      timestamp: Date.now(),
      from: senderWallet.publicKey,
      signature: senderWallet.sign(0),
    };
  }

  static verifyTransaction(transaction: any) {
    return 0;
  }
}
