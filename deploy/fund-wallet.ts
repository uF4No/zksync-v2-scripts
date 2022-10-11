import { Wallet, Provider, utils } from 'zksync-web3'
import * as ethers from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { Deployer } from '@matterlabs/hardhat-zksync-deploy'

// load env file
import dotenv from 'dotenv'
dotenv.config()

const WALLET_PRIV_KEY = process.env.WALLET_PRIV_KEY || ''

if (!WALLET_PRIV_KEY) {
  throw new Error('Wallet private key not configured in env file')
}

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running script to fund wallet in L2`)

  // Initialize the wallet.
  const provider = new Provider(hre.userConfig.zkSyncDeploy?.zkSyncNetwork)
  const wallet = new Wallet(WALLET_PRIV_KEY)

  const AMOUNT = '0.05'

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet)

  // Deposit funds to L2
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: ethers.utils.parseEther(AMOUNT),
  })
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait()
}
