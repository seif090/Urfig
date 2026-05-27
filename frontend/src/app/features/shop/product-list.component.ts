import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../core/services/shop.service';
import { CartService } from '../../core/services/cart.service';
import { ReviewService } from '../../core/services/review.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private shopService = inject(ShopService);
  private cartService = inject(CartService);
  private reviewService = inject(ReviewService);
  private userService = inject(UserService);
  authService = inject(AuthService);

  products = signal<any[]>([]);
  categories = signal<string[]>([]);
  wishlistIds = signal<string[]>([]);
  
  searchQuery = signal('');
  selectedCategory = signal('All');
  loading = signal(true);

  // Review state
  expandedReviews = signal<string | null>(null);
  productReviews = signal<any[]>([]);
  newRating = signal(5);
  newComment = signal('');

  async ngOnInit() {
    await Promise.all([
      this.loadCategories(),
      this.loadProducts(),
      this.loadWishlist()
    ]);
  }

  async loadWishlist() {
    if (this.authService.currentUser()) {
      try {
        const items = await this.userService.getWishlist();
        this.wishlistIds.set(items.map((i: any) => i._id));
      } catch (e) {}
    }
  }

  async toggleWishlist(productId: string) {
    if (!this.authService.currentUser()) {
      alert('Please log in to save favorites');
      return;
    }
    try {
      const res = await this.userService.toggleWishlist(productId);
      this.wishlistIds.set(res.wishlist);
    } catch (e) {
      alert('Failed to update wishlist');
    }
  }

  isInWishlist(productId: string) {
    return this.wishlistIds().includes(productId);
  }

  async toggleReviews(productId: string) {
    if (this.expandedReviews() === productId) {
      this.expandedReviews.set(null);
    } else {
      this.expandedReviews.set(productId);
      this.productReviews.set(await this.reviewService.getReviews(productId));
      this.newComment.set('');
      this.newRating.set(5);
    }
  }

  async submitReview(productId: string) {
    if (!this.newComment()) return;
    try {
      await this.reviewService.addReview(productId, this.newRating(), this.newComment());
      this.productReviews.set(await this.reviewService.getReviews(productId));
      this.newComment.set('');
    } catch (err) {
      alert('Failed to add review');
    }
  }

  async loadCategories() {
    const cats = await this.shopService.getCategories();
    this.categories.set(['All', ...cats]);
  }

  async loadProducts() {
    this.loading.set(true);
    const data = await this.shopService.getProducts(this.searchQuery(), this.selectedCategory());
    this.products.set(data);
    this.loading.set(false);
  }

  onFilterChange() {
    this.loadProducts();
  }

  addToCart(product: any) {
    this.cartService.addProduct(product);
    alert(`${product.name} added to cart!`);
  }
}
迫