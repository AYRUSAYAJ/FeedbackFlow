
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, BarChart3, QrCode, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Building2,
      title: "Multi-Organization Management",
      description: "Manage multiple organizations with custom branding and isolated feedback systems"
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description: "Instantly generate QR codes for any feedback form for easy mobile access"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Super admin and organization admin roles with granular permissions"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with real-time feedback insights and trends"
    }
  ];

  const testimonials = [
    {
      company: "City Hospital",
      feedback: "Feedback flow transformed our patient satisfaction process. QR codes make it so easy!",
      rating: 5
    },
    {
      company: "Grand Plaza Hotel",
      feedback: "The customization options let us match our brand perfectly. Excellent platform!",
      rating: 5
    },
    {
      company: "Westfield School",
      feedback: "Our parent feedback collection increased by 300% since implementing this system.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FF</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FeedbackFlow
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
            <Link to="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">Docs</Link>
          </nav>
          <div className="flex space-x-3">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/admin-dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Admin Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
          🚀 SaaS Feedback Platform
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Transform Feedback
          <br />
          Collection Forever
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Empower organizations with branded feedback systems, QR code generation, 
          and real-time analytics. Perfect for hospitals, hotels, schools, and any business 
          that values customer insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/form-builder">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Try Form Builder
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/organization-dashboard">
            <Button size="lg" variant="outline">
              View Live Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, customize, and manage feedback collection at scale
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`transition-all duration-300 hover:shadow-xl cursor-pointer ${
                hoveredFeature === index ? 'scale-105 shadow-xl' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch how organizations create custom feedback forms and collect insights
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">QR Code Magic</h3>
              <p className="mb-6 opacity-90">
                Generate QR codes instantly for any feedback form. Customers scan and provide 
                feedback in seconds, no app downloads required.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Instant Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Mobile Optimized</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 text-gray-800">
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-center font-medium">Sample QR Code</p>
              <p className="text-xs text-center text-gray-500 mt-1">Scan to try feedback form</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Organizations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how different industries use FeedbackFlow to improve their services
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 italic">
                  "{testimonial.feedback}"
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Feedback?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of organizations already using FeedbackFlow to collect better insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <span className="text-xl font-bold">FeedbackFlow</span>
              </div>
              <p className="text-gray-400">
                The most powerful feedback collection platform for modern organizations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/form-builder" className="hover:text-white">Form Builder</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FeedbackFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
