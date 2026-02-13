import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Users,
  MousePointer2,
  Mail,
  Briefcase,
  MessageSquare,
  Bell,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Inbox,
  Clock,
  IndianRupee,
  UserPlus,
  Lock,
  Send,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;
const REQUIRED_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Dashboard = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Dashboard State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("7d"); // 7d or 30d
  const [stats, setStats] = useState({
    uniqueVisitors: 0,
    totalVisits: 0,
    subscribers: 0,
    inquiries: 0,
  });
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribersList, setSubscribersList] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isServerUp, setIsServerUp] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Hover state for the graph
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  // Fetch all data from backend (Only called after auth)
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsRes = await fetch(`${API_BASE_URL}/stats`);
      if (!statsRes.ok) throw new Error("Failed to fetch stats");
      const statsData = await statsRes.json();
      setStats(statsData);

      const servicesRes = await fetch(`${API_BASE_URL}/inquiries/services`);
      const servicesData = await servicesRes.json();
      setServices(servicesData);

      const contactsRes = await fetch(`${API_BASE_URL}/inquiries/contacts`);
      const contactsData = await contactsRes.json();
      setContacts(contactsData);
      const plansRes = await fetch(`${API_BASE_URL}/get-plans`);
      const plansData = await plansRes.json();
      setPlans(plansData);
      const subRes = await fetch(`${API_BASE_URL}/inquiries/early-access`);
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribersList(subData);
        console.log("Fetched subscribers:", subData);
      }

      setIsServerUp(true);
    } catch (err) {
      console.error(err);
      setError(
        "Could not connect to the backend server. Make sure it is running on " +
          API_BASE_URL,
      );
      setIsServerUp(false);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === REQUIRED_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Access Denied: Incorrect Password");
      setPasswordInput(""); // Clear input on failure
    }
  };

  const handleRedirectHome = () => {
    window.location.href = "/"; // Redirect to home
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Improved dual-series data generator
  const chartData = useMemo(() => {
    // Prevent calculation before auth to save resources
    if (!isAuthenticated) return [];

    const points = timeRange === "7d" ? 7 : 30;
    const baseNew = Math.max(stats.uniqueVisitors, 10) / points;
    const baseTotal = Math.max(stats.totalVisits, 25) / points;

    return Array.from({ length: points }, (_, i) => {
      const newVal = Math.max(
        2,
        Math.floor(baseNew * (0.6 + Math.random() * 1.2)),
      );
      // Total visits is always higher than or equal to new visitors
      const totalVal = Math.max(
        newVal + 2,
        Math.floor(baseTotal * (0.8 + Math.random() * 1.4)),
      );

      const date = new Date();
      date.setDate(date.getDate() - (points - 1 - i));

      return {
        day: i + 1,
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        newVisitors: newVal,
        totalVisits: totalVal,
      };
    });
  }, [timeRange, stats.uniqueVisitors, stats.totalVisits, isAuthenticated]);

  // If not authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/50">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Admin<span className="text-indigo-400">Core</span>
              </h2>
              <p className="text-slate-400 text-sm mt-2 font-medium">
                Secure Access Portal
              </p>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/10 mix-blend-overlay"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Password Required
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all font-medium text-slate-800"
                    placeholder="Enter admin key..."
                    autoFocus
                  />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm font-bold animate-in slide-in-from-left-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
              <button
                onClick={handleRedirectHome}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Homepage
              </button>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Protected System &bull; Authorized Personnel Only
        </p>
      </div>
    );
  }

  // SVG Graph calculation constants (Only runs if authenticated due to return above)
  const graphWidth = 1000;
  const graphHeight = 250;

  // Safe calculation for chart max value
  const maxVal =
    chartData.length > 0
      ? Math.max(
          ...chartData.map((d) => Math.max(d.newVisitors, d.totalVisits)),
          1,
        )
      : 100;

  const getPoints = (key) => {
    return chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * graphWidth;
      const y = graphHeight - (d[key] / maxVal) * graphHeight * 0.8 - 20; // 0.8 to leave top padding
      return { x, y, value: d[key] };
    });
  };

  const totalPoints = getPoints("totalVisits");
  const newPoints = getPoints("newVisitors");

  const generatePath = (pts) => {
    if (pts.length === 0) return "";
    return (
      `M ${pts[0].x} ${pts[0].y} ` +
      pts
        .slice(1)
        .map((p) => `L ${p.x} ${p.y}`)
        .join(" ")
    );
  };

  const generateArea = (pts) => {
    if (pts.length === 0) return "";
    return `${generatePath(pts)} L ${graphWidth} ${graphHeight} L 0 ${graphHeight} Z`;
  };

  const handleMouseMove = (e) => {
    if (!svgRef.current || chartData.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xRatio = x / rect.width;
    const index = Math.round(xRatio * (chartData.length - 1));
    const clampedIndex = Math.max(0, Math.min(index, chartData.length - 1));

    setHoverData({
      index: clampedIndex,
      data: chartData[clampedIndex],
      x: (clampedIndex / (chartData.length - 1)) * 100, // percentage for tooltip positioning
    });
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            <ArrowUpRight className="w-3 h-3" /> {trend}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">
        {value.toLocaleString()}
      </h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 mt-4 animate-in fade-in duration-500">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Admin<span className="text-indigo-600">Core</span>
          </span>
        </div>

        <nav className="space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "dashboard" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <Users className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "services" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <Briefcase className="w-5 h-5" /> Service Requests
            {services.length > 0 && (
              <span
                className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "services" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"}`}
              >
                {services.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "contacts" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <MessageSquare className="w-5 h-5" /> Contact Inbox
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "subscribers" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <UserPlus className="w-5 h-5" /> Early Access
            {subscribersList.length > 0 && (
              <span
                className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "subscribers" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}
              >
                {subscribersList.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "plans" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 font-medium" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <Send className="w-5 h-5" /> Plans Message
            {plans.length > 0 && (
              <span
                className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === "plans" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}
              >
                {plans.length}
              </span>
            )}
          </button>
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${isServerUp ? "bg-green-500 ring-4 ring-green-100" : "bg-red-500 animate-pulse"}`}
            ></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </p>
              <p className="text-xs font-semibold text-slate-700">
                {isServerUp ? "System Online" : "Server Error"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === "dashboard"
                ? "Analytics Overview"
                : activeTab === "services"
                  ? "Service Management"
                  : activeTab === "subscribers"
                    ? "Early Access Leads"
                    : "Message Inbox"
                    ? activeTab === "plans"
                    : "showPlans"
                    }
            </h1>
            <p className="text-slate-500 mt-1">
              Reviewing metrics and communication logs for your business.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "dashboard" && (
              <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm mr-2">
                <button
                  onClick={() => setTimeRange("7d")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${timeRange === "7d" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"}`}
                >
                  7D
                </button>
                <button
                  onClick={() => setTimeRange("30d")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${timeRange === "30d" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"}`}
                >
                  30D
                </button>
              </div>
            )}
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />{" "}
              Sync
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-800 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Unique Visitors"
                value={stats.uniqueVisitors}
                icon={Users}
                color="bg-indigo-600"
                trend="+12%"
              />
              <StatCard
                title="Total Visits"
                value={stats.totalVisits}
                icon={MousePointer2}
                color="bg-slate-900"
                trend="+18%"
              />
              <StatCard
                title="Early Access"
                value={stats.subscribers}
                icon={Bell}
                color="bg-amber-500"
                trend="+5%"
              />
              <StatCard
                title="Inquiries"
                value={stats.inquiries}
                icon={Mail}
                color="bg-emerald-600"
                trend="+24%"
              />
            </div>

            {/* Visitor Graph Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Traffic Analysis
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      <span className="text-xs font-bold text-slate-500">
                        New Visitors
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                      <span className="text-xs font-bold text-slate-500">
                        Total Visits
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600">
                    {stats.totalVisits.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Aggregate Hits
                  </p>
                </div>
              </div>

              {/* Enhanced Interactive Dual SVG Graph */}
              <div className="h-72 w-full relative">
                {chartData.length > 0 ? (
                  <svg
                    ref={svgRef}
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                    className="w-full h-full overflow-visible cursor-crosshair"
                    preserveAspectRatio="none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoverData(null)}
                  >
                    <defs>
                      <linearGradient
                        id="totalArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#cbd5e1"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#cbd5e1"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient id="newArea" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#4f46e5"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#4f46e5"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75].map((p, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={graphHeight * p}
                        x2={graphWidth}
                        y2={graphHeight * p}
                        stroke="#f1f5f9"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Total Visits Area & Line */}
                    <path
                      d={generateArea(totalPoints)}
                      fill="url(#totalArea)"
                    />
                    <path
                      d={generatePath(totalPoints)}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* New Visitors Area & Line */}
                    <path d={generateArea(newPoints)} fill="url(#newArea)" />
                    <path
                      d={generatePath(newPoints)}
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Tooltip Vertical Indicator */}
                    {hoverData && (
                      <>
                        <line
                          x1={
                            (hoverData.index / (chartData.length - 1)) *
                            graphWidth
                          }
                          y1="0"
                          x2={
                            (hoverData.index / (chartData.length - 1)) *
                            graphWidth
                          }
                          y2={graphHeight}
                          stroke="#4f46e5"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <circle
                          cx={
                            (hoverData.index / (chartData.length - 1)) *
                            graphWidth
                          }
                          cy={totalPoints[hoverData.index].y}
                          r="6"
                          fill="white"
                          stroke="#cbd5e1"
                          strokeWidth="3"
                        />
                        <circle
                          cx={
                            (hoverData.index / (chartData.length - 1)) *
                            graphWidth
                          }
                          cy={newPoints[hoverData.index].y}
                          r="6"
                          fill="white"
                          stroke="#4f46e5"
                          strokeWidth="3"
                        />
                      </>
                    )}
                  </svg>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">
                    No Data Available
                  </div>
                )}

                {/* Custom Tooltip Overlay */}
                {hoverData && chartData.length > 0 && (
                  <div
                    className="absolute z-10 bg-slate-900 text-white p-3 rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4"
                    style={{
                      left: `${hoverData.x}%`,
                      top: `${(Math.min(totalPoints[hoverData.index].y, newPoints[hoverData.index].y) / graphHeight) * 100}%`,
                      marginTop: "-20px",
                    }}
                  >
                    <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">
                      {hoverData.data.label}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between gap-4 text-xs font-bold">
                        <span>New:</span>
                        <span className="text-white">
                          {hoverData.data.newVisitors}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 text-xs font-bold">
                        <span>Total:</span>
                        <span className="text-slate-400">
                          {hoverData.data.totalVisits}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-6 px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {timeRange === "7d" ? "Past Week" : "Past Month"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                    Real-time Data
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4">
            <div
              className={`space-y-4 ${selectedInquiry ? "lg:col-span-5" : "lg:col-span-12"}`}
            >
              <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-6 flex items-center gap-4">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter requests..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
              <div
                className={`grid gap-4 ${!selectedInquiry ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {services.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedInquiry(item)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer group bg-white ${selectedInquiry?._id === item._id ? "border-indigo-600 ring-4 ring-indigo-50 shadow-lg" : "border-slate-100 hover:border-indigo-200 hover:shadow-md"}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-indigo-600">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                        {item.serviceType}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">{item.email}</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-50 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        <IndianRupee className="w-3 h-3" /> {item.budgetRange}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3 h-3" />{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedInquiry && (
              <div className="lg:col-span-7 sticky top-8 animate-in slide-in-from-right-4">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                  <div className="h-3 bg-indigo-600 w-full"></div>
                  <div className="p-8 lg:p-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-2xl font-black text-indigo-600">
                          {selectedInquiry.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-slate-900">
                            {selectedInquiry.name}
                          </h2>
                          <p className="text-indigo-600 font-bold">
                            {selectedInquiry.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                      >
                        <Inbox className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Service Type
                        </p>
                        <p className="text-lg font-bold text-slate-800">
                          {selectedInquiry.serviceType}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Budget Range
                        </p>
                        <p className="text-lg font-bold text-emerald-600">
                          {selectedInquiry.budgetRange}
                        </p>
                      </div>
                    </div>
                    {selectedInquiry.message && (

                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
                        Proposed Project Description
                      </p>
                      <div className="bg-slate-900 text-slate-300 p-8 rounded-[2.5rem] text-base leading-relaxed font-medium shadow-inner min-h-[150px]">
                        {selectedInquiry.message}
                      </div>
                    </div>
                    )}
                    <div className="mt-10 flex items-center justify-between pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Clock className="w-4 h-4" /> Received on{" "}
                        {formatDate(selectedInquiry.createdAt)}
                      </div>
                      <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                        Send Proposal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Plans Tab*/}
        {activeTab === "plans" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4">
            <div
              className={`space-y-4 ${selectedInquiry ? "lg:col-span-5" : "lg:col-span-12"}`}
            >
              <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-6 flex items-center gap-4">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter requests..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
              <div
                className={`grid gap-4 ${!selectedInquiry ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {plans.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedInquiry(item)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer group bg-white ${selectedInquiry?._id === item._id ? "border-indigo-600 ring-4 ring-indigo-50 shadow-lg" : "border-slate-100 hover:border-indigo-200 hover:shadow-md"}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-indigo-600">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                        {item.planName}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4"><p>{item.mobileNumber || item.email}</p></p>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-50 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        <IndianRupee /> {item.price}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3 h-3" />{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedInquiry && (
              <div className="lg:col-span-7 sticky top-8 animate-in slide-in-from-right-4">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                  <div className="h-3 bg-indigo-600 w-full"></div>
                  <div className="p-8 lg:p-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-2xl font-black text-indigo-600">
                          {selectedInquiry.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-slate-900">
                            {selectedInquiry.name}
                          </h2>
                          <p className="text-indigo-600 font-bold">
                            {selectedInquiry.mobileNumber}| {selectedInquiry.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                      >
                        <Inbox className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Service Type
                        </p>
                        <p className="text-lg font-bold text-slate-800">
                          {selectedInquiry.planName}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Budget
                        </p>
                        <p className="text-lg font-bold text-emerald-600">
                          {selectedInquiry.price}
                        </p>
                      </div>
                    </div>
                    {selectedInquiry.message && (
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
                        Proposed Project Description
                      </p>
                      <div className="bg-slate-900 text-slate-300 p-8 rounded-[2.5rem] text-base leading-relaxed font-medium shadow-inner min-h-[150px]">
                        {selectedInquiry.message}
                      </div>
                    </div>
                    )}
                    <div className="mt-10 flex items-center justify-between pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Clock className="w-4 h-4" /> Received on{" "}
                        {formatDate(selectedInquiry.createdAt)}
                      </div>
                      <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                        Send Proposal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl mb-10 overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2">Message Center</h2>
                <p className="opacity-70 text-sm font-medium">
                  General inquiries from your site.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>
            <div className="grid gap-4">
              {contacts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-lg transition-all group"
                >
                  <div className="shrink-0 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 border border-indigo-100">
                      {item.name.charAt(0)}
                    </div>
                    <div className="md:w-48">
                      <h4 className="font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate font-medium">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Subject
                      </span>
                      <span className="h-px bg-slate-200 flex-1"></span>
                      <span className="text-indigo-600 font-bold text-xs">
                        {item.subject}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  <div className="md:w-32 text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                      Received
                    </p>
                    <p className="text-xs font-bold text-slate-700">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div className="animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Waitlist Audience
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    Early access signups.
                  </p>
                </div>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-6">Mobile Number</th>
                      <th className="px-8 py-6">Joined Date</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {subscribersList.map((sub) => (
                      <tr
                        key={sub._id}
                        className="hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                              <Mail className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="font-bold text-slate-700 text-sm">
                              {sub.number || sub.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                          {formatDate(sub.createdAt)}
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ring-1 ring-emerald-100">
                            Active
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-slate-400 hover:text-red-500 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
