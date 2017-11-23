export const get = (path: string) => {
  if (path === '/contracts') {
    return {
      data: [
        { name: 'Maxim Brook', date: new Date('01/10/2017') },
        { name: 'Mike Jefferson', date: new Date('01/10/2017') },
        { name: 'Claudia Bullock', date: new Date('01/10/2017') }
      ]
    };
  }
}