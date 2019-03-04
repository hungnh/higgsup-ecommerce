import { NgModule } from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {RangePipe} from "../../@core/pipe/index.pipes";
import {CommonModule} from "@angular/common";
import {ResultListRoutingModule} from "./result-list-routing.module";
import {ResultListComponent} from "./result-list.component";
import {PaginatorModule} from "primeng/primeng";

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ResultListRoutingModule,
    PaginatorModule
  ],
  declarations: [
    RangePipe,
    ResultListComponent
  ],
})
export class ResultListModule { }
