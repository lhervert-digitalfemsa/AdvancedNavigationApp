export const linkingConfig = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Landing: {
        screens: {
          Home: 'home',
          Detail: {
            path: 'detail/:productId',
            parse: {
              productId: (id: string) => Number(id),
            },
          },
        }
      },
      Search: 'search',
      Profile: 'profile',
    },
  },
};
