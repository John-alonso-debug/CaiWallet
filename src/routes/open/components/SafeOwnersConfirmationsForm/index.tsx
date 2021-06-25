import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { Icon, Link, Text } from '@gnosis.pm/safe-react-components'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircle from '@material-ui/icons/CheckCircle'
import * as React from 'react'
import styled from 'styled-components'

import { styles } from './style'
import ButtonHelper from 'src/components/ButtonHelper'
import { padOwnerIndex } from 'src/routes/open/utils/padOwnerIndex'
import { ScanQRModal } from 'src/components/ScanQRModal'
import OpenPaper from 'src/components/Stepper/OpenPaper'
import AddressInput from 'src/components/forms/AddressInput'
import Field from 'src/components/forms/Field'
import SelectField from 'src/components/forms/SelectField'
import TextField from 'src/components/forms/TextField'
import {
  composeValidators,
  minValue,
  mustBeInteger,
  noErrorsOn,
  required,
  minMaxLength,
  ADDRESS_REPEATED_ERROR,
} from 'src/components/forms/validator'
import Block from 'src/components/layout/Block'
import Button from 'src/components/layout/Button'
import Col from 'src/components/layout/Col'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import {
  FIELD_CONFIRMATIONS,
  getNumOwnersFrom,
  getOwnerAddressBy,
  getOwnerNameBy,
} from 'src/routes/open/components/fields'
import { getAccountsFrom } from 'src/routes/open/utils/safeDataExtractor'
import { useSelector } from 'react-redux'
import { currentNetworkAddressBook } from 'src/logic/addressBook/store/selectors'
import { sameAddress } from 'src/logic/wallets/ethAddresses'

const { useState } = React

export const ADD_OWNER_BUTTON = '+ Add another owner'

const StyledAddressInput = styled(AddressInput)`
  width: 460px;
`

/**
 * Validates the whole OwnersForm, specially checks for non-repeated addresses
 *
 * If finds a repeated address, marks it as invalid
 * @param {Object<string, string>} values
 * @return Object<string, string>
 */
export const validateOwnersForm = (values: Record<string, string>): Record<string, string> => {
  const { errors } = Object.keys(values).reduce(
    (result, key) => {
      if (/owner\d+Address/.test(key)) {
        const address = values[key].toLowerCase()

        if (result.addresses.includes(address)) {
          result.errors[key] = ADDRESS_REPEATED_ERROR
        }

        result.addresses.push(address)
      }
      return result
    },
    { addresses: [] as string[], errors: {} },
  )
  return errors
}

export const calculateValuesAfterRemoving = (index: number, values: Record<string, string>): Record<string, string> =>
  Object.keys(values)
    .sort()
    .reduce((newValues, key) => {
      const ownerRelatedField = /owner(\d+)(Name|Address)/

      if (!ownerRelatedField.test(key)) {
        // no owner-related field
        newValues[key] = values[key]
        return newValues
      }

      const ownerToRemove = new RegExp(`owner${padOwnerIndex(index)}(Name|Address)`)

      if (ownerToRemove.test(key)) {
        // skip, doing anything with the removed field
        return newValues
      }

      // we only have the owner-related fields to work with
      // we must reduce the index value for those owners that come after the deleted owner row
      const [, ownerOrder, ownerField] = key.match(ownerRelatedField) as RegExpMatchArray

      if (Number(ownerOrder) > index) {
        // reduce by one the order of the owner
        newValues[`owner${padOwnerIndex(Number(ownerOrder) - 1)}${ownerField}`] = values[key]
      } else {
        // previous owners to the deleted row
        newValues[key] = values[key]
      }

      return newValues
    }, {} as Record<string, string>)

const useStyles = makeStyles(styles)

