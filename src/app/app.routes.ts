import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: 'home', 
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    { 
        path: 'about', 
        loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
    },
    { 
        path: 'skills', 
        loadComponent: () => import('./components/skills/skills.component').then(m => m.SkillsComponent)
    },
    { 
        path: 'experience', 
        loadComponent: () => import('./components/experience/experience.component').then(m => m.ExperienceComponent)
    },
    { 
        path: 'projects', 
        loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)
    },
    { 
        path: 'contact', 
        loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
    },
    { 
        path: 'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    { 
        path: 'terms', 
        loadComponent: () => import('./components/legal/terms.component').then(m => m.TermsComponent)
    },
    { 
        path: 'privacy', 
        loadComponent: () => import('./components/legal/privacy.component').then(m => m.PrivacyComponent)
    },
    { path: '**', redirectTo: 'home' }
];
