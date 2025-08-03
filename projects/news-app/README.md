# NewsFlux - Modern News Aggregator

A beautiful, responsive news application built with React, featuring real-time news updates, trending stories, live streams, and regional news sections.

![NewsFlux Screenshot](https://via.placeholder.com/800x400/1f2937/ffffff?text=NewsFlux+Demo)

## ✨ Features

- **📰 Real-time News**: Live updates from top news sources (BBC, Reuters, CNN)
- **🔍 Smart Search**: Debounced search functionality (500ms delay) with instant results
- **🌙 Dark/Light Mode**: Toggle between dark and light themes
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎬 Live Streams**: Sample video streams with fallback handling
- **🌍 Regional News**: News from different regions (USA, UK, India)
- **⚡ Smooth Animations**: Beautiful transitions powered by Framer Motion
- **♿ Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **📊 Trending Ticker**: Scrolling news ticker for breaking headlines
- **🛡️ Error Handling**: Graceful error boundaries with retry functionality
- **⚡ Performance**: Optimized with debounced search and image fallbacks

## 🚀 Quick Start

### Prerequisites

- **Node.js ≥ 18** (LTS recommended)
- **npm ≥ 9** or **yarn ≥ 1.22**
- News API key (free from [newsapi.org](https://newsapi.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd news-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   ```bash
   # Option 1: Copy example file
   cp env.example .env
   
   # Option 2: Create manually
   echo "VITE_NEWS_API_KEY=" > .env
   ```
   
   Edit `.env` and add your News API key:
   ```env
   VITE_NEWS_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_NEWS_API_KEY` | Your News API key from [newsapi.org](https://newsapi.org/) | Yes |

### Getting a News API Key

1. Visit [newsapi.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key
4. Add it to your `.env` file

**Note**: Free tier allows 60 requests per minute. The app includes rate limiting awareness.

## 📁 Project Structure

```
news-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── env.example          # Environment variables template
└── README.md           # This file
```

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **News API** - News data provider

## 🎨 Customization

### Adding New News Sources

Edit the `SOURCES` constant in `src/App.jsx`:

```javascript
const SOURCES = 'bbc-news,reuters,cnn,techcrunch,engadget';
```

### Customizing Themes

Modify the dark/light mode colors in `src/index.css`:

```css
.dark-mode {
  @apply bg-gray-900 text-white;
}

.light-mode {
  @apply bg-gray-50 text-gray-900;
}
```

### Adding New Regions

Update the `regions` array in the `RegionNews` component:

```javascript
const regions = [
  { key: 'us', label: 'USA', sources: 'cnn' },
  { key: 'gb', label: 'UK', sources: 'bbc-news' },
  { key: 'in', label: 'India', sources: 'the-hindu' },
  { key: 'au', label: 'Australia', sources: 'abc-news-au' }
];
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run build && npm run preview
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 🔍 API Endpoints Used

- `GET /v2/top-headlines` - Get top headlines from specific sources
- `GET /v2/everything` - Search all articles

## 🐛 Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Make sure you've added your API key to `.env`
   - Restart the development server after adding the key
   - Verify the key starts with `VITE_`

2. **"Failed to load news" error**
   - Check your internet connection
   - Verify your API key is correct
   - Check if you've exceeded the free tier limits (60 req/min)

3. **Images not loading**
   - Some news sources may have broken image URLs
   - The app includes fallback handling for this

4. **Port already in use**
   - Vite defaults to port 5173
   - Use `npm run dev -- --port 3000` for custom port

### Development Tips

- Use browser dev tools to check network requests
- Check the console for detailed error messages
- Verify your API key works by testing it directly
- The `.env` file is automatically ignored by git

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [News API](https://newsapi.org/) for providing the news data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you have any questions or need help, please:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

---

Made with ❤️ by [Your Name] 