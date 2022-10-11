import { HardhatUserConfig } from 'hardhat/config'
// import '@nomicfoundation/hardhat-toolbox'

import '@matterlabs/hardhat-zksync-deploy'
import '@matterlabs/hardhat-zksync-solc'

const config: HardhatUserConfig = {
  zksolc: {
    version: '1.2.0',
    compilerSource: 'docker',
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: 'matterlabs/zksolc',
        tag: 'v1.2.0',
      },
    },
  },
  zkSyncDeploy: {
    // Live testnet
    zkSyncNetwork: 'https://zksync2-testnet.zksync.dev',
    // Staging testnet
    // zkSyncNetwork: 'https://z2-dev-api.zksync.dev',

    ethNetwork: 'goerli', // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
  },
  networks: {
    hardhat: {
      zksync: true,
    },
  },
  solidity: '0.8.17',
}

export default config
