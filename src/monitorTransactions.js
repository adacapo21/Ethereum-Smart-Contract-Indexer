import ethers from 'ethers';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ABI = require('../chillizABI.json');
import { config } from 'dotenv';
import * as transactionService from './services/transactionService.js';
config();

async function monitorTransactions() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const provider = new ethers.providers.WebSocketProvider(
        `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`
    );

    const contract = new ethers.Contract(contractAddress, ABI, provider);
    try {
        contract.on('Transfer', async (from, to, value, event) => {
            let infoData = {
                from: from,
                to: to,
                value: ethers.utils.formatUnits(value, 6),
                data: event
            }
            if (infoData) {
                await transactionService.storeTransactionService(infoData);
            }
        })
    } catch (err) {
        console.log('An error occurred during monitoring of ETH contract', err)
    }
}

export default monitorTransactions();