import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div class="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p class="text-gray-600 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                build a resume, or contact us for support.
              </p>
              <ul class="text-gray-600 leading-relaxed space-y-2">
                <li>• Personal information (name, email, phone number)</li>
                <li>• Professional information (work experience, education, skills)</li>
                <li>• Usage data (how you interact with our service)</li>
                <li>• Device information (browser type, IP address)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <ul class="text-gray-600 leading-relaxed space-y-2">
                <li>• To provide and maintain our service</li>
                <li>• To improve and personalize your experience</li>
                <li>• To communicate with you about your account</li>
                <li>• To provide customer support</li>
                <li>• To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
              <p class="text-gray-600 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p class="text-gray-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <ul class="text-gray-600 leading-relaxed space-y-2">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate information</li>
                <li>• Delete your personal information</li>
                <li>• Object to processing of your information</li>
                <li>• Data portability</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p class="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please 
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
export class PrivacyComponent {}