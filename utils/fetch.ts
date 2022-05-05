import { read, utils as xlsxUtil } from 'xlsx';

export const fetchDatasets = async (variables) => {
  function changeKeyName(key) {
    if (key == 'size') return 'rows';
    else if (key == 'from') return 'start';
    else return key;
  }

  variables.fq
    ? (variables.fq = variables.fq.concat(
        ` AND (tags:scheme-category AND groups:budgets-for-justice)`
      ))
    : (variables.fq = `(tags:scheme-category AND groups:budgets-for-justice)`);

  // creating a string of parameter from object of variables for CKAN API use
  const varArray = Object.keys(variables).map((key) => {
    return `${changeKeyName(key)}=${variables[key]}`;
  });

  const varString =
    varArray.length > 0
      ? varArray.join('&')
      : `fq=(tags:scheme-category AND groups:budgets-for-justice)`;

  const response = await fetch(
    `${process.env.CKAN_URL}/package_search?${varString}`
  );
  const data = await response.json();
  return data;
};

export async function fetchFilters(list, variable, page) {
  try {
    // if filters and searc found in url, also use those
    // const queryVars = `fq=${variable.fq ? `type:${page}` : `type:${page}`}&q=${
    //   variable.q ? variable.q : ''
    // }`;

    const fetchData = await fetch(
      `${process.env.CKAN_URL}/package_search?facet.field=[${list}]`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

export function convertToCkanSearchQuery(query) {
  const ckanQuery = {
    q: '',
    fq: '',
    rows: '',
    start: '',
    sort: '',
    'facet.field': '',
    'facet.limit': '',
    'facet.mincount': 0,
    organization: {},
  };
  // Split by space but ignore spaces within double quotes:
  if (query.q) {
    query.q.match(/(?:[^\s"]+|"[^"]*")+/g).forEach((part) => {
      if (part.includes(':')) {
        ckanQuery.fq += part + ' ';
      } else {
        ckanQuery.q += part + ' ';
      }
    });
    ckanQuery.fq = ckanQuery.fq.trim();
    ckanQuery.q = ckanQuery.q.trim();
  }

  if (query.fq) {
    ckanQuery.fq = ckanQuery.fq ? ckanQuery.fq + ' ' + query.fq : query.fq;
  }

  // standard 'size' => ckan 'rows'
  ckanQuery.rows = query.size || '';

  // standard 'from' => ckan 'start'
  ckanQuery.start = query.from || '';
  ckanQuery.organization = query.organization || '';

  // standard 'sort' => ckan 'sort'
  const sortQueries = [];
  if (query.sort && query.sort.constructor == Object) {
    for (let [key, value] of Object.entries(query.sort)) {
      sortQueries.push(`${key} ${value}`);
    }
    ckanQuery.sort = sortQueries.join(',');
  } else if (query.sort && query.sort.constructor == String) {
    ckanQuery.sort = query.sort.replace(':', ' ');
  } else if (query.sort && query.sort.constructor == Array) {
    query.sort.forEach((sort) => {
      sortQueries.push(sort.replace(':', ' '));
    });
    ckanQuery.sort = sortQueries.join(',');
  }

  // Facets
  ckanQuery['facet.field'] = query['facet.field'] || ckanQuery['facet.field'];
  ckanQuery['facet.limit'] = query['facet.limit'] || ckanQuery['facet.limit'];
  ckanQuery['facet.mincount'] =
    query['facet.mincount'] || ckanQuery['facet.mincount'];
  ckanQuery['facet.field'] = query['facet.field'] || ckanQuery['facet.field'];

  // Remove attributes with empty string, null or undefined values
  Object.keys(ckanQuery).forEach(
    (key) => !ckanQuery[key] && delete ckanQuery[key]
  );

  return ckanQuery;
}

export async function fetchQuery(query, value) {
  const queryRes = await fetch(
    `http://3.109.56.211/api/3/action/package_search?fq=${query}:"${value}"+organization:constituency-wise-scheme-data&rows=50`
  ).then((res) => res.json());

  return queryRes.result.results;
}

export async function fetchSheets(link) {
  const result = [];
  await fetch(link)
    .then((res) => {
      if (!res.ok) throw new Error('fetch failed');
      return res.arrayBuffer();
    })
    .then((ab) => {
      const file = new Uint8Array(ab);
      const workbook = read(file, { type: 'array' });

      workbook.SheetNames.forEach((bookName) => {
        const data = workbook.Sheets[bookName];

        const dataParse = xlsxUtil.sheet_to_json(data, {
          header: 1,
          blankrows: false,
        });
        result.push(dataParse);
      });
    });
  return result;
}

export function generateSlug(slug) {
  if (slug) {
    const temp = slug.toLowerCase().replace(/\W/g, '-'); // lower case and replace space & special chars witn '-'
    return temp.replace(/-+/g, '-').replace(/-$/, ''); // remove multiple '-' and remove '-' from end of string
  }
  return null;
}

export async function dataTransform(id) {
  const obj: any = {
    ac: {},
    pc: {},
  };
  let name;
  let type;
  let slug;
  let acUrl;
  let pcUrl;
  await fetchQuery('slug', id).then((data) => {
    data[0].resources.forEach((file) => {
      if (file.name.includes('pc.xlsx')) pcUrl = file.url;
      else if (file.name.includes('ac.xlsx')) acUrl = file.url;
    });

    name = data[0].extras[0].value;
    type = data[0].extras[1].value;
    slug = data[0].name || '';
  });

  if (acUrl) {
    await fetchSheets(acUrl).then((res) => {
      const dataParse = res[0];
      const metaParse = res[1];
      let metaObj: any = {};

      // Meta Data
      metaParse.forEach((val) => {
        if (val[0]) {
          metaObj = {
            ...metaObj,
            [generateSlug(val[0])]: val[1],
          };
        }
      });
      console.log(dataParse[2]);

      // creating list of constituencies
      const consList = {};
      dataParse.map((item, index) => {
        if (consList[item[0]]) {
          if (item[3] == dataParse[index - 1][3]) return;
          consList[item[0]].push({
            constName: item[2],
            constCode: item[3],
          });
        } else {
          if (item[0] == 'state_ut_name') return;
          else
            consList[item[0]] = [
              {
                constName: item[2],
                constCode: item[3],
              },
            ];
        }
      });

      obj.ac.metadata = {
        description: metaObj['scheme-description'] || '',
        name: name || '',
        frequency: metaObj.frequency || '',
        source: metaObj['data-source'] || '',
        type: type || '',
        note: metaObj['note:'] || '',
        slug,
        indicators: [],
        consList: consList || [],
      };

      // Tabular Data
      for (let i = 5; i < dataParse[0].length; i += 1) {
        let fiscal_year = {};
        const state_Obj = {};
        for (let j = 1; j < dataParse.length; j += 1) {
          if (!(dataParse[j][0] in state_Obj)) {
            fiscal_year = {};
          }
          if (dataParse[j][4]) {
            fiscal_year[dataParse[j][4].trim()] = {
              ...fiscal_year[dataParse[j][4].trim()],
              [dataParse[j][3]]: Number.isNaN(parseFloat(dataParse[j][i]))
                ? '0'
                : parseFloat(dataParse[j][i]).toFixed(2),
            };
          }
          state_Obj[dataParse[j][0]] = { ...fiscal_year };
        }
        const indicatorSlug =
          generateSlug(metaObj[`indicator-${i - 4}-name`]) || '';

        obj.ac.metadata.indicators.push(indicatorSlug);

        obj.ac.data = {
          ...obj.ac.data,
          [`indicator_0${i - 4}`]: {
            state_Obj,
            name: metaObj[`indicator-${i - 4}-name`] || '',
            description: metaObj[`indicator-${i - 4}-description`] || '',
            note: metaObj[`indicator-${i - 4}-note`] || '',
            slug: indicatorSlug,
            unit: metaObj[`indicator-${i - 4}-unit`] || '',
          },
        };
      }
    });
  }

  if (pcUrl) {
    await fetchSheets(pcUrl).then((res) => {
      const dataParse = res[0];
      const metaParse = res[1];
      let metaObj: any = {};

      // Meta Data
      metaParse.forEach((val) => {
        if (val[0]) {
          metaObj = {
            ...metaObj,
            [generateSlug(val[0])]: val[1],
          };
        }
      });

      // creating list of constituencies
      const consList = {};
      dataParse.map((item, index) => {
        if (consList[item[0]]) {
          if (item[3] == dataParse[index - 1][3]) return;
          consList[item[0]].push({
            constName: item[2],
            constCode: item[3],
          });
        } else {
          if (item[0] == 'state_ut_name') return;
          else
            consList[item[0]] = [
              {
                constName: item[2],
                constCode: item[3],
              },
            ];
        }
      });

      obj.pc.metadata = {
        description: metaObj['scheme-description'] || '',
        name: name || '',
        frequency: metaObj.frequency || '',
        source: metaObj['data-source'] || '',
        type: type || '',
        note: metaObj['note:'] || '',
        slug,
        indicators: [],
        consList: consList || [],
      };

      // Tabular Data
      for (let i = 5; i < dataParse[0].length; i += 1) {
        let fiscal_year = {};
        const state_Obj = {};
        for (let j = 1; j < dataParse.length; j += 1) {
          if (!(dataParse[j][0] in state_Obj)) {
            fiscal_year = {};
          }
          if (dataParse[j][4]) {
            fiscal_year[dataParse[j][4].trim()] = {
              ...fiscal_year[dataParse[j][4].trim()],
              [dataParse[j][3]]: Number.isNaN(parseFloat(dataParse[j][i]))
                ? '0'
                : parseFloat(dataParse[j][i]).toFixed(2),
            };
          }
          state_Obj[dataParse[j][0]] = { ...fiscal_year };
        }

        const indicatorSlug =
          generateSlug(metaObj[`indicator-${i - 4}-name`]) || '';

        obj.pc.metadata.indicators.push(indicatorSlug);

        obj.pc.data = {
          ...obj.pc.data,
          [`indicator_0${i - 4}`]: {
            state_Obj,
            name: metaObj[`indicator-${i - 4}-name`] || '',
            description: metaObj[`indicator-${i - 4}-description`] || '',
            note: metaObj[`indicator-${i - 4}-note`] || '',
            slug: indicatorSlug,
            unit: metaObj[`indicator-${i - 4}-unit`] || '',
          },
        };
      }
    });
  }
  return obj;
}
