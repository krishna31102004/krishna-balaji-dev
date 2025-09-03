# Krishna Balaji - Personal Portfolio

A modern, responsive personal portfolio website showcasing my projects, experience, and skills as a Computer Science student and Machine Learning Engineer.

🌐 **Live Website:** [krishnabalaji.dev](https://krishnabalaji.dev)

## ✨ Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Sections** - Smooth scrolling navigation between portfolio sections
- **Project Showcase** - Detailed project cards with live demos and GitHub links
- **Experience Timeline** - Professional experience with company logos and descriptions
- **AI-Powered Chat** - Integrated knowledge base chat using Supabase Edge Functions
- **Contact Integration** - Direct email links and social media connections
- **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui components
- **SEO Optimized** - Meta tags and semantic HTML for better search visibility
- **Performance Focused** - Optimized loading with Vite and modern web practices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with TypeScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

### Backend & Services
- **Supabase** - Backend-as-a-Service for database and edge functions
- **Supabase Edge Functions** - Serverless functions for chat functionality
- **TypeScript** - Type-safe development

### Development & Deployment
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Vercel** - Deployment and hosting platform

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krishna31102004/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the website.

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── icons/             # Favicon and app icons
│   └── lovable-uploads/   # Uploaded assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── About.tsx     # About section
│   │   ├── Contact.tsx   # Contact section
│   │   ├── Experience.tsx # Experience timeline
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Navigation.tsx # Navigation bar
│   │   ├── Projects.tsx  # Projects showcase
│   │   └── Chat.tsx      # AI chat component
│   ├── assets/           # Images and media files
│   ├── data/             # Static data (knowledge base)
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Supabase integration
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   └── main.tsx          # App entry point
├── supabase/
│   ├── functions/        # Edge functions
│   └── config.toml       # Supabase configuration
└── package.json
```

## 🎯 Key Sections

### Hero Section
- Professional introduction with animated text
- Call-to-action buttons for resume and contact
- Responsive design with gradient backgrounds

### About Me
- Academic background and achievements
- Core competencies and skills
- Personal journey and accomplishments

### Experience
- Professional experience timeline
- Company logos and role descriptions
- Skills and technologies used

### Projects
- Featured project showcase
- Live demo and GitHub repository links
- Technology stack for each project

### Contact
- Direct email integration
- Social media links (LinkedIn, GitHub)
- Phone contact information

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Connect your GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

Alternative deployment options:
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

While this is a personal portfolio, contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📧 Contact

- **Email:** [krishna311004@gmail.com](mailto:krishna311004@gmail.com)
- **Phone:** (480) 234-1166
- **LinkedIn:** [linkedin.com/in/krishna-balaji-53785a257](https://linkedin.com/in/krishna-balaji-53785a257)
- **GitHub:** [github.com/krishna31102004](https://github.com/krishna31102004)
- **Website:** [krishnabalaji.dev](https://krishnabalaji.dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **If you found this helpful, please consider giving it a star!**

*"Passionate about turning ideas into intelligent systems — blending AI, code, and purpose."*