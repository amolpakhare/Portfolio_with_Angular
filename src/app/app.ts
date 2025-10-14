import { Component, signal, inject, OnInit, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';
import { AnimationService } from './services/animation.service';
import { HeaderComponent, type NavLink } from './components/layout/header.component';
import { FooterComponent, type SocialLink, type ContactInfo } from './components/layout/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header 
      [title]="title()"
      [subtitle]="subtitle()"
      [navLinks]="getNavLinks()"
      [isDarkMode]="isDarkMode()"
      (themeToggle)="toggleTheme()" />
    
    <main class="pt-20 min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300">
      <router-outlet />
    </main>
    
    <app-footer 
      [title]="title()"
      [subtitle]="subtitle()"
      [navLinks]="getNavLinks()"
      [socialLinks]="getSocialLinks()"
      [contactInfo]="getContactInfo()" />
  `,
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly animationService = inject(AnimationService);
  private readonly sanitizer = inject(DomSanitizer);
  
  protected readonly title = signal('Amol Pakhare');
  protected readonly subtitle = signal('Python Developer | Data Analytics | Business Analyst | Machine Learning ');
  protected readonly mobileMenuOpen = signal(false);
  protected readonly currentTheme = this.themeService.currentTheme;
  protected readonly isDarkMode = this.themeService.isDarkMode;

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    this.themeService.setTheme(this.themeService.currentTheme());
    if (typeof window !== 'undefined') {
      this.animationService.pageLoadAnimation();
    }
  }

  private initializeAnimations(): void {
    this.animationService.fadeIn('header', { delay: 0.2 });
    this.animationService.slideInLeft('.logo', { delay: 0.3 });
    this.animationService.slideInRight('.nav-links', { delay: 0.4 });

    document.querySelectorAll('.nav-link').forEach(link => {
      this.animationService.hoverScale(link as HTMLElement);
    });
  }

  protected toggleMobileMenu(): void {
    const isOpen = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(isOpen);
    
    const menuElement = document.querySelector('.mobile-menu') as HTMLElement;
    if (menuElement) {
      this.animationService.animateNavMenu(isOpen, menuElement);
    }
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    const menuElement = document.querySelector('.mobile-menu') as HTMLElement;
    if (menuElement) {
      this.animationService.animateNavMenu(false, menuElement);
    }
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected currentYear(): number {
    return new Date().getFullYear();
  }

  protected getNavLinks(): NavLink[] {
    return [
      { path: '/home', label: 'Home', icon: '🏠' },
      { path: '/about', label: 'About', icon: '👨‍💻' },
      { path: '/skills', label: 'Skills', icon: '⚡' },
      { path: '/projects', label: 'Projects', icon: '💼' },
      { path: '/experience', label: 'Experience', icon: '🌟' },
      { path: '/contact', label: 'Contact', icon: '📞' }
    ];
  }

  protected getSocialLinks(): SocialLink[] {
    return [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/pakhareamol',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85
          3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 
          2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 
          20.452H3.555V9h3.564v11.452z"/>
        </svg>`),
        bgColor: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800',
        hoverColor: 'hover:from-blue-600 hover:via-blue-500 hover:to-blue-700'
      },
      {
        name: 'GitHub',
        url: 'https://github.com/amolpakhare',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 
          11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416
          -.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
          1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 
          2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604
          -2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 
          1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 
          1.008-.322 3.301 1.23.957-.266 1.983-.399 
          3.003-.404 1.02.005 2.047.138 3.006.404 
          2.291-1.552 3.297-1.23 3.297-1.23.653 
          1.653.242 2.874.118 3.176.77.84 
          1.235 1.911 1.235 3.221 0 4.609-2.807 
          5.624-5.479 5.921.43.372.823 1.102.823 
          2.222v3.293c0 .319.192.694.801.576 
          4.765-1.589 8.199-6.086 8.199-11.386C24 
          5.373 18.627 0 12 0z"/>
        </svg>`),
        bgColor: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900',
        hoverColor: 'hover:from-gray-700 hover:via-gray-600 hover:to-gray-800'
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/919579343019',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..."/>
        </svg>`),
        bgColor: 'bg-gradient-to-r from-green-600 via-green-500 to-green-700',
        hoverColor: 'hover:from-green-500 hover:via-green-400 hover:to-green-600'
      },
      {
        name: 'Call',
        url: 'tel:+919579343019',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a2 2 0 011.789 1.106l1.387 2.774a2 2 
          0 01-.445 2.327L9.293 10.707a16 16 0 006.999 6.999l1.5-1.5a2 
          2 0 012.327-.445l2.774 1.387A2 2 0 0122 20.72V22a2 2 
          0 01-2 2h-1a19 19 0 01-16-16V5z" />
        </svg>`),
        bgColor: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600',
        hoverColor: 'hover:from-emerald-500 hover:via-teal-400 hover:to-green-500'
      },
      {
        name: 'Email',
        url: 'mailto:pakhareamol300@gmail.com',
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 
          8M5 19h14a2 2 0 002-2V7a2 2 
          0 00-2-2H5a2 2 0 00-2 2v10a2 
          2 0 002 2z"/>
        </svg>`),
        bgColor: 'bg-gradient-to-r from-blue-600 to-blue-500',
        hoverColor: 'hover:from-blue-500 hover:to-blue-400'
      }
    ];
  }

  protected getContactInfo(): ContactInfo {
    return {
      email: 'pakhareamol300@gmail.com',
      phone: '+91 9579343019',
      location: 'Pune, Maharashtra, India'
    };
  }
}
