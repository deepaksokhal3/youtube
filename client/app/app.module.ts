import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AgmCoreModule } from '@agm/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { VideoService } from './services/video.service';
import { UserService } from './services/user.service';
import { GeoLocationService } from './services/geo-location.service';
import { UserAuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { OptionsService } from './services/options.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddyoutubevideosComponent } from './addyoutubevideos/addyoutubevideos.component';
import { MyvideosComponent } from './myvideos/myvideos.component';
import { EditvideoComponent } from './editvideo/editvideo.component';
import { ContactComponent } from './contact/contact.component';
import { SettingComponent } from './setting/setting.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SingleviewComponent } from './singleview/singleview.component';
import { EmbedVideo } from 'ngx-embed-video';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login-v2";
import { ChangepassComponent } from './changepass/changepass.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("460868994317948")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("64708822544-ummrcg5t37eu868pr74evvd6vq87c068.apps.googleusercontent.com")
      },

    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    ConfirmationComponent,
    AddyoutubevideosComponent,
    MyvideosComponent,
    EditvideoComponent,
    ContactComponent,
    SettingComponent,
    ResetpasswordComponent,
    SingleviewComponent,
    ChangepassComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBgBGjzWp6fg9kx6afKTslJB8swrvtoUnM",
      libraries: ["places"]
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    SocialLoginModule,
    EmbedVideo.forRoot(),
    NgxEditorModule,
    TooltipModule.forRoot()
  ],
  providers: [
    UserAuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    VideoService,
    OptionsService,
    RecipeService,
    GeoLocationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
