import { useTranslation } from '@pancakeswap/localization'
import {
  Button,
  ButtonProps,
  MetamaskIcon,
  TrustWalletIcon,
  CoinbaseWalletIcon,
  TokenPocketIcon,
  OperaIcon,
  BinanceChainIcon,
} from '@pancakeswap/uikit'
import { BAD_SRCS } from 'components/Logo/Logo'
import { useAccount } from 'wagmi'

export enum AddToWalletTextOptions {
  NO_TEXT,
  TEXT,
  TEXT_WITH_ASSET,
}

export interface AddToWalletButtonProps {
  tokenAddress: string
  tokenSymbol: string
  tokenDecimals: number
  tokenLogo: string
  textOptions?: AddToWalletTextOptions
  marginTextBetweenLogo?: string
}

const Icons = {
  // TODO: Brave
  Binance: BinanceChainIcon,
  'Coinbase Wallet': CoinbaseWalletIcon,
  Opera: OperaIcon,
  TokenPocket: TokenPocketIcon,
  'Trust Wallet': TrustWalletIcon,
  MetaMask: MetamaskIcon,
}

const getWalletIcon = (marginTextBetweenLogo: string, name?: string) => {
  const iconProps = {
    width: '16px',
    ...(marginTextBetweenLogo && { ml: marginTextBetweenLogo }),
  }
  if (name && Icons[name]) {
    const Icon = Icons[name]
    return <Icon {...iconProps} />
  }
  // @ts-ignore
  if (window?.ethereum?.isTrust && !window?.ethereum?.isSafePal) {
    return <TrustWalletIcon {...iconProps} />
  }
  if (window?.ethereum?.isCoinbaseWallet) {
    return <CoinbaseWalletIcon {...iconProps} />
  }
  if (window?.ethereum?.isTokenPocket) {
    return <TokenPocketIcon {...iconProps} />
  }
  if (window?.ethereum?.isMetaMask) {
    return <MetamaskIcon {...iconProps} />
  }
  return <MetamaskIcon {...iconProps} />
}

const AddToWalletButton: React.FC<AddToWalletButtonProps & ButtonProps> = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenLogo,
  textOptions = AddToWalletTextOptions.NO_TEXT,
  marginTextBetweenLogo = '0px',
  ...props
}) => {
  const { t } = useTranslation()
  const { connector, isConnected } = useAccount()

  if (!(connector && connector.watchAsset && isConnected)) return null
  return (
    <Button
      {...props}
      onClick={() => {
        const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined
        connector.watchAsset?.({
          address: tokenAddress,
          symbol: tokenSymbol,
          image,
          // @ts-ignore
          decimals: tokenDecimals,
        })
      }}
    >
      {textOptions !== AddToWalletTextOptions.NO_TEXT &&
        (textOptions === AddToWalletTextOptions.TEXT
          ? t('Add to Wallet')
          : t('Add %asset% to Wallet', { asset: tokenSymbol }))}
      {getWalletIcon(marginTextBetweenLogo, connector?.name)}
    </Button>
  )
}

export default AddToWalletButton