import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x95d28e690ad49d928176d53ce3adacc82bb5623a',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
]

export default farms
