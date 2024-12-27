import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router)
  const shouldGetAcces = Math.random()
  if (shouldGetAcces < 1) {
    return true
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
  }
  , {
    path: 'users/:userId',
    component: UserTasksComponent,
    // children: userRoutes,
    // Route based lazy loading
    loadChildren: () => import('./users/users.routes').then(mod => mod.routes),
    canMatch: [dummyCanMatch],
    data: { title: 'User Tasks' },
    resolve: {
      userName: resolveUserName
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
