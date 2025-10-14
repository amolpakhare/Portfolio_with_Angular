import { Component, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './skills.component.css',
  template: `
    <!-- HERO SECTION -->
    <section class="skills-hero py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
      <div class="container mx-auto px-6 text-center">
        <h1 class="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Technical <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Skills</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A showcase of my expertise in Python, Backend Development, Frontend Design, Data Analytics, and Machine Learning.
        </p>
      </div>
    </section>

    <!-- PROGRAMMING LANGUAGES -->
    <section class="languages-section py-20 bg-white dark:bg-secondary-900">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Programming <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Languages</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Core programming languages I use to build data-driven applications.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (language of getProgrammingLanguages(); track language.id) {
            <div class="skill-card bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <img [src]="language.icon" alt="{{language.name}}" class="w-16 h-16 mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{language.name}}</h3>

              <!-- Progress Bar -->
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div class="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" [style.width.%]="language.proficiency"></div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{language.proficiency}}% Proficiency</p>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{language.description}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- BACKEND TECHNOLOGIES -->
    <section class="backend-section py-20 bg-gray-50 dark:bg-secondary-800">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Backend <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Technologies</span>
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (backend of getBackendTechnologies(); track backend.id) {
            <div class="backend-card bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <img [src]="backend.icon" alt="{{backend.name}}" class="w-16 h-16 mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{backend.name}}</h3>

              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div class="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-teal-500" [style.width.%]="backend.proficiency"></div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{backend.proficiency}}% Proficiency</p>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{backend.description}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- FRONTEND TECHNOLOGIES -->
    <section class="frontend-section py-20 bg-white dark:bg-secondary-900">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Frontend <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Technologies</span>
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (frontend of getFrontendTechnologies(); track frontend.id) {
            <div class="frontend-card bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <img [src]="frontend.icon" alt="{{frontend.name}}" class="w-16 h-16 mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{frontend.name}}</h3>

              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div class="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" [style.width.%]="frontend.proficiency"></div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{frontend.proficiency}}% Proficiency</p>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{frontend.description}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- TOOLS & ANALYTICS -->
    <section class="tools-section py-20 bg-gray-50 dark:bg-secondary-800">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Tools & <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Analytics</span>
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (tool of getToolsAndAnalytics(); track tool.id) {
            <div class="tool-card bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <img [src]="tool.icon" alt="{{tool.name}}" class="w-14 h-14 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{tool.name}}</h3>

              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div class="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-600" [style.width.%]="tool.proficiency"></div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{tool.proficiency}}% Proficiency</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{tool.category}}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements OnInit {
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => this.initializeAnimations());
  }

  ngOnInit(): void {}

  private initializeAnimations(): void {
    this.animationService.fadeIn('.hero-title', { delay: 0.3 });
    this.animationService.scrollTriggerAnimation('.skill-card');
    this.animationService.scrollTriggerAnimation('.backend-card');
    this.animationService.scrollTriggerAnimation('.frontend-card');
    this.animationService.scrollTriggerAnimation('.tool-card');
  }

  // 🐍 PROGRAMMING LANGUAGES
  getProgrammingLanguages() {
    return [
      {
        id: 1,
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        proficiency: 100,
        description: 'Proficient in Python for backend APIs, automation, and data analysis.'
      },
      {
        id: 2,
        name: 'SQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',
        proficiency: 100,
        description: 'Strong command of database querying, joins, and schema design.'
      },
      {
        id: 3,
        name: 'Machine Learning',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
        proficiency: 90,
        description: 'Experience building ML models, feature engineering, and predictive analytics.'
      }
    ];
  }

  // ⚙️ BACKEND TECHNOLOGIES
  getBackendTechnologies() {
    return [
      {
        id: 1,
        name: 'FastAPI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
        proficiency: 100,
        description: 'Modern Python framework for high-performance REST APIs with async support.'
      },
      {
        id: 2,
        name: 'Flask',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
        proficiency: 85,
        description: 'Lightweight Python micro-framework for backend and data-driven apps.'
      },
      {
        id: 3,
        name: 'Django',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg',
        proficiency: 90,
        description: 'High-level framework for scalable applications with ORM and admin support.'
      }
    ];
  }

  // 🎨 FRONTEND TECHNOLOGIES
  getFrontendTechnologies() {
    return [
      {
        id: 1,
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        proficiency: 85,
        description: 'Structuring content and building clean, semantic layouts.'
      },
      {
        id: 2,
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        proficiency: 85,
        description: 'Designing responsive web interfaces using Flexbox and Grid.'
      },
      {
        id: 3,
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        proficiency: 70,
        description: 'Adding interactivity, logic, and functionality to dashboards and apps.'
      }
    ];
  }

  // 📊 TOOLS & ANALYTICS
  getToolsAndAnalytics() {
    return [
      {
        id: 1,
        name: 'Power BI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg',
        proficiency: 90,
        category: 'Data visualization and reporting tool for actionable insights.'
      },
      {
        id: 2,
        name: 'Excel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/excel/excel-original.svg',
        proficiency: 85,
        category: 'Advanced Excel for data analysis, pivot tables, and dashboards.'
      },
      {
        id: 3,
        name: 'Git & GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        proficiency: 95,
        category: 'Version control and collaborative development using Git workflow.'
      },
      {
        id: 4,
        name: 'Streamlit',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
        proficiency: 85,
        category: 'Python framework for building data dashboards and ML apps.'
      }
    ];
  }
}
