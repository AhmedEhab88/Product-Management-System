import { Routes } from '@angular/router';

import { IndexComponent } from './product/index/index.component';
import { ViewComponent } from './product/view/view.component';
import { EditComponent } from './product/edit/edit.component';
import { CreateComponent } from './product/create/create.component';

export const routes: Routes = [
    { path: 'product', redirectTo: 'post/index', pathMatch: 'full' },
    { path: 'product/index', component: IndexComponent },
    { path: 'product/:productId/view', component: ViewComponent },
    { path: 'product/create', component: CreateComponent },
    { path: 'product/:productId/edit', component: EditComponent },
];
