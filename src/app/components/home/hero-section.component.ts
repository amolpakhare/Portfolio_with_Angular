import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Hero section component for the home page
 * Displays main introduction, profile image, and call-to-action buttons
 */
@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative z-10 container mx-auto px-6 text-center">
        <div class="hero-content">
          <!-- Profile Image -->
          <div class="profile-container mb-8">
            <div class="relative inline-block group">
              <div class="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-secondary-700 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img src="/assets/images/Profile.jpeg" 
                     alt="Amol Pakhre" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     onerror="this.src='/assets/images/default-profile.svg'">
              </div>
              <div class="absolute inset-0 rounded-full bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="hero-text max-w-4xl mx-auto">
            <h1 class="hero-title text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">{{ personalInfo().name }}</span>
            </h1>
            
            <h2 class="hero-subtitle text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {{ personalInfo().title }}
            </h2>
            
            <p class="hero-description text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              {{ personalInfo().description }}
            </p>

            <!-- Action Buttons -->
            <div class="hero-actions flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a routerLink="/contact" 
                 class="primary-btn bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                <span class="flex items-center">
                  <svg class="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Let's Talk
                </span>
              </a>
              
              <a href="/assets/resume/Naynesh-Rathod-Resume.html" 
                 target="_blank" 
                 class="border-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-secondary-900 hover:scale-105 inline-flex items-center">
                <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                View Resume
              </a>
            </div>
          </div>
          
          <!-- Scroll Indicator -->
          <div class="scroll-indicator mt-16">
            <div class="flex flex-col items-center animate-bounce">
              <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
    }
    
    .hero-title {
      animation: fadeInUp 1s ease-out;
    }
    
    .hero-subtitle {
      animation: fadeInUp 1s ease-out 0.2s both;
    }
    
    .hero-description {
      animation: fadeInUp 1s ease-out 0.4s both;
    }
    
    .hero-actions {
      animation: fadeInUp 1s ease-out 0.6s both;
    }
    
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
    
    .primary-btn:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `]
})
export class HeroSectionComponent {
  personalInfo = input.required<{
    name: string;
    title: string;
    description: string;
  }>();
}