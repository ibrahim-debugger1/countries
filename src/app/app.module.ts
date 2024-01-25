import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListHeaderComponent } from './country-list/country-list-header/country-list-header.component';
import { CountryItemComponent } from './country-list/country-item/country-item.component';
import { PaginationComponent } from './country-list/pagination/pagination.component';
import { SharedDataService } from './shared-data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PopUpCountryItemComponent } from './country-list/country-item/pop-up-country-item/pop-up-country-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountryListComponent,
    CountryListHeaderComponent,
    CountryItemComponent,
    PaginationComponent,
    PopUpCountryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
