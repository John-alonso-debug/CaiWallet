/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 15:06:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Balances/SendModal/screens/SendCollectible/TokenSelectField/index.tsx
 */
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { selectStyles, selectedTokenStyles } from './style'

import Field from 'src/components/forms/Field'
import SelectField from 'src/components/forms/SelectField'
import { required } from 'src/components/forms/validator'
import Img from 'src/components/layout/Img'
import Paragraph from 'src/components/layout/Paragraph'
import { formatAmount } from 'src/logic/tokens/utils/formatAmount'
import { setImageToPlaceholder } from 'src/routes/safe/components/Balances/utils'
import { textShortener } from 'src/utils/strings'
import { NFTAssets } from 'src/logic/collectibles/sources/collectibles.d'

const useSelectedTokenStyles = makeStyles(selectedTokenStyles)

type SelectedTokenProps = {
  assetAddress?: string
  assets: NFTAssets
}

const SelectedToken = ({ assetAddress, assets }: SelectedTokenProps): React.ReactElement => {
  const classes = useSelectedTokenStyles()
  const asset = assetAddress ? assets[assetAddress] : null
  const shortener = textShortener({ charsStart: 40, charsEnd: 0 })

  return (
    <MenuItem className={classes.container}>
      {asset && asset.numberOfTokens ? (
        <>
          <ListItemIcon className={classes.tokenImage}>
            <Img alt={asset.name} height={28} onError={setImageToPlaceholder} src={asset.image} />
          </ListItemIcon>
          <ListItemText
            className={classes.tokenData}
            primary={shortener(asset.name)}
            secondary={`${formatAmount(asset.numberOfTokens.toString())} ${asset.symbol}`}
          />
        </>
      ) : (
        <Paragraph color="disabled" size="md" style={{ opacity: 0.5 }} weight="light">
          ????????????*
        </Paragraph>
      )}
    </MenuItem>
  )
}

const useTokenSelectFieldStyles = makeStyles(selectStyles)

type TokenSelectFieldProps = {
  assets: NFTAssets
  initialValue?: string
}

const TokenSelectField = ({ assets, initialValue }: TokenSelectFieldProps): React.ReactElement => {
  const classes = useTokenSelectFieldStyles()
  const assetsAddresses = Object.keys(assets)

  return (
    <Field
      className={classes.selectMenu}
      component={SelectField}
      disabled={!assetsAddresses.length}
      initialValue={initialValue}
      name="assetAddress"
      renderValue={(assetAddress) => <SelectedToken assetAddress={assetAddress} assets={assets} />}
      validate={required}
    >
      {assetsAddresses.map((assetAddress) => {
        const asset = assets[assetAddress]

        return (
          <MenuItem key={asset.slug} value={assetAddress}>
            <ListItemIcon className={classes.tokenImage}>
              <Img alt={asset.name} height={28} onError={setImageToPlaceholder} src={asset.image} />
            </ListItemIcon>
            <ListItemText
              primary={asset.name}
              secondary={`Count: ${formatAmount(asset.numberOfTokens.toString())} ${asset.symbol}`}
            />
          </MenuItem>
        )
      })}
    </Field>
  )
}

export default TokenSelectField
