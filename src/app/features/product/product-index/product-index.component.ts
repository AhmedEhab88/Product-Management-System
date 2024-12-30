import { Component } from '@angular/core';
import { Product } from '../../product/product';
import { ProductService } from '../../../shared/product.service';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-product-index',
    imports: [TableModule],
    templateUrl: './product-index.component.html',
    styleUrl: './product-index.component.css',
})
export class ProductIndexComponent {
    products: Product[] = [];

    constructor(public productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAll().subscribe((data: Product[]) => {
            this.products = data;
            console.log(this.products);
        });
    }

    deleteProduct(id: number) {
        this.productService.delete(id).subscribe((res) => {
            this.products = this.products.filter((item) => item.id != id);
            console.log(`Post ${id} deleted successfully `);
        });
    }
}
