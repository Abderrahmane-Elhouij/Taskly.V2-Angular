import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  title = input.required<string>();
  private activitedRoute = inject(ActivatedRoute);

  // ngOnInit() {
  //   this.activitedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   })
  // }
}

export const resolveUserName: ResolveFn<string> = (
  ativatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userServie = inject(UsersService);
  const userName =
    userServie.users.find((u) => u.id === ativatedRoute.paramMap.get('userId'))
      ?.name || '';
  return userName;
};
