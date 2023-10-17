import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Ng2SearchPipe } from 'ng2-search-filter';

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer,
    Ng2SearchPipe,
    importProvidersFrom(IonicModule.forRoot({}),HttpClientModule),
    provideRouter(routes),
  ],
});
