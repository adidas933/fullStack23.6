export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number,
    public imageUrl: string,
    public image: File
  ) {}
}
