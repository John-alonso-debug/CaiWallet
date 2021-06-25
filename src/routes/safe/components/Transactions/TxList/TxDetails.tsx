import { Icon, Link, Loader, Text } from '@gnosis.pm/safe-react-components'
import cn from 'classnames'
import React, { ReactElement, useContext } from 'react'
import styled from 'styled-components'

import {
  ExpandedTxDetails,
  isMultiSendTxInfo,
  isSettingsChangeTxInfo,
  isTransferTxInfo,
  MultiSigExecutionDetails,
  Transaction,
} from 'src/logic/safe/store/models/types/gateway.d'
import { TransactionActions } from './hooks/useTransactionActions'
import { useTransactionDetails } from './hooks/useTransactionDetails'
import { TxDetailsContainer, Centered, AlignItemsWithMargin } from './styled'
import { TxData } from './TxData'
import { TxExpandedActions } from './TxExpandedActions'
import { TxInfo } from './TxInfo'
import { TxLocationContext } from './TxLocationProvider'
import { TxOwners } from './TxOwners'
import { TxSummary } from './TxSummary'
import { isCancelTxDetails, NOT_AVAILABLE } from './utils'

const NormalBreakingText = styled(Text)`
  line-break: normal;
  word-break: normal;
`

const TxDataGroup = ({ txDetails }: { txDetails: ExpandedTxDetails }): ReactElement | null => {
  if (isTransferTxInfo(txDetails.txInfo) || isSettingsChangeTxInfo(txDetails.txInfo)) {
    return <TxInfo txInfo={txDetails.txInfo} />
  }

  if (isCancelTxDetails(txDetails.txInfo)) {
    const txNonce = `${(txDetails.detailedExecutionInfo as MultiSigExecutionDetails).nonce ?? NOT_AVAILABLE}`
    const isTxExecuted = txDetails.executedAt

    // executed rejection transaction
    let message = `这是一个没有发送任何资金的链上拒绝。这种链上拒绝用nonce替换了所有交易
    ${txNonce}.`

    if (!isTxExecuted) {
      // queued rejection transaction
      message = `这是一种不发送任何资金的链上拒绝。
      执行此链上拒绝将用nonce替换所有当前等待的交易 ${txNonce}.`
    }
    return (
      <>
        <NormalBreakingText size="xl">{message}</NormalBreakingText>
        {!isTxExecuted && (
          <>
            <br />
            <Link
              href="https://help.gnosis-safe.io/en/articles/4738501-why-do-i-need-to-pay-for-cancelling-a-transaction"
              target="_blank"
              rel="noreferrer"
              title="Why do I need to pay for rejecting a transaction?"
            >
              <AlignItemsWithMargin>
                <Text size="xl" as="span" color="primary">
                  为什么我需要为拒绝交易付费？
                </Text>
                <Icon size="sm" type="externalLink" color="primary" />
              </AlignItemsWithMargin>
            </Link>
          </>
        )}
      </>
    )
  }

  if (!txDetails.txData) {
    return null
  }

  return <TxData txData={txDetails.txData} txInfo={txDetails.txInfo} />
}

type TxDetailsProps = {
  transaction: Transaction
  actions?: TransactionActions
}

export const TxDetails = ({ transaction, actions }: TxDetailsProps): ReactElement => {
  const { txLocation } = useContext(TxLocationContext)
  const { data, loading } = useTransactionDetails(transaction.id)

  if (loading) {
    return (
      <Centered padding={10}>
        <Loader size="sm" />
      </Centered>
    )
  }

  if (!data) {
    return (
      <TxDetailsContainer>
        <Text size="xl" strong>
          No data available
        </Text>
      </TxDetailsContainer>
    )
  }

  return (
    <TxDetailsContainer>
      <div className={cn('tx-summary', { 'will-be-replaced': transaction.txStatus === 'WILL_BE_REPLACED' })}>
        <TxSummary txDetails={data} />
      </div>
      <div
        className={cn('tx-details', {
          'no-padding': isMultiSendTxInfo(data.txInfo),
          'not-executed': !data.executedAt,
          'will-be-replaced': transaction.txStatus === 'WILL_BE_REPLACED',
        })}
      >
        <TxDataGroup txDetails={data} />
      </div>
      <div
        className={cn('tx-owners', {
          'no-owner': txLocation !== 'history' && !actions?.isUserAnOwner,
          'will-be-replaced': transaction.txStatus === 'WILL_BE_REPLACED',
        })}
      >
        <TxOwners txDetails={data} />
      </div>
      {!data.executedAt && txLocation !== 'history' && actions?.isUserAnOwner && (
        <div className={cn('tx-details-actions', { 'will-be-replaced': transaction.txStatus === 'WILL_BE_REPLACED' })}>
          <TxExpandedActions transaction={transaction} />
        </div>
      )}
    </TxDetailsContainer>
  )
}
