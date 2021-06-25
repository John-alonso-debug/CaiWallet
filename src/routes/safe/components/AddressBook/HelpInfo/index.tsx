/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 13:52:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/AddressBook/HelpInfo/index.tsx
 */
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Text, Link, Icon } from '@gnosis.pm/safe-react-components'

const StyledIcon = styled(Icon)`
  svg {
    position: relative;
    top: 4px;
    left: 4px;
  }
`

const HelpInfo = (): ReactElement => (
  <Link
    href="https://help.gnosis-safe.io/en/articles/5299068-address-book-export-and-import"
    target="_blank"
    rel="noreferrer"
    title="Export & import info"
  >
    <Text size="xl" as="span" color="primary">
    了解地址簿导入和导出
    </Text>
    <StyledIcon size="sm" type="externalLink" color="primary" />
  </Link>
)

export default HelpInfo
