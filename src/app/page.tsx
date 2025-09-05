import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-8">
              <span className="mr-2">✨</span> AI-Powered Pitch Generation
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Transform Your Idea Into <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-slate-700 to-amber-600 bg-clip-text text-transparent">
                Investor-Ready Pitches
              </span>
            </h1>
            
            <p className="text-xl text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              QuickPitch uses advanced AI to transform your startup concept into professional, 
              investor-ready pitch decks in seconds. Perfect for founders and innovators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/generate"
                className="bg-slate-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Create Your Pitch →
              </Link>
              <a 
                href="#how-it-works"
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-amber-400 hover:text-amber-700 transition-all duration-300 text-center"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Transformation Demo */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto border border-slate-200">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">From Idea to Investment-Ready</h3>
              <p className="text-slate-600">Watch your concept transform into a professional pitch</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Input Column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                  <h4 className="text-lg font-semibold text-slate-800">Your Concept</h4>
                </div>
                
                <div className="bg-amber-50 p-4 md:p-5 rounded-xl border-2 border-dashed border-amber-200">
                  <div className="flex items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-amber-600">💡</span>
                    </div>
                    <p className="text-slate-700 italic text-base md:text-lg">"A platform for college students to buy and sell textbooks easily"</p>
                  </div>
                </div>
                
                <div className="bg-amber-100 p-3 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Simply describe your idea in plain English. No technical expertise required.
                  </p>
                </div>
              </div>

              {/* Output Column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-slate-600 rounded-full mr-3"></div>
                  <h4 className="text-lg font-semibold text-slate-800">AI-Generated Pitch</h4>
                </div>
                
                <div className="bg-slate-50 p-4 md:p-5 rounded-xl border-2 border-slate-300">
                  <div className="flex items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-slate-700">📊</span>
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold text-base md:text-lg">CampusText</p>
                      <p className="text-slate-700 mt-1 text-sm md:text-base">Peer-to-peer textbook marketplace reducing student costs by 70%</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Market Analysis</span>
                        <span className="bg-slate-200 text-slate-800 text-xs px-2 py-1 rounded">Revenue Model</span>
                        <span className="bg-slate-200 text-slate-800 text-xs px-2 py-1 rounded">Target Audience</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-sm text-slate-800">
                    Professional pitch deck with all essential components, ready for investors.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-slate-900">30s</div>
                  <div className="text-sm text-slate-600">Average Generation</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">95%</div>
                  <div className="text-sm text-slate-600">User Satisfaction</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">10K+</div>
                  <div className="text-sm text-slate-600">Pitches Created</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why QuickPitch Stands Out</h2>
          <p className="text-xl text-slate-600 mb-8 md:mb-12 max-w-3xl mx-auto">
            We've redefined pitch creation with AI-powered technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-xl md:text-2xl">⚡</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">Instant Results</h3>
              <p className="text-slate-600 text-sm md:text-base">Generate complete pitches in under 30 seconds</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-600 text-xl md:text-2xl">🤖</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-600 text-sm md:text-base">Advanced algorithms trained on successful pitches</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-600 text-xl md:text-2xl">💼</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">Professional Quality</h3>
              <p className="text-slate-600 text-sm md:text-base">Investor-ready pitches with proper structure</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple Three-Step Process</h2>
            <p className="text-xl text-slate-600">Transform your idea into a pitch effortlessly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-amber-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm md:text-lg font-bold">1</div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">Describe Your Idea</h3>
              <p className="text-slate-600 text-sm md:text-base">Share your concept in plain English</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm md:text-lg font-bold">2</div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">AI Generation</h3>
              <p className="text-slate-600 text-sm md:text-base">Our AI creates a structured pitch</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm md:text-lg font-bold">3</div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">Refine & Share</h3>
              <p className="text-slate-600 text-sm md:text-base">Customize and present to investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Pitch Package</h2>
            <p className="text-xl text-slate-600">Everything you need for a successful investor meeting</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "🎯", title: "Elevator Pitch", description: "Concise overview that grabs attention immediately" },
              { icon: "⚠️", title: "Problem Statement", description: "Clearly defines the market gap you're addressing" },
              { icon: "💡", title: "Solution", description: "How your product effectively solves the problem" },
              { icon: "👥", title: "Target Market", description: "Identifies your ideal customers and market size" },
              { icon: "🏷️", title: "Tagline", description: "Memorable phrase encapsulating your brand" },
              { icon: "📈", title: "Business Model", description: "How your company generates revenue and profit" }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-50 p-4 md:p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-slate-200">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mb-3 md:mb-4 shadow-sm">
                  <span className="text-lg md:text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Innovators</h2>
          <p className="text-xl text-slate-600 mb-8 md:mb-12">See what our users are saying</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
              <p className="text-slate-700 italic mb-4 text-sm md:text-base">"QuickPitch helped us secure our seed funding. The AI-generated pitch was incredibly professional and persuasive."</p>
              <p className="text-slate-900 font-semibold text-sm md:text-base">- Sarah Chen, Tech Founder</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300">
              <p className="text-slate-700 italic mb-4 text-sm md:text-base">"I went from idea to investor meeting in one day. This platform is a game-changer for entrepreneurs."</p>
              <p className="text-slate-900 font-semibold text-sm md:text-base">- Michael Torres, Startup CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Ideas?</h2>
          <p className="text-xl text-black mb-8">Join thousands of founders using QuickPitch to create compelling pitches</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/generate"
              className="bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg text-center"
            >
              Create Your First Pitch
            </Link>
           
          </div>
          
          <p className="text-black mt-6 text-sm md:text-base">
            Free plan includes 3 pitches per month. No credit card required.
          </p>
        </div>
      </section>
    </div>
  );
}