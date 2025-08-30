import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandedBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-secondary/20 rounded-full" />
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-secondary/20 rounded-full" />
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-pulse">
          <Icon name="Leaf" size={24} className="text-success/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse delay-1000">
          <Icon name="FlaskConical" size={20} className="text-primary/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-2000">
          <Icon name="Truck" size={22} className="text-secondary/20" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-pulse delay-3000">
          <Icon name="ShieldCheck" size={18} className="text-success/20" />
        </div>
      </div>
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-clinical">
                <Icon name="Leaf" size={28} color="white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">HerbTrace</h1>
                <p className="text-sm text-muted-foreground">Blockchain Supply Chain Authentication</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span>© {new Date()?.getFullYear()} HerbTrace. All rights reserved.</span>
              <button className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-foreground transition-colors">Terms of Service</button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Globe" size={14} />
                <span>English (US)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="HelpCircle" size={14} />
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrandedBackground;