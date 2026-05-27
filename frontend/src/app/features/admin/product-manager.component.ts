import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { ShopService } from '../../core/services/shop.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="product-manager">
      <div class="header">
        <h2>Ready-Made Product Management</h2>
        <button (click)="toggleMode()" class="toggle-btn">
          {{ isEditing() ? 'Cancel Edit' : 'Add New Product' }}
        </button>
      </div>

      <!-- FORM SECTION (ADD/EDIT) -->
      @if (isEditing() || showAddForm()) {
        <div class="form-card">
          <h3>{{ isEditing() ? 'Edit Product' : 'Add New Product' }}</h3>
          <form [formGroup]="productForm" (ngSubmit)="onSave()" class="admin-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Product Name</label>
                <input type="text" formControlName="name">
              </div>
              
              <div class="form-group">
                <label>Category</label>
                <input type="text" formControlName="category" placeholder="e.g. Marvel, Anime">
              </div>

              <div class="form-group">
                <label>Price ($)</label>
                <input type="number" formControlName="price" step="0.01">
              </div>

              <div class="form-group">
                <label>Stock Quantity</label>
                <input type="number" formControlName="stock">
              </div>

              <div class="form-group full-width">
                <label>Description</label>
                <textarea formControlName="description"></textarea>
              </div>

              <div class="form-group full-width">
                <label>Product Image</label>
                <input type="file" (change)="onFileSelected($event)" accept="image/*">
                @if (isEditing()) { <p class="hint">Leave empty to keep current image</p> }
              </div>
            </div>

            <button type="submit" [disabled]="productForm.invalid" class="save-btn">
              {{ isEditing() ? 'Update Product' : 'Create Product' }}
            </button>
          </form>
        </div>
      }

      <!-- PRODUCT LIST SECTION -->
      <div class="list-card">
        <h3>Current Inventory</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (prod of products(); track prod._id) {
              <tr>
                <td><img [src]="prod.imageUrl" class="thumb"></td>
                <td>{{ prod.name }}</td>
                <td><span class="badge">{{ prod.category }}</span></td>
                <td>\${{ prod.price }}</td>
                <td>{{ prod.stock }}</td>
                <td class="actions">
                  <button (click)="editProduct(prod)" class="edit-btn">Edit</button>
                  <button (click)="deleteProduct(prod._id)" class="delete-btn">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .product-manager { padding: 1rem; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .form-card, .list-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 2rem; }
    .admin-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .full-width { grid-column: span 2; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    input, textarea { padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px; }
    textarea { height: 80px; }
    .save-btn { background: #28a745; color: white; border: none; padding: 1rem; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .toggle-btn { background: #333; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
    
    .admin-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .admin-table th { text-align: left; padding: 1rem; background: #f8f9fa; border-bottom: 2px solid #eee; }
    .admin-table td { padding: 1rem; border-bottom: 1px solid #eee; }
    .thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
    .actions { display: flex; gap: 0.5rem; }
    .edit-btn { background: #007bff; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
    .delete-btn { background: #dc3545; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
    .badge { background: #e9ecef; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem; }
    .hint { font-size: 0.75rem; color: #666; margin-top: 2px; }
  `]
})
export class ProductManagerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private shopService = inject(ShopService);

  products = signal<any[]>([]);
  isEditing = signal(false);
  showAddForm = signal(false);
  editingId = signal<string | null>(null);
  selectedFile: File | null = null;

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const data = await this.shopService.getProducts();
    this.products.set(data);
  }

  toggleMode() {
    if (this.isEditing() || this.showAddForm()) {
      this.resetForm();
    } else {
      this.showAddForm.set(true);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  editProduct(prod: any) {
    this.isEditing.set(true);
    this.showAddForm.set(false);
    this.editingId.set(prod._id);
    this.productForm.patchValue({
      name: prod.name,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      stock: prod.stock
    });
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  onSave() {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name!);
    formData.append('description', this.productForm.value.description!);
    formData.append('category', this.productForm.value.category!);
    formData.append('price', this.productForm.value.price!.toString());
    formData.append('stock', this.productForm.value.stock!.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing()) {
      this.adminService.updateProduct(this.editingId()!, formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        }
      });
    } else {
      this.adminService.createProduct(formData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        }
      });
    }
  }

  resetForm() {
    this.isEditing.set(false);
    this.showAddForm.set(false);
    this.editingId.set(null);
    this.selectedFile = null;
    this.productForm.reset();
  }
}
迫