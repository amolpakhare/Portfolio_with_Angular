import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavLink {
  path: string;
  label: string;
  icon: string;
}

/**
 * Main navigation header component
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="logo flex items-center space-x-4">
            <div class="relative group">
              <div class="bg-gradient-to-r from-primary-500 to-purple-600 text-white w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                AP
              </div>
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ title() }}</h1>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ subtitle() }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-xs text-green-600 dark:text-green-400 font-medium">Available for work</span>
              </div>
            </div>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="nav-links hidden lg:flex items-center space-x-6">
            @for (link of navLinks(); track link.path) {
              <a [routerLink]="link.path" 
                 routerLinkActive="text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20 px-3 py-2 rounded-lg" 
                 class="nav-link text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800 flex items-center space-x-2">
                <span class="text-lg">{{ link.icon }}</span>
                <span>{{ link.label }}</span>
              </a>
            }
            
            <!-- Contact CTA -->
            <a routerLink="/contact" 
               class="ml-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Let's Talk
            </a>
          </div>

          <!-- Theme Toggle & Mobile Menu -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle Button -->
            <button (click)="themeToggle.emit()" 
                    class="relative p-3 rounded-full bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-secondary-700 transition-all duration-300 hover:scale-110 group"
                    title="Toggle theme">
              <div class="relative z-10">
                @if (isDarkMode()) {
                  <!-- Sun icon for light mode -->
                  <svg class="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                } @else {
                  <!-- Moon icon for dark mode -->
                  <svg class="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                }
              </div>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <!-- Mobile Menu Button -->
            <button (click)="toggleMobileMenu()" 
                    class="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-secondary-700 transition-all duration-300">
              @if (mobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              }
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        @if (mobileMenuOpen()) {
          <div class="mobile-menu lg:hidden mt-6 pb-6 border-t border-gray-200 dark:border-secondary-700 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm rounded-lg mx-4">
            <div class="flex flex-col space-y-2 pt-6 px-4">
              @for (link of navLinks(); track link.path) {
                <a [routerLink]="link.path" 
                   routerLinkActive="text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600" 
                   class="nav-link text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-medium py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-800 hover:translate-x-2 transform"
                   (click)="closeMobileMenu()">
                  <div class="flex items-center space-x-4">
                    <span class="text-xl w-6 text-center">{{ link.icon }}</span>
                    <span>{{ link.label }}</span>
                  </div>
                </a>
              }
              
              <!-- Mobile Contact CTA -->
              <div class="pt-4 border-t border-gray-200 dark:border-secondary-700 mt-4">
                <a routerLink="/contact" 
                   class="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                   (click)="closeMobileMenu()">
                  <span>💬</span>
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </div>
        }
      </nav>
    </header>
  `,
  styles: [`
    .nav-link {
      position: relative;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .nav-link:hover::before,
    .nav-link.router-link-active::before {
      width: 100%;
    }
    
    .mobile-menu {
      animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class HeaderComponent {
  // Input properties
  title = input<string>('Amol Pakhare');
  subtitle = input<string>('Python Developer & Data Analyst');
  navLinks = input.required<NavLink[]>();
  isDarkMode = input<boolean>(false);
  
  // Output events
  themeToggle = output<void>();
  
  // Component state
  protected readonly mobileMenuOpen = signal(false);
  
  /**
   * Toggle mobile menu visibility
   */
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(isOpen => !isOpen);
  }
  
  /**
   * Close mobile menu
   */
  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}