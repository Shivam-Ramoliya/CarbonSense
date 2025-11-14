import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { InputPage } from './components/InputPage';
import { ResultsPage } from './components/ResultsPage';

export interface ChargingData {
  chargesPerDay: number;
  chargingTime: string;
  plugInPercent: number;
  unplugPercent: number;
  phoneAge: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'input' | 'results'>('home');
  const [chargingData, setChargingData] = useState<ChargingData | null>(null);

  const handleStartCalculation = () => {
    setCurrentPage('input');
  };

  const handleSubmitData = (data: ChargingData) => {
    setChargingData(data);
    setCurrentPage('results');
  };

  const handleTryAgain = () => {
    setChargingData(null);
    setCurrentPage('input');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {currentPage === 'home' && (
        <HomePage onCalculate={handleStartCalculation} />
      )}
      {currentPage === 'input' && (
        <InputPage onSubmit={handleSubmitData} onBack={handleBackToHome} />
      )}
      {currentPage === 'results' && chargingData && (
        <ResultsPage data={chargingData} onTryAgain={handleTryAgain} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}
