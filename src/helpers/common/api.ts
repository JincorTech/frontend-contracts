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

export const transformContractBodyGet = (data) => {
  const formatDate = (date: string) => {
    return moment(date, ApiDateFormat).format(AppDateFormat);
  }

  return {
    employeeId: data.employeeId,
    contractDate: formatDate(data.startDate),
    contractNumber: data.contractNumber,
    jobTitle: data.jobTitle,
    roleDescription: data.jobDescription,
    employmentType: data.typeOfEmployment,
    agreementPeriod: data.periodOfAgreement,
    startAgreementDate: formatDate(data.periodStartDate),
    endAgreementDate: formatDate(data.periodEndDate),
    salaryAmount: data.salaryAmount.amount,
    paymentsDay: data.dayOfPayments,
    additionalClauses: data.additionalClauses,
    isSignedByEmployee: data.isSignedByEmployee,
    createdAt: formatDate(data.createdAt),
    signedAt: formatDate(data.signedAt)
  }
}

export const transformContractBodyPost = (data) => {
  const formatDate = (date: string) => {
    return moment(date, AppDateFormat).format(ApiDateFormat);
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
    dayOfPayments: data.paymentsDay,
    additionalClauses: data.additionalClauses
  }
}