export function sectionCollapse(e: any, wrapperRef) {
  const btn = e.target;
  console.log(btn);
  
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

const ex = {
  abc: 'abc',
  def: 'def',
};

export function simplifyNaming(key, obj) {
  if (obj[key]) return obj[key];
  else return key;
}
