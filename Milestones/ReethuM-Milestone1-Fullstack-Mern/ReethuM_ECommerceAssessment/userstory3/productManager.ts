interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

function LogChange(targetProp: string) {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol();

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: any) {
        const oldVal = this[privateKey];
        this[privateKey] = value;

        const id =
          this.id !== undefined ? `Product#${this.id}` : 'Unknown';

        console.log(
          `[LogChange] ${id} - ${propertyKey} changed from ${oldVal} to ${value}`
        );
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Product implements IProduct {
  id!: number;
  name!: string;
  category!: string;

  @LogChange('price')
  price!: number;

  @LogChange('stock')
  stock!: number;

  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.price = data.price;   
    this.stock = data.stock;   
  }

  toString(): string {
    return `${this.name} (id:${this.id}) - ${this.category} - ₹${this.price} - stock:${this.stock}`;
  }
}

class ProductManager implements Iterable<[number, Product]> {
  private products = new Map<number, Product>();

  constructor(initial?: IProduct[]) {
    if (initial) {
      for (const p of initial) {
        this.products.set(p.id, new Product(p));
      }
    }
  }

  updatePrice(id: number, newPrice: number): void {
    const product = this.products.get(id);
    if (!product) throw new Error('Product not found');
    product.price = newPrice;
  }

  updateStock(id: number, newStock: number): void {
    const product = this.products.get(id);
    if (!product) throw new Error('Product not found');
    product.stock = newStock;
  }

  *[Symbol.iterator](): IterableIterator<[number, Product]> {
    for (const entry of this.products) {
      yield entry;
    }
  }
}

const initial: IProduct[] = [
  { id: 1, name: 'Laptop Backpack', category: 'accessories', price: 1499, stock: 20 },
  { id: 2, name: 'Scientific Calculator', category: 'electronics', price: 999, stock: 15 },
  { id: 3, name: 'Desk Organizer', category: 'stationery', price: 499, stock: 8 }
];

const manager = new ProductManager(initial);

console.log('Initial products:');
for (const [, p] of manager) {
  console.log(p.toString());
}

manager.updatePrice(1, 1399);
manager.updateStock(3, 12);

console.log('After updates:');
for (const [, p] of manager) {
  console.log(p.toString());
}
