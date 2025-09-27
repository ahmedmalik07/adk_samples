'use client'

import { motion } from 'framer-motion'
import { Users, ArrowLeft, Shield, CheckCircle, AlertTriangle, Heart, Home } from 'lucide-react'
import Link from 'next/link'

export default function GuidelinesPage() {
  const guidelines = [
    {
      category: "Profile Creation",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      rules: [
        "Use your real name and accurate information",
        "Upload a recent, clear profile photo",
        "Be honest about your lifestyle preferences",
        "Include your university and study program",
        "Specify your exact location and area preferences"
      ]
    },
    {
      category: "Safety & Security",
      icon: <Shield className="h-6 w-6 text-green-600" />,
      rules: [
        "Never share personal financial information",
        "Meet potential roommates in public places first",
        "Verify identity before making any commitments", 
        "Trust your instincts - report suspicious behavior",
        "Don't make advance payments without proper verification"
      ]
    },
    {
      category: "Communication", 
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      rules: [
        "Be respectful and courteous in all interactions",
        "Respond to messages within 24-48 hours",
        "Use appropriate language and maintain decorum",
        "Respect cultural and religious sensitivities",
        "Be clear about your expectations and boundaries"
      ]
    },
    {
      category: "Property Listings",
      icon: <Home className="h-6 w-6 text-purple-600" />,
      rules: [
        "Provide accurate photos and descriptions",
        "List real, available properties only",
        "Include all costs (rent, utilities, deposits)",
        "Specify all rules and restrictions clearly",
        "Update availability status promptly"
      ]
    }
  ]

  const prohibited = [
    "Fake profiles or false information",
    "Harassment or discriminatory behavior", 
    "Sharing inappropriate content or images",
    "Spam or promotional messages",
    "Subletting without permission",
    "Requesting money transfers or advance payments online"
  ]

  const tips = [
    {
      title: "Perfect Your Profile",
      description: "Complete profiles get 3x more matches. Include photos, preferences, and detailed information.",
      icon: "✨"
    },
    {
      title: "Stay Active", 
      description: "Regular login and prompt responses increase your visibility in our matching algorithm.",
      icon: "⚡"
    },
    {
      title: "Be Specific",
      description: "Clear preferences help our AI find better matches. Don't be afraid to specify your needs.",
      icon: "🎯"
    },
    {
      title: "Safety First",
      description: "Always meet in public, verify identities, and trust your instincts before committing.",
      icon: "🛡️"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary-600" />
              <span className="font-bold text-primary-600">Lodgio</span>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Community 
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {" "}Guidelines
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these guidelines to ensure a safe, respectful, and successful experience for everyone in our community.
            </p>
          </motion.div>

          {/* Guidelines Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {guidelines.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  {section.icon}
                  <h3 className="text-2xl font-bold text-gray-900 ml-3">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Prohibited Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-red-50 rounded-xl p-8 mb-16"
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900 ml-3">Prohibited Activities</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {prohibited.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-500 mr-3">❌</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <p className="text-red-800 font-medium">
                Violation of these guidelines may result in account suspension or permanent ban from the platform.
              </p>
            </div>
          </motion.div>

          {/* Success Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Tips for Success</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cultural Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Cultural Sensitivity</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">🕌 Religious Respect</h4>
                <p className="text-gray-600 text-sm">Respect prayer times, dietary restrictions, and religious practices of all community members.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">👥 Family Values</h4>
                <p className="text-gray-600 text-sm">Understand and respect the importance of family in Pakistani culture and accommodate family visits.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">🤝 Social Norms</h4>
                <p className="text-gray-600 text-sm">Be mindful of local social customs and maintain appropriate boundaries in mixed-gender interactions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Lodgio</span>
              </div>
              <p className="text-gray-400 mb-3">
                AI-powered roommate matching for Pakistani students
              </p>
              <p className="text-primary-400 font-medium text-sm italic">
                "Connecting Hearts, Creating Homes"
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/seeker" className="hover:text-white transition-colors">Find Roommate</Link></li>
                <li><Link href="/provider" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                                <li><Link href="/success-stories" className="hover:text-white transition-colors">Features & Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support & Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Team</h3>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Ahmed Malik (Lead) - Air University</li>
                <li>Salma Saleem - GIKI</li>
                <li>Fatima - FAST University</li>
                <li>Moawiz - FAST University</li>
                <li>Rabia - Bahria University</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">Built with AI & passion in Pakistan 🇵🇰</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Lodgio. Built with Google ADK Multi-Agent System.</p>
            <p className="text-xs mt-2">Empowering Pakistani students with AI-driven accommodation solutions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}