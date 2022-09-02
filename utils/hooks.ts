import React from 'react';
/*
  A thin wrapper around “useEffect” which
  will only fire when the value changes,
  and not on mount.
*/
export default function useEffectOnChange(
  callback: () => void,
  deps: React.DependencyList
) {
  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    callback();
  }, deps);
}

/*
  A thin wrapper around useState which
  is only supposed to be used as a toggler
*/
export function useToggle(initialValue: boolean) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}
