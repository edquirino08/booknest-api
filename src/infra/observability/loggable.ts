export function Loggable() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const params = args
        .map((a) => {
          if (
            a &&
            a.body !== undefined &&
            a.query !== undefined &&
            a.params !== undefined
          ) {
            return JSON.stringify({
              body: a.body,
              query: a.query,
              params: a.params,
            });
          }
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(", ");
      console.log(`>>> ${className}.${propertyKey}: ${params}`);
      try {
        const result = await originalMethod.apply(this, args);
        console.log(`<<< ${className}.${propertyKey}`);
        return result;
      } catch (err) {
        console.error(`<<< ${className}.${propertyKey} ERROR: ${err}`);
        throw err;
      }
    };
    return descriptor;
  };
}
