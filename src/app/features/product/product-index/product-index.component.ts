import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../../product/product';
import { ProductService } from '../../../shared/product.service';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-product-index',
    standalone: true,
    imports: [HttpClientModule, TableModule, RouterModule, CommonModule, ConfirmDialogComponent],
    providers: [ProductService],
    templateUrl: './product-index.component.html',
    styleUrl: './product-index.component.css',
})
export class ProductIndexComponent {
    @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

    products: Product[] = [];
    selectedProductId: number = -1;

    constructor(public productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAll().subscribe((data: Product[]) => {
            this.products = data;
            console.log(this.products);
        });
    }

    onDelete(productId: number): void {
        this.selectedProductId = productId;
        this.confirmDialog.show('Confirm Deletion', 'Are you sure you want to delete this product?');
    }

    deleteProduct(id: number) {
        console.log(`Post ${id} deleted successfully `);
        // this.productService.delete(id).subscribe((res) => {
        //     this.products = this.products.filter((item) => item.id != id);
        //     console.log(`Post ${id} deleted successfully `);
        // });
    }
}
