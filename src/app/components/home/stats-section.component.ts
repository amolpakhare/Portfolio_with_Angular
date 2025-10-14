import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Stats section component displaying key statistics
 */
@Component({
  selector: 'app-stats-section',
  imports: [CommonModule],
  template: `
    <section class="stats-section py-20 bg-white dark:bg-secondary-800 border-t border-gray-200 dark:border-secondary-700">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="stat-item text-center group">
            <div class="relative">
              <div class="w-20 h-20 mx-auto bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stats().experience }}+</h3>
              <p class="text-gray-600 dark:text-gray-400 font-medium">Years Experience</p>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div class="relative">
              <div class="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stats().projects }}+</h3>
              <p class="text-gray-600 dark:text-gray-400 font-medium">Projects Completed</p>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div class="relative">
              <div class="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stats().clients }}+</h3>
              <p class="text-gray-600 dark:text-gray-400 font-medium">Happy Clients</p>
            </div>
          </div>

          <div class="stat-item text-center group">
            <div class="relative">
              <div class="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stats().technologies }}+</h3>
              <p class="text-gray-600 dark:text-gray-400 font-medium">Technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stat-item {
      animation: fadeInUp 1s ease-out;
    }
    
    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .stat-item:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .group:hover .w-20 {
      transform: scale(1.1);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `]
})
export class StatsSectionComponent {
  stats = input.required<{
    experience: number;
    projects: number;
    clients: number;
    technologies: number;
  }>();
}