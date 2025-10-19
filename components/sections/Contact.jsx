"use client";

import { useState } from "react";

export default function Contact({ headline, subhead, form, contact }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      form?.successMessage ||
        "Thank you for your message! We'll get back to you soon."
    );
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 w-full">
      <div className="container px-4 2xl:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {headline || "Get in Touch"}
          </h2>
          <p className="text-lg text-gray-600">
            {subhead ||
              "Ready to transform your workforce management? Let's talk."}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-8 xl:gap-20">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {form?.fields?.name?.label || "Name"}{" "}
                  {form?.fields?.name?.required && "*"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={form?.fields?.name?.required !== false}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={form?.fields?.name?.placeholder || "Your name"}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {form?.fields?.email?.label || "Email"}{" "}
                  {form?.fields?.email?.required && "*"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={form?.fields?.email?.required !== false}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={
                    form?.fields?.email?.placeholder || "your@email.com"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-2"
                >
                  {form?.fields?.company?.label || "Company"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={
                    form?.fields?.company?.placeholder || "Your company"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {form?.fields?.message?.label || "Message"}{" "}
                  {form?.fields?.message?.required && "*"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required={form?.fields?.message?.required !== false}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder={
                    form?.fields?.message?.placeholder ||
                    "Tell us about your needs..."
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold py-3 px-6 rounded-lg transition-all hover:shadow-lg"
              >
                {form?.submitButton || "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 xl:space-y-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href={`mailto:${contact?.email}`} className="text-gray-600">
                  {contact?.email || "contact@humanforce.com"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href={`tel:${contact?.phone}`} className="text-gray-600">
                  {contact?.phone || "+1 (555) 123-4567"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-tertiary rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Office</h3>
                <p className="text-gray-600">
                  {contact?.office?.address || "123 Business St, Suite 100"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
