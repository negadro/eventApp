import { AvatarListComponent } from './components/avatarlist/avatarlist.component';
import { EventComponent } from './components/event/event.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventDetailPage } from '../pages/eventdetail/eventdetail';
import {EventListComponent} from './components/eventlist/eventlist.component';
import { EventService } from './services/events.service';
import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventDetailPage,
    EventListComponent,
    EventComponent,
    AvatarListComponent,
    IonTextAvatar
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService
  ]
})
export class AppModule {}
