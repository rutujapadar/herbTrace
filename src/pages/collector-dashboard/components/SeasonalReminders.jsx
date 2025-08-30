import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeasonalReminders = () => {
  const currentMonth = new Date()?.getMonth();
  
  const seasonalData = [
    {
      id: 1,
      herb: 'Ashwagandha',
      scientificName: 'Withania somnifera',
      season: 'Winter',
      months: [11, 0, 1], // Dec, Jan, Feb
      status: 'peak',
      icon: 'Leaf',
      description: 'Root collection is optimal during dormant season'
    },
    {
      id: 2,
      herb: 'Brahmi',
      scientificName: 'Bacopa monnieri',
      season: 'Monsoon',
      months: [6, 7, 8], // Jul, Aug, Sep
      status: 'upcoming',
      icon: 'Droplets',
      description: 'Fresh leaves best collected during rainy season'
    },
    {
      id: 3,
      herb: 'Tulsi',
      scientificName: 'Ocimum sanctum',
      season: 'Year-round',
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      status: 'available',
      icon: 'Sun',
      description: 'Leaves can be collected throughout the year'
    },
    {
      id: 4,
      herb: 'Giloy',
      scientificName: 'Tinospora cordifolia',
      season: 'Spring',
      months: [2, 3, 4], // Mar, Apr, May
      status: 'ended',
      icon: 'Flower',
      description: 'Stem collection best in early spring'
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'peak':
        return { color: 'text-success bg-success/10 border-success/20', label: 'Peak Season', icon: 'TrendingUp' };
      case 'upcoming':
        return { color: 'text-warning bg-warning/10 border-warning/20', label: 'Upcoming', icon: 'Clock' };
      case 'available':
        return { color: 'text-primary bg-primary/10 border-primary/20', label: 'Available', icon: 'CheckCircle' };
      case 'ended':
        return { color: 'text-muted-foreground bg-muted/10 border-border', label: 'Season Ended', icon: 'XCircle' };
      default:
        return { color: 'text-muted-foreground bg-muted/10 border-border', label: 'Unknown', icon: 'HelpCircle' };
    }
  };

  const isCurrentSeason = (months) => {
    return months?.includes(currentMonth);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Seasonal Collection Reminders</h3>
        <Button variant="ghost" size="sm" iconName="Calendar" iconSize={16} />
      </div>
      <div className="space-y-4">
        {seasonalData?.map((item) => {
          const statusConfig = getStatusConfig(item?.status);
          const isCurrent = isCurrentSeason(item?.months);

          return (
            <div 
              key={item?.id} 
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isCurrent 
                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                  : 'bg-surface border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrent ? 'bg-primary/20' : 'bg-muted/20'
                  }`}>
                    <Icon name={item?.icon} size={20} className={isCurrent ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{item?.herb}</h4>
                    <p className="text-xs text-muted-foreground italic">{item?.scientificName}</p>
                  </div>
                </div>
                
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.color}`}>
                  <Icon name={statusConfig?.icon} size={12} />
                  <span>{statusConfig?.label}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{item?.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item?.season}</span>
                </div>
                
                {item?.status === 'peak' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={14}
                    className="text-xs h-7"
                  >
                    Collect Now
                  </Button>
                )}
                
                {item?.status === 'upcoming' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bell"
                    iconPosition="left"
                    iconSize={14}
                    className="text-xs h-7"
                  >
                    Set Reminder
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Monthly Calendar Preview */}
      <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">This Month's Priority</h4>
          <Icon name="Star" size={16} className="text-warning" />
        </div>
        
        <div className="space-y-2">
          {seasonalData?.filter(item => isCurrentSeason(item?.months))?.map(item => (
              <div key={item?.id} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-xs text-foreground">{item?.herb}</span>
                <span className="text-xs text-muted-foreground">- {item?.status}</span>
              </div>
            ))}
          
          {seasonalData?.filter(item => isCurrentSeason(item?.months))?.length === 0 && (
            <p className="text-xs text-muted-foreground">No priority collections this month</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonalReminders;