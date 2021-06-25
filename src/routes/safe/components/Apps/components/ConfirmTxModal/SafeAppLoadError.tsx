/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 14:52:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Apps/components/ConfirmTxModal/SafeAppLoadError.tsx
 */
import React, { ReactElement } from 'react'
import { Icon, Text, Title, ModalFooterConfirmation } from '@gnosis.pm/safe-react-components'
import styled from 'styled-components'
import { ConfirmTxModalProps } from '.'

const IconText = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 4px;
  }
`

const FooterWrapper = styled.div`
  margin-top: 15px;
`

export const SafeAppLoadError = ({ onTxReject, onClose }: ConfirmTxModalProps): ReactElement => {
  const handleTxRejection = () => {
    onTxReject()
    onClose()
  }

  return (
    <>
      <IconText>
        <Icon color="error" size="md" type="info" />
        <Title size="xs">Transaction error</Title>
      </IconText>
      <Text size="lg">
        这个程序启动了一个不能被处理的交易. 请与此程序的开发商取得联系.
      </Text>

      <FooterWrapper>
        <ModalFooterConfirmation
          cancelText="取消"
          handleCancel={() => handleTxRejection()}
          handleOk={() => {}}
          okDisabled={true}
          okText="提交"
        />
      </FooterWrapper>
    </>
  )
}
