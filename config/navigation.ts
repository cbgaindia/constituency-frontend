export const navList = {
  site: 'Constituency Dashboard',
  logo: '',
  links: [
    {
      link: '/about',
      name: 'About Us',
    },
    {
      link: '#states',
      name: 'States',
      submenu: [
        {
          link: '/state/bihar',
          name: 'Bihar',
        },
        {
          link: '/state/chhattisgarh',
          name: 'Chhattisgarh',
        },
        {
          link: '/state/jharkhand',
          name: 'Jharkhand',
        },
        {
          link: '/state/maharashtra',
          name: 'Maharashtra',
        },
        {
          link: '/state/odisha',
          name: 'Odisha',
        },
        {
          link: '/state/uttar pradesh',
          name: 'Uttar Pradesh',
        },
      ],
    },
    {
      link: '/explorer?scheme=mgnrega&state=Uttar Pradesh',
      name: 'Explorer',
    },
    {
      link: 'https://drive.google.com/drive/folders/1_Qm_yDHBlcSTvoYdV0bc9b79DRF-pzJs',
      name: 'Methodology and Resources',
    },
  ],
};
