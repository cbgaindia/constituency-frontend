import fs from 'fs';
import { stateSchemeFetch } from 'utils/fetch';

const Sitemap = () => {};
// try to make it dynamic
const states = [
  'bihar',
  'chhattisgarh',
  'jharkhand',
  'maharashtra',
  'odisha',
  'uttar pradesh',
];

export const getServerSideProps = async function ({ res }) {
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
        'state',
        'explorer',
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `constituencyv2.openbudgetsindia.org/${staticPagePath}`;
    });
  staticPages.unshift(`constituencyv2.openbudgetsindia.org/`);
  states.forEach((scheme) =>
    staticPages.push(`constituencyv2.openbudgetsindia.org/state/${scheme}`)
  );

  Object.keys(stateData).forEach((state) => {
    stateData[state].forEach((scheme) =>
      staticPages.push(
        `constituencyv2.openbudgetsindia.org/explorer?state=${state}&amp;scheme=${scheme.scheme_slug}`
      )
    );
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
