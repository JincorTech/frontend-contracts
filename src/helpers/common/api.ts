import { Contract } from '../../redux/modules/contracts/contractsPage';
import { printDate } from '../../helpers/common/format';
import * as moment from 'moment';

export const AppDateFormat = 'YYYY-MM-DD';
export const ApiDateFormat = 'MM/DD/YYYY'

export const transformContracts = (data): Contract[] => {
  return data.map((contract) => {
    return {
      id: contract.contractId,
      name: contract.employee.fullName,
      createdAt: new Date(contract.createdAt),
      signedAt: contract.signedAt ? new Date(contract.signedAt) : null
    }
  });
}

export const transformContractBody = (data) => {
  const formatDate = (date: string) => {
    return moment(date, AppDateFormat).format(ApiDateFormat);
  }

  const getDay = (date: string) => {
    return moment(date, AppDateFormat).date();
  }

  return {
    employeeId: data.employeeId,
    startDate: formatDate(data.contractDate),
    contractNumber: data.contractNumber,
    jobTitle: data.jobTitle,
    jobDescription: data.roleDescription,
    typeOfEmployment: data.employmentType,
    periodOfAgreement: data.agreementPeriod,
    periodStartDate: formatDate(data.startAgreementDate),
    periodEndDate: formatDate(data.endAgreementDate),
    salaryAmount: {
        currency: 'ETH',
        amount: data.salaryAmount
    },
    dayOfPayments: getDay(data.paymentsDay),
    additionalClauses: data.additionalClauses
  }
}