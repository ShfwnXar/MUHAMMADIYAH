import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ParticipantSidebar } from '../../components/ParticipantSidebar';
import { RegistrationWizard } from '../../components/RegistrationWizard';
import { Footer } from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Trophy, ArrowRight, ShoppingCart, X, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { getRegistrationProgress, completeStep1 } from '../../utils/registrationStorage';
import { THB_SPORTS, Sport, SportCategory, EDUCATION_LEVELS, EducationLevel, getTechnicalParameters } from '../../utils/thbSportsData';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface SelectedSportCategory {
  sportId: string;
  sportName: string;
  sportIcon: string;
  sportColor: string;
  categoryId: string;
  categoryName: string;
  categoryType: 'tunggal' | 'ganda' | 'beregu';
  price: number;
  priceLabel: string;
  minParticipants?: number;
  maxParticipants?: number;
  // THB compliance fields
  educationLevel: EducationLevel;
  educationLevelLabel: string;
  technicalParams?: Record<string, string>; // paramId -> selectedOptionId
}

interface SportSelection {
  categoryId: string;
  educationLevel: string;
  technicalParams: Record<string, string>;
  isExpanded: boolean;
}

export default function Step1() {
  const navigate = useNavigate();
  const [registrationProgress, setRegistrationProgress] = useState({
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  });

  // Track selection state per sport (sportId -> SportSelection)
  const [sportSelections, setSportSelections] = useState<Record<string, SportSelection>>({});
  
  const [cart, setCart] = useState<SelectedSportCategory[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const progress = getRegistrationProgress();
    setRegistrationProgress(progress);
    
    // Load saved cart if exists
    if (progress.step1Data?.selectedSports) {
      setCart(progress.step1Data.selectedSports as any);
    }
  }, []);

  const handleLogout = () => {
    navigate('/participant-login');
  };

  const isComboInCart = (sportId: string, categoryId: string, educationLevel: string, technicalParams?: Record<string, string>) => {
    return cart.some(item => {
      const baseMatch = item.sportId === sportId && 
                       item.categoryId === categoryId && 
                       item.educationLevel === educationLevel;
      
      // If no technical params required, base match is enough
      if (!technicalParams || Object.keys(technicalParams).length === 0) {
        return baseMatch && (!item.technicalParams || Object.keys(item.technicalParams).length === 0);
      }
      
      // Check technical params match
      if (!item.technicalParams) return false;
      
      return baseMatch && Object.keys(technicalParams).every(
        key => item.technicalParams![key] === technicalParams[key]
      );
    });
  };

  const toggleSportExpansion = (sportId: string) => {
    setSportSelections(prev => {
      const current = prev[sportId] || {
        categoryId: '',
        educationLevel: '',
        technicalParams: {},
        isExpanded: false
      };
      
      return {
        ...prev,
        [sportId]: {
          ...current,
          isExpanded: !current.isExpanded
        }
      };
    });
  };

  const handleCategorySelect = (sportId: string, categoryId: string) => {
    setSportSelections(prev => {
      const current = prev[sportId] || {
        categoryId: '',
        educationLevel: '',
        technicalParams: {},
        isExpanded: true
      };
      
      return {
        ...prev,
        [sportId]: {
          ...current,
          categoryId,
          // Reset education level and technical params when category changes
          educationLevel: '',
          technicalParams: {}
        }
      };
    });
  };

  const handleEducationLevelSelect = (sportId: string, level: string) => {
    setSportSelections(prev => ({
      ...prev,
      [sportId]: {
        ...prev[sportId],
        educationLevel: level
      }
    }));
  };

  const handleTechnicalParamSelect = (sportId: string, paramId: string, optionId: string) => {
    setSportSelections(prev => ({
      ...prev,
      [sportId]: {
        ...prev[sportId],
        technicalParams: {
          ...prev[sportId].technicalParams,
          [paramId]: optionId
        }
      }
    }));
  };

  const validateSelection = (sport: Sport, selection: SportSelection): string | null => {
    if (!selection.categoryId) {
      return 'Kategori lomba wajib dipilih';
    }

    if (!selection.educationLevel) {
      return 'Jenjang peserta wajib dipilih';
    }

    // Check technical parameters
    const techParams = getTechnicalParameters(sport.id, selection.categoryId);
    const requiredParams = techParams.filter(p => p.required);
    
    for (const param of requiredParams) {
      if (!selection.technicalParams[param.id]) {
        return `${param.label} wajib dipilih`;
      }
    }

    return null;
  };

  const addToCart = (sport: Sport) => {
    const selection = sportSelections[sport.id];
    
    if (!selection) {
      toast.error('Pilih kategori terlebih dahulu');
      return;
    }

    const validationError = validateSelection(sport, selection);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const category = sport.categories.find(c => c.id === selection.categoryId);
    if (!category) return;

    const educationLevelObj = EDUCATION_LEVELS.find(el => el.id === selection.educationLevel);
    if (!educationLevelObj) return;

    if (isComboInCart(sport.id, category.id, selection.educationLevel, selection.technicalParams)) {
      toast.info('Kombinasi kategori ini sudah ditambahkan');
      return;
    }

    const newItem: SelectedSportCategory = {
      sportId: sport.id,
      sportName: sport.name,
      sportIcon: sport.icon,
      sportColor: sport.color,
      categoryId: category.id,
      categoryName: category.name,
      categoryType: category.categoryType,
      price: category.price,
      priceLabel: category.priceLabel,
      minParticipants: category.minParticipants,
      maxParticipants: category.maxParticipants,
      educationLevel: selection.educationLevel as EducationLevel,
      educationLevelLabel: educationLevelObj.label,
      technicalParams: Object.keys(selection.technicalParams).length > 0 ? selection.technicalParams : undefined
    };
    
    setCart([...cart, newItem]);
    toast.success(`${sport.name} - ${category.name} (${educationLevelObj.label}) ditambahkan`);
    
    // Reset selection for this sport
    setSportSelections(prev => ({
      ...prev,
      [sport.id]: {
        categoryId: '',
        educationLevel: '',
        technicalParams: {},
        isExpanded: true
      }
    }));
  };

  const removeFromCart = (index: number) => {
    const removed = cart[index];
    setCart(cart.filter((_, i) => i !== index));
    toast.info(`${removed.sportName} - ${removed.categoryName} dihapus dari keranjang`);
  };

  const handleContinue = () => {
    if (cart.length === 0) {
      toast.error('Pilih minimal 1 cabang dan kategori');
      return;
    }

    // Save Step 1 completion
    completeStep1(cart);

    // Navigate to Step 2
    navigate('/registration/step-2');
  };

  const getSportSelection = (sportId: string): SportSelection => {
    return sportSelections[sportId] || {
      categoryId: '',
      educationLevel: '',
      technicalParams: {},
      isExpanded: false
    };
  };

  const getTechnicalParamLabel = (sportId: string, categoryId: string, paramId: string, optionId: string): string => {
    const techParams = getTechnicalParameters(sportId, categoryId);
    const param = techParams.find(p => p.id === paramId);
    if (!param) return optionId;
    
    const option = param.options.find(o => o.id === optionId);
    return option ? option.label : optionId;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ParticipantSidebar 
        registrationProgress={registrationProgress}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Step 1: Pilih Cabang & Kategori</h1>
            <p className="text-white/90">
              Pilih cabang olahraga, kategori, dan jenjang sesuai THB 2026
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8 w-full">
          <RegistrationWizard 
            currentStep={1}
            step1Complete={registrationProgress.step1Complete}
            step2Complete={registrationProgress.step2Complete}
            step3Complete={registrationProgress.step3Complete}
          />

          {/* Info Banner */}
          <Card className="mb-6 bg-gradient-to-r from-[#F6A500]/10 to-[#F6A500]/5 border border-[#F6A500]">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#F6A500] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#0C2C4A] text-base mb-2">Aturan Pendaftaran THB 2026</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>1️⃣ Pilih <strong>Kategori Lomba</strong> → 2️⃣ Pilih <strong>Jenjang Peserta</strong> → 3️⃣ Isi <strong>Detail Teknis</strong> (jika ada)</li>
                    <li>4️⃣ Klik "Pilih Cabang Ini" untuk menambah ke keranjang</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sport Selection Grid - 2 columns */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#0C2C4A] mb-4">Cabang Olahraga THB 2026</h2>
              <div className="space-y-4">
                {THB_SPORTS.map((sport) => {
                  const selection = getSportSelection(sport.id);
                  const selectedCategory = sport.categories.find(c => c.id === selection.categoryId);
                  const sportHasItemsInCart = cart.some(item => item.sportId === sport.id);
                  const techParams = selection.categoryId ? getTechnicalParameters(sport.id, selection.categoryId) : [];
                  const validationError = selection.categoryId ? validateSelection(sport, selection) : null;
                  
                  return (
                    <Card
                      key={sport.id}
                      className={`transition-all duration-200 ${
                        sportHasItemsInCart ? 'ring-2 ring-[#1FA84A]' : 'hover:shadow-md'
                      }`}
                    >
                      <CardHeader 
                        className={`bg-gradient-to-r ${sport.color} text-white cursor-pointer`}
                        onClick={() => toggleSportExpansion(sport.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Trophy className="w-6 h-6" />
                            <div>
                              <CardTitle className="text-lg">{sport.name}</CardTitle>
                              <p className="text-white/90 text-sm mt-1">{sport.description}</p>
                            </div>
                          </div>
                          {selection.isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </CardHeader>
                      
                      {selection.isExpanded && (
                        <CardContent className="pt-6">
                          {/* LAYER 1: Category Selection */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-full bg-[#1FA84A] text-white flex items-center justify-center text-sm font-bold">1</div>
                              <Label className="font-bold text-[#0C2C4A]">
                                Kategori Lomba (WAJIB)
                              </Label>
                            </div>
                            <RadioGroup 
                              value={selection.categoryId}
                              onValueChange={(value) => handleCategorySelect(sport.id, value)}
                            >
                              <div className="space-y-2">
                                {sport.categories.map((category) => (
                                  <div 
                                    key={category.id}
                                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                                      selection.categoryId === category.id
                                        ? 'border-[#1FA84A] bg-[#1FA84A]/5'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <RadioGroupItem 
                                      value={category.id} 
                                      id={`${sport.id}-${category.id}`}
                                    />
                                    <Label 
                                      htmlFor={`${sport.id}-${category.id}`}
                                      className="flex-1 cursor-pointer"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="font-semibold text-[#0C2C4A]">{category.name}</p>
                                          <p className="text-xs text-gray-600">{category.description}</p>
                                        </div>
                                        <Badge variant="outline" className="ml-2">
                                          {category.categoryType === 'tunggal' ? '1 peserta' : 
                                           category.categoryType === 'ganda' ? '2 peserta' :
                                           `${category.minParticipants}-${category.maxParticipants} peserta`}
                                        </Badge>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          {/* LAYER 2: Education Level Selection */}
                          {selection.categoryId && (
                            <div className="mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                                <Label className="font-bold text-[#0C2C4A]">
                                  Jenjang Peserta (WAJIB)
                                </Label>
                              </div>
                              <Select 
                                value={selection.educationLevel}
                                onValueChange={(value) => handleEducationLevelSelect(sport.id, value)}
                              >
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Pilih jenjang pendidikan..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {EDUCATION_LEVELS.map(level => (
                                    <SelectItem key={level.id} value={level.id}>
                                      <div>
                                        <p className="font-semibold">{level.label}</p>
                                        <p className="text-xs text-gray-600">{level.description}</p>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* LAYER 3: Technical Parameters (Conditional) */}
                          {selection.categoryId && selection.educationLevel && techParams.length > 0 && (
                            <div className="mb-6 bg-amber-50 p-4 rounded-lg border-2 border-amber-300">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                                <Label className="font-bold text-[#0C2C4A]">
                                  Detail Teknis (Sesuai THB)
                                </Label>
                              </div>
                              <p className="text-xs text-amber-800 mb-4">
                                Isi sesuai ketentuan THB untuk penempatan kategori dan validasi.
                              </p>
                              <div className="space-y-4">
                                {techParams.map(param => (
                                  <div key={param.id}>
                                    <Label className="text-sm font-semibold text-[#0C2C4A] mb-2 block">
                                      {param.label}
                                      {param.required && <span className="text-red-600 ml-1">*</span>}
                                    </Label>
                                    <p className="text-xs text-gray-600 mb-2">{param.description}</p>
                                    <Select 
                                      value={selection.technicalParams[param.id] || ''}
                                      onValueChange={(value) => handleTechnicalParamSelect(sport.id, param.id, value)}
                                    >
                                      <SelectTrigger className="bg-white">
                                        <SelectValue placeholder={`Pilih ${param.label.toLowerCase()}...`} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {param.options.map(option => (
                                          <SelectItem key={option.id} value={option.id}>
                                            <div>
                                              <p className="font-semibold">{option.label}</p>
                                              {option.description && (
                                                <p className="text-xs text-gray-600">{option.description}</p>
                                              )}
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Price Display */}
                          {selectedCategory && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                              <p className="text-xs text-gray-600 mb-1">Biaya Pendaftaran:</p>
                              <p className="text-2xl font-bold text-[#D92B2B]">
                                Rp {selectedCategory.price.toLocaleString('id-ID')}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {selectedCategory.categoryType === 'tunggal' 
                                  ? '/ orang' 
                                  : selectedCategory.categoryType === 'ganda'
                                  ? '/ pasangan'
                                  : '/ tim'}
                              </p>
                            </div>
                          )}

                          {/* Validation Error */}
                          {validationError && (
                            <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-4">
                              <p className="text-sm text-red-700 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {validationError}
                              </p>
                            </div>
                          )}

                          {/* Add Button */}
                          <Button
                            className={`w-full ${
                              !validationError && selection.categoryId
                                ? 'bg-[#1FA84A] hover:bg-[#1FA84A]/90' 
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            onClick={() => addToCart(sport)}
                            disabled={!!validationError || !selection.categoryId}
                          >
                            {validationError || !selection.categoryId ? 'Lengkapi Form di Atas' : 'Pilih Cabang Ini'}
                          </Button>

                          {/* Show added categories for this sport */}
                          {sportHasItemsInCart && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-xs text-gray-600 mb-2 font-semibold">Sudah ditambahkan:</p>
                              <div className="space-y-2">
                                {cart
                                  .map((item, idx) => ({ item, originalIndex: idx }))
                                  .filter(({ item }) => item.sportId === sport.id)
                                  .map(({ item, originalIndex }) => (
                                    <div 
                                      key={originalIndex}
                                      className="flex items-start justify-between text-xs bg-green-50 p-3 rounded border border-green-200"
                                    >
                                      <div className="flex-1">
                                        <p className="text-green-900 font-semibold">✓ {item.categoryName}</p>
                                        <p className="text-green-700">Jenjang: {item.educationLevelLabel}</p>
                                        {item.technicalParams && Object.keys(item.technicalParams).length > 0 && (
                                          <div className="mt-1 space-y-1">
                                            {Object.entries(item.technicalParams).map(([paramId, optionId]) => (
                                              <p key={paramId} className="text-green-600 text-xs">
                                                {getTechnicalParamLabel(item.sportId, item.categoryId, paramId, optionId)}
                                              </p>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFromCart(originalIndex)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-1 h-6 w-6 p-0"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Cart Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="border-2 border-[#1FA84A]">
                  <CardHeader className="bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5">
                    <CardTitle className="flex items-center gap-2 text-[#0C2C4A]">
                      <ShoppingCart className="w-5 h-5 text-[#1FA84A]" />
                      Keranjang Pendaftaran
                    </CardTitle>
                    <CardDescription>
                      Total: {cart.length} kategori dipilih
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                          Belum ada kategori dipilih
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Expand cabang olahraga dan lengkapi form
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                          {cart.map((item, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 pr-2">
                                  <p className="font-bold text-[#0C2C4A] text-sm">
                                    {item.sportName}
                                  </p>
                                  <p className="text-xs text-gray-700 mt-1">
                                    {item.categoryName}
                                  </p>
                                  <Badge variant="outline" className="mt-2 text-xs">
                                    {item.educationLevelLabel}
                                  </Badge>
                                  {item.technicalParams && Object.keys(item.technicalParams).length > 0 && (
                                    <div className="mt-2 space-y-1">
                                      {Object.entries(item.technicalParams).map(([paramId, optionId]) => (
                                        <Badge key={paramId} variant="outline" className="mr-1 text-xs bg-amber-50">
                                          {getTechnicalParamLabel(item.sportId, item.categoryId, paramId, optionId)}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(index)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-1 h-6 w-6 p-0 flex-shrink-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-1 mt-2 pt-2 border-t">
                                <p className="text-sm font-bold text-[#D92B2B]">
                                  Rp {item.price.toLocaleString('id-ID')}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.categoryType === 'tunggal' 
                                    ? '/ orang' 
                                    : item.categoryType === 'ganda'
                                    ? '/ pasangan'
                                    : '/ tim'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4 mb-4">
                          <p className="text-sm text-gray-600 mb-2">Total Kategori:</p>
                          <p className="text-3xl font-bold text-[#1FA84A] mb-4">
                            {cart.length}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            Estimasi Biaya Minimum:
                          </p>
                          <p className="text-2xl font-bold text-[#D92B2B]">
                            Rp {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('id-ID')}
                          </p>
                        </div>

                        <Button
                          className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90"
                          size="lg"
                          onClick={handleContinue}
                        >
                          Lanjut ke Data Peserta
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* THB Info Card */}
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <h4 className="font-bold text-green-900 text-sm mb-2">ℹ️ Ketentuan THB 2026:</h4>
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• Kategori, Jenjang, dan Detail Teknis wajib diisi</li>
                      <li>• <strong>SMP/MTs:</strong> Pelajar tingkat menengah pertama</li>
                      <li>• <strong>SMA/SMK/MA:</strong> Pelajar tingkat menengah atas</li>
                      <li>• <strong>Mahasiswa:</strong> Mahasiswa aktif PT (D3/S1/S2)</li>
                      <li>• Detail teknis untuk pengelompokan bracket</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}