import { Contract } from '../../redux/modules/contracts/contractsPage';
import { Employee } from '../../redux/modules/employmentAgreement/employmentAgreement';
import { printDate } from '../../helpers/common/format';
import * as moment from 'moment';

export const AppDateFormat = 'DD.MM.YYYY';
export const ApiDateFormat = 'MM/DD/YYYY'

export const EthCurrencyName = 'ETH';
export const PersonalWalletType = 'personal';
export const CorporateWalletType = 'corporate';

export const parseAppDate = (date: string) => {
  if (date === '') {
    return null;
  }

  return moment(date, AppDateFormat).toDate();
}

export const transformContracts = (data): Contract[] => {
  return data.map((contract) => {
    return {
      id: contract.contractId,
      userId: contract.employee.id,
      userAvatar: contract.employee.avatar,
      userName: contract.employee.fullName,
      createdAt: new Date(contract.createdAt),
      signedAt: contract.signedAt ? new Date(contract.signedAt) : null
    }
  });
}

export const transformEmployeesGet = (data): Employee[] => {
  const filteredEmployees = data.active.filter((employee) => {
    return employee.wallets.find((wallet) => wallet.currency === EthCurrencyName && wallet.type === PersonalWalletType);
  });

  return filteredEmployees.map((employee) => {
    return {
      id: employee.id,
      name: employee.profile.name,
      email: employee.contacts.email,
      avatar: employee.profile.avatar,
      wallets: employee.wallets
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
    signedAt: formatDate(data.signedAt),
    companyWalletAddress: data.wallets.corporate.address,
    employeeWalletAddress: data.wallets.personal.address
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
        currency: EthCurrencyName,
        amount: data.salaryAmount
    },
    dayOfPayments: data.paymentsDay,
    additionalClauses: data.additionalClauses
  }
}