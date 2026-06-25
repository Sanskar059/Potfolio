"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Check } from "lucide-react";

interface ContactFormViewProps {
  onBack: () => void;
}

export default function ContactFormView({ onBack }: ContactFormViewProps) {
  const [form, setForm] = useState({ name: "", email: "", category: "frontend", budget: "medium", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Validate key format or fall back to your correct registered Web3Forms access key
    let accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!accessKey || !uuidRegex.test(accessKey)) {
      accessKey = "b41d0803-8deb-4ec5-801f-93e17676419b";
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: `Portfolio Inquiry - ${form.category} from ${form.name}`,
          message: form.message,
          category: form.category,
          budget: form.budget,
          from_name: `${form.name} via Portfolio`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Something went wrong. Please check your Web3Forms access key.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending the message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#13131b] min-h-screen pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      {/* Background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl mx-auto px-margin-mobile relative z-10 text-left">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={loading}
          className="group inline-flex items-center gap-2 text-on-surface-variant hover:text-white mb-10 transition-colors font-semibold uppercase tracking-widest text-xs disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="bg-[#161622]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.15) 1.2px, transparent 1.2px)',
              backgroundSize: '8px 8px'
            }}
          />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Form header */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-2">
                    Start a conversation
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Let's build something.
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label className="text-[10px] uppercase opacity-50 font-bold block mb-2 tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      placeholder="Sanskar Singh"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="text-[10px] uppercase opacity-50 font-bold block mb-2 tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      placeholder="sanskars654@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="text-[10px] uppercase opacity-50 font-bold block mb-2 tracking-wider">
                      Project Area
                    </label>
                    <select
                      value={form.category}
                      disabled={loading}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-[#181826] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="frontend">Frontend Development</option>
                      <option value="fullstack">Fullstack SaaS Application</option>
                      <option value="ai">AI / LLM Integration</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="text-[10px] uppercase opacity-50 font-bold block mb-2 tracking-wider">
                      Project Summary
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={loading}
                      placeholder="Tell me about your product, latency requirements, target audience, or stack preferences..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed font-body-md"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                {/* Self-drawing circular check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                >
                  <Check className="w-8 h-8 text-black stroke-[3px]" />
                </motion.div>

                <h4 className="text-xl font-bold text-white mb-2">Message Received!</h4>
                <p className="text-on-surface-variant text-sm max-w-sm mb-8 leading-relaxed">
                  Thank you for reaching out, {form.name}. Your details have been delivered successfully. Sanskar will review and respond to you at {form.email} shortly.
                </p>

                <button
                  onClick={onBack}
                  className="bg-white/5 border border-white/10 hover:border-white/20 text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-widest text-[10px] font-bold hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
