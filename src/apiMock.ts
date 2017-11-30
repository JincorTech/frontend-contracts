import { setTimeout } from 'timers';

const getMock = (path: string) => {
  switch (path) {
    case '/api/contracts/':
      return {
        'status': 200,
        'data': [
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1515',
            'employee': {
              'fullName': 'Maxim Brook'
            },
            'createdAt': '01/09/2017',
            'signedAt': '01/09/2017'
          },
          {
            'contractId': 'a6a0c6e7ee5f1536d66dab3db3462596864a8db1',
            'employee': {
              'fullName': 'Mike Jefferson'
            },
            'createdAt': '01/10/2017',
            'signedAt': null
          },
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a15e5',
            'employee': {
              'fullName': 'Claudia Bullock'
            },
            'createdAt': '05/10/2017',
            'signedAt': '05/10/2017'
          },
          {
            'contractId': 'a0738f01bd8b6bb9b60a72194cabfefa87812cbd',
            'employee': {
              'fullName': 'Alexander Nepomeluev'
            },
            'createdAt': '01/11/2017',
            'signedAt': null
          },
          {
            'contractId': 'e167606ad8125bef29755c6265f601f896c977c3',
            'employee': {
              'fullName': 'Ernest Berlin'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          },
          {
            'contractId': '4cece768b4d791d6f86c6da0b1b1fa01538b604a',
            'employee': {
              'fullName': 'Henry McKinsey'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          },
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
            'employee': {
              'fullName': 'Simon Slow'
            },
            'createdAt': '02/10/2017',
            'signedAt': '02/10/2017'
          },
          {
            'contractId': '242a8d1e4a58e9741b6e8f509cb3d63abb8540bb',
            'employee': {
              'fullName': 'Vlad Belousov'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          },
        ]
      };
    case '/employees':
      return {
        data: [
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577', name: 'Maxim Brook', email: 'mbrook@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf578', name: 'Mike Jefferson', email: 'jeff@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579', name: 'Claudia Bullock', email: 'bullock@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf510', name: 'Maxim Brook', email: 'mbrook@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf511', name: 'Mike Jefferson', email: 'jeff@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf512', name: 'Claudia Bullock', email: 'bullock@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf513', name: 'Maxim Brook', email: 'mbrook@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf514', name: 'Mike Jefferson', email: 'jeff@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf515', name: 'Claudia Bullock', email: 'bullock@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf516', name: 'Maxim Brook', email: 'mbrook@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf517', name: 'Mike Jefferson', email: 'jeff@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf518', name: 'Claudia Bullock', email: 'bullock@yandex.ru' },
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf519', name: 'Simon Slow', email: 'sslow@yandex.ru' }
        ]
      }
    case '/api/contracts/6174b0f53573874343a4d915d4f5b6876a9a15e5/':
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a15e5',
          'employeeId': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
          'startDate': '10/21/2017',
          'contractNumber': '192',
          'jobTitle': 'Graphics Designer',
          'jobDescription': 'Design of all graphics materials for company',
          'typeOfEmployment': 'full',
          'periodOfAgreement': 'fixed',
          'periodStartDate': '10/21/2017',
          'periodEndDate': '10/21/2018',
          'compensation': '',
          'salaryAmount': {
            'currency': 'ETH',
            'amount': '300'
          },
          'dayOfPayments': '25',
          'additionalClauses': '',
          'isSignedByEmployee': true,
          'createdAt': '01/10/2017',
          'signedAt': '01/10/2017',
          "wallets": {
            "personal": {
              "address": "0x345f81e0135c896873b6526674ea2ef57e1ca111"
            },
            "corporate": {
              "address":"0x345f81e0135c896873b6526674ea2ef57e1ca777"
            }
          }
        }
      }
    case '/api/contracts/6174b0f53573874343a4d915d4f5b6876a9a1535/':
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'employeeId': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf519',
          'startDate': '10/21/2017',
          'contractNumber': '192',
          'jobTitle': 'Graphics Designer',
          'jobDescription': 'Design of all graphics materials for company',
          'typeOfEmployment': 'full',
          'periodOfAgreement': 'fixed',
          'periodStartDate': '10/21/2017',
          'periodEndDate': '10/21/2018',
          'compensation': '',
          'salaryAmount': {
            'currency': 'ETH',
            'amount': '300'
          },
          'dayOfPayments': '25',
          'additionalClauses': '',
          'isSignedByEmployee': false,
          'createdAt': '01/10/2017',
          'signedAt': '',
          "wallets": {
            "personal": {
              "address": "0x345f81e0135c896873b6526674ea2ef57e1ca111"
            },
            "corporate": {
              "address":"0x345f81e0135c896873b6526674ea2ef57e1ca777"
            }
          }
        }
      }
    case '/api/wallets/':
      return {
        'status': 200,
        'data': [
          {
            'type': 'personal',
            'address': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
            'balance': 120,
            'currrency': 'ETH',
            'created_at': 1511693723,
            'transactions': [
              {
                'id': '0x386202fde7ffd84f6f4f7c2baa98ff69fd13db4d2150bb8fc61c15f7c29d1efc',
                'employee': {
                  'id': '',
                  'wallet': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
                  'firstName': 'John',
                  'lastName': 'Doe',
                  'avatar': 'http://i.imgur.com/n613Ki4.jpg'
                },
                'status': 'pending || success || failure',
                'amount': -100,
                'currency': 'ETH',
                'date': 1511693723
              }
            ]
          },
          {
            'type': 'corporate',
            'address': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
            'balance': 120,
            'currrency': 'ETH',
            'created_at': 1511693723,
            'transactions': [
              {
                'id': '0x386202fde7ffd84f6f4f7c2baa98ff69fd13db4d2150bb8fc61c15f7c29d1efc',
                'employee': {
                  'id': '',
                  'wallet': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
                  'firstName': 'John',
                  'lastName': 'Doe',
                  'avatar': 'http://i.imgur.com/n613Ki4.jpg'
                },
                'status': 'pending || success || failure',
                'amount': -100,
                'currency': 'ETH',
                'date': 1511693723
              }
            ]
          },
          {
            'type': 'corporate',
            'address': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
            'balance': 120,
            'currrency': 'JCR',
            'created_at': 1511693723,
            'transactions': [
              {
                'id': '0x00c80a636ccad3c477f1406580f1fa9600d3678a0d317da7dcf3661206c4c4c4',
                'employee': {
                  'id': '',
                  'wallet': '0x949c9b8dff9b264cad57f69cd98eca1338f05b39',
                  'firstName': 'Jane',
                  'lastName': 'Doe',
                  'avatar': 'http://i.imgur.com/n613Ki4.jpg'
                },
                'status': 'pending || success || failure',
                'amount': 10,
                'currency': 'ETH',
                'date': 1511693723
              }
            ]
          }
        ]
      }
  }
};

const postMock = (path: string, body: any) => {
  switch (path) {
    case '/api/contracts/':
      console.log('!!! POST CONTRACT. BODY:', body);
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'createdAt': '01/10/2017',
          'verificationId': '1c7d2871-8af6-4e2d-a9a5-b5e7ab41a53e'
        }
      }
    case '/api/contracts/6174b0f53573874343a4d915d4f5b6876a9a1535/actions/verify/':
      console.log('!!! POST VERIFY. BODY:', body);
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'employeeId': 'e316a9e8cba9131b675bfec0f0a662eea5fca517',
          'signedAt': '01/10/2017'
        }
      }
  }
}

export const get = (path: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMock(path));
    }, 1000);
  });
}

export const post = (path: string, body: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(postMock(path, body));
    }, 1000);
  });
}