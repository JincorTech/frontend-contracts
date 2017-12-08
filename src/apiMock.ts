import { setTimeout } from 'timers';

const getMock = (path: string) => {
  switch (path) {
    case '/employee/me/':
      return {
        'status': 200,
        'data': {
          'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf519',
          'profile': {
            'name': 'Simon Slow',
            'position': 'Tester',
            'role': 'admin',
            'avatar': 'http://i.imgur.com/n613Ki4.jpg'
          },
          'admin': true,
          'contacts': {
            'email': 'john@doe.com',
            'phone': null
          },
          'company': {
            'id': 'a3cbe21c-bab6-4c72-9d2e-8907f9a56898',
            'legalName': 'Test Company',
            'profile': {
              'brandName': {
                'en': 'My english brand name',
                'ru': 'Русское название'
              },
              'picture': 'https://s3.eu-west-2.amazonaws.com/jincor-test/a3cbe21c-bab6-4c72-9d2e-8907f9a56898/avatars/pic_58f05129ba5cd.png',
              'links': [
                {
                  'name': 'facebook',
                  'value': 'http://facebook.com'
                }
              ],
              'email': 'admin@jincor.com',
              'phone': '+7999229393',
              'address': {
                'country': {
                  'id': '5ac1d660-2891-48cb-8527-8ef8813b37a9',
                  'name': 'Russia'
                },
                'city': null,
                'formattedAddress': 'Пироговый переулок, 5, оф. 15'
              }
            },
            'economicalActivityTypes': [
              {
                'id': '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
                'name': 'Forestry & Logging',
                'code': 'AD'
              },
              {
                'id': '0e5e6e6a-5a39-4803-9837-156113692c2d',
                'name': 'Oil Refining & Natural Gas Processing',
                'code': 'CG'
              }
            ],
            'companyType': {
              'id': '547e7d91-bc27-4407-a27a-429d2855652b',
              'name': 'Public Company',
              'code': 'BT2'
            },
            'employeesCount': 2
          }
        }
      };
    case '/contracts/':
      return {
        'status': 200,
        'data': [
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1515',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577',
              'avatar': null,
              'fullName': 'Maxim Brook'
            },
            'createdAt': '01/09/2017',
            'signedAt': '01/09/2017'
          },
          {
            'contractId': 'a6a0c6e7ee5f1536d66dab3db3462596864a8db1',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf578',
              'avatar': null,
              'fullName': 'Mike Jefferson'
            },
            'createdAt': '01/10/2017',
            'signedAt': null
          },
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a15e5',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': null,
              'fullName': 'Claudia Bullock'
            },
            'createdAt': '05/10/2017',
            'signedAt': '05/10/2017'
          },
          {
            'contractId': 'a0738f01bd8b6bb9b60a72194cabfefa87812cbd',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': null,
              'fullName': 'Alexander Nepomeluev'
            },
            'createdAt': '01/11/2017',
            'signedAt': null
          },
          {
            'contractId': 'e167606ad8125bef29755c6265f601f896c977c3',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': null,
              'fullName': 'Ernest Berlin'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          },
          {
            'contractId': '4cece768b4d791d6f86c6da0b1b1fa01538b604a',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': null,
              'fullName': 'Henry McKinsey'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          },
          {
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': 'https://s3.eu-west-2.amazonaws.com/jincor-test/a3cbe21c-bab6-4c72-9d2e-8907f9a56898/avatars/pic_58f05129ba5cd.png',
              'fullName': 'Simon Slow'
            },
            'createdAt': '02/10/2017',
            'signedAt': '02/10/2017'
          },
          {
            'contractId': '242a8d1e4a58e9741b6e8f509cb3d63abb8540bb',
            'employee': {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'avatar': null,
              'fullName': 'Vlad Belousov'
            },
            'createdAt': '01/10/2017',
            'signedAt': '01/10/2017'
          }
        ]
      };
    case '/employee/colleagues/':
      return {
        data: {
          'self': {
            'id': '3e696895-ab1b-44ec-8646-86067877e38c',
            'profile': {
              'name': 'Admin Company 2',
              'firstName': 'Admin',
              'lastName': 'Company 2',
              'position': 'Admin',
              'role': 'company-admin',
              'avatar': null
            },
            'contacts': {
              'email': 'admin@company2.com',
              'phone': null
            },
            'meta': {
              'status': 'active',
              'registeredAt': '2017-06-13T05:57:21+0000'
            }
          },
          'active': [
            {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf577',
              'profile': {
                'name': 'Maxim Brook',
                'position': 'Frontend wizard',
                'role': 'admin',
                'avatar': 'https://s3.eu-west-2.amazonaws.com/jincor-test/a3cbe21c-bab6-4c72-9d2e-8907f9a56898/avatars/pic_58f05129ba5cd.png'
              },
              'contacts': {
                'email': 'mbrook@yandex.ru',
                'phone': null
              },
              'meta': {
                'status': 'active',
                'registeredAt': '2017-04-14T01:34:28+0000'
              },
              'wallets': [
                {
                  'type': 'personal',
                  'address': '0x345f81e0135c896873b6526674ea2ef57e1ca371',
                  'balance': 0,
                  'currency': 'ETH',
                  'created_at': 1512043628,
                  'transactions': []
                },
                {
                  'type': 'personal',
                  'address': '0x3f97db8c9b9c4097044628d614fc4afd52cd6cea',
                  'balance': 0,
                  'currency': 'JCR',
                  'created_at': 1512043628,
                  'transactions': []
                }
              ]
            },
            {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf578',
              'profile': {
                'name': 'Mike Jefferson',
                'position': 'Frontend wizard',
                'role': 'admin',
                'avatar': null
              },
              'contacts': {
                'email': 'jeff@yandex.ru',
                'phone': null
              },
              'meta': {
                'status': 'active',
                'registeredAt': '2017-04-14T01:34:28+0000'
              },
              'wallets': [
                {
                  'type': 'personal',
                  'address': '0x345f81e0135c896873b6526674ea2ef57e1ca371',
                  'balance': 0,
                  'currency': 'ETH',
                  'created_at': 1512043628,
                  'transactions': []
                },
                {
                  'type': 'personal',
                  'address': '0x3f97db8c9b9c4097044628d614fc4afd52cd6cea',
                  'balance': 0,
                  'currency': 'JCR',
                  'created_at': 1512043628,
                  'transactions': []
                }
              ]
            },
            {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf579',
              'profile': {
                'name': 'Claudia Bullock',
                'position': 'Frontend wizard',
                'role': 'admin',
                'avatar': null
              },
              'contacts': {
                'email': 'bullock@yandex.ru',
                'phone': null
              },
              'meta': {
                'status': 'active',
                'registeredAt': '2017-04-14T01:34:28+0000'
              },
              'wallets': [
                {
                  'type': 'personal',
                  'address': '0x345f81e0135c896873b6526674ea2ef57e1ca370',
                  'balance': 0,
                  'currency': 'ETH',
                  'created_at': 1512043628,
                  'transactions': []
                },
                {
                  'type': 'personal',
                  'address': '0x3f97db8c9b9c4097044628d614fc4afd52cd6cea',
                  'balance': 0,
                  'currency': 'JCR',
                  'created_at': 1512043628,
                  'transactions': []
                }
              ]
            },
            {
              'id': '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf519',
              'profile': {
                'name': 'Simon Slow',
                'position': 'Frontend wizard',
                'role': 'admin',
                'avatar': 'https://s3.eu-west-2.amazonaws.com/jincor-test/a3cbe21c-bab6-4c72-9d2e-8907f9a56898/avatars/pic_58f05129ba5cd.png'
              },
              'contacts': {
                'email': 'sslow@yandex.ru',
                'phone': null
              },
              'meta': {
                'status': 'active',
                'registeredAt': '2017-04-14T01:34:28+0000'
              },
              'wallets': [
                {
                  'type': 'personal',
                  'address': '0x345f81e0135c896873b6526674ea2ef57e1ca372',
                  'balance': 0,
                  'currency': 'ETH',
                  'created_at': 1512043628,
                  'transactions': []
                },
                {
                  'type': 'personal',
                  'address': '0x3f97db8c9b9c4097044628d614fc4afd52cd6cea',
                  'balance': 0,
                  'currency': 'JCR',
                  'created_at': 1512043628,
                  'transactions': []
                }
              ]
            }
          ],
          'deleted': [
            {
              'id': '3d7563a2-cdc9-4877-a322-a3c3edd5ad24',
              'profile': {
                'name': 'David Totraev',
                'position': 'Frontend wizard',
                'role': 'employee',
                'avatar': null
              },
              'contacts': {
                'email': 'hlogeon1@gmail.com',
                'phone': null
              },
              'meta': {
                'status': 'deleted',
                'registeredAt': '2017-04-20T03:21:01+0000',
                'deletedAt': '2017-04-20T04:10:06+0000'
              }
            }
          ],
          'invited': []
        }
      };
    case '/contracts/6174b0f53573874343a4d915d4f5b6876a9a15e5/':
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
          'additionalClauses': 'Some additional information',
          'isSignedByEmployee': true,
          'createdAt': '01/10/2017',
          'signedAt': '01/10/2017',
          'wallets': {
            'personal': {
              'address': '0x345f81e0135c896873b6526674ea2ef57e1ca111'
            },
            'corporate': {
              'address': '0x345f81e0135c896873b6526674ea2ef57e1ca777'
            }
          }
        }
      };
    case '/contracts/6174b0f53573874343a4d915d4f5b6876a9a1535/':
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
          'periodOfAgreement': 'permanent',
          'periodStartDate': null,
          'periodEndDate': null,
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
          'wallets': {
            'personal': {
              'address': '0x345f81e0135c896873b6526674ea2ef57e1ca111'
            },
            'corporate': {
              'address': '0x345f81e0135c896873b6526674ea2ef57e1ca777'
            }
          }
        }
      };
    case '/wallets/':
      return {
        'status': 200,
        'data': [
          {
            'type': 'personal',
            'address': '0xa9eebb32a1d459eb1eb5078c543427c34da44313',
            'balance': 120,
            'currency': 'ETH',
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
            'currency': 'ETH',
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
            'currency': 'JCR',
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
      };
    case '/company/my/':
      return {
        'status': 200,
        'data': {
          'id': 'a3cbe21c-bab6-4c72-9d2e-8907f9a56898',
          'legalName': 'Test Company',
          'profile': {
            'brandName': {
              'en': 'My english brand name',
              'ru': 'Мое русское брендовое имя!'
            },
            'picture': 'https://s3.eu-west-2.amazonaws.com/jincor-test/a3cbe21c-bab6-4c72-9d2e-8907f9a56898/avatars/pic_58f0455407416.png',
            'links': [
              {
                'name': 'facebook',
                'value': 'http://facebook.com'
              }
            ],
            'email': 'admin@jincor.com',
            'phone': '+7999229393',
            'address': {
              'country': {
                'id': '5ac1d660-2891-48cb-8527-8ef8813b37a9',
                'name': 'Russia'
              },
              'city': null,
              'formattedAddress': 'Москва, ул. Алая, д. 15, оф. 89, 602030'
            }
          },
          'economicalActivityTypes': [
            {
              'id': '72a0d7d3-afaf-4f0f-936c-ca4ffa55a7a6',
              'name': 'Forestry & Logging',
              'code': 'AD'
            },
            {
              'id': '0e5e6e6a-5a39-4803-9837-156113692c2d',
              'name': 'Oil Refining & Natural Gas Processing',
              'code': 'CG'
            }
          ],
          'companyType': {
            'id': '547e7d91-bc27-4407-a27a-429d2855652b',
            'name': 'Public Company',
            'code': 'BT2'
          },
          'employeesCount': 2
        }
      };
  }
};

