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
          link: '/bihar',
          name: 'Bihar',
        },
        {
          link: '/chhattisgarh',
          name: 'Chhattisgarh',
        },
        {
          link: '/jharkhand',
          name: 'Jharkhand',
        },
        {
          link: '/maharashtra',
          name: 'Maharashtra',
        },
        {
          link: '/odisha',
          name: 'Odisha',
        },
        {
          link: '/uttar pradesh',
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
      external: true,
    },
  ],
};
