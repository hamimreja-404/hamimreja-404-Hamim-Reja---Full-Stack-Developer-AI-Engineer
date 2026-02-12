# Hamim Reja Portfolio

A modern, classy, and professional portfolio website built with React.js, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Unique typography with DM Serif Display, Outfit, and Plus Jakarta Sans fonts
- **Smooth Animations**: Page transitions and scroll-triggered animations using Framer Motion
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **React Router**: Smooth navigation with automatic scroll-to-top
- **Component-Based**: Modular architecture with reusable components
- **Performance Optimized**: Fast loading with Vite build tool

## 📋 Pages

1. **Home**: Hero section, expertise highlights, and featured projects
2. **About**: Professional summary, skills, experience, education, and achievements
3. **Portfolio**: Project showcase with category filtering
4. **Contact**: Contact form, alternative contact methods, and FAQ

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Font**: Google Fonts (DM Serif Display, Outfit, Plus Jakarta Sans)

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd hamim-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
hamim-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageTransition.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   └── ContactPage.jsx
│   ├── data/             # JSON data
│   │   └── websiteData.json
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design Features

### Typography
- **Display Font**: DM Serif Display (elegant serif for headings)
- **Heading Font**: Outfit (modern sans-serif)
- **Body Font**: Plus Jakarta Sans (clean and readable)

### Color Palette
- **Primary**: #0EA5E9 (Sky Blue)
- **Accent**: #8B5CF6 (Purple)
- **Success**: #10B981 (Green)
- **Dark**: #0F172A to #64748B

### Animations
- Fade-in effects
- Slide-in transitions
- Hover effects
- Page transitions
- Scroll-triggered animations

## 🌟 Key Components

### Navbar
- Fixed position with scroll effects
- Responsive mobile menu
- Active route highlighting
- Social links integration

### Footer
- Multi-column layout
- Quick links
- Contact information
- Social media icons

### PageTransition
- Smooth page transitions using Framer Motion
- Fade and slide animations

### ScrollToTop
- Automatic scroll to top on route change
- Instant scroll behavior for better UX

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Customization

To customize the portfolio with your own data:

1. Edit `src/data/websiteData.json` with your information
2. Update colors in `tailwind.config.js`
3. Modify fonts in `src/index.css`
4. Add your images to the `public` folder

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Hamim Reja**
- Email: hamim.reja.mail@gmail.com
- GitHub: [@hamimreja-404](https://github.com/hamimreja-404)
- LinkedIn: [Hamim Reja](https://linkedin.com/in/hamim-reja-a2ba42279)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Animations powered by Framer Motion
- Icons by Lucide React
- Fonts from Google Fonts

---

Made with ❤️ by Hamim Reja
