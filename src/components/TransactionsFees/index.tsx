/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 12:56:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/components/TransactionsFees/index.tsx
 */
import React from 'react'
import { EstimationStatus } from 'src/logic/hooks/useEstimateTransactionGas'
import Paragraph from 'src/components/layout/Paragraph'
import { getNetworkInfo } from 'src/config'
import { TransactionFailText } from 'src/components/TransactionFailText'
import { Text } from '@gnosis.pm/safe-react-components'

type TransactionFailTextProps = {
  txEstimationExecutionStatus: EstimationStatus
  gasCostFormatted: string
  isExecution: boolean
  isCreation: boolean
  isOffChainSignature: boolean
}
const { nativeCoin } = getNetworkInfo()

export const TransactionFees = ({
  gasCostFormatted,
  isExecution,
  isCreation,
  isOffChainSignature,
  txEstimationExecutionStatus,
}: TransactionFailTextProps): React.ReactElement | null => {
  let transactionAction
  if (txEstimationExecutionStatus === EstimationStatus.LOADING) {
    return null
  }
  if (isCreation) {
    transactionAction = 'create'
  } else if (isExecution) {
    transactionAction = 'execute'
  } else {
    transactionAction = 'approve'
  }

  return (
    <>
      <Paragraph size="lg" align="center">
        您将要进行 {transactionAction} 交易，并且必须与您当前连接的交易进行确认
        钱包。{' '}
        {!isOffChainSignature && (
          <>
            确认你有{' '}
            <Text size="lg" as="span" color="text" strong>
              {gasCostFormatted}
            </Text>{' '}
            (fee price) {nativeCoin.name} 在钱包中
          </>
        )}
      </Paragraph>
      <TransactionFailText txEstimationExecutionStatus={txEstimationExecutionStatus} isExecution={isExecution} />
    </>
  )
}
