"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiMessageCircle } from "react-icons/fi";

interface ContactProps {
  mode: "light" | "dark";
}

const Contact: React.FC<ContactProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "mehtaneer2@gmail.com",
      href: "mailto:mehtaneer2@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+91 9313202038",
      href: "tel:+919313202038",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Ahmedabad, Gujarat",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: "GitHub",
      href: "https://github.com/Neer2304",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/neer-mehta-94a23b339",
    },
    {
      icon: FiMessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919313202038",
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Get In Touch
          </h2>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${
            mode === "light" ? "text-slate-600" : "text-slate-300"
          }`}>
            Let's discuss your project and build something amazing together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${
                mode === "light" ? "text-slate-800" : "text-slate-100"
              }`}>
                Let's Connect
              </h3>
              <p className={`text-lg leading-relaxed ${
                mode === "light" ? "text-slate-600" : "text-slate-300"
              }`}>
                I'm always open to discussing new opportunities, creative ideas, or potential collaborations. Feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                      mode === "light"
                        ? "bg-white border-slate-200 hover:border-blue-500"
                        : "bg-slate-800 border-slate-700 hover:border-blue-500"
                    }`}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`text-sm ${
                        mode === "light" ? "text-slate-500" : "text-slate-400"
                      }`}>
                        {info.label}
                      </p>
                      <p className={`text-lg font-semibold ${
                        mode === "light" ? "text-slate-800" : "text-slate-100"
                      }`}>
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`text-xl font-bold mb-4 ${
                mode === "light" ? "text-slate-800" : "text-slate-100"
              }`}>
                Follow me on
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        mode === "light"
                          ? "bg-white border-slate-200 text-slate-700 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-6 rounded-2xl border ${
              mode === "light" 
                ? "bg-white border-slate-200" 
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              mode === "light" ? "text-slate-800" : "text-slate-100"
            }`}>
              Send me a message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-lg font-semibold mb-3 ${
                  mode === "light" ? "text-slate-700" : "text-slate-200"
                }`}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 text-lg rounded-xl border transition-all duration-200 ${
                    mode === "light"
                      ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      : "bg-slate-700 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-lg font-semibold mb-3 ${
                  mode === "light" ? "text-slate-700" : "text-slate-200"
                }`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 text-lg rounded-xl border transition-all duration-200 ${
                    mode === "light"
                      ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      : "bg-slate-700 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-lg font-semibold mb-3 ${
                  mode === "light" ? "text-slate-700" : "text-slate-200"
                }`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 text-lg rounded-xl border transition-all duration-200 resize-none ${
                    mode === "light"
                      ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      : "bg-slate-700 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FiSend className="w-6 h-6" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500 text-white rounded-xl text-center text-lg font-semibold"
                >
                  ✅ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500 text-white rounded-xl text-center text-lg font-semibold"
                >
                  ❌ Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;