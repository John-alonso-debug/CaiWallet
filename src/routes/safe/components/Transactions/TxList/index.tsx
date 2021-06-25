/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-25 14:57:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Transactions/TxList/index.tsx
 */
import { Menu as MenuSrc, Tab } from '@gnosis.pm/safe-react-components'
import { Item } from '@gnosis.pm/safe-react-components/dist/navigation/Tab'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'

import { HistoryTransactions } from './HistoryTransactions'
import { QueueTransactions } from './QueueTransactions'
import { Breadcrumb, ContentWrapper, Wrapper } from './styled'

const Menu = styled(MenuSrc)`
  justify-content: flex-start;
`

const items: Item[] = [
  { id: 'queue', label: '队列' },
  { id: 'history', label: '历史' },
]

const GatewayTransactions = (): ReactElement => {
  const [tab, setTab] = useState(items[0].id)

  return (
    <Wrapper>
      <Menu>
        <Breadcrumb iconSize="md" iconType="transactionsInactive" textSize="md" text="TRANSACTIONS" color="primary" />
      </Menu>
      <Tab items={items} onChange={setTab} selectedTab={tab} />
      <ContentWrapper>
        {tab === 'queue' && <QueueTransactions />}
        {tab === 'history' && <HistoryTransactions />}
      </ContentWrapper>
    </Wrapper>
  )
}

export default GatewayTransactions
