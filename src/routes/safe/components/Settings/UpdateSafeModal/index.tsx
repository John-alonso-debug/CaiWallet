import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { styles } from './style'

import GnoForm from 'src/components/forms/GnoForm'
import Block from 'src/components/layout/Block'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { getUpgradeSafeTransactionHash } from 'src/logic/safe/utils/upgradeSafe'
import { createTransaction } from 'src/logic/safe/store/actions/createTransaction'
import { makeStyles } from '@material-ui/core'
import { ButtonStatus, Modal } from 'src/components/Modal'
import { TransactionFees } from 'src/components/TransactionsFees'
import { EstimationStatus, useEstimateTransactionGas } from 'src/logic/hooks/useEstimateTransactionGas'
import { useEstimationStatus } from 'src/logic/hooks/useEstimationStatus'
import { MULTI_SEND_ADDRESS } from 'src/logic/contracts/safeContracts'
import { DELEGATE_CALL } from 'src/logic/safe/transactions'
import { EMPTY_DATA } from 'src/logic/wallets/ethTransactions'
import { TxParametersDetail } from 'src/routes/safe/components/Transactions/helpers/TxParametersDetail'
import { EditableTxParameters } from 'src/routes/safe/components/Transactions/helpers/EditableTxParameters'
import { TxParameters } from 'src/routes/safe/container/hooks/useTransactionParameters'

const useStyles = makeStyles(styles)

type Props = {
  onClose: () => void
  safeAddress: string
}

export const UpdateSafeModal = ({ onClose, safeAddress }: Props): React.ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [multiSendCallData, setMultiSendCallData] = useState(EMPTY_DATA)

  const {
    gasCostFormatted,
    txEstimationExecutionStatus,
    isExecution,
    isCreation,
    isOffChainSignature,
    gasPriceFormatted,
    gasLimit,
    gasEstimation,
  } = useEstimateTransactionGas({
    txData: multiSendCallData,
    txRecipient: safeAddress,
  })

  const [buttonStatus] = useEstimationStatus(txEstimationExecutionStatus)

  useEffect(() => {
    const calculateUpgradeSafeModal = async () => {
      const encodeMultiSendCallData = await getUpgradeSafeTransactionHash(safeAddress)
      setMultiSendCallData(encodeMultiSendCallData)
    }
    calculateUpgradeSafeModal()
  }, [safeAddress])

  const handleSubmit = (txParameters: TxParameters) => {
    // Call the update safe method
    dispatch(
      createTransaction({
        safeAddress,
        to: MULTI_SEND_ADDRESS,
        valueInWei: '0',
        txData: multiSendCallData,
        txNonce: txParameters.safeNonce,
        safeTxGas: txParameters.safeTxGas ? Number(txParameters.safeTxGas) : undefined,
        ethParameters: txParameters,
        notifiedTransaction: 'STANDARD_TX',
        operation: DELEGATE_CALL,
      }),
    )
    onClose()
  }

  let confirmButtonText = '更新钱包'
  if (ButtonStatus.LOADING === buttonStatus) {
    confirmButtonText = txEstimationExecutionStatus === EstimationStatus.LOADING ? 'Estimating' : 'Updating'
  }

  return (
    <EditableTxParameters
      isOffChainSignature={isOffChainSignature}
      isExecution={isExecution}
      ethGasLimit={gasLimit}
      ethGasPrice={gasPriceFormatted}
      safeTxGas={gasEstimation.toString()}
    >
      {(txParameters, toggleEditMode) => (
        <>
          <Row align="center" className={classes.heading} grow>
            <Paragraph className={classes.headingText} noMargin weight="bolder">
              更新到新的版本
            </Paragraph>
            <IconButton disableRipple onClick={onClose}>
              <Close className={classes.close} />
            </IconButton>
          </Row>
          <Hairline />
          <GnoForm onSubmit={() => handleSubmit(txParameters)}>
            {() => (
              <>
                <Block className={classes.modalContent}>
                  <Row>
                    <Paragraph>
                      立即更新以利用可用的新功能和最高安全标准。
                    </Paragraph>
                    <Block>
                        本次更新包括:
                      <ul>
                        <li>与新资产类型的兼容性（ERC-721 / ERC-1155）</li>
                        <li>改进与模块的互操作性</li>
                        <li>小的安全改进</li>
                      </ul>
                    </Block>
                    <Paragraph>
                      您需要像任何其他交易一样确认此更新。这意味着如果此钱包需要多次确认，其他拥有者将必须确认更新。
                    </Paragraph>
                  </Row>
                  {/* Tx Parameters */}
                  <TxParametersDetail
                    txParameters={txParameters}
                    onEdit={toggleEditMode}
                    compact={false}
                    isTransactionCreation={isCreation}
                    isTransactionExecution={isExecution}
                    isOffChainSignature={isOffChainSignature}
                  />
                </Block>
                {txEstimationExecutionStatus === EstimationStatus.LOADING ? null : (
                  <Block className={classes.gasCostsContainer}>
                    <TransactionFees
                      gasCostFormatted={gasCostFormatted}
                      isExecution={isExecution}
                      isCreation={isCreation}
                      isOffChainSignature={isOffChainSignature}
                      txEstimationExecutionStatus={txEstimationExecutionStatus}
                    />
                  </Block>
                )}
                <Row align="center" className={classes.buttonRow}>
                  <Modal.Footer.Buttons
                    cancelButtonProps={{
                      onClick: onClose,
                      text: '返回',
                    }}
                    confirmButtonProps={{
                      status: buttonStatus,
                      text: confirmButtonText,
                    }}
                  />
                </Row>
              </>
            )}
          </GnoForm>
        </>
      )}
    </EditableTxParameters>
  )
}
