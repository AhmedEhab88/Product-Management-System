import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from '../../../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
    selector: 'app-product-edit',
    imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
    providers: [ProductService],
    templateUrl: './product-edit.component.html',
    styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
    id!: number;
    product!: Product;
    form!: FormGroup;
    constructor(
        public productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['productId'];
        this.productService.find(this.id).subscribe((data: Product) => {
            this.product = data;
        });

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
        this.productService.update(this.id, this.form.value).subscribe((res: any) => {
            console.log('Product updated successfully!');
            this.router.navigateByUrl('products/index');
        });
    }
}
