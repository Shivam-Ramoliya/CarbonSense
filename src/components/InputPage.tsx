import { useState } from 'react';
import { ArrowLeft, Battery, Clock, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import type { ChargingData } from '../App';

interface InputPageProps {
  onSubmit: (data: ChargingData) => void;
  onBack: () => void;
}

export function InputPage({ onSubmit, onBack }: InputPageProps) {
  const [chargesPerDay, setChargesPerDay] = useState<number>(1);
  const [chargingTime, setChargingTime] = useState<string>('Evening');
  const [plugInPercent, setPlugInPercent] = useState<number[]>([20]);
  const [unplugPercent, setUnplugPercent] = useState<number[]>([100]);
  const [phoneAge, setPhoneAge] = useState<string>('1-2 years');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      chargesPerDay,
      chargingTime,
      plugInPercent: plugInPercent[0],
      unplugPercent: unplugPercent[0],
      phoneAge,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Back Button */}
      <button
        onClick={onBack}
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
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            2
          </div>
          <span className="text-slate-800 text-sm">Your Habits</span>
        </div>
        <div className="w-16 h-1 bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
            3
          </div>
          <span className="text-slate-400 text-sm">Results</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-slate-800 mb-3">Tell us about your charging habits</h2>
        <p className="text-slate-600">
          This helps us calculate your personal carbon footprint and provide tailored recommendations
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Charges Per Day */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl shrink-0">
              <Battery className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <Label className="text-slate-800 mb-3 block">
                How many times do you charge your phone per day?
              </Label>
              <Select value={chargesPerDay.toString()} onValueChange={(val) => setChargesPerDay(parseInt(val))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 time</SelectItem>
                  <SelectItem value="2">2 times</SelectItem>
                  <SelectItem value="3">3 times</SelectItem>
                  <SelectItem value="4">4 times</SelectItem>
                  <SelectItem value="5">5 times</SelectItem>
                  <SelectItem value="6">6+ times</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Charging Time */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl shrink-0">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <Label className="text-slate-800 mb-3 block">
                When do you usually charge?
              </Label>
              <Select value={chargingTime} onValueChange={setChargingTime}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning (6 AM - 12 PM)</SelectItem>
                  <SelectItem value="Afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                  <SelectItem value="Evening">Evening (6 PM - 10 PM)</SelectItem>
                  <SelectItem value="Late Night">Late Night (10 PM - 6 AM)</SelectItem>
                  <SelectItem value="Random">Random times</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Plug In Percent */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-100 rounded-xl shrink-0">
              <Battery className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <Label className="text-slate-800 mb-3 block">
                At what % do you usually plug in?
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={plugInPercent}
                  onValueChange={setPlugInPercent}
                  max={50}
                  step={5}
                  className="flex-1"
                />
                <div className="text-emerald-600 min-w-[60px] text-right">
                  {plugInPercent[0]}%
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-2">Lower is better for battery health</p>
            </div>
          </div>
        </div>

        {/* Unplug Percent */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl shrink-0">
              <Battery className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <Label className="text-slate-800 mb-3 block">
                At what % do you unplug?
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={unplugPercent}
                  onValueChange={setUnplugPercent}
                  min={70}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <div className="text-emerald-600 min-w-[60px] text-right">
                  {unplugPercent[0]}%
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-2">80% is optimal for battery longevity</p>
            </div>
          </div>
        </div>

        {/* Phone Age */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl shrink-0">
              <Smartphone className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <Label className="text-slate-800 mb-3 block">
                How old is your phone?
              </Label>
              <Select value={phoneAge} onValueChange={setPhoneAge}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="2-3 years">2-3 years</SelectItem>
                  <SelectItem value="3-4 years">3-4 years</SelectItem>
                  <SelectItem value="4+ years">4+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <Button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            Generate My Report
          </Button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-16 text-center text-slate-500 text-sm">
        Made for HCI Project — Carbon Awareness
      </footer>
    </div>
  );
}
