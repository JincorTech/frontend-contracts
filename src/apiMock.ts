export const get = (path: string) => {
  switch (path) {
    case '/contracts':
      return {
        data: [
          { name: 'Maxim Brook', date: new Date('01.10.2017'), signed: true },
          { name: 'Mike Jefferson', date: new Date('05.10.2017'), signed: false },
          { name: 'Claudia Bullock', date: new Date('03.10.2017'), signed: false }
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

export const post = (path: string) => {
  
}