import { Component } from '@angular/core';
import { Product } from '../../product/product';
import { ProductService } from '../../../shared/product.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-product-index',
    standalone: true,
    imports: [HttpClientModule, TableModule, RouterModule],
    providers: [ProductService],
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
