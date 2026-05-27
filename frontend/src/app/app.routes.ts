import { Routes } from '@angular/router';
import { BuilderComponent } from './features/builder/builder.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderSuccessComponent } from './features/order-success/order-success.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { ProductListComponent } from './features/shop/product-list.component';

export const routes: Routes = [
  { path: '', component: BuilderComponent },
  { path: 'shop', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
迫