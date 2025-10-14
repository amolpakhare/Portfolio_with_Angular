import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation Bar -->
      <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-6">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-4">
              <h1 class="text-xl font-bold text-gray-800">NanoCV Dashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-gray-600">Welcome, John!</span>
              <button 
                routerLink="/"
                class="text-blue-600 hover:text-blue-800 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="container mx-auto px-6 py-8">
        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L16 12.586V5a2 2 0 00-2-2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V3a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2H4a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Total CVs</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats().totalCVs }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Completed</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats().completed }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-yellow-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Downloads</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats().downloads }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Templates</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats().templates }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Recent CVs -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow">
              <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <h2 class="text-xl font-semibold text-gray-800">Your CVs</h2>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Create New CV
                  </button>
                </div>
              </div>
              <div class="p-6">
                @if (cvs().length === 0) {
                  <div class="text-center py-8">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L16 12.586V5a2 2 0 00-2-2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V3a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2H4a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-800 mb-2">No CVs yet</h3>
                    <p class="text-gray-600 mb-4">Create your first CV to get started</p>
                    <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Create Your First CV
                    </button>
                  </div>
                } @else {
                  <div class="space-y-4">
                    @for (cv of cvs(); track cv.id) {
                      <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div class="flex justify-between items-start">
                          <div>
                            <h3 class="font-medium text-gray-800">{{ cv.name }}</h3>
                            <p class="text-sm text-gray-600">{{ cv.template }} • Last updated {{ cv.lastUpdated }}</p>
                          </div>
                          <div class="flex space-x-2">
                            <button class="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                            <button class="text-green-600 hover:text-green-800 text-sm">Download</button>
                            <button class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                          </div>
                        </div>
                        <div class="mt-2">
                          <div class="bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" [style.width.%]="cv.progress"></div>
                          </div>
                          <p class="text-xs text-gray-500 mt-1">{{ cv.progress }}% complete</p>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">Create New CV</span>
                  </div>
                </button>
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">Import CV</span>
                  </div>
                </button>
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                      <path fill-rule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">Browse Templates</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Tips -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Tips & Tricks</h3>
              <div class="space-y-4">
                <div class="p-4 bg-blue-50 rounded-lg">
                  <h4 class="text-sm font-medium text-blue-800 mb-1">Keep it concise</h4>
                  <p class="text-xs text-blue-700">Aim for 1-2 pages maximum to keep recruiters engaged.</p>
                </div>
                <div class="p-4 bg-green-50 rounded-lg">
                  <h4 class="text-sm font-medium text-green-800 mb-1">Use action verbs</h4>
                  <p class="text-xs text-green-700">Start bullet points with strong action verbs like "led", "developed", "improved".</p>
                </div>
                <div class="p-4 bg-yellow-50 rounded-lg">
                  <h4 class="text-sm font-medium text-yellow-800 mb-1">Quantify achievements</h4>
                  <p class="text-xs text-yellow-700">Include numbers and percentages to show your impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  stats = signal({
    totalCVs: 3,
    completed: 2,
    downloads: 8,
    templates: 12
  });

  cvs = signal([
    {
      id: 1,
      name: 'Software Developer Resume',
      template: 'Modern Template',
      lastUpdated: '2 days ago',
      progress: 85
    },
    {
      id: 2,
      name: 'Marketing Manager CV',
      template: 'Professional Template',
      lastUpdated: '1 week ago',
      progress: 100
    },
    {
      id: 3,
      name: 'Data Analyst Resume',
      template: 'Clean Template',
      lastUpdated: '3 days ago',
      progress: 60
    }
  ]);
}