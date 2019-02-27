import {Component, OnInit} from '@angular/core';
import {Currency} from "../../@theme/glossary/currency.constant";
import {NbMenuService} from "@nebular/theme";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WarningComponent} from "../../@theme/components/warning/warning.component";
import {Router} from "@angular/router";
import {CartService} from "../../@core/services/cart.service";
import {ResponseDTO} from "../../@core/model/response-dto.model";
import {_} from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import {Product} from "../../@core/model/product.model";
import {DataTransferService} from "../../@core/services/data-transfer.service";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productList: Array<Product> = [];
  subTotal: number = null;
  currency: string = '';
  allowDelete: boolean = false;

  constructor(private menuService: NbMenuService,
              private modalService: NgbModal,
              private router: Router,
              private cartService: CartService,
              private dataService: DataTransferService) {
  }

  ngOnInit() {
    this.currency = Currency.USD;
    this.getCart();
    this.dataService.currentEvent.subscribe(data => {
      if (data) {
        this.cartService.removeFromCart(data.dataTransfer).subscribe((res: ResponseDTO) => {
          if (!res.responseMessage.messageCode) {
            this.getCart();
          }
        });
      }
    });
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  getCart() {
    this.cartService.getCart().subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.productList = res.responseMessage.data;
        this.subTotal = 0;
        this.productList.forEach(product => {
          this.subTotal += product.amount * (100 - product.discountPercent) / 100 * product.unitPrice;
        });
      }
    })
  }


  checkPressKey() {
    return false;
  }

  doEncreaseQuantity(product) {
    const newProductAmount = product.amount + 1;
    let productUpdate = {
      amount: newProductAmount,
      id: product.id
    };
    this.cartService.changeAmount(productUpdate).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.getCart();
      }
    })
  }

  doDecreaseQuantity(product) {
    const newProductAmount = product.amount - 1;
    let productUpdate = {
      amount: newProductAmount,
      id: product.id
    };
    this.cartService.changeAmount(productUpdate).subscribe((res: ResponseDTO) => {
      if (!res.responseMessage.messageCode) {
        this.getCart();
      }
    })
  }

  doProceedPayment() {
    this.router.navigate(['/pages/confirm-buying'], {
      queryParams: {
        'data': JSON.stringify(this.productList)
      },
      skipLocationChange: true
    });
  }

  doDeleteProduct(id) {
    const activeModal = this.modalService.open(WarningComponent,
      {backdrop: 'static', centered: true});
    activeModal.componentInstance.message = 'Delete';
    activeModal.componentInstance.warningHeader = _('cart.remove_item');
    activeModal.componentInstance.warningMessage = _('cart.question_removing');
    activeModal.componentInstance.data = {
      order: this.allowDelete,
      dataTransfer: id
    }
  }

}
