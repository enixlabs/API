import { MetaBlock } from '../block/metaBlock';

interface MetaChainInterface {
  chain: any;
  addBlock(arg: any): any;
  isValidChain(arg: any): boolean;
  replaceChain(arg: any): any;
}

export class MetaChain implements MetaChainInterface {
  chain: any;

  constructor() {
    this.chain = [MetaBlock.genesis()];
  }

  addBlock(data: any) {
    const block = MetaBlock.createBlock(
      this.chain[this.chain.length - 1],
      data,
    );
    this.chain.push(block);

    return block;
  }

  isValidChain(chain: any) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(MetaBlock.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== MetaBlock.blockHash(block)
      )
        return false;
    }

    return true;
  }

  replaceChain(newChain: any) {
    if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than the current chain');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('Received chain is invalid');
      return;
    }

    console.log('Replacing the current chain with new chain');
    this.chain = newChain;
  }

  mineBlock(transactions: Array<any>) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = MetaBlock.createBlock(lastBlock, transactions);

    this.chain.push(block);

    return block;
  }
}
