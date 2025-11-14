import { Battery, Cloud, Leaf, Zap, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onCalculate: () => void;
}

export function HomePage({ onCalculate }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-emerald-800">CarbonSense</h1>
        </div>
        <p className="text-emerald-600 max-w-2xl mx-auto">
          Understand Your Charging Impact
        </p>
      </header>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl shadow-lg p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-slate-800 mb-6">
              How Smartphone Charging Affects Our Planet
            </h2>
            <p className="text-slate-600 mb-6">
              Every time you charge your smartphone, energy is drawn from the grid — and that energy 
              often comes from power plants that emit carbon dioxide. While a single charge may seem 
              insignificant, billions of smartphones worldwide create a substantial environmental impact.
            </p>
            <p className="text-slate-600">
              Understanding your charging habits is the first step toward making more sustainable choices. 
              Small changes in how we charge can reduce emissions and extend the life of our devices.
            </p>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100 p-8">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1673433106882-c80d94df8b46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwY2hhcmdpbmclMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NjMxMDgxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Smartphone charging"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                <Cloud className="w-12 h-12 text-slate-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 p-4 rounded-2xl shadow-lg">
                <Battery className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-emerald-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-slate-800">Per Charge</h3>
          </div>
          <p className="text-emerald-600 mb-2">~8 grams CO₂</p>
          <p className="text-slate-600 text-sm">
            Charging a smartphone once emits approximately 8 grams of carbon dioxide
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-slate-800">Global Impact</h3>
          </div>
          <p className="text-blue-600 mb-2">1.5% of emissions</p>
          <p className="text-slate-600 text-sm">
            Digital devices contribute about 1.5% of global greenhouse gas emissions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-teal-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 rounded-xl">
              <Leaf className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-slate-800">Your Power</h3>
          </div>
          <p className="text-teal-600 mb-2">Make a difference</p>
          <p className="text-slate-600 text-sm">
            Smart charging habits can reduce your carbon footprint by up to 30%
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Button 
          onClick={onCalculate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          Calculate My Carbon Impact
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-slate-500 text-sm">
        Made for HCI Project — Carbon Awareness
      </footer>
    </div>
  );
}
