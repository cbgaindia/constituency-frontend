import { read, utils as xlsxUtil } from 'xlsx';
import { getParameterCaseInsensitive } from './helper';
import { DEFAULT_YEAR, SORTED_SCHEMES } from 'config/year';

export async function fetchQuery(query, value) {
  const queryRes = await fetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=${query}:"${value}" AND organization:constituency-wise-scheme-data AND private:false&rows=100`
  ).then((res) => res.json());

  return queryRes.result.results;
}

export async function newFetchQuery(query, value) {
  const queryRes = await fetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=${query}:"${value}" AND organization:constituency-v3 AND private:false&rows=100`
  ).then((res) => res.json());

  return queryRes.result.results;
}

// requires a schemeType to fetch the JSON file from
export async function fetchJSON(schemeType, key = null) {
  // get JSON URL
  const jsonUrl = await fetchQuery('schemeType', schemeType)
    .then((res) => res[0].resources.filter((e) => e.format == 'JSON')[0].url)
    .catch((e) => console.error(e));

  // fetch JSON data
  const jsonData = await fetch(jsonUrl)
    .then((res) => res.json())
    .catch((e) => console.error(e));

  // if key is provided, send only that data
  if (key) return jsonData[key];
  return jsonData;
}

export async function fetchSheets(link, aoa = true) {
  const result = [];
  await fetch(link)
    .then((res) => {
      if (!res.ok) throw new Error('fetch failed');
      return res.arrayBuffer();
    })
    .then(async (ab) => {
      const file = new Uint8Array(ab);
      const workbook = read(file, { type: 'array' });

      workbook.SheetNames.forEach((bookName) => {
        const data = workbook.Sheets[bookName];

        const dataParse = xlsxUtil.sheet_to_json(data, {
          header: aoa ? 1 : undefined,
          blankrows: false,
        });

        result.push(dataParse);
      });
    });
  return result;
}

export async function stateSchemeFetch(state = null) {
  const stateList = await newFetchQuery(
    'schemeType',
    'Centrally Sponsored Scheme'
  );

  const statesData = stateList.map((scheme) => ({
    state: scheme.extras[3].value,
    scheme_name: scheme.extras[0].value,
    slug: scheme.extras[2].value,
  }));

  const stateScheme = {};
  statesData.map((state) => {
    state.state.split(',').map((each_state) => {
      if (each_state in stateScheme) {
        stateScheme[each_state].push({
          scheme_name: state.scheme_name,
          scheme_slug: state.slug,
        });
      } else {
        stateScheme[each_state] = [
          { scheme_name: state.scheme_name, scheme_slug: state.slug },
        ];
      }
      return null;
    });
    return null;
  });

  return state ? getParameterCaseInsensitive(stateScheme, state) : stateScheme;
}

export async function stateMetadataFetch(state = null) {
  // fetch CKAN JSON
  const data = await fetchQuery('schemeType', 'State Info');

  // fetch and generate XLSX Sheet - false: don't do array of array return
  const sheet = await fetchSheets(data[0].resources[0].url, false);

  if (state) {
    const stateData = sheet[0].find(
      (o) => o.State.toLowerCase() == state.toLowerCase()
    );
    return stateData;
  }
  return sheet[0];
}

export async function consIndicatorFetch(state, cons, sabha) {
  // fetch CKAN JSON
  const data = await fetchQuery('schemeType', 'Cons Indicators');

  // fetch and generate XLSX Sheet - false: don't do array of array return
  const sheet = await fetchSheets(data[0].resources[0].url, false);

  const consObj = sheet[0].filter(
    (e) =>
      e.constituency_type === sabha &&
      e.state_name === state &&
      e.constituency_code === cons
  );
  return consObj[0];
}

export async function stateDataFetch(state, sabha) {
  const res: any = await fetch(
    `${process.env.NEXT_PUBLIC_CKAN_URL}/package_search?fq=slug:"${state}" AND organization:state-wise-scheme-data AND private:false&rows=100`
  )
    .then((res) => res.json())
    .then((res) => res.result.results[0])
    .catch((e) => {
      console.error(e);
      return 0;
    });
  const jsonUrl = res.resources.filter(
    (e) =>
      e.format == 'JSON' && e.name.includes(sabha == 'lok' ? '_pc' : '_ac')
  )[0].url;

  const jsonObj = await fetch(jsonUrl).then((res) => res.json());

  return jsonObj;
}

export function generateSlug(slug) {
  if (slug) {
    const str = slug.toLowerCase().replace(/\W/g, '-'); // lower case and replace space & special chars witn '-'
    return str.replace(/-+/g, '-').replace(/-$/, ''); // remove multiple '-' and remove '-' from end of string
  }
  return null;
}

