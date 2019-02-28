import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  imagePreview = '//vn-test-11.slatic.net/p/d8ae05f5890cb3c42cb37c5635de68dc.jpg_340x340q80.jpg_.webp';
  imageItem = 'https://png.pngtree.com/element_origin_min_pic/17/09/15/ff9b22c2cc9d02950137e064d0f72217.jpg';
  constructor() { }

  ngOnInit() {
  }
  viewImages() {
    this.imagePreview = this.imageItem;
  }

}
