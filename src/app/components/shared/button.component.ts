import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Reusable button component with multiple variants and sizes
 */
@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container [ngSwitch]="type()">
      <!-- Router Link Button -->
      <a *ngSwitchCase="'router'" 
         [routerLink]="routerLink()"
         [class]="buttonClasses()"
         (click)="handleClick($event)">
        <ng-content />
      </a>
      
      <!-- External Link Button -->
      <a *ngSwitchCase="'link'" 
         [href]="href()"
         [target]="target()"
         [rel]="rel()"
         [class]="buttonClasses()"
         (click)="handleClick($event)">
        <ng-content />
      </a>
      
      <!-- Standard Button -->
      <button *ngSwitchDefault
              [type]="type()"
              [disabled]="disabled()"
              [class]="buttonClasses()"
              (click)="handleClick($event)">
        <ng-content />
      </button>
    </ng-container>
  `,
  styles: [`
    .btn-base {
      @apply inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2;
    }
    
    .btn-base:hover:not(:disabled) {
      @apply -translate-y-1 shadow-lg;
    }
    
    .btn-primary {
      @apply bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md hover:shadow-xl focus:ring-primary-500;
    }
    
    .btn-secondary {
      @apply bg-gray-600 text-white shadow-md hover:bg-gray-700 hover:shadow-xl focus:ring-gray-500;
    }
    
    .btn-outline {
      @apply border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500;
    }
    
    .btn-ghost {
      @apply text-primary-600 hover:bg-primary-50 focus:ring-primary-500;
    }
    
    .btn-sm { @apply px-4 py-2 text-sm; }
    .btn-md { @apply px-6 py-3 text-base; }
    .btn-lg { @apply px-8 py-4 text-lg; }
    
    .btn-disabled {
      @apply opacity-50 cursor-not-allowed transform-none shadow-none;
    }
  `]
})
export class ButtonComponent {
  // Input properties
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset' | 'router' | 'link'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  
  // Router link properties
  routerLink = input<string | any[]>('');
  
  // External link properties
  href = input<string>('');
  target = input<string>('_blank');
  rel = input<string>('noopener noreferrer');
  
  // Events
  clicked = output<Event>();
  
  /**
   * Generate CSS classes based on component inputs
   */
  protected buttonClasses(): string {
    const baseClasses = 'btn-base';
    const variantClass = `btn-${this.variant()}`;
    const sizeClass = `btn-${this.size()}`;
    const disabledClass = this.disabled() || this.loading() ? 'btn-disabled' : '';
    
    return [baseClasses, variantClass, sizeClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  }
  
  /**
   * Handle click events
   */
  protected handleClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      return;
    }
    
    this.clicked.emit(event);
  }
}