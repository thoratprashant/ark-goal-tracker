import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

import { NgApexchartsModule } from 'ng-apexcharts';
import { App } from './app';

bootstrapApplication(App, {
  providers: [importProvidersFrom(NgApexchartsModule)]
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
  ]
};
