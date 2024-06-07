import { Routes } from "@angular/router";

export const routes : Routes = [
  {
    path: '',
    loadComponent: () => import('./main.page').then(m => m.MainPage),
    children: 
    [
      {
        path: 'trends',
        loadComponent: () => import('./trending/trending.component').then(c => c.TrendingComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./histroy/histroy.component').then(c => c.HistroyComponent)
      },
      {
        path: 'liked',
        loadComponent: () => import('./liked/liked.component').then(c => c.LikedComponent)
      },
      {
        path: '',
        redirectTo: '/content/main/trends',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/content/main/trends',
        pathMatch: 'full',
      },
    ]
    
  }
]