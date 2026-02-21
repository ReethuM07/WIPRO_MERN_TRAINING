"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogChange(targetProp) {
    return function (target, propertyKey) {
        const privateKey = Symbol();
        Object.defineProperty(target, propertyKey, {
            get() {
                return this[privateKey];
            },
            set(value) {
                const oldVal = this[privateKey];
                this[privateKey] = value;
                const id = this.id !== undefined ? `Product#${this.id}` : 'Unknown';
                console.log(`[LogChange] ${id} - ${propertyKey} changed from ${oldVal} to ${value}`);
            },
            enumerable: true,
            configurable: true
        });
    };
}
class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.price = data.price;
        this.stock = data.stock;
    }
    toString() {
        return `${this.name} (id:${this.id}) - ${this.category} - ₹${this.price} - stock:${this.stock}`;
    }
}
__decorate([
    LogChange('price')
], Product.prototype, "price", void 0);
__decorate([
    LogChange('stock')
], Product.prototype, "stock", void 0);
class ProductManager {
    constructor(initial) {
        this.products = new Map();
        if (initial) {
            for (const p of initial) {
                this.products.set(p.id, new Product(p));
            }
        }
    }
    updatePrice(id, newPrice) {
        const product = this.products.get(id);
        if (!product)
            throw new Error('Product not found');
        product.price = newPrice;
    }
    updateStock(id, newStock) {
        const product = this.products.get(id);
        if (!product)
            throw new Error('Product not found');
        product.stock = newStock;
    }
    *[Symbol.iterator]() {
        for (const entry of this.products) {
            yield entry;
        }
    }
}
const initial = [
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
