import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AnimationService } from './animation.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly router = inject(Router);
  private readonly animationService = inject(AnimationService);
  
  // Loading state signals
  readonly isLoading = signal(false);
  readonly loadingProgress = signal(0);
  readonly loadingMessage = signal('Loading...');
  
  // Route transition state
  readonly isTransitioning = signal(false);

  constructor() {
    this.initializeRouterEvents();
  }

  private initializeRouterEvents(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.startRouteTransition();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.endRouteTransition();
      }
    });
  }

  private startRouteTransition(): void {
    this.isTransitioning.set(true);
    this.setLoading(true, 'Loading page...');
    
    // Animate page transition
    this.animationService.pageTransition();
    
    // Simulate loading progress
    this.simulateLoadingProgress();
  }

  private endRouteTransition(): void {
    // Small delay to ensure content is rendered
    setTimeout(() => {
      this.isTransitioning.set(false);
      this.setLoading(false);
      this.loadingProgress.set(100);
      
      // Reset progress after animation
      setTimeout(() => {
        this.loadingProgress.set(0);
      }, 500);
    }, 300);
  }

  private simulateLoadingProgress(): void {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      this.loadingProgress.set(progress);
    }, 100);
  }

  // Public methods for manual loading control
  setLoading(loading: boolean, message: string = 'Loading...'): void {
    this.isLoading.set(loading);
    this.loadingMessage.set(message);
  }

  // Show skeleton loader for specific content
  showSkeletonLoader(element: string, lines: number = 3): void {
    if (typeof document === 'undefined') return;
    
    const targetElement = document.querySelector(element);
    if (!targetElement) return;
    
    const skeletonHTML = Array(lines).fill(0).map((_, index) => `
      <div class="skeleton-line animate-pulse bg-gray-200 dark:bg-secondary-700 h-4 rounded mb-2" style="width: ${Math.random() * 40 + 60}%"></div>
    `).join('');
    
    targetElement.innerHTML = `
      <div class="skeleton-loader">
        ${skeletonHTML}
      </div>
    `;
  }

  // Hide skeleton loader and show content
  hideSkeletonLoader(element: string, content: string): void {
    if (typeof document === 'undefined') return;
    
    const targetElement = document.querySelector(element);
    if (!targetElement) return;
    
    // Fade out skeleton
    this.animationService.fadeIn(element, { 
      duration: 0.3,
      onComplete: () => {
        targetElement.innerHTML = content;
        this.animationService.fadeIn(element, { duration: 0.5 });
      }
    });
  }

  // Loading overlay methods
  showLoadingOverlay(message: string = 'Loading...'): void {
    if (typeof document === 'undefined') return;
    
    const existingOverlay = document.querySelector('.loading-overlay');
    if (existingOverlay) {
      this.hideLoadingOverlay();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay fixed inset-0 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm z-50 flex items-center justify-center';
    overlay.innerHTML = `
      <div class="text-center">
        <div class="loading-spinner w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4 animate-spin"></div>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">${message}</p>
        <div class="loading-progress w-64 h-2 bg-gray-200 dark:bg-secondary-700 rounded-full mt-4 mx-auto overflow-hidden">
          <div class="loading-progress-bar h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full transition-all duration-300" style="width: ${this.loadingProgress()}%"></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    this.animationService.fadeIn(overlay as HTMLElement, { duration: 0.3 });
  }

  hideLoadingOverlay(): void {
    if (typeof document === 'undefined') return;
    
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      this.animationService.fadeIn(overlay as HTMLElement, { 
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          overlay.remove();
        }
      });
    }
  }

  // Component loading states
  createComponentLoader(componentName: string): {
    isLoading: ReturnType<typeof signal<boolean>>;
    setLoading: (loading: boolean) => void;
    showSkeleton: (element: string, lines?: number) => void;
    hideSkeleton: (element: string, content: string) => void;
  } {
    const componentLoading = signal(false);
    
    return {
      isLoading: componentLoading,
      setLoading: (loading: boolean) => {
        componentLoading.set(loading);
        this.setLoading(loading, `Loading ${componentName}...`);
      },
      showSkeleton: (element: string, lines?: number) => {
        this.showSkeletonLoader(element, lines);
      },
      hideSkeleton: (element: string, content: string) => {
        this.hideSkeletonLoader(element, content);
      }
    };
  }

  // Preload critical resources
  preloadResources(resources: string[]): Promise<void[]> {
    const promises = resources.map(resource => {
      return new Promise<void>((resolve, reject) => {
        if (resource.endsWith('.css')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = resource;
          link.onload = () => resolve();
          link.onerror = () => reject();
          document.head.appendChild(link);
        } else if (resource.endsWith('.js')) {
          const script = document.createElement('script');
          script.src = resource;
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        } else {
          // For images and other resources
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = resource;
        }
      });
    });
    
    return Promise.all(promises);
  }

  // Performance monitoring
  measurePerformance(label: string): { end: () => void } {
    const startTime = performance.now();
    
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`);
        
        // Log slow operations
        if (duration > 1000) {
          console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
        }
      }
    };
  }
}