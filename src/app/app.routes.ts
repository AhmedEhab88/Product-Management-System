import { Routes } from '@angular/router';

import { ProductIndexComponent } from './features/product/product-index/product-index.component';
import { ProductViewComponent } from './features/product/product-view/product-view.component';
import { ProductEditComponent } from './features/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './features/product/product-create/product-create.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products/index', pathMatch: 'full' },
    { path: 'products', redirectTo: 'products/index', pathMatch: 'full' },
    { path: 'products/index', component: ProductIndexComponent },
    { path: 'products/:productId/view', component: ProductViewComponent },
    { path: 'products/create', component: ProductCreateComponent },
    { path: 'products/:productId/edit', component: ProductEditComponent },
    { path: '**', component: NotFoundComponent },
];
