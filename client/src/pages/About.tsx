export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Welcome to my personal travel magazine. Here, I share stories, insights, and discoveries 
            from my journeys around the world.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* About Content */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  My Journey
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  I've always been fascinated by the world's diverse cultures, landscapes, and stories. 
                  What started as a personal hobby has evolved into a passion for documenting and sharing 
                  these experiences through photography and writing.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This magazine is a collection of my travels, carefully curated to inspire and inform 
                  fellow travelers. Each article is accompanied by high-quality photography and detailed 
                  location information.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Why This Magazine?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  In an age of social media and instant sharing, I wanted to create something more 
                  thoughtful and lasting. This magazine represents my commitment to quality storytelling 
                  and beautiful design.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every article is written with care, every photograph is selected with intention, and 
                  every design element serves a purpose. This is my corner of the internet, free from 
                  algorithms and advertisements.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Technical Details
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This website is built with modern web technologies and hosted on GitHub Pages. 
                  Articles are managed through a Git-based CMS powered by GitHub Actions, ensuring 
                  complete control over content and data.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The design emphasizes simplicity and readability, inspired by high-end travel magazines 
                  like Kinfolk and Cereal. Every detail, from typography to spacing, has been carefully 
                  considered.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Author Card */}
            <div className="bg-gray-50 rounded p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-gray-900">Travel Blogger</h3>
                <p className="text-sm text-gray-600 mt-1">Travel Writer & Photographer</p>
              </div>

              <div className="divider my-6" />

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Interests</p>
                  <p className="text-gray-600">
                    Travel, Photography, Culture, Adventure, Food
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">Based In</p>
                  <p className="text-gray-600">
                    Traveling the world
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">Contact</p>
                  <p className="text-gray-600">
                    <a href="mailto:hello@example.com" className="hover:text-gray-900 transition-colors">
                      hello@example.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 md:py-16 mt-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Start Exploring
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ready to discover new destinations? Browse through my collection of travel stories 
              and interactive maps.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/articles">
                <button className="px-8 py-3 bg-gray-900 text-white font-serif font-bold hover:bg-gray-800 transition-colors">
                  Read Articles
                </button>
              </a>
              <a href="/map">
                <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-serif font-bold hover:bg-gray-50 transition-colors">
                  View Map
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

