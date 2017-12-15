const { COMPANIES_API_PATH, WALLETS_API_PATH } = process.env;

export default {
  CompaniesApiPath: COMPANIES_API_PATH || 'https://companies-api.jincor.com/api/v1',
  WalletsApiPath: WALLETS_API_PATH || 'https://wallets-api.jincor.com'
};
