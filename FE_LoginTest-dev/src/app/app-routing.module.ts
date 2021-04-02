import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    
  ],
})
export class AppRoutingModule {}
