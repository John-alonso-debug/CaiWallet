/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-24 13:03:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/routes/safe/components/Transactions/TxList/TxExpandedActions.tsx
 */
import { Button, Tooltip } from '@gnosis.pm/safe-react-components'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { currentSafeNonce } from 'src/logic/safe/store/selectors'
import { Transaction } from 'src/logic/safe/store/models/types/gateway.d'
import { useActionButtonsHandlers } from 'src/routes/safe/components/Transactions/TxList/hooks/useActionButtonsHandlers'

type TxExpandedActionsProps = {
  transaction: Transaction
}

export const TxExpandedActions = ({ transaction }: TxExpandedActionsProps): ReactElement | null => {
  const {
    canCancel,
    handleConfirmButtonClick,
    handleCancelButtonClick,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isPending,
    disabledActions,
  } = useActionButtonsHandlers(transaction)
  const nonce = useSelector(currentSafeNonce)

  const onExecuteOrConfirm = (event) => {
    handleOnMouseLeave()
    handleConfirmButtonClick(event)
  }

  const getConfirmTooltipTitle = () => {
    if (transaction.txStatus === 'AWAITING_EXECUTION') {
      return transaction.executionInfo?.nonce === nonce
        ? 'Execute'
        : `需要先执行带有 nonce ${nonce} 的交易`
    }
    return 'Confirm'
  }

  // There is a problem in chrome that produces onMouseLeave event not being triggered properly.
  // https://github.com/facebook/react/issues/4492
  return (
    <>
      <Tooltip title={getConfirmTooltipTitle()} placement="top">
        <span>
          <Button
            size="md"
            color="primary"
            disabled={disabledActions}
            onClick={onExecuteOrConfirm}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className="primary"
          >
            {transaction.txStatus === 'AWAITING_EXECUTION' ? 'Execute' : 'Confirm'}
          </Button>
        </span>
      </Tooltip>
      {canCancel && (
        <Button size="md" color="error" onClick={handleCancelButtonClick} className="error" disabled={isPending}>
          拒绝
        </Button>
      )}
    </>
  )
}
