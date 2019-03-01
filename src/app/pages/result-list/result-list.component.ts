import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ResultListService} from "../../@core/services/result-list.service";
import {UtilsService} from "../../@core/utils/utilsService";
import {SupplierModel} from "../../@core/model/supplier.model";
import {ProductModel} from "../../@core/model/product.model";
import {HttpParams} from "@angular/common/http";
import {DataTransferService} from "../../@core/services/data-transfer.service";
import {Constant} from "../../@core/constant/constant";
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  textSearch: string;
  categoryId: number;
  supplierId: number;
  hasResult: boolean;
  supplierList: SupplierModel[];
  productList: ProductModel[];
  avgRate: number;
  numberProduct: number;
  paramsRequestList: any;
  paramsSupplier: any;
  status: string;
  queryParams: any;
  pageIndex: number;
  pageSize: number = 20;
  totalPage: number;
  paginate: Array<any>;
  minPrice: number = 0;
  maxPrice: number = 0;


  /*  count$= new BehaviorSubject(10);
    numberStart = this.count$.flatMap(count => Observable.range(0, count).toArray()) ;*/

  constructor(private activeRoute: ActivatedRoute,
              private resultListService: ResultListService,
              private utils: UtilsService,
              private dataTransferService: DataTransferService,
              private router: Router) {

    this.queryParams = this.activeRoute.snapshot.queryParams;

  }

  ngOnInit() {
    this.paramsRequestList = new HttpParams();
    this.paramsSupplier = new HttpParams();
    this.generateParamsCondition();
    this.dataTransferService.currentTextSearch.subscribe(data => {
      if (data != null) {
        if (data.from = Constant.HEADER) {
          this.searchProdcut(data.textSearch);
        } else if (data.from = Constant.CATEGORY) {
          this.searchCategory(data.categoryId);
        }
      } else {
        this.searchFrom();
      }
    });
  }

  searchFrom() {
    this.textSearch = this.queryParams.textSearch;
    this.categoryId = this.queryParams.categoryId;
    if (this.queryParams.from == Constant.HEADER) {
      this.searchProdcut(this.textSearch);
    } else if (this.queryParams.from == Constant.CATEGORY) {
      this.searchCategory(this.categoryId);
    }

  }

  searchProdcut(textSearch: any) {
    this.hasResult = false;
    this.supplierListSearch(textSearch, '');
    this.productListSearch(textSearch, '');
  }

  searchCategory(categoryId: number) {
    this.hasResult = false;
    this.searchSupplierByCategoryId(categoryId);
    this.searchProductByCategoryId(categoryId);
  }

  searchSupplier(supplierId: number) {
    this.supplierListSearch(this.textSearch, supplierId);
    this.searchProductBySupplierId(supplierId);
  }

  supplierListSearch(textSearch: any, supplierId: any) {
    this.supplierList = [];
    this.textSearch = textSearch;
    this.supplierId = supplierId;
    if (this.utils.isNotEmpty(this.textSearch)) {
      this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'textSearch', this.textSearch);
      this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'supplierId', this.supplierId);
      this.resultListService.getSupplierList(this.paramsSupplier).subscribe(response => {
        response.responseMessage.data.forEach(supplier => {
          this.supplierList.push(supplier);
        });
        console.log(this.supplierList);
      });
    }
  }

  productListSearch(textSearch: any, supplierId: any) {
    this.productList = [];
    this.numberProduct = 0;
    this.generateParamsCondition();
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'textSearch', textSearch);

    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  searchSupplierByCategoryId(categoryId: number) {
    this.supplierList = [];
    this.categoryId = categoryId;
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'id', this.categoryId);
    this.resultListService.getSupplierListByCategoryId(this.categoryId).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.supplierList.push(this.addProductList(product));
      });
      console.log(this.supplierList);
    });
  }

  searchProductByCategoryId(categoryId: number) {
    this.productList = [];
    this.numberProduct = 0;
    this.categoryId = categoryId;
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'id', this.categoryId);
    this.resultListService.getProductListByCategoryId(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  searchProductBySupplierId(supplierId: number) {
    this.productList = [];
    this.numberProduct = 0;
    this.supplierId = supplierId;
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'supplierId', this.supplierId);
    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  searchProductByRate(avgRate: number) {
    this.productList = [];
    this.numberProduct = 0;
    this.avgRate = avgRate;
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'avgRating', this.avgRate);
    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  searchProductByStatus(status: string) {
    this.productList = [];
    this.numberProduct = 0;
    this.status = status;
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'status', this.status);
    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  searchProductByPrice() {
    this.productList = [];
    this.numberProduct = 0;

    if (typeof this.maxPrice === 'undefined') {
      this.maxPrice = 0;
    }
    if (typeof this.minPrice === 'undefined') {
      this.minPrice = 0;
    }
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'fromUnitPrice', this.minPrice);
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'toUnitPrice', this.maxPrice);
    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
    });
  }

  pagingChange(event) {
    this.productList = [];
    this.numberProduct = 0;
    let currentPage = event.page;
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'pageIndex', currentPage);
    this.resultListService.getProductList(this.paramsRequestList).subscribe(response => {
      response.responseMessage.data.forEach(product => {

        this.productList.push(this.addProductList(product));
      });
      let count = response.totalItem;
      this.numberProduct = count;
      this.pageSize = response.pageSize;
      this.totalPage = response.totalPage;
      this.pageIndex = response.pageIndex;

      if (this.numberProduct != 0) {
        this.hasResult = true;
      } else {
        this.hasResult = false;
      }
      console.log(this.productList);
      /*window.scrollTo(0, 0);*/
    });
  }

  generateParamsCondition() {
    // request production
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'id', ''); // id category
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'pageIndex', 0);
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'pageSize', this.pageSize);
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'status', '');
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'supplierId', '');
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'textSearch', '');
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'fromUnitPrice', '');
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'toUnitPrice', '');
    this.paramsRequestList = this.addParamsSearchList(this.paramsRequestList, 'avgRating', '');

    // request supplier
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'fromUnitPrice', '');
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'status', '');
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'supplierId', '');
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'textSearch', '');
    this.paramsSupplier = this.addParamsSearchList(this.paramsSupplier, 'toUnitPrice', '');

  }

  goToProductDetail(productId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": productId
      }
    };
    this.router.navigate(['./pages/product-detail'], navigationExtras);
  }

  addParamsSearchList(list: any, paramKey: any, value: any) {
    let listCondition = new HttpParams();
    listCondition = list;

    if (!listCondition.has(paramKey)) {
      listCondition = listCondition.set(paramKey, value);
    } else {
      listCondition = listCondition.delete(paramKey);
      listCondition = listCondition.set(paramKey, value);
    }

    return listCondition;
  }

  addProductList(product: any) {
    let item = new ProductModel();
    item.id = product.id;
    item.name = product.name;
    item.unitPrice = product.unitPrice;
    item.discountPercent = product.discountPercent;
    item.priceDiscount = product.discountPrice;
    item.mainImgUrl = product.mainImgUrl;
    this.utils.isNotEmpty(product.avgRating) ? item.avgRating = product.avgRating : item.avgRating = 1;
    this.utils.isNotEmpty(product.totalRating) ? item.totalRating = product.totalRating : item.totalRating = 0;

    return item;
  }


}
