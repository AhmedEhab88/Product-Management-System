import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from '../../../shared/product.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
    selector: 'app-product-create',
    standalone: true,
    imports: [HttpClientModule, CommonModule, ReactiveFormsModule, NotificationComponent],
    providers: [ProductService],
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
    form!: FormGroup;
    @ViewChild('notification') notification!: NotificationComponent;

    successMessage: string = '';

    constructor(
        public productService: ProductService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
            Price: new FormControl('', [Validators.required, Validators.min(0)]),
        });
    }

    get f() {
        return this.form.controls;
    }

    submit() {
        console.log(this.form.value);
        this.productService.create(this.form.value).subscribe(
            (res) => {
                this.successMessage = `Product created successfully!`;
                this.notification.color = '#4caf50';
                this.notification.show();
                setTimeout(() => {
                    this.router.navigateByUrl('products/index');
                }, 2000);
            },
            (error) => {
                this.successMessage = `An error occured when creating the product, please try again.`;
                this.notification.color = '#f44336';
                this.notification.show();
            },
        );
    }
}
