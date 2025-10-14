import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SocialLink {
  name: string;
  url: string;
  icon: SafeHtml;
  bgColor: string;
  hoverColor: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

/**
 * Main footer component with social links, contact info, and navigation
 */
@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-secondary-900 dark:to-secondary-800 text-white relative overflow-hidden">
      <!-- Enhanced Background Pattern -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-cyan-500/10 opacity-30"></div>
        <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative z-10 container mx-auto px-6 py-16">
        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          <!-- Personal Info & Bio -->
          <div class="lg:col-span-2">
            <div class="flex items-center space-x-4 mb-6">
              <div class="relative group">
                <div class="bg-gradient-to-r from-primary-500 to-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg transition-all duration-300 group-hover:scale-110">
                  AP
                </div>
                <div class="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              </div>
              <div>
                <h3 class="text-3xl font-bold bg-gradient-to-r from-white via-primary-400 to-purple-400 bg-clip-text text-transparent">{{ title() }}</h3>
                <p class="text-primary-400 font-semibold text-lg">{{ subtitle() }}</p>
                <div class="flex items-center space-x-3 mt-3">
                  <div class="relative">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div class="absolute -inset-1 bg-green-500/20 rounded-full animate-ping"></div>
                  </div>
                  <span class="text-sm text-green-400 font-medium">Available for Projects</span>
                </div>
              </div>
            </div>
            
            <!-- Updated Bio -->
            <p class="text-gray-300 leading-relaxed mb-6 text-lg">
              I'm a passionate <span class="text-primary-400 font-semibold">Python Developer and Data Analyst</span> with <span class="text-purple-400 font-semibold">1+ year</span> of experience in data analytics, FastAPI, Django, and PostgreSQL. 
              Skilled in transforming data into insights and developing efficient backend solutions. Currently working at <span class="text-purple-400 font-semibold">EPPS Infotech Ltd.</span>
            </p>
            
            <!-- Updated Professional Stats -->
            <div class="grid grid-cols-3 gap-6 mb-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-400">15+</div>
                <div class="text-sm text-gray-400">Projects</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400">1+</div>
                <div class="text-sm text-gray-400">Years Exp.</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-400">100%</div>
                <div class="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                <h4 class="text-xl font-bold text-white">Connect With Me</h4>
              </div>
              <p class="text-gray-300 text-sm leading-relaxed">
                Let's connect and collaborate! Follow me on social media or reach out directly.
              </p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                @for (social of socialLinks(); track social.name) {
                  <a [href]="social.url" 
                     target="_blank" 
                     rel="noopener" 
                     [class]="'group ' + social.bgColor + ' ' + social.hoverColor + ' p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-3 backdrop-blur-sm border border-white/5'">
                    <div [innerHTML]="social.icon" 
                         class="w-5 h-5 text-white group-hover:scale-110 transition-all duration-300"></div>
                    <span class="text-sm font-medium text-white group-hover:text-gray-100">{{ social.name }}</span>
                  </a>
                }
              </div>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-xl font-bold mb-6 text-white flex items-center space-x-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>Quick Links</span>
            </h3>
            <ul class="space-y-4">
              @for (link of navLinks(); track link.path) {
                <li>
                  <a [routerLink]="link.path" 
                     class="text-gray-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-2 transform inline-flex items-center space-x-3 group">
                    <span class="text-lg group-hover:scale-110 transition-transform">{{ link.icon }}</span>
                    <span>{{ link.label }}</span>
                  </a>
                </li>
              }
            </ul>
            
            <!-- Additional Links -->
            <div class="mt-8 pt-6 border-t border-gray-700">
              <h4 class="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul class="space-y-3">
                <li>
                  <a routerLink="/terms" 
                     class="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-300 inline-block">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a routerLink="/privacy" 
                     class="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-300 inline-block">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h3 class="text-xl font-bold mb-6 text-white flex items-center space-x-2">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Get In Touch</span>
            </h3>
            
            <div class="space-y-6">
              <!-- Email -->
              <div class="group cursor-pointer">
                <a href="mailto:{{ contactInfo().email }}" class="flex items-center space-x-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/5 hover:border-primary-500/20">
                  <div class="bg-gradient-to-r from-primary-500/20 to-blue-500/20 p-3 rounded-lg group-hover:from-primary-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <svg class="w-6 h-6 text-primary-400 group-hover:text-primary-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400 group-hover:text-gray-300">Email</div>
                    <div class="text-white font-medium group-hover:text-primary-300">{{ contactInfo().email }}</div>
                  </div>
                </a>
              </div>
              
              <!-- Phone -->
              <div class="group cursor-pointer">
                <a href="tel:{{ contactInfo().phone }}" class="flex items-center space-x-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/5 hover:border-green-500/20">
                  <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-lg group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                    <svg class="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400 group-hover:text-gray-300">Phone</div>
                    <div class="text-white font-medium group-hover:text-green-300">{{ contactInfo().phone }}</div>
                  </div>
                </a>
              </div>
              
              <!-- Location -->
              <div class="group cursor-pointer">
                <div class="flex items-center space-x-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/5 hover:border-purple-500/20">
                  <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <svg class="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400 group-hover:text-gray-300">Location</div>
                    <div class="text-white font-medium group-hover:text-purple-300">{{ contactInfo().location }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Availability -->
              <div class="group">
                <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div class="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                    <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">Availability</div>
                    <div class="text-green-400 font-medium flex items-center space-x-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Open for Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Copyright & Credits -->
        <div class="border-t border-gray-700/50 pt-8 mt-12">
          <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div class="text-center lg:text-left">
              <p class="text-gray-300 text-lg font-medium mb-2">
                &copy; {{ currentYear() }} <span class="text-primary-400 font-bold">{{ title() }}</span>. All rights reserved.
              </p>
              <p class="text-gray-400 text-sm">
                Designed & Developed with passion in India 🇮🇳
              </p>
            </div>
            
            <div class="text-center lg:text-right">
              <div class="flex items-center justify-center lg:justify-end space-x-2 mb-2">
                <span class="text-gray-400 text-sm">Built with</span>
                <span class="text-red-500 text-lg animate-pulse">❤️</span>
                <span class="text-gray-400 text-sm">using</span>
              </div>
              <div class="flex items-center justify-center lg:justify-end space-x-4">
                <div class="flex items-center space-x-2 bg-red-500/10 px-3 py-1 rounded-full">
                  <span class="text-red-400 font-bold text-sm">Angular 20</span>
                </div>
                <div class="flex items-center space-x-2 bg-blue-500/10 px-3 py-1 rounded-full">
                  <span class="text-blue-400 font-bold text-sm">Tailwind CSS</span>
                </div>
                <div class="flex items-center space-x-2 bg-green-500/10 px-3 py-1 rounded-full">
                  <span class="text-green-400 font-bold text-sm">GSAP</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Last Updated -->
          <div class="text-center mt-6 pt-4 border-t border-gray-800/50">
            <p class="text-gray-500 text-xs">
              Last updated: September 2025 • Version 2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {
  private sanitizer = inject(DomSanitizer);

  // Input properties
  title = input<string>('Amol Pakhare');
  subtitle = input<string>('Python Devloper & Data Analyst');
  navLinks = input.required<any[]>();
  socialLinks = input.required<SocialLink[]>();
  contactInfo = input.required<ContactInfo>();
  
  /**
   * Get current year for copyright
   */
  protected currentYear(): number {
    return new Date().getFullYear();
  }
}