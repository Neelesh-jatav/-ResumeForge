# ResumeForge

A modern, intuitive resume builder application that helps you create, customize, and export professional resumes. Built with cutting-edge web technologies for a seamless user experience.

## ✨ Features

- **Intuitive Resume Builder** - Easy-to-use forms for all resume sections
- **Real-time Preview** - See your changes instantly as you create
- **Drag & Drop Image Upload** - Add profile photos with simple drag-and-drop functionality
- **Multiple Export Formats** - Export as PDF, JSON, or HTML
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices
- **Form Validation** - Built-in validation for all inputs
- **Modern UI Components** - Professional UI built with shadcn/ui
- **Dark Mode Ready** - Tailwind CSS supports light and dark themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or bun package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd ResumeForge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173` (or the next available port).

## 📦 Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the project for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## 📋 Project Structure

```
ResumeForge/
├── src/
│   ├── components/
│   │   ├── resume/              # Resume form components
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── ProjectsForm.tsx
│   │   │   ├── HonorsForm.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── ExportButtons.tsx
│   │   │   └── DraggableImage.tsx
│   │   ├── ui/                  # shadcn/ui components (47+ pre-built)
│   │   └── NavLink.tsx          # Navigation component
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Home page
│   │   └── NotFound.tsx         # 404 page
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-toast.ts         # Toast notifications
│   │   └── use-mobile.tsx       # Mobile detection
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Helpers (cn, formatDate, etc.)
│   ├── types/                   # TypeScript types
│   │   └── resume.ts            # Resume data interfaces
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles
│   └── App.css                  # App-specific styles
├── public/                      # Static assets
├── package.json                 # Project dependencies
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautifully designed React components
- **Radix UI** - Unstyled, accessible components as the foundation

### Forms & State Management
- **React Hook Form** - Efficient form handling
- **TanStack Query** - Powerful data synchronization

### Additional Libraries
- **date-fns** - Modern date utilities
- **clsx** - Conditional CSS class management
- **html2canvas** - Screenshot functionality
- **jsPDF** - PDF generation
- **class-variance-authority** - CSS variant management

## 📝 Resume Data Structure

The application uses TypeScript interfaces for type safety:

```typescript
interface Resume {
  id: string
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  honors: Honor[]
  createdAt: string
  updatedAt: string
}
```

Each section includes relevant fields:
- **Personal Info**: Full name, email, phone, location, professional summary, profile image
- **Education**: School, degree, field, dates, description
- **Experience**: Company, position, dates, current employment status, description
- **Skills**: Category (e.g., Languages, Frameworks), skill list
- **Projects**: Title, description, technologies, link, dates
- **Honors**: Title, issuer, date, description

## 🎨 Features in Detail

### Resume Builder Sections

1. **Personal Information** - Contact details and professional summary
2. **Education** - Academic background and qualifications
3. **Work Experience** - Employment history and responsibilities
4. **Skills** - Organized by categories (Languages, Frameworks, Tools, etc.)
5. **Projects** - Showcase your portfolio with descriptions and technology stacks
6. **Honors & Awards** - Recognition and achievements

### Export Options

- **PDF** - Professional PDF format for printing and sharing
- **JSON** - Portable format for backup and data transfer
- **HTML** - Standalone HTML file with styling

### UI Components Available

The project includes 47+ pre-built shadcn/ui components ready for use:
- Form components (Input, Select, Checkbox, RadioGroup, etc.)
- Layout components (Card, Dialog, Drawer, Sidebar, etc.)
- Display components (Badge, Avatar, Progress, Toast, etc.)
- Navigation components (Tabs, Navigation Menu, Pagination, etc.)

## 🔧 Configuration

### Environment

Create a `.env` file in the root directory if needed:
```env
VITE_APP_TITLE=ResumeForge
```

### Tailwind CSS

Customize colors and styling in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ }
    }
  }
}
```

### ESLint

Code quality rules are configured in `eslint.config.js`. Run linting with:
```bash
npm run lint
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows the ESLint configuration
- TypeScript is used for type safety
- Components are functional and use React hooks
- Responsive design is maintained

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- Cloud storage integration
- Multiple template designs
- ATS (Applicant Tracking System) optimization
- PDF template customization
- Social media profile integration
- Resume version history
- Collaboration features

## 📞 Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Happy Resume Building! 🎉**
