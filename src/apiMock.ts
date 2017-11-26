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
          { id: 'ID1', name: 'Maxim Brook', email: 'mbrook@yandex.ru' },
          { id: 'ID2', name: 'Mike Jefferson', email: 'jeff@yandex.ru' },
          { id: 'ID3', name: 'Claudia Bullock', email: 'bullock@yandex.ru' }
        ]
      }
  }
};