import { Contract } from '../../redux/modules/contracts/contractsPage';

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