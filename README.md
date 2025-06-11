# Restaurant Growth Tweaks - Interactive Checklist

A beautiful, research-backed interactive checklist featuring **50 tiny tweaks** that restaurants can implement to achieve massive compound growth. Each strategy is backed by academic research from leading universities including Cornell, MIT, Harvard, and more.

## 🎯 Features

- **50 Data-Backed Tweaks**: Each strategy includes specific impact percentages, academic sources, and implementation details
- **Interactive ROI Calculator**: Real-time calculation of potential revenue increases based on your restaurant's metrics
- **Category Filtering**: Organize tweaks by Menu Design, Pricing Strategy, Service & Upselling, Ambiance, Customer Experience, and Operations
- **Lead Capture**: Elegant modal that appears after users engage with 5+ tweaks
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Academic Citations**: Every tweak includes source attribution and research citations

## 🧠 Research Foundation

Our tweaks are based on behavioral economics and psychology research from:
- **Cornell University School of Hotel Administration**
- **MIT Sloan School of Management** 
- **Harvard Business School**
- **Stanford University**
- **University of Chicago Booth School**
- **Tel Aviv University**
- **And many more leading institutions**

## 🚀 Example Impact

- **Remove Dollar Signs**: 8.15% increase in per-head spend (Cornell University)
- **Descriptive Menu Language**: 27% increase in item sales (Stanford/University of Illinois)
- **Strategic Wine Pairings**: 41% increase in wine sales (California State University)
- **Music Tempo Optimization**: 23% increase in table turnover (Tel Aviv University)

## 🛠 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd "Tiny Restaurant Growth Tweaks"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Philosophy

- **Simple & Elegant**: Clean, uncluttered interface focused on content
- **No SaaS/Corporate Vibes**: Creative, warm color palette using sage greens and warm ambers
- **Research-First**: Every element emphasizes the academic backing and data-driven approach
- **Mobile-Optimized**: Responsive design that works beautifully on all devices

## 📊 Technical Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Typography**: Inter font family

## 🎯 Key Components

### ROI Calculator
- Real-time calculation based on average spend and daily guests
- Updates automatically as users check off tweaks
- Provides daily, monthly, and annual revenue projections

### Interactive Checklist
- 50 research-backed growth strategies
- Expandable details with implementation guides
- Category-based filtering
- Visual feedback for completed items

### Lead Capture
- Triggered after 5 tweaks are selected
- Simple form: Name, Email, Phone, Restaurant Name, City
- Non-intrusive design with easy dismissal option

## 🔬 Research Categories

1. **Menu Design & Psychology** (12 tweaks)
2. **Pricing Strategy** (10 tweaks) 
3. **Service & Upselling** (10 tweaks)
4. **Ambiance & Environment** (8 tweaks)
5. **Customer Experience** (6 tweaks)
6. **Operations & Efficiency** (4 tweaks)

## 📈 ROI Examples

For a restaurant with $25 average spend and 100 guests per day:

- **Single Tweak Implementation**: $63,875 - $200,750 annual increase
- **Multiple Tweaks**: Compound effects can easily exceed $500k+ annually
- **Low Implementation Cost**: Most tweaks require minimal investment
- **Quick Implementation**: 1-14 days per tweak

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **Any static hosting provider**

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## 📝 Customization

### Adding New Tweaks
Edit `/data/tweaks.js` to add new research-backed strategies:

```javascript
{
  id: 51,
  category: 'Category Name',
  title: 'Tweak Title',
  description: 'Description of the tweak',
  impact: 'X% increase in metric',
  source: 'University/Institution',
  citation: 'Research citation',
  // ... additional fields
}
```

### Styling Changes
Modify `/tailwind.config.js` and `/app/globals.css` for design updates.

### Lead Capture Integration
Update the form submission handler in `/app/page.js` to integrate with your CRM or email service.

## 📚 Academic Sources

All 50 tweaks include detailed citations from peer-reviewed research. Sources include behavioral economics studies, hospitality psychology research, and consumer behavior analysis from leading academic institutions.

## 🤝 Contributing

This project is designed as a comprehensive resource for restaurant growth. Contributions welcome for:
- Additional research-backed strategies
- UI/UX improvements  
- Performance optimizations
- Mobile experience enhancements

## 📄 License

MIT License - Feel free to use and modify for your own projects.

---

**Transform your restaurant with science-backed strategies that create massive compound growth through tiny, implementable changes.** 