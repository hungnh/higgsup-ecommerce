import {Component, OnInit} from '@angular/core';
import {DeliveryInformation} from "../../@core/model/delivery-information";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmBuyingService} from "../../@core/services/confirm-buying.service";
import {AddressModel} from "../../@core/model/address.model";

@Component({
  selector: 'confirm-buying',
  templateUrl: './confirm-buying.component.html',
  styleUrls: ['./confirm-buying.component.scss']
})
export class ConfirmBuyingComponent implements OnInit {
  deliveryInfo: DeliveryInformation = new DeliveryInformation();
  isSubmit: boolean = false;
  productList: string = '';
  address: AddressModel;
  provinces: Array<AddressModel> = [];
  districts: Array<AddressModel> = [];
  districtsBackup: AddressModel;
  wards: Array<AddressModel> = [];
  wardsBackup: AddressModel;


  constructor(private router: Router, private activeRoute: ActivatedRoute, private buyingService: ConfirmBuyingService) {
  }

  ngOnInit() {
    this.productList = this.activeRoute.snapshot.queryParams.data;
    this.getAddress();
  }

  cancelBuying() {
    this.router.navigate(['pages/cart']);
  }

  inputValidator(event: any) {
    const pattern = /^[0-9 +]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");

    }
  }


  gotoPayment(province, district, ward) {
    this.isSubmit = true;
    if (!this.deliveryInfo.fullName
      || !this.deliveryInfo.phoneNumber
      || !this.deliveryInfo.province
      || !this.deliveryInfo.district
      || !this.deliveryInfo.ward
      || !this.deliveryInfo.address
      || !this.deliveryInfo.addressType) {
      return true;
    } else {
      this.router.navigate(['pages/payment'], {
        queryParams: {
          'deliveryInfo': JSON.stringify(this.deliveryInfo),
          'productList': this.productList
        }, skipLocationChange: true
      });
    }
  }


  //Function get all provinces from Json file
  getAddress() {
    if (!this.address) {
      this.buyingService.getJSON().subscribe((res: any) => {
          this.address = res;
          let codeAddressArr = Object.keys(this.address);
          codeAddressArr.forEach(code => {
            this.provinces.push(this.address[code]);
          });
        }
      )
    } else {
      return;
    }
  }

  //Function get all districts from province
  getDistricts(code) {
    this.districts = [];
    this.deliveryInfo.province = this.address[code].name_with_type;
    this.districtsBackup = this.address[code]['quan-huyen'];
    let codeProvincesArr = Object.keys(this.address[code]['quan-huyen']);
    codeProvincesArr.forEach(codeDistrict => {
      this.districts.push(this.address[code]['quan-huyen'][codeDistrict]);
    });
  }

  //Function get all wards from district
  getWards(code) {
    this.wards = [];
    this.deliveryInfo.district = this.districtsBackup[code].name_with_type;
    this.wardsBackup = this.districtsBackup[code]['xa-phuong'];
    let codeWardsArr = Object.keys(this.districtsBackup[code]['xa-phuong']);
    codeWardsArr.forEach(codeWard => {
      this.wards.push(this.districtsBackup[code]['xa-phuong'][codeWard])
    })
  }

  //Function set ward name into deliveryInfo
  setWard(code) {
    this.deliveryInfo.ward = this.wardsBackup[code].name_with_type;
  }

}
