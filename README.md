# site-health-checker

A package to check site health for AdBlock, cookies, and localStorage issues.

## Installation

To install, run:

```bash
npm install site-health-checker
```

or

```bash
yarn add site-health-checker
```

## Usage

Import and Configure

Import the checkSiteHealth function from site-health-checker in your JavaScript file:

```javascript
import { checkSiteHealth } from 'site-health-checker';
```

Call checkSiteHealth to perform the check. The function returns a promise that resolves to an object with details about detected issues.

```javascript
checkSiteHealth().then((result) => {
  if (result.hasError) {
    // Mostrar el lightbox con los errores
    console.log('Errores detectados:', result.errorDetails);
    // Aquí puedes implementar la lógica para mostrar un lightbox
    // y obligar al usuario a solucionar los problemas detectados.
  } else {
    console.log('Todo está en orden.');
  }
});
```
