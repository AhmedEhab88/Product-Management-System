import { Routes } from '@angular/router';

import { ProductIndexComponent } from './features/product/product-index/product-index.component';
import { ProductViewComponent } from './features/product/product-view/product-view.component';
import { ProductEditComponent } from './features/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './features/product/product-create/product-create.component';

export const routes: Routes = [
    { path: 'product', redirectTo: 'post/index', pathMatch: 'full' },
    { path: 'product/index', component: ProductIndexComponent },
    { path: 'product/:productId/view', component: ProductViewComponent },
    { path: 'product/create', component: ProductCreateComponent },
    { path: 'product/:productId/edit', component: ProductEditComponent },
];
