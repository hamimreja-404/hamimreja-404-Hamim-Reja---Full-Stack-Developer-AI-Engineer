import React, { useState, useEffect, useContext, createContext } from "react";
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  Send,
  CheckCircle,
  IndianRupee,
  Briefcase,
  Loader,
  X,
  Smartphone,
  Mail as MailIcon,
  Package,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import SEO from "../components/SEO";

// --- POSTMAN ANIMATION COMPONENT ---
const PostmanAnimation = ({ isVisible, colors }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="relative w-full max-w-md h-40">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-postman-fly">
          <div className="flex flex-col items-center">
            <div className="relative">
              <MailIcon
                size={40}
                style={{ color: colors.primary }}
                className="fill-current opacity-20"
              />
              <MailIcon
                size={40}
                style={{ color: colors.primary }}
                className="absolute inset-0"
              />
              <div className="absolute -right-2 -top-2 animate-ping h-3 w-3 rounded-full bg-sky-400 opacity-75"></div>
            </div>
            <span
              className="text-[10px] font-bold mt-2 uppercase tracking-tighter"
              style={{ color: colors.primary }}
            >
              Delivering...
            </span>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
          <Package size={60} style={{ color: colors.secondary }} />
        </div>
      </div>
    </div>
  );
};

export default function BuyPlans() {
  // Use local state for theme for the preview environment
  const { isDark, themeColors: colors, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "", // Changed from 'mobile'
    planName: "Custom Plan", // Changed from 'plan'
    price: "0",
    message: "", // Added to match schema
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showPostman, setShowPostman] = useState(false);

  // Safely handle API URL for the runtime
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planFromUrl = params.get("plan");
    const priceFromUrl = params.get("price");

    if (planFromUrl || priceFromUrl) {
      setFormData((prev) => ({
        ...prev,
        planName: planFromUrl || prev.planName,
        price: priceFromUrl || prev.price,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowPostman(true);

    try {
      // FIX 1: Added curly braces for variable interpolation
      const response = await fetch(`${API_URL}/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // FIX 2: Delay the success screen slightly so the animation can be seen
        // or simply set isSent to true immediately.

        setIsSent(true);
      } else {
        // Handle server-side errors here (e.g., show a to
        // coast)
        console.error("Server error:", data.message);
        setShowPostman(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // FIX 3: Ensure UI recovers on network failure
      setShowPostman(false);
      setIsSubmitting(false);
    }
    // Removed 'finally' to prevent it from overriding the 'isSent' transition state
  };

  const handleBack = () => {
    window.history.back();
  };

  if (isSent) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
        style={{
          backgroundColor: colors.background,
          color: colors.textPrimary,
        }}
      >
        <SEO
          title="Plans & Pricing | Book a Service"
          description="Choose the right plan for your project. Book Hamim Reja for web development, technical consultation, and custom software solutions."
          url="/plans"
        />
        <div
          className="max-w-md w-full text-center p-8 rounded-3xl border shadow-2xl animate-fade-in"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short"
            style={{
              backgroundColor: `${colors.success}15`,
              color: colors.success,
            }}
          >
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
          <p
            className="mb-8 leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            I've received your request for the{" "}
            <span className="font-bold" style={{ color: colors.primary }}>
              {formData.planName}
            </span>
            . I'll contact you via{" "}
            <span className="font-bold">{formData.mobileNumber}</span> as soon
            as possible.
          </p>

          <div className="space-y-4 mb-8">
            <div
              className="p-4 rounded-2xl border flex items-center justify-between"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-3">
                <Smartphone size={18} style={{ color: colors.primary }} />
                <span className="text-sm font-medium">+91 91 9434405501</span>
              </div>
              <button
                onClick={() => (window.location.href = "tel:+919434405501")}
                className="text-xs font-bold uppercase tracking-wider hover:underline"
                style={{ color: colors.primary }}
              >
                Call Now
              </button>
            </div>
          </div>

          <button
            onClick={handleBack}
            className="w-full py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            <ArrowLeft size={18} /> Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: colors.background, color: colors.textPrimary }}
    >
      <SEO title={`Select ${formData.planName}`} />

      {/* Dynamic Background Blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-20"
        style={{ backgroundColor: colors.primary }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-20"
        style={{ backgroundColor: colors.secondary }}
      ></div>

      <div className="relative w-full max-w-xl mt-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 transition-colors"
            style={{ color: colors.textSecondary }}
          >
            <div
              className="p-2 rounded-full border transition-all group-hover:bg-opacity-10"
              style={{
                borderColor: colors.border,
                backgroundColor: `${colors.textSecondary}10`,
              }}
            >
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold text-sm group-hover:text-current">
              Return
            </span>
          </button>
        </div>

        <div
          className="relative p-8 md:p-12 rounded-[2.5rem] border shadow-2xl overflow-hidden backdrop-blur-sm"
          style={{
            backgroundColor: isDark
              ? `${colors.surface}cc`
              : `${colors.surface}f2`,
            borderColor: colors.border,
          }}
        >
          <PostmanAnimation isVisible={showPostman} colors={colors} />

          <div
            className={`transition-all duration-500 ${isSubmitting ? "opacity-20 blur-md pointer-events-none" : "opacity-100"}`}
          >
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-2">Finalize Your Plan</h1>
              <p style={{ color: colors.textSecondary }}>
                Complete the details below to get started with your digital
                upgrade.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  }}
                >
                  <label
                    className="text-[10px] uppercase font-bold tracking-widest block mb-1"
                    style={{ color: colors.primary }}
                  >
                    Plan Name
                  </label>
                  <div className="flex items-center gap-2 font-bold">
                    <Briefcase size={14} className="opacity-50" />
                    <span className="truncate">{formData.planName}</span>
                  </div>
                </div>
                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  }}
                >
                  <label
                    className="text-[10px] uppercase font-bold tracking-widest block mb-1"
                    style={{ color: colors.secondary }}
                  >
                    Investment
                  </label>
                  <div className="flex items-center gap-2 font-bold">
                    <IndianRupee size={14} className="opacity-50" />
                    <span>{formData.price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold ml-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                      size={18}
                    />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hamim Reja"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-2 focus:outline-none transition-all bg-transparent"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-xs font-bold ml-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                      size={18}
                    />
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobileNumber: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-2 focus:outline-none transition-all bg-transparent"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-xs font-bold ml-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Email Address{" "}
                    <span className="font-normal opacity-50">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-2 focus:outline-none transition-all bg-transparent"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 rounded-2xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Confirm & Send Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes postman-fly {
          0% { transform: translate(-50px, -50%) scale(0.5); opacity: 0; }
          20% { opacity: 1; transform: translate(50px, -50%) scale(1.2); }
          80% { opacity: 1; transform: translate(350px, -50%) scale(1.2); }
          100% { transform: translate(600px, -50%) scale(0.5); opacity: 0; }
        }
        .animate-postman-fly {
          animation: postman-fly 3s infinite linear;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
