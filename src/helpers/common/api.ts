import * as moment from 'moment';
import { Contract } from '../../redux/modules/contracts/contractsPage';
import { Employee } from '../../redux/modules/employmentAgreement/employmentAgreement';
import { getEmployeeById } from '../../helpers/common/store';

export const AppDateFormat = 'DD.MM.YYYY';
export const ApiDateFormat = 'MM/DD/YYYY';

export const EthCurrencyName = 'ETH';
export const PersonalWalletType = 'personal';
export const CorporateWalletType = 'corporate';

export const FixedAgreementPeriodType = 'fixed';
export const PermanentAgreementPeriodType = 'permanent';

export const parseAppDate = (date: string): Date => {
  if (!date) {
    return null;
  }

  return moment(date, AppDateFormat).toDate();
};

export const parseApiDate = (date: string): Date => {
  if (!date) {
    return null;
  }

  return moment(date, ApiDateFormat).toDate();
};

export const transformContracts = (data, employees: Employee[]): Contract[] => {
  return data.map((contract) => {
    const employee = getEmployeeById(employees, contract.employeeId);
    let resultContract = {
      id: contract.contractId,
      userId: contract.employeeId,
      userAvatar: '',
      userName: 'User not found',
      createdAt: new Date(contract.createdAt),
      signedAt: parseApiDate(contract.signedAt)
    };

    if (employee) {
      resultContract.userAvatar = employee.avatar;
      resultContract.userName = employee.name;
    }

    return resultContract;
  });
};

const transformEmployee = (employeeData): Employee => {
  return {
    id: employeeData.id,
    name: employeeData.profile.name,
    email: employeeData.contacts.email,
    avatar: employeeData.profile.avatar,
    wallets: employeeData.wallets.map((wallet) => {
      return {
        currency: wallet.currrency,
        ...wallet
      };
    })
  };
};

export const transformEmployeesGet = (data): Employee[] => {
  const filteredEmployees = data.active.filter((employee) => {
    return employee.wallets.find((wallet) => wallet.currrency === EthCurrencyName && wallet.type === PersonalWalletType);
  });

  return filteredEmployees.map((employee) => transformEmployee(employee)).concat(transformEmployee(data.self));
};

export const transformContractBodyGet = (data) => {
  const formatDate = (date: string) => {
    return moment(date, ApiDateFormat).format(AppDateFormat);
  };

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
    salaryAmount: data.compensation.salaryAmount.amount,
    paymentsDay: data.compensation.dayOfPayments,
    additionalClauses: data.additionalClauses,
    isSignedByEmployee: data.isSignedByEmployee,
    createdAt: formatDate(data.createdAt),
    signedAt: formatDate(data.signedAt),
    companyWalletAddress: data.wallets.employer,
    employeeWalletAddress: data.wallets.employee
  };
};

export const transformContractBodyPost = (data) => {
  const formatDate = (date: string) => {
    return moment(date, AppDateFormat).format(ApiDateFormat);
  };

  const result = {
    employeeId: data.employeeId,
    startDate: formatDate(data.contractDate),
    contractNumber: +data.contractNumber,
    jobTitle: data.jobTitle,
    typeOfEmployment: data.employmentType,
    periodOfAgreement: data.agreementPeriod,
    compensation: {
      dayOfPayments: +data.paymentsDay,
      salaryAmount: {
        currency: EthCurrencyName,
        amount: data.salaryAmount
      }
    },
    wallets: {
      employer: data.companyWalletAddress,
      employee: data.employeeWalletAddress
    }
  };

  if (data.agreementPeriod !== PermanentAgreementPeriodType) {
    result['periodStartDate'] = formatDate(data.startAgreementDate);
    result['periodEndDate'] = formatDate(data.endAgreementDate);
  }

  if (data.additionalClauses) {
    result['additionalClauses'] = data.additionalClauses;
  }

  if (data.roleDescription) {
    result['jobDescription'] = data.roleDescription;
  }

  return result;
};
