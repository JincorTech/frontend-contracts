export const get = (path: string) => {
  if (path === '/contracts') {
    return {
      data: [
        { name: 'Maxim Brook', date: new Date('01.10.2017'), signed: true },
        { name: 'Mike Jefferson', date: new Date('05.10.2017'), signed: false },
        { name: 'Claudia Bullock', date: new Date('03.10.2017'), signed: false }
      ]
    };
  }
};