const SafeOwnersForm = (props): React.ReactElement => {
  const { errors, form, values } = props
  const classes = useStyles()

  const validOwners = getNumOwnersFrom(values)
  const addressBook = useSelector(currentNetworkAddressBook)

  const [numOwners, setNumOwners] = useState(validOwners)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [scanQrForOwnerName, setScanQrForOwnerName] = useState(null)

  const openQrModal = (ownerName) => {
    setScanQrForOwnerName(ownerName)
    setQrModalOpen(true)
  }

  const closeQrModal = () => {
    setQrModalOpen(false)
  }

  const onRemoveRow = (index) => () => {
    const initialValues = calculateValuesAfterRemoving(index, values)
    form.reset(initialValues)

    setNumOwners(numOwners - 1)
  }

  const onAddOwner = () => {
    setNumOwners(numOwners + 1)
  }

  const handleScan = (value: string | null) => {
    let scannedAddress = value

    if (scannedAddress?.startsWith('ethereum:')) {
      scannedAddress = scannedAddress.replace('ethereum:', '')
    }

    form.mutators.setValue(scanQrForOwnerName, scannedAddress)
    closeQrModal()
  }

  return (
    <>
      <Block className={classes.title}>
        <Paragraph color="primary" noMargin size="lg" data-testid="create-safe-step-two">
            您的多签钱包将有一个或多个签名人。我们已经将您的连接钱包预设为第一位签名人，
            但是你可以自由地把它换到另一个签名人。
          <br />
          <br />
            添加其他签名人(如团队的钱包地址)，并指定执行交易需要的签名人数量。您还可以添加/删除签名人和修改签名阈值
          <Link
            href="https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
            title="Learn about which Safe setup to use"
          >
            <Text size="xl" as="span" color="primary">
              了解使用哪个设置
            </Text>
            <Icon size="sm" type="externalLink" color="primary" />
          </Link>
        </Paragraph>
      </Block>
      <Hairline />
      <Row className={classes.header}>
        <Col xs={3}>NAME</Col>
        <Col xs={7}>ADDRESS</Col>
      </Row>
      <Hairline />
      <Block margin="md" padding="md">
        {[...Array(Number(numOwners))].map((x, index) => {
          const addressName = getOwnerAddressBy(index)
          const ownerName = getOwnerNameBy(index)

          return (
            <Row className={classes.owner} key={`owner${index}`} data-testid={`create-safe-owner-row`}>
              <Col className={classes.ownerName} xs={3}>
                <Field
                  className={classes.name}
                  component={TextField}
                  name={ownerName}
                  placeholder="拥有者名称*"
                  text="拥有者名称"
                  type="text"
                  validate={composeValidators(required, minMaxLength(1, 50))}
                  testId={`create-safe-owner-name-field-${index}`}
                />
              </Col>
              <Col className={classes.ownerAddress} xs={7}>
                <StyledAddressInput
                  fieldMutator={(newOwnerAddress) => {
                    const newOwnerName = addressBook.find((entry) => sameAddress(entry.address, newOwnerAddress))?.name
                    form.mutators.setValue(addressName, newOwnerAddress)
                    if (newOwnerName) {
                      form.mutators.setValue(ownerName, newOwnerName)
                    }
                  }}
                  // eslint-disable-next-line
                  // @ts-ignore
                  inputAdornment={
                    noErrorsOn(addressName, errors) && {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckCircle className={classes.check} data-testid={`valid-address-${index}`} />
                        </InputAdornment>
                      ),
                    }
                  }
                  name={addressName}
                  placeholder="Owner Address*"
                  text="拥有者地址"
                  testId={`create-safe-address-field-${index}`}
                />
              </Col>
              <Col center="xs" className={classes.remove} middle="xs" xs={1}>
                <ButtonHelper onClick={() => openQrModal(addressName)}>
                  <Icon size="sm" type="qrCode" color="icon" tooltip="Scan QR" />
                </ButtonHelper>
              </Col>
              {index > 0 && (
                <Col center="xs" className={classes.remove} middle="xs" xs={1}>
                  <ButtonHelper onClick={onRemoveRow(index)}>
                    <Icon size="sm" type="delete" color="icon" tooltip="Delete" />
                  </ButtonHelper>
                </Col>
              )}
            </Row>
          )
        })}
      </Block>
      <Row align="center" className={classes.add} grow margin="xl">
        <Button color="secondary" data-testid="add-owner-btn" onClick={onAddOwner}>
          <Paragraph noMargin size="lg">
            {ADD_OWNER_BUTTON}
          </Paragraph>
        </Button>
      </Row>
      <Block className={classes.owner} margin="md" padding="md">
        <Paragraph color="primary" size="md">
          任何交易均须经过确认:
        </Paragraph>
        <Row align="center" className={classes.ownersAmount} margin="xl">
          <Col className={classes.ownersAmountItem} xs={1}>
            <Field
              component={SelectField}
              data-testid="threshold-select-input"
              name={FIELD_CONFIRMATIONS}
              validate={composeValidators(required, mustBeInteger, minValue(1))}
            >
              {[...Array(Number(validOwners))].map((x, index) => (
                <MenuItem key={`selectOwner${index}`} value={`${index + 1}`} data-testid={`input-${index + 1}`}>
                  {index + 1}
                </MenuItem>
              ))}
            </Field>
          </Col>
          <Col className={classes.ownersAmountItem} xs={10}>
            <Paragraph
              className={classes.owners}
              color="primary"
              noMargin
              size="lg"
              data-testid={`create-safe-req-conf-${validOwners}`}
            >
              - {validOwners} 签名人
            </Paragraph>
          </Col>
        </Row>
      </Block>
      {qrModalOpen && <ScanQRModal isOpen={qrModalOpen} onClose={closeQrModal} onScan={handleScan} />}
    </>
  )
}

export const SafeOwnersPage = () =>
  function OpenSafeOwnersPage(controls, { errors, form, values }) {
    return (
      <>
        <OpenPaper controls={controls} padding={false}>
          <SafeOwnersForm errors={errors} form={form} otherAccounts={getAccountsFrom(values)} values={values} />
        </OpenPaper>
      </>
    )
  }
