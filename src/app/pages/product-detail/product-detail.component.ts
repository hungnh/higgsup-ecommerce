import {Component, OnInit} from '@angular/core';
import {Currency} from "../../@theme/glossary/currency.constant";
import {ResponseDTO} from "../../@core/model/response-dto.model";
import {ProductDetailsService} from "../../@core/services/product-details.service";
import {ActivatedRoute, NavigationExtras, Params, Router} from "@angular/router";
import {RatingCount} from "../../@core/model/rating-count.model";
import {CartService} from "../../@core/services/cart.service";
import Swal from 'sweetalert2'
import {Feedback} from "../../@core/model/feedback.model";
import {ProductModel} from "../../@core/model/product.model";
import {Location} from '@angular/common';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  newPrice: number = null;
  amount: number = 1;
  starArray = [5, 4, 3, 2, 1];
  currency: string = '';
  product: ProductModel = new ProductModel();
  feedbackList: Array<Feedback> = [];
  relatedItemList: Array<ProductModel> = [];
  id: number = null;
  queryParams: any;
  listRating: Array<RatingCount>;
  sumRating: number = 0;
  imageList = [];
  imageView;
  constructor(private productService: ProductDetailsService, private router: Router, private activeRoute: ActivatedRoute,
              private cartService: CartService, private location: Location) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
  }

  ngOnInit() {
    this.currency = Currency.USD;
    this.id = this.queryParams.productId;
    this.getFeedBack(this.id);
    this.getProductDetail();
    this.getRelatedProduct(this.id);
  }
  goToProductDetail(productId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": productId
      }
    };
    this.router.navigate(['./pages/product-detail'], navigationExtras);
    this.id = productId;
    this.getProductDetail();
    window.scroll(0, 0);
  }

  addtoCart() {
    const product = {
      amount: this.amount,
      productId: this.product.id
    };

    this.cartService.addProductIntoCart(product).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        Swal.fire({
          type: 'success',
          title: 'Added this product into cart!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Something went wrong!',
        })
      }
    });
  }

  buyNow() {
    const product = {
      amount: this.amount,
      productId: this.product.id
    };
    this.cartService.addProductIntoCart(product).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.router.navigate(['./pages/cart']);
      } else {
        Swal.fire({
          type: 'error',
          title: 'Something went wrong!',
        })
      }
    });
  }


  checkPressKey() {
    return false;
  }

  doEncreaseQuantity() {
    if (this.amount >= this.product.availableItem) {
      return this.amount = this.product.availableItem;
    } else {
      return this.amount += 1;

    }
  }

  doDecreaseQuantity() {
    return (this.amount > 1) ? this.amount-- : 1
  }

  getFeedBack(id) {
    this.productService.getFeedback(id).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.feedbackList = res.responseMessage.data;
      } else {
        this.router.navigate(['pages/not-found']);
      }
    })
  }
  getRelatedProduct(id) {
    this.productService.getRelatedProduct(id).subscribe(res => {
      if (!res.messageCode) {
        this.relatedItemList = res.data;
      } else {
        this.router.navigate(['pages/not-found']);
      }
    })
  }
  viewImages(imgUrl) {
    this.imageView = imgUrl;
  }
  getProductDetail() {
    this.productService.getProductDetail(this.id).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.product = res.responseMessage.data;
        this.listRating = this.product.ratingCount;
        this.listRating.forEach(feedback => {
          this.sumRating += feedback.counting;
        });
        this.imageList = this.product.imgUrl.split(";", 10);
        this.imageList.pop();
        this.imageView = this.imageList[0];
        this.newPrice = this.product.unitPrice * (100 - this.product.discountPercent)/100;
        this.newPrice = this.product.unitPrice * (100 - this.product.discountPercent) / 100;
      } else {
        this.router.navigate(['pages/not-found']);
      }
    });
  }
}
