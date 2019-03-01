import {Component, OnInit} from '@angular/core';
import {Currency} from "../../@theme/glossary/currency.constant";
import {ResponseDTO} from "../../@core/model/response-dto.model";
import {Product} from "../../@core/model/product.model";
import {ProductDetailsService} from "../../@core/services/product-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../@core/services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2'

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  imagePreview = '//vn-test-11.slatic.net/p/d8ae05f5890cb3c42cb37c5635de68dc.jpg_340x340q80.jpg_.webp';
  imageItem = 'https://png.pngtree.com/element_origin_min_pic/17/09/15/ff9b22c2cc9d02950137e064d0f72217.jpg';
  newPrice: number = null;
  amount: number = 1;
  currency: string = '';
  product: Product = new Product();
  id: number = 96123;
  queryParams: any;

  constructor(private productService: ProductDetailsService, private router: Router, private activeRoute: ActivatedRoute,
              private cartService: CartService, private modalService: NgbModal) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
  }

  ngOnInit() {
    this.currency = Currency.USD;
    // this.id = this.queryParams.id;
    this.productService.getProductDetail(this.id).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.product = res.responseMessage.data;
        this.newPrice = this.product.unitPrice * (100 - this.product.discountPercent) / 100;
      } else {
        this.router.navigate(['pages/not-found']);
      }
    });
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
    return this.amount -= 1;
  }

  viewImages() {
    this.imagePreview = this.imageItem;
  }

}
