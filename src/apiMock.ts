export const get = (path: string) => {
  switch (path) {
    case '/api/contracts/':
      return {
        'status': 200,
        'data': [
          {
            'contractId': '1b4a3cc41d1b0000884c8158931338e74ca849ce',
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
            'contractId': '3f269df82c56a28b1f10505d9c19b2ff6324c27b',
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
            'contractId': '6174b0f53573874343a4d915d4f5b6876a9a15e5',
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
          { id: '4a516c0a-2c02-4a9f-9e2a-da6bc5ecf518', name: 'Claudia Bullock', email: 'bullock@yandex.ru' }
        ]
      }
  }
};

export const post = (path: string, body: any) => {
  switch (path) {
    case '/api/contracts/':
      console.log('!!! POST CONTRACT. BODY:', body);
      return {
        'status': 200,
        'data': {
            'contractId': 'ea77cf482f1b5c97d9bac0ec5603b12a7bae54e2',
            'createdAt': '01/10/2017',
            'verificationId': '1c7d2871-8af6-4e2d-a9a5-b5e7ab41a53e'
        }
      }
  }
}