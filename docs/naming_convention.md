# Parameter Naming Convention: `in` and `local`

To improve readability and explicitly track the origin of variables within our codebase, we are adopting a strict naming convention for function parameters and their local counterparts.

## The Rule

1. **Object Destructuring for Inputs:** All functions and constructors should accept a single configuration object instead of positional parameters. This guarantees that arguments are always named when the function is called.
2. **`in`-Prefixed Parameters:** The keys inside the input configuration object must always be prefixed with `in` followed by PascalCase (e.g., `inData`, `inColumns`).
3. **`local`-Prefixed Variables:** Immediately at the top of the function body, every `in`-prefixed parameter must be assigned to a local variable prefixed with `local` (e.g., `localData`, `localColumns`). 
4. **Usage:** Only the `local`-prefixed variables should be used throughout the rest of the function body.

## Why This Convention?

> [!TIP]
> This pattern makes it visually unmistakable when a variable is derived directly from a function input. 

- **Traceability:** When reading deep into a function body, seeing `localColumns` immediately tells you that this value was passed in from the outside, rather than computed within the function itself.
- **Immutability Signalling:** It establishes a clear boundary. The `in` properties are the exact inputs, and the `local` variables are the internal representations. This pattern creates a mental safeguard against accidentally mutating the raw input arguments directly.
- **Consistency:** By standardizing this approach, every function follows the same predictable pattern for handling inputs.

## Example

```javascript
// GOOD
export function processRecords({ inRecords, inConfig }) {
    // 1. Assign to local variables
    const localRecords = inRecords;
    const localConfig = inConfig;

    // 2. Use local variables for all logic
    if (localConfig.debugMode) {
        console.log(`Processing ${localRecords.length} records...`);
    }

    localRecords.forEach(record => {
        // ...
    });
}

// BAD - Violates convention
export function processRecords(records, config) {
    if (config.debugMode) { // 'config' does not indicate it is an input
        // ...
    }
}
```
