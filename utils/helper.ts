export function sectionCollapse(e: any, wrapperRef) {
  const btn = e.target;

  const target = btn.nextElementSibling;
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  const selectedBtn = wrapperRef.current.querySelector(
    '[aria-expanded = "true"]'
  );
  if (selectedBtn && !expanded) {
    selectedBtn.setAttribute('aria-expanded', 'false');
    (selectedBtn.nextElementSibling as HTMLElement).hidden = true;
  }

  btn.setAttribute('aria-expanded', !expanded);
  target.hidden = expanded;
}

export function truncate(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export function simplifyNaming(key, obj) {
  if (obj[key]) return obj[key];
  else return key;
}

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function handleSearch(query, obj) {
  let newObj = [];
  if (query.length > 0) {
    Object.keys(obj).forEach((key) => {
      // searching constituency from each state
      const filteredCons = obj[key].cons.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredCons.length) {
        newObj[key] = {
          state: obj[key].state,
          cons: filteredCons,
        };
      }
    });
  }
  return newObj;
}

export function capitalize(state) {
  var splitStr = state.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}