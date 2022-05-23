# Utils

This directory contains the functions used in the platform.

## Functions

### fetch 
`fetch.ts` contains functions to fetch and transform datasets, filters, and other platform related datasets.

### helpers
`helpers.ts` contains useful functions that are either used by multiple components or have the probability to be used by multiple components. Truncate, Debounce, tabbedInterface, etc.

### hooks
`hooks.ts` contains useful custom hooks that can be used in the platform.

### Resource Parser
`resourceParser.ts` contains functions to fetch and parse CSV files.

### GA
`gs.ts` contains functions that can be used to log pageview or action for Google Analytics.

### downloadPackage
`downloadPackage.js` can be used to download multiple resources in a `zip` format. It accepts an array of urls and a file name.

### schemesData
`schemesData.ts` contains an object that is used to assign icons of schemes.