const postMock = (path: string, body: any) => {
  switch (path) {
    case '/contracts/':
      console.log('!!! POST CONTRACT. BODY:', body);
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'createdAt': '01/10/2017',
          'verificationId': '1c7d2871-8af6-4e2d-a9a5-b5e7ab41a53e'
        }
      };
    case '/contracts/6174b0f53573874343a4d915d4f5b6876a9a1535/actions/verify/':
      console.log('!!! POST VERIFY. BODY:', body);
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'employeeId': 'e316a9e8cba9131b675bfec0f0a662eea5fca517',
          'signedAt': '01/10/2017'
        }
      };
    case '/contracts/6174b0f53573874343a4d915d4f5b6876a9a1535/actions/sign/':
      console.log('!!! POST SIGN. BODY:', body);
      return {
        'status': 200,
        'data': {
          'contractId': '6174b0f53573874343a4d915d4f5b6876a9a1535',
          'employeeId': 'e316a9e8cba9131b675bfec0f0a662eea5fca517',
          'verificationId': '1c7d2871-8af6-4e2d-a9a5-b5e7ab41a53e'
        }
      };
  }
};

export const get = (path: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMock(path));
    }, 1000);
  });
};

export const post = (path: string, body: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(postMock(path, body));
    }, 1000);
  });
};
