import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects.component.css',
  template: `
<!-- Hero Section -->
<section class="projects-hero py-20 bg-gradient-to-br from-white via-purple-50 to-indigo-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Projects</span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        A showcase of my professional work spanning enterprise applications, ERP systems, and innovative web platforms built with modern technologies.
      </p>
      <div class="mt-8 inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-6 py-3 rounded-full font-semibold">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        {{getProjectsCount()}}+ Projects Delivered
      </div>
    </div>
  </div>
</section>

<!-- Filter Section -->
<section class="filter-section py-12 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-wrap justify-center gap-4">
        @for (filter of getProjectFilters(); track filter.id) {
          <button 
            (click)="setActiveFilter(filter.id)"
            [class]="'px-6 py-3 rounded-full font-semibold transition-all duration-300 ' + 
                     (activeFilter() === filter.id 
                       ? 'bg-purple-600 text-white shadow-lg' 
                       : 'bg-gray-100 dark:bg-secondary-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900')">
            {{filter.label}}
          </button>
        }
      </div>
    </div>
  </div>
</section>

<!-- Projects Grid -->
<section class="projects-grid-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        @for (project of getFilteredProjects(); track project.id) {
          <div class="project-card bg-white dark:bg-secondary-900 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <!-- Project Image -->
            <div class="relative h-64 bg-gradient-to-br {{project.gradientBg}} overflow-hidden">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="relative h-full flex items-center justify-center">
                <img [src]="project.image" [alt]="project.title" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <!-- Project Type Badge -->
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{project.type}}
                </span>
              </div>
              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                <span [class]="'px-3 py-1 rounded-full text-sm font-medium ' + project.statusClass">
                  {{project.status}}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-8">
              <!-- Project Header -->
              <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {{project.title}}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{project.client}}</p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{project.description}}
                </p>
              </div>

              <!-- Key Features -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Key Features
                </h4>
                <ul class="space-y-2">
                  @for (feature of project.features; track feature) {
                    <li class="flex items-start space-x-2">
                      <svg class="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-300 text-sm">{{feature}}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Technologies -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  Tech Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                      {{tech}}
                    </span>
                  }
                </div>
              </div>

              <!-- Project Stats -->
              @if (project.stats && project.stats.length > 0) {
                <div class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Project Impact
                  </h4>
                  <div class="grid grid-cols-2 gap-4">
                    @for (stat of project.stats; track stat.label) {
                      <div class="text-center">
                        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{stat.value}}</div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">{{stat.label}}</div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Project Links -->
              <div class="flex flex-wrap gap-3">
                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" 
                     class="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:bg-purple-700 hover:shadow-lg inline-flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Live Demo
                  </a>
                }
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" 
                     class="flex-1 border-2 border-purple-600 text-purple-600 px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:bg-purple-600 hover:text-white inline-flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source Code
                  </a>
                }
                @if (!project.liveUrl && !project.githubUrl) {
                  <div class="w-full bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-lg font-semibold text-center">
                    <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Confidential Project
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="cta-section py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-6">
        Ready to Start Your Next Project?
      </h2>
      <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
        Let's collaborate to bring your ideas to life with cutting-edge technology and innovative solutions.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a routerLink="/contact" 
           class="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Discuss Your Project
        </a>
        
        <a routerLink="/experience" 
           class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-purple-600 hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
          </svg>
          View Experience
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class ProjectsComponent implements OnInit {
  private animationService = inject(AnimationService);

  activeFilter = signal('all');

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  private initializeAnimations(): void {
    // Hero section animations
    this.animationService.fadeIn('.hero-title', { delay: 0.3 });

    // Filter animations
    this.animationService.staggerIn('button', { delay: 0.5, stagger: 0.1 });

    // Project cards animations
    this.animationService.scrollTriggerAnimation('.project-card', {
      trigger: '.projects-grid-section',
      stagger: 0.2
    });

    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section');
  }

  getProjectsCount(): number {
    return this.getAllProjects().length;
  }

  getProjectFilters() {
    return [
      { id: 'all', label: 'All Projects' },
      { id: 'machine-learning', label: 'Machine Learning' },
      { id: 'data-analytics', label: 'Data Analytics' },
      { id: 'enterprise', label: 'Enterprise Systems' },
      { id: 'web-app', label: 'Web Applications' }
    ];
  }

  setActiveFilter(filterId: string): void {
    this.activeFilter.set(filterId);
  }

  getFilteredProjects() {
    const allProjects = this.getAllProjects();
    const filter = this.activeFilter();

    if (filter === 'all') return allProjects;
    return allProjects.filter(project => project.category === filter);
  }

  getAllProjects() {
    return [
              {
      id: 1,
      title: "NavYojana ERP System",
      client: "Indian Navy (internal)",
      type: "Enterprise ERP",
      category: "enterprise",
      status: "In Progress",
      statusClass: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      description:
        "Comprehensive Enterprise Resource Planning system built to manage personnel, operations, finance and administrative workflows for the Indian Navy. Scalable backend built in Python with FastAPI and SQLAlchemy, serving 1000+ users across 12+ modules with 50K+ records and an availability target of 99.99%.",
      // 👇 Replace image with background SVG
      image: "data:image/svg+xml;utf8,<svg xmlns='public/icons/icon-144x144.png' viewBox='0 0 512 512' fill='%23ffffff33'><path d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 480C132.5 480 32 379.5 32 256S132.5 32 256 32s224 100.5 224 224-100.5 224-224 224z'/><path d='M352 208H160a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V224a16 16 0 0 0-16-16zm-16 160H176V240h160v128zM304 144h-96a16 16 0 0 0 0 32h96a16 16 0 0 0 0-32z'/></svg>",
      gradientBg: "from-indigo-600 via-purple-600 to-blue-500",
      features: [
        "Modular architecture with 12+ functional modules (HR, Payroll, Inventory, Logistics, Operations, Finance, Reports, etc.)",
        "Backend APIs developed with FastAPI providing async, high-performance endpoints",
        "Database layer implemented with SQLAlchemy ORM and PostgreSQL for ACID-compliant storage",
        "Scales to 1000+ concurrent users and handles 50K+ records efficiently",
        "Role-based access control and hierarchical permission system",
        "Real-time dashboards and analytics endpoints",
        "Audit logging, monitoring, and uptime >99.99%"
      ],
      technologies: [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "Docker",
        "NGINX"
      ],
      stats: [
        { label: "Users", value: "1,000+" },
        { label: "Modules", value: "12+" },
        { label: "Records", value: "50K+" },
        { label: "Uptime", value: "99.99%" }
      ],
      liveUrl: null,
      githubUrl: null
    },
      {
        id: 2,
        title: "JEE College Assistant (Machine Learning)",
        client: "Academic Project",
        type: "Web Application",
        category: "machine-learning",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description:
          "Developed a machine learning–based JEE College Predictor that helps students make informed college choices based on previous admission data (2016–2024). Achieved over 82% prediction accuracy using classification algorithms.",
        image: "/assets/images/projects/jee-predictor.svg",
        gradientBg: "from-blue-600 to-cyan-600",
        features: [
          "Implemented Random Forest and KNN models for prediction accuracy",
          "Cleaned and preprocessed large admission datasets using Pandas and NumPy",
          "Built a simple interactive UI for students using Flask",
          "Integrated MySQL database for data storage and retrieval",
          "Deployed the model for real-time predictions"
        ],
        technologies: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "MySQL"],
        stats: [
          { label: "Accuracy", value: "82%+" },
          { label: "Data Points", value: "10K+" },
          { label: "Years Covered", value: "2016–2024" },
          { label: "Users", value: "500+" }
        ],
        liveUrl: null,
        githubUrl: "https://github.com/amolpakhare/JEE_COLLEGE_PREDICTOR-USING-MACHINE-LEARNING"
      },
      {
        id: 3,
        title: "Blinkit Sales Analysis Dashboard",
        client: "Data Analytics Project",
        type: "Business Intelligence Dashboard",
        category: "data-analytics",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description:
          "Developed an interactive Power BI dashboard to analyze Blinkit sales, outlet performance, and product trends, providing insights into revenue and outlet efficiency.",
        image: "/assets/images/projects/blinkit-analysis.svg",
        gradientBg: "from-yellow-500 to-orange-600",
        features: [
          "Designed Power BI dashboards using DAX and Power Query",
          "Analyzed sales distribution by location, category, and rating",
          "Built KPIs for total sales, active outlets, and average ratings",
          "Visualized revenue trends and outlet tiers",
          "Delivered insights leading to 20% faster reporting cycles"
        ],
        technologies: ["Power BI", "Excel", "DAX", "Power Query", "ETL"],
        stats: [
          { label: "Total Sales", value: "$1.2M" },
          { label: "Outlets", value: "8523" },
          { label: "Avg Rating", value: "4.5+" },
          { label: "Insights Delivered", value: "50+" }
        ],
        liveUrl: null,
        githubUrl: "https://github.com/amolpakhare/Blinkit_Analysis"
      },
      {
        id: 4,
        title: "Festival Sales Analysis (Python)",
        client: "Data Analytics Project",
        type: "Python Data Analysis",
        category: "data-analytics",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description:
          "Performed end-to-end data analysis on a retail festival sales dataset with 5,500+ transactions, uncovering customer behavior patterns using Python libraries.",
        image: "/assets/images/projects/festival-sales.svg",
        gradientBg: "from-pink-600 to-red-600",
        features: [
          "Cleaned and preprocessed datasets using Pandas",
          "Created 10+ visualizations with Matplotlib and Seaborn",
          "Analyzed trends by gender, city, and age group",
          "Handled all missing values to improve data quality",
          "Generated actionable insights for marketing teams"
        ],
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
        stats: [
          { label: "Transactions Analyzed", value: "5.5K+" },
          { label: "Visualizations", value: "10+" },
          { label: "Data Quality", value: "100%" },
          { label: "Insights Found", value: "20+" }
        ],
        liveUrl: null,
        githubUrl: "https://github.com/amolpakhare/Festival-Sales-Analysis"
      },
      {
        id: 5,
        title: "Hotel Booking EDA & Insights",
        client: "Personal Project",
        type: "Data Analysis & Business Insights",
        category: "data-analytics",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description:
          "Performed an end-to-end Exploratory Data Analysis on hotel booking data to identify key factors behind cancellations, customer behavior, and revenue trends. Delivered actionable business insights and visualized results using Python and Seaborn.",
        image: "/assets/images/projects/hotel_booking_eda.png",
        gradientBg: "from-blue-600 to-cyan-600",
        features: [
          "Analyzed 119,000+ hotel booking records using Python and Pandas",
          "Cleaned and preprocessed missing and duplicate data effectively",
          "Explored patterns in cancellations by season, price, and country",
          "Visualized key trends using Seaborn and Matplotlib",
          "Provided business recommendations to reduce cancellation rates and boost revenue"
        ],
        technologies: [
          "Python",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Seaborn",
          "Jupyter Notebook"
        ],
        stats: [
          { label: "Total Bookings Analyzed", value: "119,000+" },
          { label: "Features Processed", value: "30+" },
          { label: "Cancellations Identified", value: "50%+" },
          { label: "Status", value: "Completed" }
        ],
        liveUrl: "https://github.com/amolpakhare/Hotel-Booking-EDA-Insights",
        githubUrl: "https://github.com/amolpakhare/Hotel-Booking-EDA-Insights"
      },

      {
        id: 6,
        title: "Superstore Sales Dashboard – Power BI + SQL",
        client: "Personal Project",
        type: "Business Intelligence Dashboard",
        category: "data-analytics",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description:
          "An interactive sales analytics dashboard developed using Power BI and SQL, designed to deliver actionable business insights from a Superstore dataset. Highlights key KPIs such as total sales, profit, discount trends, and regional performance.",
        image: "/assets/images/projects/superstore_dashboard.png",
        gradientBg: "from-yellow-500 to-orange-600",
        features: [
          "Built Power BI dashboard visualizing Sales, Profit, and Orders KPIs",
          "Used SQL for data preprocessing, joins, and transformations",
          "Created dynamic filters and slicers for interactive analysis",
          "Integrated DAX for calculated columns and measures",
          "Analyzed regional and category-wise performance for insights"
        ],
        technologies: [
          "Power BI",
          "SQL",
          "DAX",
          "Excel",
          "Data Visualization",
          "GitHub"
        ],
        stats: [
          { label: "Total Sales", value: "$2.03M" },
          { label: "Total Profit", value: "$283.9K" },
          { label: "Orders Processed", value: "9,251" },
          { label: "Status", value: "Completed" }
        ],
        liveUrl: "https://github.com/amolpakhare/Superstore-Sales-Dashboard-PowerBI-SQL",
        githubUrl: "https://github.com/amolpakhare/Superstore-Sales-Dashboard-PowerBI-SQL"
      },
      {
      id: 7,
      title: "Loan Approval Analysis (EDA + Dashboard)",
      client: "Personal Project",
      type: "Data Analytics & Visualization",
      category: "data-science",
      status: "Completed",
      statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      description:
      "Performed end-to-end Exploratory Data Analysis on a bank loan dataset to identify key factors influencing loan approvals, and built a shareable analytics dashboard showcasing data-driven insights.",
      image: "/assets/images/projects/loan_approval_dashboard.svg",
      gradientBg: "from-blue-600 to-cyan-500",
      features: [
    "Performed in-depth EDA using Pandas, NumPy, Matplotlib, and Seaborn",
    "Visualized key insights on loan approval trends using multiple charts",
    "Created dashboard-style visualization combining all key metrics",
    "Analyzed correlations between income, loan amount, and credit history",
    "Optimized data cleaning and preprocessing for accurate insights"
    ],
   technologies: [
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Jupyter Notebook"
  ],
  stats: [
    { label: "Features Analyzed", value: "10+" },
    { label: "Key Insights Found", value: "6" },
    { label: "Dashboard Visuals", value: "8+" },
    { label: "Status", value: "Completed" }
  ],
  liveUrl: "https://github.com/amolpakhare/Loan-approval-analysis",
  githubUrl: "https://github.com/amolpakhare/Loan-approval-analysis"
  },
    {
      id: 8,
      title: "Movie Recommendation System – IMDB",
      client: "Personal Project",
      type: "Machine Learning Application",
      category: "machine-learning",
      status: "Completed",
      statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      description:
        "A machine learning–based movie recommendation system that suggests the top five movies similar to a user's input using NLP and Scikit-learn. Built with Streamlit for an interactive web interface and powered by the IMDB dataset.",
      image: "/assets/images/projects/movie_recommendation.png",
      gradientBg: "from-indigo-600 to-purple-600",
      features: [
        "Implements content-based recommendation using NLP and cosine similarity",
        "Uses Scikit-learn and NLTK for text processing and similarity matching",
        "Interactive Streamlit web app for movie search and recommendations",
        "Integrates preprocessed IMDB dataset with Pandas and NumPy",
        "Recommends top 5 similar movies instantly based on user input"
      ],
      technologies: [
        "Python",
        "Scikit-learn",
        "NLTK",
        "Streamlit",
        "Pandas",
        "NumPy"
      ],
      stats: [
        { label: "Movies Dataset", value: "5,000+" },
        { label: "Recommendations", value: "Top 5 per search" },
        { label: "Model Accuracy", value: "High similarity precision" },
        { label: "Status", value: "Completed" }
      ],
      liveUrl: "https://github.com/amolpakhare/Movie_Recommend_System",
      githubUrl: "https://github.com/amolpakhare/Movie_Recommend_System"
    }
  ];
  }
}