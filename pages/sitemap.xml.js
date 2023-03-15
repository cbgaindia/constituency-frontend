import fs from 'fs';
import { stateSchemeFetch, fetchQuery } from 'utils/fetch';

const baseUrl = 'https://constituency.openbudgetsindia.org';
const Sitemap = () => {};

function deSlug(str) {
  const re = /(\b[a-z](?!\s))/g;
  const capital = str.replace(re, function (x) {
    return x.toUpperCase();
  });

  return capital.replace('-', ' ');
}
export const getServerSideProps = async function ({ res }) {
  // get JSON URL
  const jsonUrl = await fetchQuery('schemeType', 'Cons Info')
    .then((res) => res[0].resources.filter((e) => e.format == 'JSON')[0].url)
    .catch((e) => console.error(e));

  // fetch JSON data
  const jsonData = await fetch(jsonUrl)
    .then((res) => res.json())
    .catch((e) => console.error(e));

  const stateData = await stateSchemeFetch();
  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.tsx',
        '_document.tsx',
        '_error.tsx',
        'sitemap.xml.js',
        'index.tsx',
        '[state]',
        'explorer',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`; // Add Static pages like resources, about
    });
  staticPages.unshift(baseUrl); // Remove duplicate of base url
  Object.keys(jsonData).forEach((sabha) => {
    Object.keys(jsonData[sabha]).forEach((state) => {
      if (sabha === 'lok') {
        staticPages.push(`${baseUrl}/${state}`); // Add state pages
      }

      Object.values(jsonData[sabha][state]).forEach((elm) => {
        staticPages.push(
          `${baseUrl}/${state}/${sabha}/${elm.constituency_code}` // Add Constituency page for each state and sabha
        );
      });
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
