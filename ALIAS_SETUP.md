# Alias Configuration Setup

This project has been configured with custom import aliases to make imports cleaner and more maintainable.

## Available Aliases

| Alias           | Path             | Description           |
| --------------- | ---------------- | --------------------- |
| `@/*`           | `./*`            | Root directory        |
| `@components/*` | `./components/*` | UI components         |
| `@public/*`     | `./public/*`     | Static assets         |
| `@lib/*`        | `./lib/*`        | Utility functions     |
| `@app/*`        | `./app/*`        | App router components |

## Usage Examples

### Importing Components

```typescript
// Instead of
import { Button } from '../../../components/ui/button';

// Use
import { Button } from '@components/ui/button';
```

### Importing Public Assets

```typescript
// Instead of
import logo from '../../../public/next.svg';

// Use
import logo from '@public/next.svg';
```

### Importing Utilities

```typescript
// Instead of
import { cn } from '../../../lib/utils';

// Use
import { cn } from '@lib/utils';
```

### Importing App Components

```typescript
// Instead of
import Layout from '../layout';

// Use
import Layout from '@app/layout';
```

## Configuration Files

### next.config.ts

The webpack configuration includes alias resolution:

```typescript
webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, './'),
    '@components': path.resolve(__dirname, './components'),
    '@public': path.resolve(__dirname, './public'),
    '@lib': path.resolve(__dirname, './lib'),
    '@app': path.resolve(__dirname, './app'),
  };
  return config;
};
```

### tsconfig.json

TypeScript path mapping for IntelliSense:

```json
{
  "paths": {
    "@/*": ["./*"],
    "@components/*": ["./components/*"],
    "@public/*": ["./public/*"],
    "@lib/*": ["./lib/*"],
    "@app/*": ["./app/*"]
  }
}
```

## Benefits

1. **Cleaner Imports**: No more long relative paths
2. **Better Maintainability**: Easy to move files without breaking imports
3. **IntelliSense Support**: Full TypeScript support with autocomplete
4. **Consistent Structure**: Standardized import patterns across the project

## IDE Support

Most modern IDEs (VS Code, WebStorm, etc.) will automatically recognize these aliases and provide:

- Autocomplete suggestions
- Go to definition
- Refactoring support
- Import organization
