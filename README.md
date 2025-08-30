# HerbTrace - Blockchain Traceability Platform for Ayurvedic Herbs

<div align="center">
  <img src="public/favicon.ico" alt="HerbTrace Logo" width="64" height="64">
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.0-brightgreen.svg)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.6-38B2AC.svg)](https://tailwindcss.com/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.6.1-764ABC.svg)](https://redux-toolkit.js.org/)
</div>

## 🌿 About HerbTrace

HerbTrace is a comprehensive blockchain-powered traceability platform designed specifically for the Ayurvedic herb supply chain. It provides end-to-end transparency from herb collection in the Himalayas to retail distribution, ensuring authenticity, quality, and compliance with regulatory standards.

### 🎯 Mission
To revolutionize the Ayurvedic herb industry through blockchain technology, ensuring authentic, quality herbs reach consumers while supporting sustainable farming practices and empowering herb collectors.

## ✨ Key Features

### 🔐 Multi-Role Authentication & Authorization
- **Herb Collectors** - Record collections with GPS coordinates and quality grading
- **Supply Chain Managers** - Track shipments and monitor logistics
- **Laboratory Personnel** - Conduct quality testing and certification
- **Regulatory Officers** - Ensure compliance and generate reports
- **Consumers** - Verify product authenticity through QR codes

### 📊 Real-Time Dashboards
- **Collector Dashboard** - Track daily collections, earnings, and blockchain submissions
- **Supply Chain Tracking** - Monitor herb journey with GPS and temperature sensors
- **Laboratory Interface** - Manage testing queues and certification workflows
- **Regulatory Compliance** - Automated compliance monitoring and reporting
- **Consumer Verification** - Simple QR code scanning for product authentication

### 🔗 Blockchain Integration
- Immutable record of herb journey from collection to retail
- Smart contracts for automated quality verification
- Decentralized storage of certification data
- Real-time blockchain status monitoring
- Transaction hash verification for all records

### 📍 Advanced Tracking
- **GPS Coordinates** - Precise collection location tracking
- **Temperature Monitoring** - Cold chain compliance for sensitive herbs
- **Quality Grading** - Scientific classification (A+, A, B+, etc.)
- **Batch Management** - Comprehensive batch tracking system

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 with Vite for lightning-fast development
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit for predictable state management
- **Routing**: React Router v6 for declarative navigation
- **Charts**: Recharts & D3.js for data visualization
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth interactions

### Project Structure
```
herbtrace/
├── src/
│   ├── components/
│   │   └── ui/                    # Reusable UI components
│   │       ├── GlobalHeader.jsx   # Application header
│   │       ├── RoleBasedSidebar.jsx # Dynamic navigation
│   │       └── BlockchainStatusIndicator.jsx
│   ├── pages/
│   │   ├── collector-dashboard/           # Herb collector interface
│   │   ├── supply-chain-tracking-dashboard/ # Logistics tracking
│   │   ├── laboratory-testing-interface/   # Quality testing
│   │   ├── regulatory-compliance-dashboard/ # Compliance monitoring
│   │   ├── consumer-product-verification/   # Public verification
│   │   └── user-registration-login/        # Authentication
│   ├── App.jsx                    # Main application component
│   ├── Routes.jsx                 # Application routing configuration
│   └── styles/                    # Global styles and themes
├── public/                        # Static assets
└── package.json                   # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd herbtrace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 User Roles & Access

### 👤 Herb Collector
- **Dashboard**: Track daily collections and earnings
- **New Collections**: Record herb collections with location data
- **Blockchain Status**: Monitor submission status and confirmations
- **Weather Widget**: Get collection recommendations based on weather

**Sample Credentials**: 
- Username: `collector@herbtrace.com`
- Default Route: `/collector-dashboard`

### 🚛 Supply Chain Manager
- **Shipment Tracking**: Monitor active shipments with GPS
- **Timeline View**: Visualize herb journey through supply chain
- **Temperature Monitoring**: Ensure cold chain compliance
- **Batch Management**: Track and manage herb batches

**Default Route**: `/supply-chain-tracking-dashboard`

### 🔬 Laboratory Personnel
- **Testing Queue**: Manage incoming samples for quality testing
- **Equipment Status**: Monitor laboratory equipment availability
- **Certification**: Generate and manage quality certificates
- **Blockchain Integration**: Submit test results to blockchain

**Default Route**: `/laboratory-testing-interface`

### 📋 Regulatory Officer
- **Compliance Monitoring**: Track regulatory compliance across batches
- **Alert Management**: Monitor and respond to compliance alerts
- **Report Generation**: Generate comprehensive compliance reports
- **Export Data**: Export compliance data for external audits

**Default Route**: `/regulatory-compliance-dashboard`

### 🛒 Consumer
- **QR Code Scanning**: Verify product authenticity
- **Product History**: View complete herb journey
- **Quality Certificates**: Access laboratory test results
- **Feedback System**: Provide feedback on products

**Default Route**: `/consumer-product-verification`

## 🔧 Development Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run serve

# Run tests (if configured)
npm test
```

## 🎨 Design System

HerbTrace uses a custom design system built on Tailwind CSS:

- **Colors**: Earth-toned palette reflecting natural herb origins
- **Typography**: Clean, readable fonts optimized for dashboard interfaces
- **Components**: Consistent UI components with proper accessibility
- **Responsive**: Mobile-first design supporting all device sizes
- **Animations**: Subtle animations enhancing user experience

## 🔒 Security Features

- **Role-Based Access Control (RBAC)**: Strict access control per user type
- **Blockchain Verification**: Cryptographic verification of all transactions
- **Data Encryption**: Sensitive data encrypted at rest and in transit
- **Audit Trails**: Comprehensive logging of all system actions
- **Input Validation**: Robust validation preventing malicious inputs

## 📈 Key Metrics Tracked

- **Collection Volume**: Daily, weekly, and monthly herb collection volumes
- **Quality Scores**: Average quality grades across different herb types
- **Supply Chain Efficiency**: Time from collection to retail
- **Blockchain Confirmations**: Transaction success rates and timing
- **Regulatory Compliance**: Compliance percentage across all batches
- **Consumer Verification**: QR code scan rates and verification success

## 🌍 Environmental Impact

HerbTrace promotes sustainable practices:
- **Carbon Footprint Tracking**: Monitor transportation emissions
- **Sustainable Collection**: Promote responsible harvesting practices
- **Seasonal Reminders**: Educate collectors about optimal collection times
- **Conservation Alerts**: Warn about over-harvesting risks

## 🤝 Contributing

We welcome contributions to HerbTrace! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React functional component patterns
- Implement proper error handling with optional chaining
- Maintain responsive design principles

## 📄 License

This project is proprietary software developed for the Ayurvedic herb traceability industry.

## 🙏 Acknowledgments

- **Herb Collectors**: Hardworking collectors in the Himalayan regions
- **Ayurvedic Community**: Traditional knowledge keepers and practitioners
- **Blockchain Community**: Open-source tools and protocols
- **React Ecosystem**: Amazing libraries and tools that power this platform

---

<div align="center">

**Built with ❤️ for the Ayurvedic herb community**

*Ensuring authentic herbs from the Himalayas to your home*

[Website](https://herbtrace.com) • [Support](mailto:support@herbtrace.com) • [Documentation](https://docs.herbtrace.com)

</div>