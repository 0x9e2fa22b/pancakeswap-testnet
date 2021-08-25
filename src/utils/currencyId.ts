import { Currency, ETHER, Token } from '@huyc197/pancakeswap-sdk-testnet'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'BNB'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
