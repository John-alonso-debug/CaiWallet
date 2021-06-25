import { EthHashInfo } from '@gnosis.pm/safe-react-components'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getExplorerInfo } from 'src/config'
import Field from 'src/components/forms/Field'
import TextField from 'src/components/forms/TextField'
import { minMaxLength } from 'src/components/forms/validator'
import Block from 'src/components/layout/Block'
import Col from 'src/components/layout/Col'
import Hairline from 'src/components/layout/Hairline'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import OpenPaper from 'src/components/Stepper/OpenPaper'
import { AddressBookEntry, makeAddressBookEntry } from 'src/logic/addressBook/model/addressBook'
import { currentNetworkAddressBookAsMap } from 'src/logic/addressBook/store/selectors'

import { getGnosisSafeInstanceAt } from 'src/logic/contracts/safeContracts'
import { FIELD_LOAD_ADDRESS, THRESHOLD } from 'src/routes/load/components/fields'
import { getOwnerAddressBy, getOwnerNameBy } from 'src/routes/open/components/fields'
import { styles } from './styles'
import { LoadFormValues } from 'src/routes/load/container/Load'

const calculateSafeValues = (owners, threshold, values) => {
  const initialValues = { ...values }
  for (let i = 0; i < owners.length; i += 1) {
    initialValues[getOwnerAddressBy(i)] = owners[i]
  }
  initialValues[THRESHOLD] = threshold
  return initialValues
}

const useStyles = makeStyles(styles)

interface OwnerListComponentProps {
  values: LoadFormValues
  updateInitialProps: (initialValues) => void
}

const OwnerListComponent = ({ values, updateInitialProps }: OwnerListComponentProps): ReactElement => {
  const [owners, setOwners] = useState<string[]>([])
  const classes = useStyles()
  const addressBookMap = useSelector(currentNetworkAddressBookAsMap)
  const [ownersWithName, setOwnersWithName] = useState<AddressBookEntry[]>([])

  useEffect(() => {
    setOwnersWithName(
      owners.map((address) =>
        makeAddressBookEntry({
          address,
          name: addressBookMap[address]?.name ?? '',
        }),
      ),
    )
  }, [addressBookMap, owners])

  useEffect(() => {
    let isCurrent = true

    const fetchSafe = async () => {
      const safeAddress = values[FIELD_LOAD_ADDRESS]
      const gnosisSafe = getGnosisSafeInstanceAt(safeAddress)
      const safeOwners = await gnosisSafe.methods.getOwners().call()
      const threshold = await gnosisSafe.methods.getThreshold().call()

      if (isCurrent) {
        const sortedOwners = safeOwners.slice().sort()
        const initialValues = calculateSafeValues(sortedOwners, threshold, values)
        updateInitialProps(initialValues)
        setOwners(sortedOwners)
      }
    }

    fetchSafe()

    return () => {
      isCurrent = false
    }
  }, [updateInitialProps, values])

  return (
    <>
      <Block className={classes.title}>
        <Paragraph color="primary" noMargin size="md" data-testid="load-safe-step-two">
          {`这个多签有 ${owners.length} 签名人. 可选:为每个签名人提供一个名称。`}
        </Paragraph>
      </Block>
      <Hairline />
      <TableContainer>
        <Row className={classes.header}>
          <Col xs={4}>名称</Col>
          <Col xs={8}>地址</Col>
        </Row>
        <Hairline />
        <Block margin="md" padding="md">
          {ownersWithName.map(({ address, name }, index) => {
            return (
              <Row className={classes.owner} key={address} data-testid="owner-row">
                <Col className={classes.ownerName} xs={4}>
                  <Field
                    className={classes.name}
                    component={TextField}
                    initialValue={name}
                    name={getOwnerNameBy(index)}
                    placeholder="签名人名称"
                    text="签名人名称"
                    type="text"
                    validate={minMaxLength(0, 50)}
                    testId={`load-safe-owner-name-${index}`}
                  />
                </Col>
                <Col xs={8}>
                  <Row className={classes.ownerAddresses}>
                    <EthHashInfo hash={address} showAvatar showCopyBtn explorerUrl={getExplorerInfo(address)} />
                  </Row>
                </Col>
              </Row>
            )
          })}
        </Block>
      </TableContainer>
    </>
  )
}

const OwnerList = ({ updateInitialProps }) =>
  function LoadSafeOwnerList(controls: ReactNode, { values }: { values: LoadFormValues }): ReactElement {
    return (
      <OpenPaper controls={controls} padding={false}>
        <OwnerListComponent updateInitialProps={updateInitialProps} values={values} />
      </OpenPaper>
    )
  }

export default OwnerList
