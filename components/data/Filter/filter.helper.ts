export function filterChange(e: any, dataObj) {
  const selectedFilter = e.target as HTMLInputElement;
  const type = selectedFilter.dataset.type;
  const value = selectedFilter.id || selectedFilter.dataset.id;

  const filterButton = document.getElementById(value);

  if (filterButton) {
    const pressed = filterButton.getAttribute('aria-pressed');
    filterButton.setAttribute(
      'aria-pressed',
      pressed == 'false' ? 'true' : 'false'
    );
  }
  const index = dataObj[type].indexOf(value);
  if (index > -1) {
    dataObj[type].splice(index, 1);
  } else {
    dataObj[type].push(value);
  }

  const final = [];
  Object.keys(dataObj).forEach((val) => {
    if (dataObj[val].length > 0) {
      let filter = '';

      filter = filter.concat(`${val}:(`);
      const valArray = [];

      dataObj[val].forEach((item: string) => {
        valArray.push(`"${item}"`);
      });

      const valString = valArray.join(' OR ');
      filter = filter.concat(valString + ')');
      final.push(filter);
    }
  });

  const finalFilter = final.join(' AND ');
  return finalFilter;
}

export function selectedFilterClass(fq, dataObj) {
  if (fq) {
    const removeEscape = fq.replaceAll(/"/g, '');
    const splitFilters = removeEscape.split(' AND ');

    splitFilters.forEach((query: any) => {
      const id = query.split(':')[0];

      let value = query.split(':')[1];
      value = value.slice(1, value.length - 1);
      const valueArr = value.split(' OR ');

      setTimeout(() => {
        valueArr.forEach((element) => {
          dataObj[id].push(element);

          if (document.getElementById(element))
            document
              .getElementById(element)
              .setAttribute('aria-pressed', 'true');
        });
      }, 200);
    });
  }
}
