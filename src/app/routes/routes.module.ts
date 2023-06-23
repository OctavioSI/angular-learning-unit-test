import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "../user/user.component";
import { RouterModule, Routes } from "@angular/router";

const AppRoute: Routes = [
  {
    path: "",
    component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoute)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutesModule {}
