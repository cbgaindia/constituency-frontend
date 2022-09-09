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

interface Size {
  width: number | undefined;
  height: number | undefined;
}
export function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState<Size>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
