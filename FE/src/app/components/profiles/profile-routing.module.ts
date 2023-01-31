import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'profile-settings',
                component: ProfileSettingsComponent,
                data: {
                    title: "Profile Settings",
                    breadcrumb: "Profile Settings",
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }
