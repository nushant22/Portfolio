# Nushant Ghimire - Portfolio Website

A modern portfolio website built with Next.js 15, featuring a dark theme with red accents and smooth animations.

## Features

- 🎨 Modern UI with dark theme and red/coral accent colors
- ⚡ Built with Next.js 15 and React 19
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- ♿ Accessibility-focused
- 🚀 Optimized performance with server components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

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

3. Add your profile image:
   - Place your profile photo at `public/images/avatar.png`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── hero/              # Hero section
│   ├── sections/          # Experience, Skills, Contact, Highlights
│   ├── nav/               # Navigation
│   └── footer/            # Footer
├── data/                  # Content files (markdown)
└── public/                # Static assets
```

## Customization

### Update Content

Edit the markdown files in the `data/` directory:
- `about.md` - About section content
- `experience.md` - Work experience
- `skills.md` - Technical skills
- `projects/*.md` - Project details

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
3. Deploy!

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- **Email**: nushantghimire22@gmail.com
- **GitHub**: [@nushant22](https://github.com/nushant22)
- **LinkedIn**: [nushantghimire22](https://www.linkedin.com/in/nushantghimire22)
