//decorator is a function that attaches the meta data or behaviour to a  class , mehtod , property or paramerter.
// It is an extra information or extra behaviour added without changing the original code.
//@decoratorname  decorator for which we are creating need to define in target
//class MyClass {}
function Log(target:any)
{
    console.log("This class is created for general purpose which may deprecated after a week ")
}
function Log1(target:any)
{
    console.log("created ")
}
// Log is a decorator function and target is the class & decorator runs at definition time , not when object is created

@Log
@Log1
class Product{
    name = "Laptop";
}

function Logger(constructor:Function)
{
    console.log("Logging", constructor.name);
}
@Logger
class User{
    name="Niti";
}
function logMethod(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // Store the original method
  // Replace the original method with a new function
  descriptor.value = function(...args: any[]) {
    console.log(`Method "${String(propertyKey)}" called with arguments:`, args);
    const result = originalMethod.apply(this, args); // Call the original method with the correct 'this' context
    console.log(`Method "${String(propertyKey)}" returned:`, result);
    return result;
  };
  // Return the new descriptor to apply the changes
  return descriptor;
}
class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}
const calc = new Calculator();
calc.add(5, 3);
// Output:
// Method "add" called with arguments: [ 5, 3 ]
// Method "add" returned: 8