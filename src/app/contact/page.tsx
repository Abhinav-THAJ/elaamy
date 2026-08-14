import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">How Can We Help You?</h3>
              <p className="text-gray-600 leading-relaxed">
                Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Store 1 */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold mb-4 text-gray-800">Store Berlin</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-pink-500 shrink-0" />
                    <p>Germany — 785 15h Street,<br/>Office 478/B Green Mall<br/>Berlin, De 81566</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-pink-500 shrink-0" />
                    <a href="tel:+1123456788" className="hover:text-pink-500 transition-colors">+1 1234 567 88</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-pink-500 shrink-0" />
                    <a href="mailto:info@example.com" className="hover:text-pink-500 transition-colors">info@example.com</a>
                  </div>
                </div>
              </div>

              {/* Store 2 */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold mb-4 text-gray-800">Store Munich</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-pink-500 shrink-0" />
                    <p>Germany — 625 10h Street,<br/>Office 156AB Green Mall<br/>Berlin, De 81566</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-pink-500 shrink-0" />
                    <a href="tel:+545612322" className="hover:text-pink-500 transition-colors">+5 456 123 22</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-pink-500 shrink-0" />
                    <a href="mailto:contact@example.com" className="hover:text-pink-500 transition-colors">contact@example.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl">
              <h4 className="text-xl font-bold mb-6 text-gray-800">Support Center</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Call Us</p>
                    <a href="tel:+919656262613" className="text-lg font-bold text-gray-800 hover:text-pink-500 transition-colors">+91 9656262613</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Us</p>
                    <a href="mailto:elaamy@gmail.com" className="text-lg font-bold text-gray-800 hover:text-pink-500 transition-colors">elaamy@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Working Hours</p>
                    <p className="text-lg font-bold text-gray-800">Mon-Sun 09:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <h3 className="text-2xl font-bold mb-2">Send Message</h3>
            <p className="text-gray-500 mb-8">Have a question or need assistance? Fill out the form below and our team will get back to you as soon as possible.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Your Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Your Email *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject *</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Your Message</label>
                <textarea rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
