import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../../product/product';
import { ProductService } from '../../../shared/product.service';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { NotificationComponent } from '../../../shared/notification/notification.component';
import { LoadingIndicatorComponent } from '../../../shared/loading-indicator/loading-indicator.component';

@Component({
    selector: 'app-product-index',
    standalone: true,
    imports: [
        HttpClientModule,
        TableModule,
        RouterModule,
        CommonModule,
        ConfirmDialogComponent,
        InputTextModule,
        NotificationComponent,
        LoadingIndicatorComponent,
    ],
    providers: [ProductService],
    templateUrl: './product-index.component.html',
    styleUrl: './product-index.component.css',
})
export class ProductIndexComponent {
    @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
    @ViewChild('dt2') dt2: Table | undefined;
    @ViewChild('notification') notification!: NotificationComponent;
    @ViewChild(LoadingIndicatorComponent) loadingIndictor!: LoadingIndicatorComponent;

    isLoading: boolean = false;
    products: Product[] = [];
    selectedProductId: number = -1;
    successMessage: string = '';

    constructor(public productService: ProductService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.productService.getAll().subscribe(
            (data: Product[]) => {
                this.products = data;
                console.log(this.products);
                this.isLoading = false;
            },
            (error) => {
                this.successMessage = `An error occured when retrieving the products!`;
                this.notification.color = '#f44336';
                this.notification.show();
                this.isLoading = false;
            },
        );
    }

    onGlobalFilter(event: Event) {
        // Cast the event target to an HTMLInputElement
        const input = event.target as HTMLInputElement;
        const filterValue = input.value;

        // Apply the global filter
        if (this.dt2) {
            this.dt2.filterGlobal(filterValue, 'contains');
        }
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    onDelete(productId: number): void {
        this.selectedProductId = productId;
        this.confirmDialog.show('Confirm Deletion', 'Are you sure you want to delete this product?');
    }

    deleteProduct(id: number) {
        this.isLoading = true;
        this.productService.delete(id).subscribe(
            (res) => {
                this.products = this.products.filter((item) => item.id != id);
                this.successMessage = `Product ${id} deleted successfully!`;
                this.notification.color = '#4caf50';
                this.notification.show();
                this.isLoading = false;
            },
            (error) => {
                this.successMessage = `Error deleting product ${id}.`;
                this.notification.color = '#f44336'; // Red for error
                this.notification.show();
                this.isLoading = false;
            },
        );
    }
}
