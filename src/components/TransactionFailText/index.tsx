/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-23 12:55:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/components/TransactionFailText/index.tsx
 */
import { createStyles, makeStyles } from '@material-ui/core'
import { sm } from 'src/theme/variables'
import { EstimationStatus } from 'src/logic/hooks/useEstimateTransactionGas'
import Row from 'src/components/layout/Row'
import Paragraph from 'src/components/layout/Paragraph'
import Img from 'src/components/layout/Img'
import InfoIcon from 'src/assets/icons/info_red.svg'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentSafeThreshold } from 'src/logic/safe/store/selectors'

const styles = createStyles({
  executionWarningRow: {
    display: 'flex',
    alignItems: 'center',
  },
  warningIcon: {
    marginRight: sm,
  },
})

const useStyles = makeStyles(styles)

type TransactionFailTextProps = {
  txEstimationExecutionStatus: EstimationStatus
  isExecution: boolean
}

export const TransactionFailText = ({
  txEstimationExecutionStatus,
  isExecution,
}: TransactionFailTextProps): React.ReactElement | null => {
  const classes = useStyles()
  const threshold = useSelector(currentSafeThreshold)

  if (txEstimationExecutionStatus !== EstimationStatus.FAILURE) {
    return null
  }

  let errorMessage = '为了节省汽油成本，请拒绝这笔交易'
  if (isExecution) {
    errorMessage =
      threshold && threshold > 1
        ? `为了节省汽油成本，请拒绝这笔交易`
        : `为了节省汽油成本，避免执行交易。`
  }

  return (
    <Row align="center">
      <Paragraph color="error" className={classes.executionWarningRow}>
        <Img alt="Info Tooltip" height={16} src={InfoIcon} className={classes.warningIcon} />
        这个交易很可能会失败。{errorMessage}
      </Paragraph>
    </Row>
  )
}
