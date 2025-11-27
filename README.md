# MindEase - Mental Health Support App

A comprehensive mental health support platform designed specifically for university students, providing self-assessment tools, mood tracking, and crisis resources.

## 🌟 Features

- **User Authentication** - Secure signup and login with university verification
- **Mental Health Assessment** - PHQ-9 based self-assessment with personalized recommendations
- **Mood Tracking** - Daily mood monitoring with visual feedback
- **Crisis Support** - Immediate access to emergency contacts and resources
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **University Focus** - Specifically designed for student mental health needs

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the application:**
   ```bash
   npm start
   ```
4. **Open your browser to:**
   ```
   http://localhost:3000
   ```

That's it! The app will be running and ready to use.

## 📁 Project Structure

```
mind-ease-app/
├── package.json          # Project dependencies and scripts
├── server.js             # Backend API server (Express.js)
├── public/               # Frontend files
│   ├── index.html        # Main HTML file
│   ├── style.css         # Complete styling
│   └── app.js           # Frontend JavaScript functionality
└── README.md            # This file
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with Flexbox/Grid
- **HTML5** - Semantic markup
- **Font Awesome** - Icons

### Storage
- **In-memory storage** - For development and testing
- **Easy to extend** to MongoDB or other databases

## 📊 How It Works

### User Journey

1. **Registration & Authentication**
   - Students sign up with university credentials
   - Secure JWT-based authentication
   - University and student ID verification

2. **Dashboard & Mood Tracking**
   - Central hub for all features
   - 5-level mood tracking (😢 Very Sad to 😄 Very Happy)
   - Visual mood history

3. **Self-Assessment**
   - PHQ-9 based mental health assessment
   - 9 questions about mental wellbeing
   - Automated scoring and severity classification
   - Personalized recommendations based on results

4. **Crisis Support**
   - Immediate access to emergency contacts
   - National helpline numbers
   - University counseling resources

### Assessment Scoring

The app uses the standard PHQ-9 scoring system:
- **0-4:** Minimal depression
- **5-9:** Mild depression  
- **10-14:** Moderate depression
- **15-19:** Moderately severe depression
- **20-27:** Severe depression

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Assessments
- `GET /api/assessment/questions` - Get PHQ-9 questions
- `POST /api/assessment/submit` - Submit assessment answers

### Mood Tracking
- `POST /api/mood/track` - Record daily mood
- `GET /api/mood/history` - Get mood history

### Support
- `GET /api/crisis/resources` - Get emergency contacts
- `GET /api/health` - API health check

## 🎯 Key Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT token-based sessions
- University student verification
- Automatic login persistence

### Mental Health Assessment
- Clinically validated PHQ-9 questionnaire
- Real-time scoring and analysis
- Severity-based recommendations
- Progress tracking over time

### Mood Tracking
- Simple 5-point emotion scale
- Visual feedback system
- Historical data visualization
- Daily emotional check-ins

### Crisis Resources
- Immediate access to help
- National and local resources
- 24/7 support availability
- Emergency contact information

## 🔒 Security Features

- Password hashing and salting
- JWT token authentication
- CORS protection
- Input validation
- Secure headers

## 🌍 Deployment

### For Development
```bash
npm start
```

### For Production
The app is ready for deployment on:
- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS EC2**
- **Any Node.js hosting platform**

### Environment Variables
Create a `.env` file for production:
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=your_secure_jwt_secret
```

## 📱 Mobile Responsiveness

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes

## 🎨 Design Philosophy

- **Clean & Calming** - Soothing color scheme (blues and pinks)
- **Accessible** - High contrast, readable fonts
- **Intuitive** - Simple navigation and clear calls-to-action
- **Professional** - University-appropriate design

## 🔄 Data Flow

1. **Client** (Browser) makes requests to API
2. **Server** (Express.js) processes requests
3. **Authentication** middleware validates users
4. **Business Logic** handles assessments and mood tracking
5. **Response** returned to client with appropriate data

## 🚨 Crisis Disclaimer

**Important:** This application is designed for mental health support and self-assessment, but it is not a replacement for professional medical advice, diagnosis, or treatment. If you are in crisis or having thoughts of harming yourself, please contact emergency services immediately.

## 🤝 Contributing

We welcome contributions to improve MindEase! Areas for enhancement:
- Database integration (MongoDB, PostgreSQL)
- Additional assessment tools
- Counselor matching system
- Peer support features
- Multi-language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- PHQ-9 questionnaire developers
- Mental health professionals and researchers
- University counseling centers
- Open source community

## 📞 Support

If you need help with:
- Technical issues
- Feature requests
- Deployment questions

Please open an issue in the project repository or contact the development team.

---

**MindEase - Supporting Student Mental Health One Day at a Time** 💙

*Built with care for the university community*
