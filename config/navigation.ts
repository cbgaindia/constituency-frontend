export const navList = {
  site: 'Constituency Dashboard',
  logo: '',
  links: [
    {
      link: '/about',
      name: 'About',
    },
    {
      link: '/state/up',
      name: 'State Page',
    },
    {
      link: '/explorer?scheme=union-budget-data-for-the-infrastructure-facilities-for-judiciary&state=UP',
      name: 'Explorer',
    },
    {
      link: '#dataexplorer',
      name: 'Dashboards',
      submenu: [
        {
          link: '#',
          name: 'Budget Summary',
        },
        {
          link: '#',
          name: 'Summary',
        },
        {
          link: '#',
          name: 'Data Story',
        },
      ],
    },
  ],
};
