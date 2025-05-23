import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostRoomComponent } from './components/post-room/post-room.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import { ReservationsComponent } from './components/reservations/reservations.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostRoomComponent,
    UpdateRoomComponent,
    ReservationsComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
