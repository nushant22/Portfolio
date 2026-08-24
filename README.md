# Nushant Ghimire - Portfolio Website

A modern, AI-powered portfolio website built with Next.js 15, featuring a dark theme with red accents and an interactive chat interface powered by Claude AI.

## Features

- 🎨 Modern UI with dark theme and red/coral accent colors
- ⚡ Built with Next.js 15 and React 18
- 🎭 Smooth animations with Framer Motion
- 🤖 AI-powered chat interface using Claude (Anthropic)
- 📱 Fully responsive design
- ♿ Accessibility-focused
- 🚀 Optimized performance with server components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Anthropic Claude API
- **Icons**: Lucide React
- **Markdown**: react-markdown

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Anthropic API key (for chat feature)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nushant22/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

4. Add your profile image:
   - Place your profile photo at `public/images/profile.jpg`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── app/
│   ├── api/chat/          # Chat API endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── hero/              # Hero section
│   ├── sections/          # About, Projects, Contact sections
│   ├── chat/              # Chat widget components
│   ├── nav/               # Navigation
│   └── footer/            # Footer
├── lib/                   # Utility functions
├── data/                  # Content files (markdown)
└── public/               # Static assets
```

## Customization

### Update Content

Edit the markdown files in the `data/` directory:
- `about.md` - About section content
- `experience.md` - Work experience
- `skills.md` - Technical skills
- `education.md` - Educational background
- `certifications.md` - Certifications
- `projects/*.md` - Project details

### Update Contact Information

Edit `data/socials.json` to update your social links and contact information.

### Modify Colors

Update the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  accent: {
    DEFAULT: "#E85D5D",  // Main accent color
    light: "#FF6B6B",     // Lighter shade
    dark: "#D94A4A",      // Darker shade
  },
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your `ANTHROPIC_API_KEY` environment variable in Vercel settings
4. Deploy!

## Features To Be Added

- [ ] Chat widget with Claude AI integration
- [ ] Blog section with MDX support
- [ ] Dark/Light theme toggle
- [ ] Advanced animations and transitions
- [ ] Project filtering by technology
- [ ] Resume download functionality

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- **Email**: nushantghimire22@gmail.com
- **GitHub**: [@nushant22](https://github.com/nushant22)
- **LinkedIn**: [nushantghimire22](https://www.linkedin.com/in/nushantghimire22)
