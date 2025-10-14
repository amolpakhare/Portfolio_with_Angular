import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div class="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p class="text-gray-600 leading-relaxed">
                By accessing and using NanoCV, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
              <p class="text-gray-600 leading-relaxed">
                NanoCV is a CV/Resume building platform that allows users to create, edit, and download professional resumes.
                We reserve the right to modify or discontinue the service at any time.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
              <ul class="text-gray-600 leading-relaxed space-y-2">
                <li>• You are responsible for the accuracy of information provided</li>
                <li>• You must not use the service for illegal purposes</li>
                <li>• You must maintain the confidentiality of your account</li>
                <li>• You agree not to share copyrighted content without permission</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">4. Privacy and Data</h2>
              <p class="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect,
                use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
              <p class="text-gray-600 leading-relaxed">
                NanoCV shall not be liable for any direct, indirect, incidental, special, or consequential damages
                resulting from the use or inability to use our service.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">6. Contact Information</h2>
              <p class="text-gray-600 leading-relaxed">
                If you have any questions about these Terms and Conditions, please 
                <a routerLink="/contact" class="text-blue-600 hover:text-blue-800 underline">contact us</a>.
              </p>
            </section>
          </div>

          <div class="mt-8 text-center">
            <button 
              routerLink="/"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TermsComponent {}