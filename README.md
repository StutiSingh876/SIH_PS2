# SITO - Smart Intelligent Traffic Orchestrator

An AI-powered traffic decision-support system for Indian Railways that assists section controllers in making precise, optimized, and real-time train control decisions.

## 🚀 Features

### Core Features
- **Real-Time Optimization Engine**: Uses OR + ML algorithms to generate conflict-free schedules
- **Disruption Handling**: Rapid re-optimization during delays, breakdowns, or weather disruptions
- **Controller Dashboard**: User-friendly interface with train movement visualization
- **Throughput Maximization**: Ensures higher utilization of track, junction, and platform resources

### Advanced Features
- **What-If Scenario Simulation**: Test alternative routings and platform allocations
- **Predictive Delay Propagation**: AI models simulate delay ripple effects
- **Dynamic Priority Reallocation**: Adjusts train priorities in real-time
- **Learning from Overrides**: Continuously learns from controller decisions
- **Multi-Language Support**: Voice-enabled AI co-pilot in Hindi, Tamil, Bengali, and other languages
- **Sustainability Dashboard**: Energy optimization and carbon footprint tracking

## 🏗️ Architecture

### Frontend
- **Controller Dashboard**: Real-time train map, recommendation alerts, conflict warnings
- **Simulation Interface**: Scenario testing and training
- **Analytics Dashboard**: Performance metrics, override analysis, sustainability tracking
- **Settings Interface**: User management, system configuration, security settings

### Backend (Planned)
- **Optimization Engine**: MILP/Constraint Programming + Reinforcement Learning
- **AI Models**: Delay propagation prediction, passenger impact forecasting
- **Data Pipeline**: Real-time ingestion from TMS, signaling, GPS, IoT sensors
- **Disruption Handler**: Auto-trigger re-optimization on failures/delays

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Real-time**: Socket.io Client

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sito-frontend
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

## 🎯 Usage

### Landing Page
- Multi-language support (English, Hindi, Tamil, Bengali)
- Role-based authentication (Controller, Supervisor, Trainer, Admin)
- Guest mode for demonstration

### Main Dashboard
- **Left Pane**: Interactive railway network map with real-time train positions
- **Center Pane**: Train scheduling Gantt chart with drag-and-drop simulation
- **Right Pane**: AI recommendations with accept/override controls

### Simulator
- **Scenario Testing**: Predefined scenarios (Basic, Congestion, Disruption, Weather, Emergency)
- **Playback Controls**: Play, pause, rewind, speed control
- **Performance Metrics**: Real-time efficiency, delay, and conflict tracking

### Analytics
- **Performance Overview**: Key performance indicators and trends
- **Override Analysis**: AI recommendation acceptance patterns
- **Sustainability Dashboard**: Energy optimization and carbon footprint
- **Export Functionality**: CSV/PDF reports

### Settings
- **User Management**: Role-based access control, permissions
- **System Settings**: Configuration, performance tuning
- **Security Settings**: Password policies, encryption, access control
- **Notification Settings**: Email, push, SMS, sound alerts
- **Data Source Configuration**: IoT sensors, APIs, external systems

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #06b6d4)
- **Railway Colors**: Red (#dc2626), Green (#16a34a), Yellow (#eab308), Blue (#2563eb)
- **Status Colors**: Success (#10b981), Warning (#f59e0b), Error (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular, readable sizes

### Components
- **Dark Theme**: Default dark mode for better visibility
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation, screen reader support
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with railway-specific colors and dark mode support.

## 📱 Responsive Design

- **Mobile**: Collapsible navigation, touch-friendly controls
- **Tablet**: Optimized layouts for medium screens
- **Desktop**: Full-featured interface with multiple panes

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Docker (Optional)
```bash
docker build -t sito-frontend .
docker run -p 3000:3000 sito-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **National Integration**: Pan-India orchestration
- **Adaptive AI Learning**: Continuous improvement with operational data
- **IoT & 5G Integration**: Faster data exchange
- **AR/VR Interfaces**: Immersive digital twin experiences
- **Predictive Maintenance**: Proactive infrastructure management

---

**SITO - Transforming Indian Railways with AI-Powered Traffic Orchestration** 🚂✨
