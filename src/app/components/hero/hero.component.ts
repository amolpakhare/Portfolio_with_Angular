import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div class="container mx-auto px-6 py-24">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 lg:pr-12">
            <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Build Your Perfect
              <span class="text-yellow-300">CV</span>
              in Minutes
            </h1>
            <p class="text-xl mb-8 text-blue-100">
              Create professional, ATS-friendly resumes with our intuitive CV builder. 
              Stand out from the crowd and land your dream job.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                routerLink="/dashboard"
                class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Get Started Free
              </button>
              <button 
                routerLink="/about"
                class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div class="lg:w-1/2 mt-12 lg:mt-0">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">Professional Templates</h3>
                    <p class="text-blue-100">Choose from expertly designed templates</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">ATS Optimized</h3>
                    <p class="text-blue-100">Pass through applicant tracking systems</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">Easy to Use</h3>
                    <p class="text-blue-100">Build your CV with our intuitive editor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}