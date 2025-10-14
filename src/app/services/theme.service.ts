import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private readonly THEME_KEY = 'naynesh-portfolio-theme';
  
  // Signal for current theme
  readonly currentTheme = signal<Theme>('light');
  
  // Computed signal for theme classes
  readonly isDarkMode = signal(false);

  constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
    
    // Effect to update DOM when theme changes
    effect(() => {
      this.updateThemeClass();
    });
  }

  private initializeTheme(): void {
    if (!this.isBrowser) return;

    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(this.THEME_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  private updateThemeClass(): void {
    if (!this.isBrowser) return;

    const theme = this.currentTheme();
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      this.isDarkMode.set(true);
    } else {
      htmlElement.classList.remove('dark');
      this.isDarkMode.set(false);
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  toggleTheme(): void {
    // Add smooth transition animation
    if (this.isBrowser) {
      const transition = document.createElement('style');
      transition.innerHTML = `
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
      `;
      document.head.appendChild(transition);
      
      // Remove transition after animation completes
      setTimeout(() => {
        document.head.removeChild(transition);
      }, 300);
    }
    
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // Get theme-appropriate colors
  getThemeColors() {
    const isDark = this.isDarkMode();
    return {
      background: isDark ? '#0f172a' : '#ffffff',
      surface: isDark ? '#1e293b' : '#f8fafc',
      text: isDark ? '#f1f5f9' : '#0f172a',
      primary: '#3b82f6',
      secondary: isDark ? '#64748b' : '#94a3b8',
      accent: '#8b5cf6',
      border: isDark ? '#334155' : '#e2e8f0'
    };
  }
}