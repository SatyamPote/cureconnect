import { Medicine, Pharmacy } from './types';

export const MEDICINES: Medicine[] = [
  // --- Analgesics & Antipyretics ---
  { id: 'm1', name: 'Dolo 650', genericName: 'Paracetamol', category: 'Analgesic', description: 'Used to treat fever and mild to moderate pain.', price: 30, requiresPrescription: false },
  { id: 'm2', name: 'Crocin Advance', genericName: 'Paracetamol', category: 'Analgesic', description: 'Fast relief from fever and pain.', price: 20, requiresPrescription: false },
  { id: 'm3', name: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', category: 'Analgesic', description: 'Pain relief for muscle aches and headache.', price: 40, requiresPrescription: false },
  { id: 'm4', name: 'Meftal Spas', genericName: 'Mefenamic Acid + Dicyclomine', category: 'Antispasmodic', description: 'Relief from menstrual cramps and stomach pain.', price: 45, requiresPrescription: true },
  { id: 'm5', name: 'Disprin', genericName: 'Aspirin', category: 'Analgesic', description: 'Soluble tablet for headache relief.', price: 10, requiresPrescription: false },
  { id: 'm6', name: 'Saridon', genericName: 'Paracetamol + Propyphenazone', category: 'Analgesic', description: 'Relief from severe headache.', price: 35, requiresPrescription: false },
  { id: 'm7', name: 'Volini Spray', genericName: 'Diclofenac', category: 'Pain Relief', description: 'Instant relief from muscle pain and sprain.', price: 150, requiresPrescription: false },
  { id: 'm8', name: 'Moov', genericName: 'Ayurvedic', category: 'Pain Relief', description: 'Ointment for back pain relief.', price: 120, requiresPrescription: false },
  { id: 'm9', name: 'Ultracet', genericName: 'Tramadol + Paracetamol', category: 'Analgesic', description: 'For moderate to severe pain.', price: 180, requiresPrescription: true },
  { id: 'm10', name: 'Zerodol-P', genericName: 'Aceclofenac + Paracetamol', category: 'Analgesic', description: 'Anti-inflammatory and pain relief.', price: 60, requiresPrescription: true },

  // --- Antibiotics ---
  { id: 'm11', name: 'Augmentin 625', genericName: 'Amoxicillin + Clavulanic Acid', category: 'Antibiotic', description: 'Treats bacterial infections.', price: 200, requiresPrescription: true, isCritical: true },
  { id: 'm12', name: 'Azithral 500', genericName: 'Azithromycin', category: 'Antibiotic', description: 'Treats respiratory tract infections.', price: 120, requiresPrescription: true },
  { id: 'm13', name: 'Taxim-O 200', genericName: 'Cefixime', category: 'Antibiotic', description: 'Cephalosporin antibiotic for infections.', price: 110, requiresPrescription: true },
  { id: 'm14', name: 'Ciplox 500', genericName: 'Ciprofloxacin', category: 'Antibiotic', description: 'Treats urinary tract and other infections.', price: 40, requiresPrescription: true },
  { id: 'm15', name: 'Norflox TZ', genericName: 'Norfloxacin + Tinidazole', category: 'Antibiotic', description: 'Treats stomach infections and diarrhea.', price: 90, requiresPrescription: true },
  { id: 'm16', name: 'Mox 500', genericName: 'Amoxicillin', category: 'Antibiotic', description: 'Penicillin antibiotic.', price: 80, requiresPrescription: true },
  { id: 'm17', name: 'Oflox 200', genericName: 'Ofloxacin', category: 'Antibiotic', description: 'Treats bacterial infections.', price: 75, requiresPrescription: true },
  { id: 'm18', name: 'Roxid 150', genericName: 'Roxithromycin', category: 'Antibiotic', description: 'Macrolide antibiotic.', price: 130, requiresPrescription: true },
  { id: 'm19', name: 'Monocef O 200', genericName: 'Cefpodoxime', category: 'Antibiotic', description: 'Treats bacterial infections.', price: 160, requiresPrescription: true },
  { id: 'm20', name: 'Clavam 625', genericName: 'Amoxicillin + Clavulanic Acid', category: 'Antibiotic', description: 'Alternative to Augmentin.', price: 190, requiresPrescription: true },

  // --- Cold, Allergy & Respiratory ---
  { id: 'm21', name: 'Cetrizine', genericName: 'Cetirizine', category: 'Antihistamine', description: 'Relieves allergy symptoms.', price: 18, requiresPrescription: false },
  { id: 'm22', name: 'Allegra 120', genericName: 'Fexofenadine', category: 'Antihistamine', description: 'Non-drowsy allergy relief.', price: 140, requiresPrescription: false },
  { id: 'm23', name: 'Montair LC', genericName: 'Montelukast + Levocetirizine', category: 'Antiallergic', description: 'Treats allergic rhinitis and asthma.', price: 180, requiresPrescription: true },
  { id: 'm24', name: 'Cheston Cold', genericName: 'Cetirizine + Paracetamol + Phenylephrine', category: 'Cold Prep', description: 'Relief from cold and flu symptoms.', price: 45, requiresPrescription: false },
  { id: 'm25', name: 'Ascoril LS', genericName: 'Ambroxol + Levosalbutamol', category: 'Cough Syrup', description: 'Expectorant for productive cough.', price: 110, requiresPrescription: true },
  { id: 'm26', name: 'Benadryl', genericName: 'Diphenhydramine', category: 'Cough Syrup', description: 'Relief from dry cough and throat irritation.', price: 100, requiresPrescription: false },
  { id: 'm27', name: 'Otrivin', genericName: 'Xylometazoline', category: 'Nasal Drop', description: 'Nasal decongestant.', price: 50, requiresPrescription: false },
  { id: 'm28', name: 'Nasivion', genericName: 'Oxymetazoline', category: 'Nasal Drop', description: 'Relief from blocked nose.', price: 60, requiresPrescription: false },
  { id: 'm29', name: 'Vicks Vaporub', genericName: 'Menthol + Camphor', category: 'Cold Prep', description: 'Topical cough suppressant.', price: 40, requiresPrescription: false },
  { id: 'm30', name: 'Asthalin Inhaler', genericName: 'Salbutamol', category: 'Respiratory', description: 'Relief from asthma and COPD.', price: 150, requiresPrescription: true, isCritical: true },

  // --- Gastric & Acidity ---
  { id: 'm31', name: 'Pan D', genericName: 'Pantoprazole + Domperidone', category: 'Antacid', description: 'Treats acidity and heartburn.', price: 110, requiresPrescription: true },
  { id: 'm32', name: 'Omez 20', genericName: 'Omeprazole', category: 'Antacid', description: 'Reduces stomach acid.', price: 55, requiresPrescription: true },
  { id: 'm33', name: 'Rantac 150', genericName: 'Ranitidine', category: 'Antacid', description: 'Treats ulcers and acidity.', price: 30, requiresPrescription: true },
  { id: 'm34', name: 'Gelusil', genericName: 'Aluminum Hydroxide + Magnesium', category: 'Antacid', description: 'Liquid antacid for heartburn.', price: 120, requiresPrescription: false },
  { id: 'm35', name: 'Digene', genericName: 'Antacid', category: 'Antacid', description: 'Relief from gas and acidity.', price: 115, requiresPrescription: false },
  { id: 'm36', name: 'Eno', genericName: 'Sodium Bicarbonate', category: 'Antacid', description: 'Instant relief from acidity.', price: 8, requiresPrescription: false },
  { id: 'm37', name: 'Pudin Hara', genericName: 'Mint Oil', category: 'Digestive', description: 'Ayurvedic relief for stomach ache.', price: 25, requiresPrescription: false },
  { id: 'm38', name: 'Hajmola', genericName: 'Ayurvedic', category: 'Digestive', description: 'Digestive tablets.', price: 45, requiresPrescription: false },
  { id: 'm39', name: 'Cremaffin', genericName: 'Liquid Paraffin', category: 'Laxative', description: 'Relief from constipation.', price: 180, requiresPrescription: false },
  { id: 'm40', name: 'Dulcoflex', genericName: 'Bisacodyl', category: 'Laxative', description: 'Treats constipation.', price: 12, requiresPrescription: false },

  // --- Diabetes & Cardiac (Critical) ---
  { id: 'm41', name: 'Glycomet 500', genericName: 'Metformin', category: 'Antidiabetic', description: 'Type 2 diabetes treatment.', price: 45, requiresPrescription: true, isCritical: true },
  { id: 'm42', name: 'Janumet 50/500', genericName: 'Sitagliptin + Metformin', category: 'Antidiabetic', description: 'Combination therapy for diabetes.', price: 350, requiresPrescription: true },
  { id: 'm43', name: 'Galvus Met', genericName: 'Vildagliptin + Metformin', category: 'Antidiabetic', description: 'Diabetes management.', price: 320, requiresPrescription: true },
  { id: 'm44', name: 'Teneligliptin', genericName: 'Teneligliptin', category: 'Antidiabetic', description: 'DPP-4 inhibitor for diabetes.', price: 110, requiresPrescription: true },
  { id: 'm45', name: 'Lantus', genericName: 'Insulin Glargine', category: 'Insulin', description: 'Long-acting insulin.', price: 800, requiresPrescription: true, isCritical: true },
  { id: 'm46', name: 'Telma 40', genericName: 'Telmisartan', category: 'Antihypertensive', description: 'Treats high blood pressure.', price: 120, requiresPrescription: true, isCritical: true },
  { id: 'm47', name: 'Amlokind 5', genericName: 'Amlodipine', category: 'Antihypertensive', description: 'Calcium channel blocker for BP.', price: 40, requiresPrescription: true },
  { id: 'm48', name: 'Sorbitrate 5', genericName: 'Isosorbide Dinitrate', category: 'Cardiac', description: 'Prevents chest pain (angina).', price: 50, requiresPrescription: true, isCritical: true },
  { id: 'm49', name: 'Ecosprin 75', genericName: 'Aspirin', category: 'Blood Thinner', description: 'Prevents blood clots.', price: 15, requiresPrescription: true, isCritical: true },
  { id: 'm50', name: 'Atorva 10', genericName: 'Atorvastatin', category: 'Statin', description: 'Lowers cholesterol.', price: 160, requiresPrescription: true },

  // --- Vitamins & Supplements ---
  { id: 'm51', name: 'Shelcal 500', genericName: 'Calcium + Vitamin D3', category: 'Supplement', description: 'Bone health supplement.', price: 130, requiresPrescription: false },
  { id: 'm52', name: 'Becosules', genericName: 'B-Complex + Vitamin C', category: 'Supplement', description: 'Treats vitamin deficiency.', price: 45, requiresPrescription: false },
  { id: 'm53', name: 'Neurobion Forte', genericName: 'B-Complex + B12', category: 'Supplement', description: 'Nerve health supplement.', price: 35, requiresPrescription: false },
  { id: 'm54', name: 'Limcee', genericName: 'Vitamin C', category: 'Supplement', description: 'Immunity booster.', price: 25, requiresPrescription: false },
  { id: 'm55', name: 'Evion 400', genericName: 'Vitamin E', category: 'Supplement', description: 'Skin and hair health.', price: 32, requiresPrescription: false },
  { id: 'm56', name: 'Supradyn', genericName: 'Multivitamin', category: 'Supplement', description: 'Daily multivitamin tablet.', price: 50, requiresPrescription: false },
  { id: 'm57', name: 'Revital H', genericName: 'Multivitamin + Ginseng', category: 'Supplement', description: 'Energy and immunity booster.', price: 110, requiresPrescription: false },
  { id: 'm58', name: 'Zincovit', genericName: 'Multivitamin + Zinc', category: 'Supplement', description: 'Immunity support.', price: 95, requiresPrescription: false },
  { id: 'm59', name: 'Electral', genericName: 'ORS', category: 'Electrolytes', description: 'Oral rehydration salts.', price: 22, requiresPrescription: false },
  { id: 'm60', name: 'Glucon-D', genericName: 'Glucose', category: 'Energy Drink', description: 'Instant energy.', price: 40, requiresPrescription: false },

  // --- First Aid & Antiseptics ---
  { id: 'm61', name: 'Betadine Ointment', genericName: 'Povidone Iodine', category: 'Antiseptic', description: 'For cuts and wounds.', price: 120, requiresPrescription: false },
  { id: 'm62', name: 'Soframycin', genericName: 'Framycetin', category: 'Antibiotic Cream', description: 'Skin cream for infections.', price: 55, requiresPrescription: false },
  { id: 'm63', name: 'Burnol', genericName: 'Aminacrine', category: 'Antiseptic', description: 'For burns.', price: 45, requiresPrescription: false },
  { id: 'm64', name: 'Dettol Liquid', genericName: 'Antiseptic Liquid', category: 'Antiseptic', description: 'Disinfectant for wounds.', price: 60, requiresPrescription: false },
  { id: 'm65', name: 'Savlon', genericName: 'Antiseptic Liquid', category: 'Antiseptic', description: 'Disinfectant.', price: 55, requiresPrescription: false },
  { id: 'm66', name: 'Band-Aid', genericName: 'Adhesive Bandage', category: 'First Aid', description: 'For small cuts.', price: 5, requiresPrescription: false },
  { id: 'm67', name: 'Cotton Roll', genericName: 'Surgical Cotton', category: 'First Aid', description: 'Absorbent cotton.', price: 40, requiresPrescription: false },
  { id: 'm68', name: 'Thermometer', genericName: 'Digital Thermometer', category: 'Device', description: 'Measure body temperature.', price: 250, requiresPrescription: false },
  { id: 'm69', name: 'Oximeter', genericName: 'Pulse Oximeter', category: 'Device', description: 'Measure oxygen saturation.', price: 800, requiresPrescription: false },
  { id: 'm70', name: 'N95 Mask', genericName: 'Face Mask', category: 'Protection', description: 'Protective face mask.', price: 50, requiresPrescription: false },

  // --- Personal Care & Hygiene ---
  { id: 'm71', name: 'Himalaya Neem Face Wash', genericName: 'Herbal', category: 'Skincare', description: 'Face wash for acne.', price: 150, requiresPrescription: false },
  { id: 'm72', name: 'Nivea Creme', genericName: 'Moisturizer', category: 'Skincare', description: 'All purpose cream.', price: 200, requiresPrescription: false },
  { id: 'm73', name: 'Vaseline', genericName: 'Petroleum Jelly', category: 'Skincare', description: 'Skin protectant.', price: 40, requiresPrescription: false },
  { id: 'm74', name: 'Whisper Ultra', genericName: 'Sanitary Pad', category: 'Hygiene', description: 'Menstrual hygiene.', price: 180, requiresPrescription: false },
  { id: 'm75', name: 'Stayfree Secure', genericName: 'Sanitary Pad', category: 'Hygiene', description: 'Menstrual hygiene.', price: 40, requiresPrescription: false },
  { id: 'm76', name: 'Pampers', genericName: 'Diapers', category: 'Baby Care', description: 'Baby diapers.', price: 600, requiresPrescription: false },
  { id: 'm77', name: 'MamyPoko Pants', genericName: 'Diapers', category: 'Baby Care', description: 'Baby diapers.', price: 550, requiresPrescription: false },
  { id: 'm78', name: 'Hand Sanitizer', genericName: 'Alcohol Gel', category: 'Hygiene', description: 'Kills 99.9% germs.', price: 50, requiresPrescription: false },
  { id: 'm79', name: 'Durex', genericName: 'Condoms', category: 'Contraceptive', description: 'Barrier contraceptive.', price: 200, requiresPrescription: false },
  { id: 'm80', name: 'Prega News', genericName: 'HCG Kit', category: 'Diagnostic', description: 'Pregnancy detection kit.', price: 50, requiresPrescription: false },

  // --- Baby & Mother Care ---
  { id: 'm81', name: 'Cerelac', genericName: 'Baby Cereal', category: 'Baby Food', description: 'Infant cereal.', price: 280, requiresPrescription: false },
  { id: 'm82', name: 'Nan Pro', genericName: 'Infant Formula', category: 'Baby Food', description: 'Milk formula for babies.', price: 750, requiresPrescription: false },
  { id: 'm83', name: 'Lactogen', genericName: 'Infant Formula', category: 'Baby Food', description: 'Milk formula.', price: 400, requiresPrescription: false },
  { id: 'm84', name: 'Woodwards Gripe Water', genericName: 'Dill Oil', category: 'Baby Care', description: 'Relief from colic.', price: 60, requiresPrescription: false },
  { id: 'm85', name: 'Bonnisan', genericName: 'Herbal', category: 'Baby Care', description: 'Digestive tonic for babies.', price: 70, requiresPrescription: false },

  // --- Others ---
  { id: 'm86', name: 'Thyronorm 50', genericName: 'Thyroxine', category: 'Thyroid', description: 'Treats hypothyroidism.', price: 140, requiresPrescription: true },
  { id: 'm87', name: 'Manforce', genericName: 'Sildenafil', category: 'Sexual Wellness', description: 'Treats erectile dysfunction.', price: 250, requiresPrescription: true },
  { id: 'm88', name: 'I-Pill', genericName: 'Levonorgestrel', category: 'Contraceptive', description: 'Emergency contraceptive pill.', price: 110, requiresPrescription: false },
  { id: 'm89', name: 'Unwanted 72', genericName: 'Levonorgestrel', category: 'Contraceptive', description: 'Emergency contraceptive pill.', price: 100, requiresPrescription: false },
  { id: 'm90', name: 'Horlicks', genericName: 'Malted Drink', category: 'Nutrition', description: 'Health drink.', price: 350, requiresPrescription: false },
  { id: 'm91', name: 'Bournvita', genericName: 'Malted Drink', category: 'Nutrition', description: 'Health drink.', price: 320, requiresPrescription: false },
  { id: 'm92', name: 'Complan', genericName: 'Malted Drink', category: 'Nutrition', description: 'Health drink.', price: 340, requiresPrescription: false },
  { id: 'm93', name: 'Ensure', genericName: 'Nutritional Supplement', category: 'Nutrition', description: 'Complete nutrition.', price: 650, requiresPrescription: false },
  { id: 'm94', name: 'Protinex', genericName: 'Protein Powder', category: 'Nutrition', description: 'Protein supplement.', price: 550, requiresPrescription: false },
  { id: 'm95', name: 'Dabur Chyawanprash', genericName: 'Ayurvedic', category: 'Immunity', description: 'Immunity booster.', price: 395, requiresPrescription: false },
  { id: 'm96', name: 'Zandu Balm', genericName: 'Menthol + Wintergreen', category: 'Pain Balm', description: 'Headache relief.', price: 40, requiresPrescription: false },
  { id: 'm97', name: 'Amrutanjan', genericName: 'Pain Balm', category: 'Pain Balm', description: 'Pain relief balm.', price: 45, requiresPrescription: false },
  { id: 'm98', name: 'Iodex', genericName: 'Pain Balm', category: 'Pain Balm', description: 'Relief from body pain.', price: 50, requiresPrescription: false },
  { id: 'm99', name: 'Crepe Bandage', genericName: 'Bandage', category: 'First Aid', description: 'For sprains.', price: 150, requiresPrescription: false },
  { id: 'm100', name: 'Calpol 250', genericName: 'Paracetamol Syrup', category: 'Analgesic', description: 'Fever relief for kids.', price: 40, requiresPrescription: false },
  { id: 'm101', name: 'T-98', genericName: 'Paracetamol Syrup', category: 'Analgesic', description: 'Fever relief for kids.', price: 38, requiresPrescription: false },
];

// Helper to generate random inventory for a pharmacy
const generateInventory = () => {
  // Each pharmacy stocks about 80% of available medicines
  return MEDICINES.filter(() => Math.random() > 0.2).map(med => {
    const isNearExpiry = Math.random() > 0.9; // 10% chance
    const isOutOfStock = Math.random() > 0.9; // 10% chance

    return {
      medicineId: med.id,
      quantity: isOutOfStock ? 0 : Math.floor(Math.random() * 100) + 5,
      lastUpdated: new Date().toISOString(),
      expiryDate: new Date(Date.now() + (isNearExpiry ? 2592000000 : 31536000000 * Math.random())).toISOString() // 1 month to 1 year
    };
  });
};

// Pharmacies across Bangalore
export const PHARMACIES: Pharmacy[] = [
  // Indiranagar
  {
    id: 'p1',
    name: 'Apollo Pharmacy Hub',
    type: 'Hub',
    address: 'Indiranagar 100ft Road, Bangalore',
    location: { latitude: 12.9716, longitude: 77.6412 },
    phone: '+91 80 1234 5678',
    rating: 4.8,
    inventory: generateInventory()
  },
  {
    id: 'p2',
    name: 'Wellness Forever',
    type: 'Hub',
    address: 'CMH Road, Indiranagar, Bangalore',
    location: { latitude: 12.9784, longitude: 77.6408 },
    phone: '+91 80 2233 4455',
    rating: 4.6,
    inventory: generateInventory()
  },

  // Koramangala
  {
    id: 'p3',
    name: 'MedPlus Koramangala',
    type: 'Local Store',
    address: 'Koramangala 5th Block, Bangalore',
    location: { latitude: 12.9352, longitude: 77.6245 },
    phone: '+91 80 8765 4321',
    rating: 4.2,
    inventory: generateInventory()
  },
  {
    id: 'p4',
    name: 'Trust Chemists',
    type: 'Local Store',
    address: 'Koramangala 7th Block, Bangalore',
    location: { latitude: 12.9365, longitude: 77.6135 },
    phone: '+91 80 9876 5432',
    rating: 4.0,
    inventory: generateInventory()
  },

  // Jayanagar & JP Nagar
  {
    id: 'p5',
    name: 'Frank Ross Pharmacy',
    type: 'Hub',
    address: 'Jayanagar 4th Block, Bangalore',
    location: { latitude: 12.9250, longitude: 77.5938 },
    phone: '+91 80 1122 3344',
    rating: 4.5,
    inventory: generateInventory()
  },
  {
    id: 'p6',
    name: 'Maruti Medicals',
    type: 'Local Store',
    address: 'JP Nagar 2nd Phase, Bangalore',
    location: { latitude: 12.9121, longitude: 77.5904 },
    phone: '+91 80 5566 7788',
    rating: 3.9,
    inventory: generateInventory()
  },

  // Whitefield & Marathahalli
  {
    id: 'p7',
    name: 'Aster Pharmacy',
    type: 'Hub',
    address: 'Whitefield Main Road, Bangalore',
    location: { latitude: 12.9698, longitude: 77.7500 },
    phone: '+91 80 6677 8899',
    rating: 4.7,
    inventory: generateInventory()
  },
  {
    id: 'p8',
    name: 'Tulsi Pharma',
    type: 'Local Store',
    address: 'Marathahalli Bridge, Bangalore',
    location: { latitude: 12.9592, longitude: 77.6974 },
    phone: '+91 80 4433 2211',
    rating: 4.1,
    inventory: generateInventory()
  },

  // HSR Layout & Electronic City
  {
    id: 'p9',
    name: 'HSR Medical Center',
    type: 'Local Store',
    address: 'HSR Layout Sector 2, Bangalore',
    location: { latitude: 12.9128, longitude: 77.6387 },
    phone: '+91 80 9988 7766',
    rating: 4.3,
    inventory: generateInventory()
  },
  {
    id: 'p10',
    name: 'Narayana Pharmacy',
    type: 'Hub',
    address: 'Electronic City Phase 1, Bangalore',
    location: { latitude: 12.8452, longitude: 77.6602 },
    phone: '+91 80 7788 9900',
    rating: 4.6,
    inventory: generateInventory()
  },

  // North Bangalore (Malleshwaram, Hebbal, Yelahanka)
  {
    id: 'p11',
    name: 'Malleshwaram Pharma',
    type: 'Local Store',
    address: 'Malleshwaram 8th Cross, Bangalore',
    location: { latitude: 13.0031, longitude: 77.5643 },
    phone: '+91 80 3344 5566',
    rating: 4.4,
    inventory: generateInventory()
  },
  {
    id: 'p12',
    name: 'Manipal Hospital Pharmacy',
    type: 'Hub',
    address: 'Hebbal Flyover, Bangalore',
    location: { latitude: 13.0358, longitude: 77.5970 },
    phone: '+91 80 2211 0099',
    rating: 4.8,
    inventory: generateInventory()
  },
  {
    id: 'p13',
    name: 'Yelahanka Meds',
    type: 'Local Store',
    address: 'Yelahanka New Town, Bangalore',
    location: { latitude: 13.1007, longitude: 77.5963 },
    phone: '+91 80 1100 2233',
    rating: 4.0,
    inventory: generateInventory()
  },

  // South Bangalore (Bannerghatta, BTM)
  {
    id: 'p14',
    name: 'Fortis Pharmacy',
    type: 'Hub',
    address: 'Bannerghatta Road, Bangalore',
    location: { latitude: 12.8958, longitude: 77.5986 },
    phone: '+91 80 6655 4433',
    rating: 4.7,
    inventory: generateInventory()
  },
  {
    id: 'p15',
    name: 'BTM Drug House',
    type: 'Local Store',
    address: 'BTM Layout 2nd Stage, Bangalore',
    location: { latitude: 12.9166, longitude: 77.6101 },
    phone: '+91 80 5544 3322',
    rating: 4.2,
    inventory: generateInventory()
  },

  // West Bangalore (Rajajinagar, Vijayanagar)
  {
    id: 'p16',
    name: 'Rajajinagar Medicals',
    type: 'Local Store',
    address: 'Rajajinagar 1st Block, Bangalore',
    location: { latitude: 12.9901, longitude: 77.5525 },
    phone: '+91 80 7766 5544',
    rating: 4.1,
    inventory: generateInventory()
  },
  {
    id: 'p17',
    name: 'Vijayanagar Health',
    type: 'Local Store',
    address: 'Vijayanagar Club Road, Bangalore',
    location: { latitude: 12.9719, longitude: 77.5309 },
    phone: '+91 80 8899 0011',
    rating: 4.3,
    inventory: generateInventory()
  },

  // Central Bangalore (MG Road, Shivajinagar)
  {
    id: 'p18',
    name: 'Cauvery Emporium Meds',
    type: 'Local Store',
    address: 'MG Road, Bangalore',
    location: { latitude: 12.9756, longitude: 77.6097 },
    phone: '+91 80 2244 6688',
    rating: 4.5,
    inventory: generateInventory()
  },
  {
    id: 'p19',
    name: 'Shivajinagar Pharma',
    type: 'Local Store',
    address: 'Shivajinagar Bus Stand, Bangalore',
    location: { latitude: 12.9857, longitude: 77.6057 },
    phone: '+91 80 3322 1100',
    rating: 3.8,
    inventory: generateInventory()
  },

  // Outer Ring Road
  {
    id: 'p20',
    name: 'Sakra World Hospital Pharmacy',
    type: 'Hub',
    address: 'Bellandur, Outer Ring Road, Bangalore',
    location: { latitude: 12.9279, longitude: 77.6837 },
    phone: '+91 80 4455 6677',
    rating: 4.9,
    inventory: generateInventory()
  }
];
