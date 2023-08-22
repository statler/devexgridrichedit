import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { RicheditComponent } from 'src/app/richedit/richedit.component';


// @NgModule({
//   declarations: [
//     RicheditComponent
//   ],
//   imports: [
//   ],
//   providers: [
//   ],
//   exports:[RicheditComponent]
// }) export class CommonDerpModule{}

@NgModule({
  declarations: [
    AppComponent,
    RicheditComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  exports:[RicheditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
