import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'white' | 'gray';

/**
 * Reusable loading spinner component
 */
@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses()" [attr.aria-label]="ariaLabel()">
      <div [class]="spinnerClasses()">
        <div class="spinner-inner"></div>
      </div>
      <span *ngIf="text()" [class]="textClasses()">
        {{ text() }}
      </span>
    </div>
  `,
  styles: [`
    .spinner-container {
      @apply flex items-center justify-center;
    }
    
    .spinner-container.vertical {
      @apply flex-col space-y-2;
    }
    
    .spinner-container.horizontal {
      @apply flex-row space-x-2;
    }
    
    .spinner-base {
      @apply relative inline-block border-2 border-solid rounded-full animate-spin;
      border-top-color: transparent;
    }
    
    .spinner-sm { @apply w-4 h-4 border-2; }
    .spinner-md { @apply w-6 h-6 border-2; }
    .spinner-lg { @apply w-8 h-8 border-4; }
    .spinner-xl { @apply w-12 h-12 border-4; }
    
    .spinner-primary { @apply border-primary-600; }
    .spinner-secondary { @apply border-secondary-600; }
    .spinner-white { @apply border-white; }
    .spinner-gray { @apply border-gray-600; }
    
    .spinner-text-sm { @apply text-sm; }
    .spinner-text-md { @apply text-base; }
    .spinner-text-lg { @apply text-lg; }
    .spinner-text-xl { @apply text-xl; }
    
    .spinner-text-primary { @apply text-primary-600; }
    .spinner-text-secondary { @apply text-secondary-600; }
    .spinner-text-white { @apply text-white; }
    .spinner-text-gray { @apply text-gray-600; }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class LoadingSpinnerComponent {
  // Input properties
  size = input<SpinnerSize>('md');
  color = input<SpinnerColor>('primary');
  text = input<string>('');
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  centered = input<boolean>(false);
  ariaLabel = input<string>('Loading...');
  
  /**
   * Generate container CSS classes
   */
  protected containerClasses(): string {
    const baseClasses = 'spinner-container';
    const orientationClass = this.orientation();
    const centeredClass = this.centered() ? 'w-full h-full' : '';
    
    return [baseClasses, orientationClass, centeredClass]
      .filter(Boolean)
      .join(' ');
  }
  
  /**
   * Generate spinner CSS classes
   */
  protected spinnerClasses(): string {
    const baseClasses = 'spinner-base';
    const sizeClass = `spinner-${this.size()}`;
    const colorClass = `spinner-${this.color()}`;
    
    return [baseClasses, sizeClass, colorClass]
      .filter(Boolean)
      .join(' ');
  }
  
  /**
   * Generate text CSS classes
   */
  protected textClasses(): string {
    const sizeClass = `spinner-text-${this.size()}`;
    const colorClass = `spinner-text-${this.color()}`;
    
    return [sizeClass, colorClass]
      .filter(Boolean)
      .join(' ');
  }
}