# Health Data Mapper

An interactive web application that visualizes public health data geographically to explore correlations between health outcomes and environmental factors. Built to demonstrate the difference between correlation and causation using interactive maps and statistical analysis.

## 🎯 Project Overview

The Health Data Mapper provides an intuitive interface for exploring relationships in health data across the United States. Users can visualize different health metrics on an interactive choropleth map, analyze correlations, and gain insights into geographic patterns of health outcomes.

## ✨ Features

### Phase 1 (Completed)
- **Interactive US Map**: Mapbox-powered visualization with smooth pan and zoom
- **Choropleth Visualization**: Color-coded states based on health metric values
- **Multiple Health Metrics**: Switch between Autism Rate, Asthma Rate, and Obesity Rate
- **Hover Interactions**: Detailed state information on hover
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Professional UI**: Clean sidebar with metric selection and data insights

### Upcoming Phases
- **Real Data Integration**: CDC API integration for live health statistics
- **Correlation Analysis**: Statistical analysis between health and environmental data
- **Time Series**: Historical data trends and patterns
- **Advanced Visualizations**: Scatter plots and regression analysis

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.4 with TypeScript
- **Mapping**: Mapbox GL JS with react-map-gl
- **Styling**: Tailwind CSS 4.0
- **Data Fetching**: SWR for efficient data management
- **Charts**: Recharts for statistical visualizations
- **HTTP Client**: Axios for API requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd health-data-mapper
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Data Sources

Currently using mock data to demonstrate functionality. Future phases will integrate:
- **CDC WONDER API**: Autism prevalence and birth statistics
- **CDC Data.gov APIs**: Vaccination rates and health outcomes
- **Weather.gov API**: Climate and environmental data
- **EPA Air Quality API**: Air pollution measurements

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main dashboard
│   └── globals.css        # Global styles
├── components/
│   ├── map/               # Map-related components
│   │   └── HealthMap.tsx  # Main interactive map
│   └── ui/                # UI components
│       └── DataSelector.tsx
├── lib/
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
└── public/
    └── data/              # Static data files
```

## 🎮 Usage

1. **Select a Health Metric**: Use the sidebar to choose between different health indicators
2. **Explore the Map**: Hover over states to see detailed statistics
3. **Analyze Patterns**: Observe geographic clustering and variations in health outcomes
4. **Compare Metrics**: Switch between different health measures to identify correlations

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Development Features

- **Type Safety**: Full TypeScript implementation
- **Hot Reloading**: Instant updates during development
- **Performance Optimized**: Efficient data processing and visualization
- **Accessibility**: Screen reader compatible design

## 📈 Performance

- **Initial Load**: < 3 seconds with optimized assets
- **Data Updates**: Real-time choropleth updates on metric changes
- **Memory Efficient**: SWR caching for optimal data management
- **Mobile Responsive**: Smooth performance on all device sizes

## 🤝 Contributing

This project follows modern React and TypeScript best practices:

1. Use functional components with hooks
2. Implement proper TypeScript typing
3. Follow the existing code structure and conventions
4. Add comments for complex logic
5. Test across different browsers and devices

## 📝 License

This project is part of a health data visualization initiative demonstrating correlation vs. causation in public health research.

## 🔗 Related Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [CDC Data APIs](https://data.cdc.gov/)
- [React Map GL](https://visgl.github.io/react-map-gl/)
- [Next.js Documentation](https://nextjs.org/docs)

---

*Built with ❤️ for public health data exploration and education*
