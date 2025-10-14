import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/animation.service';
import { HeroSectionComponent } from './hero-section.component';
import { StatsSectionComponent } from './stats-section.component';

/**
 * Home page component
 * Main landing page with hero section and key statistics
 */
@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    HeroSectionComponent, 
    StatsSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <app-hero-section [personalInfo]="personalInfo()" />
    
    <!-- Stats Section -->
    <app-stats-section [stats]="stats()" />
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly animationService = inject(AnimationService);
  
  /**
   * Personal information for hero section
   */
  protected readonly personalInfo = signal({
  name: 'Amol Pakhare',
  title: 'Python Developer & Data Analyst',
  description: 'Python Developer and Data Analyst with 1+ year of experience in data analytics, FastAPI, Django, and PostgreSQL. Skilled in transforming data into insights and developing efficient backend solutions. Currently working at EPPS Infotech Ltd.'
  });


  /**
   * Statistics for stats section
   */
  protected readonly stats = signal({
    experience: 1,
    projects: 15,
    clients: 5,
    technologies: 20
  });

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  /**
   * Initialize GSAP animations for the component
   */
  private initializeAnimations(): void {
    // Hero section animations
    this.animationService.fadeIn('.hero-section', { delay: 0.2 });
    this.animationService.fadeIn('.hero-content', { delay: 0.4 });
    this.animationService.scaleIn('.profile-container', { delay: 0.6 });
    
    // Stats section animations
    this.animationService.fadeIn('.stats-section', { delay: 0.8 });
    this.animationService.staggerIn('.stat-item', { 
      delay: 1.0, 
      stagger: 0.1 
    });
  }
}