import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 12,
    uvIndex: 6,
    icon: 'CloudSun'
  });

  const [collectionAdvice, setCollectionAdvice] = useState('');

  useEffect(() => {
    // Mock weather-based collection advice
    const advice = {
      'Sunny': 'Ideal conditions for collecting most herbs. Early morning recommended.',
      'Partly Cloudy': 'Good collection weather. Monitor humidity levels.',
      'Cloudy': 'Suitable for delicate herbs. Avoid if rain expected.',
      'Rainy': 'Avoid collection. Wait for dry conditions.',
      'Windy': 'Be cautious with lightweight herbs. Secure collection bags.'
    };

    setCollectionAdvice(advice?.[weatherData?.condition] || 'Check local conditions before collecting.');
  }, [weatherData?.condition]);

  const getUVIndexColor = (index) => {
    if (index <= 2) return 'text-success';
    if (index <= 5) return 'text-warning';
    return 'text-error';
  };

  const getUVIndexLabel = (index) => {
    if (index <= 2) return 'Low';
    if (index <= 5) return 'Moderate';
    if (index <= 7) return 'High';
    return 'Very High';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Weather Conditions</h3>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16} />
      </div>
      <div className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={weatherData?.icon} size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weatherData?.temperature}°C</p>
              <p className="text-sm text-muted-foreground">{weatherData?.condition}</p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Droplets" size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-medium text-foreground">{weatherData?.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wind" size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-medium text-foreground">{weatherData?.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Sun" size={16} className="text-warning" />
            <span className="text-sm text-foreground">UV Index</span>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${getUVIndexColor(weatherData?.uvIndex)}`}>
              {weatherData?.uvIndex} - {getUVIndexLabel(weatherData?.uvIndex)}
            </p>
          </div>
        </div>

        {/* Collection Advice */}
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-xs font-medium text-primary">Collection Advice</p>
              <p className="text-xs text-foreground mt-1">{collectionAdvice}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>Dehradun, Uttarakhand</span>
          <span>•</span>
          <span>Updated 5 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;