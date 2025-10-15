import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact.component.css',
  template: `
<!-- Hero Section -->
<section class="contact-hero py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Get In <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Touch</span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Ready to start your next project? Let's discuss how we can work together to bring your ideas to life with innovative technology solutions.
      </p>
      <div class="mt-8 inline-flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-6 py-3 rounded-full font-semibold">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        Available for New Projects
      </div>
    </div>
  </div>
</section>

<!-- Contact Methods -->
<section class="contact-methods-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Multiple Ways to <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Connect</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose your preferred method of communication
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (method of getContactMethods(); track method.id) {
          <div class="contact-method-card bg-gray-50 dark:bg-secondary-800 p-8 rounded-xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br {{method.gradient}} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              <div class="w-8 h-8" [innerHTML]="method.icon"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{method.title}}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              {{method.description}}
            </p>
            <a [href]="method.link" [target]="method.external ? '_blank' : '_self'"
               class="inline-flex items-center bg-gradient-to-r {{method.gradient}} text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
              {{method.action}}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Contact Form -->
<section class="contact-form-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="contact-form-container">
          <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Name Field -->
              <div class="form-group">
                <label for="name" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name">
                @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Name is required</p>
                }
              </div>

              <!-- Email Field -->
              <div class="form-group">
                <label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your email address">
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Valid email is required</p>
                }
              </div>

              <!-- Phone Field -->
              <div class="form-group">
                <label for="phone" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  formControlName="phone"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your phone number">
              </div>

              <!-- Subject Field -->
              <div class="form-group">
                <label for="subject" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  formControlName="subject"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors">
                  <option value="">Select a subject</option>
                  <option value="web-development">Python Development</option>
                  <option value="frontend-development">Data Analyst and Business Analyst</option>
                  <option value="frontend-development">Data Science</option>
                  <option value="fullstack-development">Machine Learning</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="collaboration">Project Collaboration</option>
                  <option value="other">Other</option>
                </select>
                @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Subject is required</p>
                }
              </div>

              <!-- Message Field -->
              <div class="form-group">
                <label for="message" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="5"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Message is required</p>
                }
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="contactForm.invalid || isSubmitting()"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center">
                @if (isSubmitting()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                } @else {
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Send Message
                }
              </button>
            </form>

            @if (submitStatus() === 'success') {
              <div class="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Message sent successfully! I'll get back to you soon.
                </div>
              </div>
            }

            @if (submitStatus() === 'error') {
              <div class="mt-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Failed to send message. Please try again or contact me directly.
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Contact Info -->
        <div class="contact-info-container">
          <div class="space-y-8">
            <!-- Personal Info -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div class="space-y-6">
                @for (info of getContactInfo(); track info.id) {
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br {{info.gradient}} flex items-center justify-center text-white">
                      {{info.icon}}
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">{{info.title}}</h4>
                      <p class="text-gray-600 dark:text-gray-300">{{info.value}}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Availability -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Availability
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Response Time</span>
                  <span class="font-semibold text-gray-900 dark:text-white">Within 24 hours</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Time Zone</span>
                  <span class="font-semibold text-gray-900 dark:text-white">IST (UTC+5:30)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Project Availability</span>
                  <span class="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Me
              </h3>
              
              <div class="flex space-x-4">
                @for (social of getSocialLinks(); track social.id) {
                  <a [href]="social.url" target="_blank" 
                     class="w-12 h-12 rounded-lg bg-gradient-to-br {{social.gradient}} flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    <div class="w-6 h-6" [innerHTML]="social.icon"></div>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-6">
        Let's Build Something Amazing Together
      </h2>
      <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
        Ready to turn your vision into reality? I'm here to help you create innovative digital solutions that make a difference.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="mailto:pakhareamol300@gmail.com" 
           class="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Email Me Directly
        </a>
        
        <a routerLink="/projects" 
           class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          View My Work
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class ContactComponent implements OnInit {
  private animationService = inject(AnimationService);
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  private initializeAnimations(): void {
    // Hero section animations
    this.animationService.fadeIn('.hero-title', { delay: 0.3 });
    
    // Contact method cards animations
    this.animationService.scrollTriggerAnimation('.contact-method-card', {
      trigger: '.contact-methods-section',
      stagger: 0.1
    });
    
    // Form animations
    this.animationService.scrollTriggerAnimation('.contact-form-container', {
      trigger: '.contact-form-section'
    });
    
    this.animationService.scrollTriggerAnimation('.contact-info-container', {
      trigger: '.contact-form-section',
      delay: 0.2
    });
    
    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.submitStatus.set('idle');
      
      // Simulate form submission
      setTimeout(() => {
        // In a real application, you would send the form data to your backend
        console.log('Form submitted:', this.contactForm.value);
        
        // Simulate success/error
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        if (isSuccess) {
          this.submitStatus.set('success');
          this.contactForm.reset();
        } else {
          this.submitStatus.set('error');
        }
        
        this.isSubmitting.set(false);
        
        // Clear status after 5 seconds
        setTimeout(() => {
          this.submitStatus.set('idle');
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

getContactMethods() {
  return [
    {
      id: 1,
      title: "Email",
      description: "Send me an email for collaboration or inquiries",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>`),
      gradient: "from-blue-500 to-blue-700",
      action: "Send Email",
      link: "mailto:pakhareamol300@gmail.com",
      external: false
    },
    {
      id: 2,
      title: "Phone",
      description: "Call me directly for professional discussions",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>`),
      gradient: "from-green-500 to-green-700",
      action: "Call Now",
      link: "tel:+919579343019",
      external: false
    },
    {
      id: 3,
      title: "WhatsApp",
      description: "Chat with me instantly on WhatsApp",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>`),
      gradient: "from-green-400 to-green-600",
      action: "Chat Now",
      link: "https://wa.me/919579343019",
      external: true
    },
    {
      id: 4,
      title: "LinkedIn",
      description: "Connect with me professionally on LinkedIn",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`),
      gradient: "from-blue-600 to-blue-800",
      action: "Connect",
      link: "https://www.linkedin.com/in/amolpakhare",
      external: true
    }
  ];
}

getContactInfo() {
  return [
    {
      id: 1,
      title: "Email",
      value: "pakhareamol300@gmail.com",
      icon: "✉️",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Phone",
      value: "+91 9579343019",
      icon: "📞",
      gradient: "from-green-500 to-green-700"
    },
    {
      id: 3,
      title: "Location",
      value: "Pune, Maharashtra, India",
      icon: "📍",
      gradient: "from-purple-500 to-purple-700"
    }
  ];
}

getSocialLinks() {
  return [
    {
      id: 1,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/amolpakhare",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`),
      gradient: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://github.com/amolpakhare",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
      </svg>`),
      gradient: "from-gray-700 to-gray-900"
    }
  ];
}
}