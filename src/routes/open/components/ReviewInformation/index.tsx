import TableContainer from '@material-ui/core/TableContainer'
import React, { ReactElement, useEffect, useMemo } from 'react'
import { getExplorerInfo, getNetworkInfo } from 'src/config'
import Block from 'src/components/layout/Block'
import Col from 'src/components/layout/Col'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import OpenPaper from 'src/components/Stepper/OpenPaper'
import {
  CreateSafeValues,
  getAccountsFrom,
  getNamesFrom,
  getSafeCreationSaltFrom,
} from 'src/routes/open/utils/safeDataExtractor'

import { FIELD_CONFIRMATIONS, FIELD_NAME, getNumOwnersFrom } from '../fields'
import { useStyles } from './styles'
import { EthHashInfo } from '@gnosis.pm/safe-react-components'
import { useEstimateSafeCreationGas } from 'src/logic/hooks/useEstimateSafeCreationGas'
import { FormApi } from 'final-form'
import { StepperPageFormProps } from 'src/components/Stepper'
import { LoadFormValues } from 'src/routes/load/container/Load'

type ReviewComponentProps = {
  values: LoadFormValues
  form: FormApi
}

const { nativeCoin } = getNetworkInfo()

const ReviewComponent = ({ values, form }: ReviewComponentProps): ReactElement => {
  const classes = useStyles()

  const names = getNamesFrom(values)
  const addresses = useMemo(() => getAccountsFrom(values), [values])

  const numOwners = getNumOwnersFrom(values)
  const safeCreationSalt = getSafeCreationSaltFrom(values as CreateSafeValues)
  const { gasCostFormatted, gasLimit } = useEstimateSafeCreationGas({ addresses, numOwners, safeCreationSalt })

  useEffect(() => {
    form.mutators.setValue('gasLimit', gasLimit)
  }, [gasLimit, form.mutators])

  return (
    <>
      <Row className={classes.root}>
        <Col className={classes.detailsColumn} layout="column" xs={4}>
          <Block className={classes.details}>
            <Block margin="lg">
              <Paragraph color="primary" noMargin size="lg" data-testid="create-safe-step-three">
                ??????
              </Paragraph>
            </Block>
            <Block margin="lg">
              <Paragraph color="disabled" noMargin size="sm">
                ?????????????????????
              </Paragraph>
              <Paragraph
                className={classes.name}
                color="primary"
                noMargin
                size="lg"
                weight="bolder"
                data-testid="create-safe-review-name"
              >
                {values[FIELD_NAME]}
              </Paragraph>
            </Block>
            <Block margin="lg">
              <Paragraph color="disabled" noMargin size="sm">
                ??????????????????????????????:
              </Paragraph>
              <Paragraph
                color="primary"
                noMargin
                size="lg"
                weight="bolder"
                data-testid={`create-safe-review-req-owners-${values[FIELD_CONFIRMATIONS]}`}
              >
                {`${values[FIELD_CONFIRMATIONS]} - ${numOwners} ?????????`}
              </Paragraph>
            </Block>
          </Block>
        </Col>
        <Col className={classes.ownersColumn} layout="column" xs={8}>
          <TableContainer>
            <Block className={classes.owners}>
              <Paragraph color="primary" noMargin size="lg">
                {`${numOwners} ???????????????`}
              </Paragraph>
            </Block>
            <Hairline />
            {names.map((name, index) => (
              <React.Fragment key={`name${index}`}>
                <Row className={classes.owner}>
                  <Col align="center" xs={12}>
                    <EthHashInfo
                      data-testid={`create-safe-owner-name-${index}`}
                      hash={addresses[index]}
                      name={name}
                      showAvatar
                      showCopyBtn
                      explorerUrl={getExplorerInfo(addresses[index])}
                    />
                  </Col>
                </Row>
                <Hairline />
              </React.Fragment>
            ))}
          </TableContainer>
        </Col>
      </Row>
      <Row align="center" className={classes.info}>
        <Paragraph color="primary" noMargin size="lg">
          ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? {gasCostFormatted} {nativeCoin.name}. ?????????????????????
          ????????????????????????
        </Paragraph>
      </Row>
    </>
  )
}

export const Review = () =>
  function ReviewPage(controls: React.ReactNode, props: StepperPageFormProps): React.ReactElement {
    return (
      <>
        <OpenPaper controls={controls} padding={false}>
          <ReviewComponent {...props} />
        </OpenPaper>
      </>
    )
  }
