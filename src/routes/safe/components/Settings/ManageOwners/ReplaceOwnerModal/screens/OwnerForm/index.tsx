import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { Mutator } from 'final-form'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { OnChange } from 'react-final-form-listeners'

import AddressInput from 'src/components/forms/AddressInput'
import Field from 'src/components/forms/Field'
import GnoForm from 'src/components/forms/GnoForm'
import TextField from 'src/components/forms/TextField'
import {
  addressIsNotCurrentSafe,
  composeValidators,
  required,
  uniqueAddress,
  validAddressBookName,
} from 'src/components/forms/validator'
import Block from 'src/components/layout/Block'
import Col from 'src/components/layout/Col'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { ScanQRWrapper } from 'src/components/ScanQRModal/ScanQRWrapper'
import { Modal } from 'src/components/Modal'
import { currentSafe } from 'src/logic/safe/store/selectors'
import { currentNetworkAddressBookAsMap } from 'src/logic/addressBook/store/selectors'
import { OwnerData } from 'src/routes/safe/components/Settings/ManageOwners/dataFetcher'
import { isValidAddress } from 'src/utils/isValidAddress'

import { useStyles } from './style'
import { getExplorerInfo } from 'src/config'
import { EthHashInfo } from '@gnosis.pm/safe-react-components'

export const REPLACE_OWNER_NAME_INPUT_TEST_ID = 'replace-owner-name-input'
export const REPLACE_OWNER_ADDRESS_INPUT_TEST_ID = 'replace-owner-address-testid'
export const REPLACE_OWNER_NEXT_BTN_TEST_ID = 'replace-owner-next-btn'

import { OwnerValues } from '../..'

const formMutators: Record<
  string,
  Mutator<{ setOwnerAddress: { address: string }; setOwnerName: { name: string } }>
> = {
  setOwnerAddress: (args, state, utils) => {
    utils.changeValue(state, 'ownerAddress', () => args[0])
  },
  setOwnerName: (args, state, utils) => {
    utils.changeValue(state, 'ownerName', () => args[0])
  },
}

type NewOwnerProps = {
  ownerAddress: string
  ownerName: string
}

type OwnerFormProps = {
  onClose: () => void
  onSubmit: (values: NewOwnerProps) => void
  owner: OwnerData
  initialValues?: OwnerValues
}

export const OwnerForm = ({ onClose, onSubmit, owner, initialValues }: OwnerFormProps): ReactElement => {
  const classes = useStyles()

  const handleSubmit = (values: NewOwnerProps) => {
    onSubmit(values)
  }
  const addressBookMap = useSelector(currentNetworkAddressBookAsMap)
  const { address: safeAddress = '', owners } = useSelector(currentSafe) ?? {}
  const ownerDoesntExist = uniqueAddress(owners)
  const ownerAddressIsNotSafeAddress = addressIsNotCurrentSafe(safeAddress)

  return (
    <>
      <Row align="center" className={classes.heading} grow>
        <Paragraph className={classes.manage} noMargin weight="bolder">
          替换拥有者
        </Paragraph>
        <Paragraph className={classes.annotation}>1 of 2</Paragraph>
        <IconButton disableRipple onClick={onClose}>
          <Close className={classes.closeIcon} />
        </IconButton>
      </Row>
      <Hairline />
      <GnoForm
        formMutators={formMutators}
        onSubmit={handleSubmit}
        initialValues={{
          ownerName: initialValues?.name,
          ownerAddress: initialValues?.address,
        }}
      >
        {(...args) => {
          const mutators = args[3]

          const handleScan = (value, closeQrModal) => {
            let scannedAddress = value

            if (scannedAddress.startsWith('ethereum:')) {
              scannedAddress = scannedAddress.replace('ethereum:', '')
            }

            mutators.setOwnerAddress(scannedAddress)
            closeQrModal()
          }

          return (
            <>
              <Block className={classes.formContainer}>
                <Row>
                  <Paragraph>
                    从当前的钱包中查看您想要替换的拥有者。然后指定要替换它的新拥有者
                  </Paragraph>
                </Row>
                <Row>
                  <Paragraph>当前拥有者</Paragraph>
                </Row>
                <Row className={classes.owner}>
                  <Col align="center" xs={12}>
                    <EthHashInfo
                      hash={owner.address}
                      name={owner.name}
                      showCopyBtn
                      showAvatar
                      explorerUrl={getExplorerInfo(owner.address)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Paragraph>新拥有者</Paragraph>
                </Row>
                <Row margin="md">
                  <Col xs={8}>
                    <Field
                      component={TextField}
                      name="ownerName"
                      placeholder="名称*"
                      testId={REPLACE_OWNER_NAME_INPUT_TEST_ID}
                      text="名称*"
                      type="text"
                      validate={composeValidators(required, validAddressBookName)}
                    />
                    <OnChange name="ownerAddress">
                      {async (address: string) => {
                        if (isValidAddress(address)) {
                          const ownerName = addressBookMap[address]?.name
                          if (ownerName) {
                            mutators.setOwnerName(ownerName)
                          }
                        }
                      }}
                    </OnChange>
                  </Col>
                </Row>
                <Row margin="md">
                  <Col xs={8}>
                    <AddressInput
                      fieldMutator={mutators.setOwnerAddress}
                      name="ownerAddress"
                      placeholder="地址*"
                      testId={REPLACE_OWNER_ADDRESS_INPUT_TEST_ID}
                      text="地址*"
                      validators={[ownerDoesntExist, ownerAddressIsNotSafeAddress]}
                    />
                  </Col>
                  <Col center="xs" className={classes} middle="xs" xs={1}>
                    <ScanQRWrapper handleScan={handleScan} />
                  </Col>
                </Row>
              </Block>
              <Modal.Footer>
                <Modal.Footer.Buttons
                  cancelButtonProps={{ onClick: onClose }}
                  confirmButtonProps={{ testId: REPLACE_OWNER_NEXT_BTN_TEST_ID, text: '下一步' }}
                />
              </Modal.Footer>
            </>
          )
        }}
      </GnoForm>
    </>
  )
}