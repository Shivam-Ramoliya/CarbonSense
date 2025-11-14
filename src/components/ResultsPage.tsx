import { ArrowLeft, TrendingDown, TrendingUp, Leaf, Battery, Zap, Recycle, Moon, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ChargingData } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResultsPageProps {
  data: ChargingData;
  onTryAgain: () => void;
  onBackToHome: () => void;
}

export function ResultsPage({ data, onTryAgain, onBackToHome }: ResultsPageProps) {
  // Calculate carbon emissions
  const CO2_PER_CHARGE = 8; // grams
  const dailyCO2 = data.chargesPerDay * CO2_PER_CHARGE;
  const monthlyCO2 = dailyCO2 * 30;
  const yearlyKg = (dailyCO2 * 365) / 1000;

  // Average user charges ~1.5 times per day
  const avgDailyCO2 = 1.5 * CO2_PER_CHARGE;
  const comparisonPercent = ((dailyCO2 - avgDailyCO2) / avgDailyCO2) * 100;

  // Determine charging efficiency
  const isOptimalRange = data.plugInPercent >= 20 && data.unplugPercent <= 80;
  const isOvercharging = data.unplugPercent === 100 && data.chargesPerDay > 1;

  // Chart data
  const chartData = [
    {
      name: 'Average User',
      co2: avgDailyCO2,
    },
    {
      name: 'You',
      co2: dailyCO2,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Back Button */}
      <button
        onClick={onBackToHome}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center">
            1
          </div>
          <span className="text-slate-600 text-sm">Awareness</span>
        </div>
        <div className="w-16 h-1 bg-emerald-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center">
            2
          </div>
          <span className="text-slate-600 text-sm">Your Habits</span>
        </div>
        <div className="w-16 h-1 bg-emerald-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            3
          </div>
          <span className="text-slate-800 text-sm">Results</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <h2 className="text-slate-800 mb-3">Your Charging Carbon Report</h2>
        <p className="text-slate-600">
          Based on your charging habits, here's your environmental impact
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-blue-600 mb-2">{dailyCO2}g CO₂</div>
          <p className="text-slate-600 text-sm">Daily Emissions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="text-emerald-600 mb-2">{monthlyCO2}g CO₂</div>
          <p className="text-slate-600 text-sm">Monthly Emissions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="inline-flex p-3 bg-teal-100 rounded-xl mb-4">
            <Leaf className="w-8 h-8 text-teal-600" />
          </div>
          <div className="text-teal-600 mb-2">{yearlyKg.toFixed(2)}kg CO₂</div>
          <p className="text-slate-600 text-sm">Yearly Emissions</p>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h3 className="text-slate-800 mb-6">How You Compare</h3>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'grams CO₂/day', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="co2" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : dailyCO2 > avgDailyCO2 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-50 rounded-xl p-6">
          <div className="flex items-center gap-3">
            {comparisonPercent > 0 ? (
              <>
                <TrendingUp className="w-6 h-6 text-red-500" />
                <p className="text-slate-700">
                  You emit <span className="text-red-600">{Math.abs(comparisonPercent).toFixed(0)}% more</span> CO₂ 
                  than the average user ({avgDailyCO2}g/day)
                </p>
              </>
            ) : (
              <>
                <TrendingDown className="w-6 h-6 text-emerald-500" />
                <p className="text-slate-700">
                  Great! You emit <span className="text-emerald-600">{Math.abs(comparisonPercent).toFixed(0)}% less</span> CO₂ 
                  than the average user ({avgDailyCO2}g/day)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* What This Means */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl shadow-md p-8 mb-8">
        <h3 className="text-slate-800 mb-4">What This Means</h3>
        <div className="space-y-4 text-slate-700">
          <p>
            Charging your phone <span className="text-emerald-600">{data.chargesPerDay} {data.chargesPerDay === 1 ? 'time' : 'times'} per day</span> generates 
            approximately <span className="text-emerald-600">{dailyCO2}g of CO₂ daily</span>. Over a year, that's {yearlyKg.toFixed(2)}kg — 
            roughly equivalent to driving a car for {(yearlyKg * 4).toFixed(1)} kilometers.
          </p>
          {isOvercharging && (
            <p className="text-amber-700">
              ⚠️ You're charging to 100% multiple times a day. This not only increases energy consumption but can also 
              degrade your battery faster, potentially shortening your phone's lifespan.
            </p>
          )}
          {!isOptimalRange && (
            <p className="text-blue-700">
              💡 Your charging range ({data.plugInPercent}% to {data.unplugPercent}%) could be optimized. 
              Keeping your battery between 20-80% helps maintain battery health and reduces unnecessary energy use.
            </p>
          )}
          {isOptimalRange && (
            <p className="text-emerald-700">
              ✨ Excellent! You're charging in the optimal range (20-80%), which is great for battery longevity 
              and energy efficiency.
            </p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h3 className="text-slate-800 mb-6">Improve Your Charging Habits</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl shrink-0 h-fit">
              <Battery className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Charge Between 20-80%</h4>
              <p className="text-slate-600 text-sm">
                This range extends battery life and reduces energy waste from overcharging. Unplug when you hit 80%.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-blue-100 rounded-xl shrink-0 h-fit">
              <Moon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Avoid Overnight Charging</h4>
              <p className="text-slate-600 text-sm">
                Leaving your phone plugged in all night wastes energy. Charge before bed and unplug when full.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-teal-100 rounded-xl shrink-0 h-fit">
              <Settings className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Use Energy Saver Mode</h4>
              <p className="text-slate-600 text-sm">
                Enable low power mode to reduce battery drain and decrease how often you need to charge.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl shrink-0 h-fit">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Reduce App Usage</h4>
              <p className="text-slate-600 text-sm">
                Close background apps and lower screen brightness to minimize power consumption throughout the day.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-blue-100 rounded-xl shrink-0 h-fit">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Recycle Responsibly</h4>
              <p className="text-slate-600 text-sm">
                When upgrading, recycle your old device properly. E-waste contains valuable materials and harmful substances.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-teal-100 rounded-xl shrink-0 h-fit">
              <Leaf className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h4 className="text-slate-800 mb-2">Keep Your Phone Longer</h4>
              <p className="text-slate-600 text-sm">
                The most eco-friendly phone is the one you already have. Extend its life with good charging habits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <Button 
          onClick={onTryAgain}
          variant="outline"
          className="px-8 py-6 rounded-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          size="lg"
        >
          Try Again
        </Button>
        <Button 
          onClick={onBackToHome}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          Learn More
        </Button>
      </div>

      {/* Environmental Image */}
      <div className="rounded-2xl overflow-hidden mb-8">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1594267238613-80da343fc886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGVudmlyb25tZW50JTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzYzMTA4MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Earth sustainability"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-slate-500 text-sm">
        Made for HCI Project — Carbon Awareness
      </footer>
    </div>
  );
}
