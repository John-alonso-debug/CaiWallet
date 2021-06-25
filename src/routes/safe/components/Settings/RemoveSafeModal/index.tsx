/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 17:27:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/RemoveSafeModal/index.tsx
 */
import { EthHashInfo } from '@gnosis.pm/safe-react-components'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useStyles } from './style'

import Modal, { Modal as GenericModal } from 'src/components/Modal'
import Block from 'src/components/layout/Block'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { currentSafeWithNames, defaultSafe as defaultSafeSelector } from 'src/logic/safe/store/selectors'
import { WELCOME_ADDRESS } from 'src/routes/routes'
import removeSafe from 'src/logic/safe/store/actions/removeSafe'
import setDefaultSafe from 'src/logic/safe/store/actions/setDefaultSafe'
import { sameAddress } from 'src/logic/wallets/ethAddresses'

import { getExplorerInfo } from 'src/config'
import Col from 'src/components/layout/Col'

type RemoveSafeModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const RemoveSafeModal = ({ isOpen, onClose }: RemoveSafeModalProps): React.ReactElement => {
  const classes = useStyles()
  const { address: safeAddress, name: safeName } = useSelector(currentSafeWithNames)
  const defaultSafe = useSelector(defaultSafeSelector)
  const dispatch = useDispatch()

  const onRemoveSafeHandler = async () => {
    dispatch(removeSafe(safeAddress))

    if (sameAddress(safeAddress, defaultSafe)) {
      dispatch(setDefaultSafe(''))
    }

    onClose()
    // using native redirect in order to avoid problems in several components
    // trying to access references of the removed safe.
    const relativePath = window.location.href.split('/#/')[0]
    window.location.href = `${relativePath}/#/${WELCOME_ADDRESS}`
  }

  return (
    <Modal
      description="Remove the selected Safe"
      handleClose={onClose}
      open={isOpen}
      paperClassName="modal"
      title="Remove Safe"
    >
      <Row align="center" className={classes.heading} grow>
        <Paragraph className={classes.manage} noMargin weight="bolder">
          移除钱包
        </Paragraph>
        <IconButton disableRipple onClick={onClose}>
          <Close className={classes.close} />
        </IconButton>
      </Row>
      <Hairline />
      <Block className={classes.container}>
        <Row className={classes.owner}>
          <Col align="center" xs={12}>
            <EthHashInfo
              hash={safeAddress}
              name={safeName}
              showAvatar
              showCopyBtn
              explorerUrl={getExplorerInfo(safeAddress)}
            />
          </Col>
        </Row>
        <Row className={classes.description}>
          <Paragraph noMargin size="lg">
            移除一个钱包只会从你的界面删除它。<b>它不会删除钱包</b>。您总是可以使用钱包的地址将其添加回来。
          </Paragraph>
        </Row>
      </Block>
      <GenericModal.Footer>
        <GenericModal.Footer.Buttons
          cancelButtonProps={{ onClick: onClose }}
          confirmButtonProps={{
            onClick: onRemoveSafeHandler,
            color: 'error',
            text: '移除',
          }}
        />
      </GenericModal.Footer>
    </Modal>
  )
}
