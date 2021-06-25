/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 16:07:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Settings/ManageOwners/RemoveOwnerModal/screens/CheckOwner/index.tsx
 */
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import React, { ReactElement } from 'react'

import Block from 'src/components/layout/Block'
import Col from 'src/components/layout/Col'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { OwnerData } from 'src/routes/safe/components/Settings/ManageOwners/dataFetcher'

import { useStyles } from './style'
import { EthHashInfo } from '@gnosis.pm/safe-react-components'
import { getExplorerInfo } from 'src/config'
import { Modal } from 'src/components/Modal'

export const REMOVE_OWNER_MODAL_NEXT_BTN_TEST_ID = 'remove-owner-next-btn'

interface CheckOwnerProps {
  onClose: () => void
  onSubmit: () => void
  owner: OwnerData
}

export const CheckOwner = ({ onClose, onSubmit, owner }: CheckOwnerProps): ReactElement => {
  const classes = useStyles()

  return (
    <>
      <Row align="center" className={classes.heading} grow>
        <Paragraph className={classes.manage} noMargin weight="bolder">
          移除拥有者
        </Paragraph>
        <Paragraph className={classes.annotation}>1 of 3</Paragraph>
        <IconButton disableRipple onClick={onClose}>
          <Close className={classes.closeIcon} />
        </IconButton>
      </Row>
      <Hairline />
      <Block className={classes.formContainer}>
        <Row margin="md">
          <Paragraph size="lg">从多签钱包中删除拥有者:</Paragraph>
        </Row>
        <Row>
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
      </Block>
      <Modal.Footer>
        <Modal.Footer.Buttons
          cancelButtonProps={{ onClick: onClose }}
          confirmButtonProps={{ onClick: onSubmit, testId: REMOVE_OWNER_MODAL_NEXT_BTN_TEST_ID, text: '下一步' }}
        />
      </Modal.Footer>
    </>
  )
}