export async function newSchemeDataFetch(id, sabha = null, schemeObj = null) {
  const obj: any = {
    ac: {},
    pc: {},
  };
  if (!id) return obj;

  let slug: string;
  let acUrl: string;
  let pcUrl: string;

  if (schemeObj) {
    slug = schemeObj.name || '';
  } else {
    await newFetchQuery('slug', id).then((data) => {
      data[0].resources.forEach((file) => {
        if (file.name.includes('pc.xlsx')) pcUrl = file.url;
        else if (file.name.includes('ac.xlsx')) acUrl = file.url;
      });
      slug = data[0].name || '';
    });
  }

  const urlArr =
    sabha == 'lok' ? [pcUrl] : sabha == 'vidhan' ? [acUrl] : [acUrl, pcUrl];

  // 'for-of' instead of forEach to wait till it finishes before returning
  for (const url of urlArr) {
    await fetchSheets(url).then((res) => {
      const dataParse = res[0];
      const metaParse = res[1];
      // if (url.includes('pc.xlsx')) obj.pc = res;
      // else obj.ac = res;
      // return;
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

      for (const key in consList) {
        const unique = [
          ...new Map(
            consList[key].map((item) => [item['constCode'], item])
          ).values(),
        ];
        consList[key] = unique;
      }

      const tempObj: any = {};
      tempObj.metadata = {
        name: metaObj['scheme_name'] || '',
        type: metaObj['scheme_type'] || '',
        description: metaObj['scheme_description'] || '',
        source: metaObj['data_source'] || '',
        frequency: metaObj.frequency || '',
        methodology: metaObj.methodology || '',
        remarks: metaObj.remarks || '',
        slug,
        indicators: [],
        consList: consList || [],
      };

      // Tabular Data
      for (let i = 5; i < dataParse[0].length; i += 1) {
        let fiscal_year = {};
        const state_Obj = {};
        for (let j = 1; j < dataParse.length; j += 1) {
          if (!(generateSlug(dataParse[j][0]) in state_Obj)) {
            fiscal_year = {};
          }
          if (dataParse[j][4]) {
            fiscal_year[dataParse[j][4].trim()] = {
              ...fiscal_year[dataParse[j][4].trim()],
              [dataParse[j][3]]: Number.isNaN(parseFloat(dataParse[j][i]))
                ? null
                : parseFloat(dataParse[j][i]).toFixed(2),
            };
          }
          state_Obj[generateSlug(dataParse[j][0])] = { ...fiscal_year };
        }
        const indicatorSlug =
          generateSlug(metaObj[`indicator_${i - 4}_name`]) || '';

        tempObj.metadata.indicators.push(indicatorSlug);

        tempObj.data = {
          ...tempObj.data,
          [indicatorSlug]: {
            state_Obj,
            name: metaObj[`indicator_${i - 4}_name`] || '',
            description: metaObj[`indicator_${i - 4}_description`] || '',
            note: metaObj[`indicator_${i - 4}_note`] || '',
            slug: indicatorSlug,
            unit: metaObj[`indicator_${i - 4}_unit`] || '',
          },
        };
      }

      if (url.includes('pc.xlsx')) obj.pc = tempObj;
      else obj.ac = tempObj;
    });
  }
  return obj;
}

export async function consDescFetch(sabha = null, state = null, code) {
  let obj = {};
  let key = sabha == 'vidhan' ? 'ac_' : 'pc_';

  await fetchQuery('slug', 'constRemarks').then(async (data) => {
    const jsonRes = data[0].resources.filter((e) => e.format == 'JSON');

    const JsonUrl = jsonRes.filter((e) => e.name.includes(key))[0].url;
    obj = await fetch(JsonUrl).then((res) => res.json());
  });
  return obj[state][code];
}

export async function fetchIndicators() {
  const url = await fetchQuery('dataType', 'IndicatorsList').then(
    (res) => res[0].resources[0].url
  );
  const json = await fetch(url).then((res) => res.json());
  return json;
}

export function yearOptions(years) {
  const default_year = DEFAULT_YEAR;
  let arr = [];
  for (var data in years) {
    arr.push(years[data].value);
  }

  const flag = arr.includes(default_year);

  let new1 = [];

  for (var i in arr) {
    if (arr[i] == default_year) continue;
    new1.push(arr[i]);
  }

  let res = [];
  flag == true ? (res = [default_year, ...new1]) : (res = [...new1]);
  let opt = [];
  for (var i in res) {
    opt.push({ value: res[i], label: res[i] });
  }
  return opt;
}
