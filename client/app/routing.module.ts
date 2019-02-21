import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component'
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { EditvideoComponent } from './editvideo/editvideo.component';
import { ContactComponent } from './contact/contact.component';
import { SettingComponent } from './setting/setting.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { SingleviewComponent } from './singleview/singleview.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { AddyoutubevideosComponent } from './addyoutubevideos/addyoutubevideos.component';
import { MyvideosComponent } from './myvideos/myvideos.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { ChangepassComponent } from './changepass/changepass.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'resetpassword/:id', component: ResetpasswordComponent },
  { path: 'editvideo/:id', component: EditvideoComponent },
  { path: 'single/:id', component: SingleviewComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'changepass', component: ChangepassComponent },
  { path: 'addyoutubevideo', component: AddyoutubevideosComponent },
  { path: 'myvideos', component: MyvideosComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  // { path: 'notfound', component: NotFoundComponent },
  // { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
